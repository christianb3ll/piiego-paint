function LineToTool(){
    // Sets the icon and name for the object
	this.icon = "assets/lineTo.png";
	this.name = "LineTo";

    // Sets the mouse X and Y to an initial position of -1
	var startMouseX = -1;
	var startMouseY = -1;
    // As we have not begun drawing yet, drawing is set to false
	var drawing = false;

	this.draw = function(){

		if(mouseIsPressed){
            // Sets the Mouse X and Y to the current mouse position 
            // when the mouse is clicked
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
                // Loads the currently drawn pixels into the Pixels attribute
				loadPixels();
			}

			else{
                // Displays the last saved state of the Pixels attribute
				updatePixels();
                // Draw a line between the startMouse position
                // and the current mpouse position
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}
        
        // If the mouse is released whilst drawing is set to true,
        // sets drawing to false and resets the start
        // mouse X and Y positions to -1
		else if(drawing){
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


}
