    /*********************************************************************
* Code for MotionPaint based on -
*  #### JS Motion Visualiser ####
*  Coded by Jason Mayes. www.jasonmayes.com
*  Github: https://github.com/jasonmayes/JS-Motion-Detection/
*********************************************************************/

function MotionPaintTool(){
    
    // Creates additional canvases for use with Motion Painting
    var vidCanvas = createGraphics(canvasContainer.size().width, canvasContainer.size().height);
    var vidCanvasFinal = createGraphics(canvasContainer.size().width, canvasContainer.size().height);
    vidCanvas.canvas.id = "vidCanvas";
    vidCanvas.parent("content");
    vidCanvasFinal.canvas.id = "vidCanvasFinal";
    vidCanvasFinal.parent("content");
    
    
    // Sets the icon and name for the object
	this.icon = "assets/motion.png";
	this.name = "Motion Paint";
    
    var alpha = 0.5;
    var version = 0;
    
    var canvas = document.getElementById('vidCanvas');
    var canvasFinal = document.getElementById('canvas');
    var video;
    var ctx = canvas.getContext('2d');
    var ctxFinal = canvasFinal.getContext('2d');
    var localStream = null;
    var imgData = null;
    var imgDataPrev = [];
    
    var interval;
    var cameraOn = false;
    var self = this;
    

    
    
    // Cross browser support to fetch the correct getUserMedia object.
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
      || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    // Cross browser support for window.URL.
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    
    
    this.draw = function(){
    };
    
    this.success = function(stream) {
        localStream = stream;
        
        // Create a new object URL to use as the video's source.
        video.srcObject = stream;
        video.play();
    };


    this.handleError = function(error) {
        console.error(error);
    };
    
    
    this.snapshot = function() {
        if (localStream) {
            canvas.width = video.offsetWidth;
            canvas.height = video.offsetHeight;
            canvasFinal.width = video.offsetWidth;
            canvasFinal.height = video.offsetHeight;

            ctx.drawImage(video, 0, 0);

            
            // Must capture image data in new instance as it is a live reference.
            // Use alternative live referneces to prevent messed up data.
            imgDataPrev[version] = ctx.getImageData(0, 0, canvas.width, canvas.height);
            version = (version == 0) ? 1 : 0;

            imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            
            var length = imgData.data.length;
            var x = 0;
          
            while (x < length) {
                var av = (imgData.data[x] + imgData.data[x + 1] + imgData.data[x + 2]) / 3;
                var av2 = (imgDataPrev[version].data[x] + imgDataPrev[version].data[x + 1] + imgDataPrev[version].data[x + 2]) / 3;
                var blended = alpha * (255 - av) + ((1-alpha) * av2);
                imgData.data[x] = blended;
                imgData.data[x + 1] = blended;
                imgData.data[x + 2] = blended;
                imgData.data[x + 3] = 255;
                x += 4; 
            }
            
            ctxFinal.putImageData(imgData, 0, 0);
        }
      };
    
    
     this.init_ = function() {
        if (navigator.getUserMedia) { 
          navigator.getUserMedia({video:true}, this.success, this.handleError);
            
        } else { 
          console.error('Your browser does not support getUserMedia');
        }
        interval = setInterval(this.snapshot, 32);
        window.setInterval(interval);
      }


    
    // Start the webcam
    this.activateCamera = function() {
        select("#content").html(
        "<video id='camStream'></video>",true);
        video = document.getElementById('camStream');
        this.init_();
    }
    
    // stop the camera
    this.stopCamera = function(stream) {
        stream.getTracks().forEach(function(track) {
            if (track.readyState == 'live' && track.kind === 'video') {
                track.stop();
            }
        });
        video.remove();
    }
    
    // CLears the options on deselect and closes the webcam stream
    this.unselectTool = function() {
		//clear options
		select(".options").html("");
	};

	//adds a button and click handler to the options area. Toggles the camera on/off
	this.populateOptions = function() {
		select(".options").html(
			"<button id='cameraButton'>Start Camera</button>");
		// 	//click handler
		select("#cameraButton").mouseClicked(function() {
			var button = select("#" + this.elt.id);
			if (cameraOn) {
				button.html('Start Camera');
                cameraOn = false;
                
                self.stopCamera(localStream);
                window.clearInterval(interval);
			} else {
				button.html('Stop Camera');
                cameraOn = true;
                self.activateCamera();
			}
		});
	};
    
//    return {
//        init: init
//      };
    
};

