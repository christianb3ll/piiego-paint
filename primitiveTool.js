function PrimitiveTool(){
    // Sets the icon and name for the object
	this.icon = "assets/primitive.png";
	this.name = "Primitive Shapes";

    // Sets the mouse X and Y to an initial position of -1
	var startMouseX = -1;
	var startMouseY = -1;
    // As we have not begun drawing yet, drawing is set to false
	var drawing = false;
    
    // sets the default initial shape to rectangle
    var shapeSelect;
    var selectedShape = "Rectangle";

	this.draw = function(){
        
        selectedShape = shapeSelect.value();

		if(mouseIsPressed  && helpers.mousePressOnCanvas()){
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
                // Draw a shape between the startMouse position
                // and the current mouse position
                if(selectedShape == "Rectangle")
                    {
				        rect(startMouseX, startMouseY, mouseX - startMouseX,mouseY - startMouseY);
                    }
                else if(selectedShape == "Ellipse"){
                    ellipseMode(CORNERS);
                    ellipse(startMouseX, startMouseY, mouseX,mouseY);
                    ellipseMode(CENTER);
                }
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
    
    this.unselectTool = function() {
		//clear options
		select(".options").html("");
	};
    
    this.populateOptions = function() {
		shapeSelect = createSelect();
        shapeSelect.option("Rectangle");
        shapeSelect.option("Ellipse");
        
        // Add the slider to Options
        select(".options").html(
			"<div id='shapeSelect'>Type of Shape</div>");
        shapeSelect.parent("#shapeSelect");

	};


}
