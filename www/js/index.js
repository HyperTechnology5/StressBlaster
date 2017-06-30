var snd_explosion;

var app = {
  startCamera: function(){
    CameraPreview.startCamera({x: 0, y: 0, width: window.screen.width, height: window.screen.height, camera: "front", tapPhoto: false, previewDrag: false, toBack: true});
  },
  stopCamera: function(){
    CameraPreview.stopCamera();
  },
  switchCamera: function(){
    console.log('SWITCHING CAMERAS********************');
    CameraPreview.switchCamera();
  },
  shootIt: function(e) {
    console.log('PEW PEW********************');
    var fadeDelay = 1000;
    var fadeDuration = 1000;
    
    var div = document.createElement('div');
    div.classList.add('image-wrapper');
    div.style.left = e.pageX + 'px';
    div.style.top = e.pageY + 'px';
    div.innerHTML += '<img src="img/explode.png" width="120" height="120" />';
    document.body.appendChild(div);

    setTimeout(function() {
            div.classList.add('fade-out');           
            setTimeout(function() { div.remove(); }, fadeDuration);
    }, fadeDelay);
    
    snd_explosion.play();
  },
  init: function(){
    this.startCamera();
    document.getElementById('switchCameraButton').addEventListener('click', this.switchCamera, false);
    document.addEventListener('click', this.shootIt, false);
    snd_explosion = new Audio('snd/explosion.mp3');
    
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
