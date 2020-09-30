function HelperFunctions() {

	//p5.dom click click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function() {
		//Set the background to white
        background('white');

		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		loadPixels();
        
        // Clear in progress shapes in draw shape mode
        if(toolbox.selectedTool.name == "DrawShape")
            {
            for (var i = 0; i < toolbox.tools.length; i++) {
                if (toolbox.tools[i].name == "DrawShape")
                {
                    var drawShapeTool = toolbox.tools[i];
                    drawShapeTool.clearEditShape();
                }
            }
        }
	});

	//event handler for the save image button. saves the canvas to the
	//local file system.
	select("#saveImageButton").mouseClicked(function() {
		saveCanvas("myPicture", "jpg");
	});
    
    
    // Check mouse press is on Canvas.
    this.mousePressOnCanvas = function() {
        if(mouseX > 0 &&
          mouseX < (canvasContainer.elt.offsetLeft + canvasContainer.width) &&
          mouseY > 0 &&
          mouseY < canvasContainer.height)
            {
                return true;
            }
        return false;
    };
}