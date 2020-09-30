function CloneTool(){
	//set an icon and a name for the object
	this.icon = "assets/clone.png";
	this.name = "clone";
    
    var setTarget = 0;
    var isDrawing = false;
    var target = [];
    
    // Sets the mouse X and Y to an initial position of -1
	var startMouseX = -1;
	var startMouseY = -1;

	var offsetX = 0;
    var offsetY = 0;


	this.draw = function(){
        
        updatePixels();
        // Create a crosshair at the cursor location that follow the mouse until
        // clone source set. Hide when drawing
        if(!isDrawing)
            {
                push();
                strokeWeight(1);
                stroke(50,50,255);
                // horizontal
                line(target[0] -20, target[1], target[0] -5, target[1]);
                line(target[0] + 5, target[1], target[0] +20, target[1]);
                // vertical
                line(target[0], target[1] -5,target[0], target[1] -20);
                line(target[0], target[1] + 5,target[0], target[1] + 20);
                pop();
            }
        
        // Have the crosshair follow the mouse until set
        if(setTarget == 0)
            {
                target = [mouseX,mouseY];
            }
        
		//if the mouse is pressed, set the target point
		if(mouseIsPressed && setTarget == 0 && helpers.mousePressOnCanvas()) {
                setTarget = 1;
			}
        
        // If target set and mouse is pressed
        if(setTarget == 1 && helpers.mousePressOnCanvas())
            {
                if(mouseIsPressed)
                    {
                        // If we are not already drawing, save the starting mouse x and y position
                        if(!isDrawing)
                            {
                                startMouseX = mouseX;
                                startMouseY = mouseY;
                                isDrawing = true;
                            }
                        updatePixels();
                        
                        offsetX = mouseX - startMouseX;
                        offsetY = mouseY - startMouseY;
                        
                        circleGet();
                        loadPixels();
                    }
                else {
                        isDrawing = false;
                        startMouseX = -1;
                        startMouseY = -1;
                    }
            }
    };

    // Gets all the pixels within a radius of the source based on line weight
    // then applys them to the relative area of the taret
    // code for calculating points within a circle based on the example here:
    // https://stackoverflow.com/questions/41136175/iterating-over-all-i-j-elements-in-a-circle
    var circleGet = function() {
        var radius = 5 * globalOpts.lineWeight;
        
        for(var i = -radius; i < radius; i++)
            {
                var dx = sqrt(radius * radius - i *i);
                
                for(var j = -dx; j < dx; j++)
                    {
                        var pixelColor = get(target[0] +offsetX + i, target[1] +offsetY + j);
                        set(mouseX + i,mouseY + j,pixelColor);
                        
                        
                    }
            }
        updatePixels();
    };
    
    this.unselectTool = function() {
		// Update the pixels to remoe the crosshair
        updatePixels();
        //clear options
		select(".options").html("");
        // Reset the status
        setTarget = 0;
        target = [];
        isDrawing = false;
	};

	//adds a button and click handler to the options area. 
	this.populateOptions = function() {
		select(".options").html(
			"<button id='cloneSource'>Set Clone Source</button>");
		// 	//click handler
		select("#cloneSource").mouseClicked(function() {
            // Reset the clone source
            setTarget = 0;
            target = [];
            isDrawing = false;
		});
	};
}