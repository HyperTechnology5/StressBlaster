declare var CameraPreview : any;
interface Screen {
  orientation: any;
}

module StressBlasterApp {
  "use strict";

  export module Application {
    export function initialize() {
      document.addEventListener('deviceready', onDeviceReady, false);
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
    }
    function shootIt(e : MouseEvent) {
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
	      snd_explosion = null;
      }, fadeDelay);
      
      snd_explosion.play();
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

