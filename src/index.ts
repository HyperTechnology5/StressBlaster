declare var CameraPreview : any;
interface Screen {
  orientation: any;
}

module StressBlasterApp {
  "use strict";

  class fireAnim {
    div: HTMLElement;
    snd: any;
    constructor (pgX : number, pgY : number) {
      this.div = document.createElement('div'); 
      this.div.classList.add('image-wrapper');
      this.div.style.left = pgX + 'px';
      this.div.style.top = pgY + 'px';
      this.div.innerHTML = '<img src="img/explode.png" width="120" height="120" />';
      document.body.appendChild(this.div);

      this.snd = new Audio('snd/explosion.mp3');
      setTimeout(this.startFade.bind(this), 1000);
      this.snd.play();
    }
    startFade():void {
      this.div.classList.add('fade-out');
      setTimeout(this.finishFade.bind(this), 1000);
      this.snd = null;
    }
    finishFade():void {
      this.div.remove();
    }
  }
  class shotAnim {
    div: HTMLElement;
    snd: any;
    constructor (pgX : number, pgY : number) {
      this.div = document.createElement('div'); 
      this.div.classList.add('image-wrapper');
      this.div.style.left = pgX + 'px';
      this.div.style.top = pgY + 'px';
      this.div.innerHTML = '<img src="img/bullet-hole.png" width="120" height="120" />';
      document.body.appendChild(this.div);

      this.snd = new Audio('snd/gunshot.mp3');
      setTimeout(this.startFade.bind(this), 1000);
      this.snd.play();
    }
    startFade():void {
      this.div.classList.add('fade-out');
      setTimeout(this.finishFade.bind(this), 1000);
      this.snd = null;
    }
    finishFade():void {
      this.div.remove();
    }
  }
  class mushAnim {
    div: HTMLElement;
    snd: any;
    counter: number;
    constructor (pgX : number, pgY : number) {
      this.div = document.createElement('div'); 
      this.div.classList.add('image-wrapper');
      this.div.style.left = pgX + 'px';
      this.div.style.top = (pgY-60) + 'px';
      this.counter = 0;
      document.body.appendChild(this.div);
      this.snd = new Audio('snd/blast.mp3');
      this.snd.play();
      this.animate();
    }
    animate():void {
      ++this.counter;
      this.div.innerHTML = '<img src="img/mushroom/img'+this.counter+'.png" width="120" height="120" />';
      if (this.counter == 25) {
	setTimeout(this.stop.bind(this), 100);
      } else {
	setTimeout(this.animate.bind(this), 100);
      }
    }
    stop():void {
      this.div.remove();
      this.snd = null;
    }
  }
  class bloodAnim {
    div: HTMLElement;
    snd: any;
    counter: number;
    
    constructor (pgX : number, pgY : number) {
      this.div = document.createElement('div'); 
      this.div.classList.add('image-wrapper');
      this.div.style.left = pgX + 'px';
      this.div.style.top = pgY + 'px';
      this.counter = 0;
      document.body.appendChild(this.div);
      this.snd = new Audio('snd/headchop.mp3');
      this.snd.play();
      this.animate();
    }
    animate():void {
      ++this.counter;
      this.div.innerHTML = '<img src="img/blood/img'+this.counter+'.png" width="120" height="120" />';
      if (this.counter == 9) {
	setTimeout(this.stop.bind(this), 150);
      } else {
	setTimeout(this.animate.bind(this), 150);
      }
    }
    stop():void {
      this.div.remove();
      this.snd = null;
    }
  }
  
  const ICO = 0;
  const FACTORY = 1;

  export module Application {
    var weapon : number;
    var arsenal = [
      [ "explode-ico.png", function(x,y) { return new fireAnim(x,y); } ],
      [ "mushroom-ico.png", function(x,y) { return new mushAnim(x,y); } ],
      [ "blood-ico.png", function(x,y) { return new bloodAnim(x,y); } ],
      [ "gun-ico.png", function(x,y) { return new shotAnim(x,y); } ],
      [ null, null ]
    ];
    export function initialize() {
      document.addEventListener('deviceready', onDeviceReady, false);
      weapon = 0;
    }
    function stopCamera() {
      CameraPreview.stopCamera();
    }
    function rotateIt() {
      stopCamera();
      startCamera();
    }
    function switchCamera(e : Event){
      console.log('SWITCHING CAMERAS********************');
      CameraPreview.switchCamera();
      e.stopPropagation();
      var snd = new Audio('snd/sw_camera.mp3');
      snd.play();
      setTimeout(function() { snd = null; },1000);
    }
    function switchWeapon(e : Event){
      console.log('SWITCHING WEAPON********************');
      weapon = weapon + 1;
      if (arsenal[weapon][ICO] == null) weapon = 0;
      var button : any = document.getElementById('switchWeaponButton');
      button.src = "img/" + arsenal[weapon][ICO];
      e.stopPropagation();
      var snd = new Audio('snd/sw_tool.mp3');
      snd.play();
      setTimeout(function() { snd = null; },1000);
    }
    function shootIt(e : MouseEvent) {
      var factory : any = arsenal[weapon][FACTORY];
      factory(e.pageX,e.pageY);
    }

    function startCamera() {
      console.log('START CAMERA ****************************************');
      console.log('Width: ' + window.screen.width);
      console.log('Width: ' + window.screen.height);
      console.log('Orientation is ' + screen.orientation.type);
      console.log('START CAMERA ****************************************');
      CameraPreview.startCamera({x: 0, y: 0, width: window.screen.width, height: window.screen.height, camera: "back", tapPhoto: false, previewDrag: false, toBack: true});
    }
    function onDeviceReady() {
      // Handle the Cordova pause and resume events
      document.addEventListener('pause', onPause, false);
      document.addEventListener('resume', onResume, false);
      startCamera();
      document.getElementById('switchCameraButton').addEventListener('click', switchCamera.bind(this), false);
      document.getElementById('switchWeaponButton').addEventListener('click', switchWeapon.bind(this), false);
      document.addEventListener('click', shootIt.bind(this), false);
      window.addEventListener('orientationchange', rotateIt.bind(this), false);
    }

    function onPause() {
      // TODO: This application has been suspended. Save application state here.
      console.log('************* PAUSE APPLICATION *****************');
    }

    function onResume() {
      // TODO: This application has been reactivated. Restore application state here.
      console.log('************* RESUME APPLICATION *****************');
    }
  }

  window.onload = function () {
    Application.initialize();
  }
}

