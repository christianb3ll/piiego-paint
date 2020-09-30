function DrawShapeTool(){
    // Sets the icon and name for the object
	this.icon = "assets/drawshape.png";
	this.name = "DrawShape";
    
    var editMode = false;
    var currentShape = [];

    // Sets the mouse X and Y to an initial position of -1
	var startMouseX = -1;
	var startMouseY = -1;
    
    // Currently selected vertex in edit mode
    var currentVertex;
    var vertexSelected = false;

    

	this.draw = function(){
        updatePixels();
        
        // Check for mouse press
        if(mouseIsPressed && helpers.mousePressOnCanvas())
            {
                // Not in Edit Mode
                if(!editMode)
                    {
                        // Check there is no vertex at the point already to avoide creating duplicate vertices
                        if(currentShape.length == 0 ||
                           dist(currentShape[currentShape.length -1].x,currentShape[currentShape.length -1].y,mouseX,mouseY) > 5)
                            {
                                currentShape.push({
                                    x: mouseX,
                                    y: mouseY
                                });
                            }
                }
                // Edit Mode
                else
                    {
                        for(var i = 0; i < currentShape.length; i++)
                            {
                                // Select the vertex to edit and set it as the selected vertex
                                if(dist(currentShape[i].x,currentShape[i].y,mouseX,mouseY) < 15 && vertexSelected == false)
                                    {
                                        currentVertex = [i];
                                        vertexSelected = true;                                
                                    }
                                
                                // Edit the position of the selected vertex
                                if(vertexSelected)
                                    {
                                        currentShape[currentVertex].x = mouseX;
                                        currentShape[currentVertex].y = mouseY;
                                    }
                            }
                }
            }

        // Deselect vertex when mouse is released
        if(!mouseIsPressed)
            {
                vertexSelected = false;
                currentVertex = 0;
            }
        
        // Draw the shape to the canvas
        beginShape();
        for(var i = 0; i < currentShape.length; i++)
            {
                vertex(currentShape[i].x, currentShape[i].y);
            }
        endShape();

        // Draw the edit points after shape has been drawn so they are
        // not hidden at higher stroke weights
		for(var i = 0; i < currentShape.length; i++)
            {
            if(editMode)
                {
                    push();
                    fill('red');
                    strokeWeight(1);
                    ellipse(currentShape[i].x,currentShape[i].y,5 );
                    pop();
                }
                
            }
	};
    
    // clears in progress shape
    this.clearEditShape = function() {
        // exit edit mode and clear any in progress shapes
        editMode = false;
        draw();
        currentShape = [];
        updatePixels();
    }
    
    // Clear the options and in progress shapes when tool is unselected
	this.unselectTool = function() {
        this.clearEditShape();
		select(".options").html("");
	};
    
    this.populateOptions = function() {
        select(".options").html(
                "<button id='editShapeBtn'>Edit Shape</button>");
        select(".options").html(
                "<button id='finishShapeBtn'>Finish Shape</button>",true);
        // 	//click handler
        select("#finishShapeBtn").mouseClicked(function() {
            if(currentShape.length > 0)
                {
                    editMode = false;
                    // Close the shape by returning to starting vertex
                    currentShape.push({
                                        x: currentShape[0].x,
                                        y: currentShape[0].y
                                    });
                    draw();
                    loadPixels();
                    currentShape = [];
                }
            });
        
        select("#editShapeBtn").mouseClicked(function() {
            if(editMode)
                {
                    editMode = false;
                }
            else
                {
                    // Check that a shape has started being drawn before entering edit mode
                    if(currentShape.length > 0)
                        {
                            editMode = true;
                        }
                }
        });
    };
};