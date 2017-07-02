
var app = {
  startCamera: function(){
    console.log('START CAMERA ****************************************');
    console.log('Width: ' + window.screen.width);
    console.log('Width: ' + window.screen.height);
    console.log('Orientation is ' + screen.orientation.type);
    console.log('START CAMERA ****************************************');
    CameraPreview.startCamera({x: 0, y: 0, width: window.screen.width, height: window.screen.height, camera: "back", tapPhoto: false, previewDrag: false, toBack: true});
  },
  stopCamera: function(){
    CameraPreview.stopCamera();
  },
  rotateIt: function() {
    app.stopCamera();
    app.startCamera();
  },
  switchCamera: function(e){
    console.log('SWITCHING CAMERAS********************');
    CameraPreview.switchCamera();
    e.stopPropagation();
  },
  shootIt: function(e) {
    var fadeDelay = 1000;
    var fadeDuration = 1000;
    
    var div = document.createElement('div');
    div.classList.add('image-wrapper');
    div.style.left = e.pageX + 'px';
    div.style.top = e.pageY + 'px';
    div.innerHTML += '<img src="img/explode.png" width="120" height="120" />';
    document.body.appendChild(div);

    var snd_explosion = new Audio('snd/explosion.mp3');

    setTimeout(function() {
            div.classList.add('fade-out');           
            setTimeout(function() { div.remove(); }, fadeDuration);
	    delete snd_explosion;
    }, fadeDelay);
    
    snd_explosion.play();
  },
  init: function(){
    this.startCamera();
    document.getElementById('switchCameraButton').addEventListener('click', this.switchCamera, false);
    document.addEventListener('click', this.shootIt, false);
    window.addEventListener('orientationchange', this.rotateIt, false);
    //window.addEventListener('resize', this.rotateIt, false);
    //screen.orientation.addEventListener('change', this.rotateIt, false);
    //screen.orientation.lock('landscape');
    
    //console.log("Window Width: " + window.screen.width);
    //console.log("Window Height: " + window.screen.height);
    //console.log("Window Aspect Ratio: " + window.devicePixelRatio);
    /*var wink = new SpriteAnim({
      width: 14,
      height: 14,
      frames: 42,
      sprite: "../img/wink2.png",
      elementId : "anim1"
    });*/
  }
};

document.addEventListener('deviceready', function(){	
  app.init();
}, false);
