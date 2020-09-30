function PaintFillTool(){
    // Sets the icon and name for the object
	this.icon = "assets/paint-fill.png";
	this.name = "Paint Fill";
    
    // Color variables
    var targetColor;
    var fillColor;
    
    var fillSelect;
    var fillType;
    var fillQueue;
    
    var density;
    var fillInProgress;
    var gradualFillInProgress;

    fillQueue = [];
    fillType = "Flood Fill";
    fillInProgress = false;
    gradualFillInProgress = false;
    density = pixelDensity();
    
    // Standard Flood fill
    // This function is used for all fill modes except Color Replace
    var floodFill = function(node) {
        // Set fill in progress
        fillInProgress = true;
        loadPixels();
        
        //Adds the node to the start of the fill queue
        fillQueue.unshift(node);
    
        // while there are pixels in the queue
        while(fillQueue.length > 0)
            {
                var above;
                var below;
                var x;
                var y;
                
                // Current node is the most recent added to the queue
                var currentNode = fillQueue.shift();
                
                // Set x and y positions to the current node
                x = currentNode[0];
                y = currentNode[1];

                // Move the x location to the furthest left boundary
                while(x >= 0 && colorMatch(pixelToRGB(pixelCoords(x,y)),targetColor))
                    {
                        x--;
                    }
                
                // Increment the x position
                x++;
                
                above = false;
                below = false;
                
                // Fill the pixels to the right until hitting a barrier
                while(x < width - 1 && colorMatch(pixelToRGB(pixelCoords(x,y)),targetColor))
                    {
                        colorPixel(x,y);
                        
                        // Check the pixel above - ignore if Fill Down selected
                        if(y > 0 && fillType != "Fill Down")
                            {
                                // If the pixel above matches the target
                                if(colorMatch(pixelToRGB(pixelCoords(x,y-1)),targetColor))
                                    {
                                        // Add to the queue if new starting point
                                        if(!above)
                                            {
                                                fillQueue.push([x,y-1]);
                                                above = true;
                                            }
                                    }
                                // If the pixel above doesn't match the target
                                else if(above)
                                    {
                                        above = false;
                                    }
                            }
                        
                        // Check the pixel below - ignore if Fill Up selected
                        if(y < height -1 && fillType != "Fill Up")
                            {
                                if(colorMatch(pixelToRGB(pixelCoords(x,y+1)),targetColor))
                                    {
                                        // Add to the queue if new starting point
                                        if(!below)
                                            {
                                                fillQueue.push([x,y+1]);
                                                below = true;
                                            }
                                    }
                                // If the pixel below doesn't match the target
                                else if(below)
                                    {
                                        below = false;
                                    }
                            }
                        // Increment the x position
                        x++;
                    }
                // If fill type is set to Gradual Fill, return after completing each line
                if(fillType == "Gradual Fill")
                    {
                        updatePixels();
                        return;
                    }
            }
        updatePixels();
        fillInProgress = false;
    };
    

    // Replaces all instances of the target color with the fill color
    var colorReplaceFill = function() {
        fillInProgress = true;
        loadPixels();
       
        // Create a x,y grid for all the pixels on the canvas
        for(var i = 0; i < width; i++)
            {
                for(var j =0; j < height; j++)
                    {
                        // Color the pixel if it matches the target color
                        if(colorMatch(pixelToRGB(pixelCoords(i,j)), targetColor))
                            {
                                colorPixel(i,j);
                            }
                    }
            }
        updatePixels();
        fillInProgress = false;
    };
    
    // Returns the pixel array position at the given x,y co-ordinates
    var pixelCoords = function(xPos, yPos) {
        var pixel = ((yPos * density) * width + xPos) * density * 4;
        return pixel;
    }
    
    // Returns the RGBA value of a given value position of the pixel array
    var pixelToRGB = function(pixelPosition) {
        var r = pixels[pixelPosition];	
        var g = pixels[pixelPosition+1];	
        var b = pixels[pixelPosition+2];
        var a = pixels[pixelPosition+3];
        
        return [r,g,b,a];
    }
   
    // Takes two RGBA color arguments ant returns true if they match
    var colorMatch = function(colorA,colorB) {
        // Color A
        var redA = colorA[0];	
        var greenA = colorA[1];	
        var blueA = colorA[2];
        var alphaA = colorA[3];
        
        // Color B
        var redB = colorB[0];	
        var greenB = colorB[1];	
        var blueB = colorB[2];
        var alphaB = colorB[3];
        
        if(redA == redB && greenA == greenB && blueA == blueB && alphaA == alphaB)
            {
                return true;
            }
        else {
            return false;
        }
    };
    
    // Colors the pixel at a given x,y position
    function colorPixel(xPos,yPos) {
        for(let i = 0; i < density; i++) {
          for (let j = 0; j < density; j++) {
//            index = 4 * ((yPos * density + j - 1) * width * density + (xPos * density + i))-4;
            index = 4 * ((yPos * density + j) * width * density + (xPos * density + i));
            pixels[index] = fillColor[0];
            pixels[index+1] = fillColor[1];
            pixels[index+2] = fillColor[2];
            pixels[index+3] = fillColor[3];
          }
        }
    };
    
    this.draw = function() {
        
        if(mouseIsPressed && helpers.mousePressOnCanvas() && !fillInProgress){
            var x = mouseX;
            var y = mouseY;
            
            // Assign the fill and target colors. Colors are RGBA values
            fillColor = colourP.selectedStrokeColour.levels;
            targetColor = pixelToRGB(pixelCoords(x,y));
            
            // if the fill color and target color are the same - do nothing
            if(!colorMatch(fillColor,targetColor))
            {
                if(fillType == "Color Replace")
                    {
                        colorReplaceFill();
                    }
                else {
                        floodFill([x,y]);
                    }
            }
        }
        
        // Perform Gradual Fill if gradual fill selected
        if(fillType == "Gradual Fill" && fillInProgress)
            {
                if(mouseIsPressed && fillQueue.length > 0)
                    {
                        floodFill(fillQueue.shift());   
                    }
                else {
                    fillQueue = [];
                    fillInProgress = false;
                }   
            }
    };
    
    this.unselectTool = function() {
		//clear options and tooltips
		select(".options").html("");
        select(".secondaryOptions").html("");
        fillQueue = [];
        fillInProgress = false;
	};
    
    this.populateOptions = function() {
		fillSelect = createSelect();
        fillSelect.option("Flood Fill");
        fillSelect.option("Fill Up");
        fillSelect.option("Fill Down");
        fillSelect.option("Color Replace");
        fillSelect.option("Gradual Fill");
        fillSelect.selected("Flood Fill");
        
        fillSet();
        fillSelect.changed(fillSet);
        
        // Add the slider to Options
        select(".options").html(
			"<div id='fillSelect'>Fill Type</div>");
        fillSelect.parent("#fillSelect");
	};
    
    // Sets the fill type and adds the tooltips to the DOM
    var fillSet = function() {
        fillType = fillSelect.value();
        
        // Tooltips
        if(fillType == "Flood Fill")
            {
                select(".secondaryOptions").html(
			     "<div id='toolTips'>Click to fill using selected color</div>");
            }
        else if(fillType == "Fill Up")
            {
                select(".secondaryOptions").html(
			     "<div id='toolTips'>Fills upwards from the mouse position when clicked</div>");
            }
        else if(fillType == "Fill Down")
            {
                select(".secondaryOptions").html(
			     "<div id='toolTips'>Fills downwards from the mouse position when clicked</div>");
            }
        else if(fillType == "Color Replace")
            {
                select(".secondaryOptions").html(
			     "<div id='toolTips'>Replaces target color with selected color</div>");
            }
        else if(fillType == "Gradual Fill")
            {
                select(".secondaryOptions").html(
			     "<div id='toolTips'>Gradually fills in a scanline pattern whilst the mouse button is pressed</div>");
            }
    };
    
    

}