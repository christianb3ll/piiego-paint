function StampTool() {
    // Sets the icon and name for the stamp tool
    this.icon = "assets/stamp.png";
    this.name = "stamp";
    
    var stamps = [];
    
    // Set up the sliders
    var stampSizeSlider;
    var stampNumberSlider;
    var stampSpreadSlider;
    
    var stampSize;
    var stampNumber;
    var stampSpread;
    
    var stampSelect;
    var defaultColors;
    
    var self = this;
    
    this.stamp;
    
    // The draw method for the stamp tool
    this.draw = function() {
        //display the last save state of pixels
        updatePixels();
        
        // set the stamp origin to center
        var stampX = mouseX - stampSize / 2;
        var stampY = mouseY - stampSize / 2;
        
        for(var i = 0; i < stampNumber; i++)
            {
                // Draw multiple stamps based on offset array
                if(stampNumber > 1 && i < stamps.length)
                {
                    drawStamp(this.stamp, mouseX + stamps[i][0],mouseY + stamps[i][1]);
                }
                
                // Preview the stamp on screen before clicking
                drawStamp(this.stamp, mouseX,mouseY);
                
                
                // Draw the stamp to the canvas
                if(mouseIsPressed && helpers.mousePressOnCanvas()) {
                    // Save the drawn image to the canvas
                    loadPixels();
                }           
            }
    }
    
    // Draws a specified stamp at the given x,y position
    var drawStamp = function(stamp,xPos, yPos) {
        // Set the scale based on selected stamp size
        var scale = stampSize / 10;
        
        // If default colors is not selected, use selected colors
        var strokeColor = colourP.selectedStrokeColour;
        var fillColor = colourP.selectedFillColour;
        
        // Alien head stamp
        if(stamp == "Alien")
            {
                // Use default colours if option checked
                if(defaultColors.checked())
                    {
                        strokeColor = "rgb(0,225,100)";
                        fillColor = "rgb(0,255,100)";
                    }
                push();
                noStroke();
                fill(fillColor);
                ellipse(xPos,yPos,28 *scale,35 *scale);
                //eyes
                fill(255,255,255);
                ellipse(xPos-5*scale,yPos,7*scale,12*scale);
                fill(0,0,0);
                ellipse(xPos-5*scale,yPos,5*scale,5*scale);
                fill(255,255,255);
                ellipse(xPos+5*scale,yPos,7*scale,12*scale);
                fill(0,0,0);
                ellipse(xPos+5*scale,yPos,5*scale,5*scale);
                //antenna
                strokeWeight(1);
                stroke(strokeColor);
                line(xPos-8*scale,yPos-10*scale,xPos-15*scale,yPos-20*scale);
                line(xPos+8*scale,yPos-10*scale,xPos+15*scale,yPos-20*scale);
                noStroke();
                //mouth
                fill(0,0,0);
                ellipse(xPos, yPos+12*scale, 8*scale,3*scale);
                fill(fillColor);
                rect(xPos-6*scale, yPos+9*scale, 12*scale,3*scale, 0,0,14*scale,10*scale);
                pop();
            }
        // Star stamp
        if(stamp == "Star")
            {
                if(defaultColors.checked())
                    {
                        strokeColor = "rgb(0,0,0)";
                        fillColor = "rgb(255,255,0)";
                    }
                push();
                stroke(strokeColor);
                fill(fillColor);
                beginShape();
                vertex(xPos,yPos-9 * scale);
                vertex(xPos+2 * scale,yPos-3 * scale);
                vertex(xPos+8 * scale,yPos-3 * scale);
                vertex(xPos+3 * scale,yPos+1 * scale);
                vertex(xPos+6 * scale,yPos+7 * scale);
                vertex(xPos,yPos+3 * scale);
                vertex(xPos-6 * scale,yPos+7 * scale);
                vertex(xPos-3 * scale,yPos+1 * scale);
                vertex(xPos-8 * scale,yPos-3 * scale);
                vertex(xPos-2 * scale,yPos-3 * scale);
                vertex(xPos,yPos-9 * scale);
                endShape();
                pop();
            }
        // Moon Stamp
        if(stamp == "Moon")
            {
                if(defaultColors.checked())
                    {
                        strokeColor = "rgb(0,0,0)";
                        fillColor = "rgb(250,250,200)";
                    }
                push();
                stroke(strokeColor);
                fill(fillColor);
                beginShape();
                vertex(xPos -15 *scale, yPos-25*scale);
                bezierVertex(xPos+35 *scale, yPos-45 *scale, xPos+35 *scale, yPos+30 *scale, xPos - 15*scale, yPos+30 *scale);
                bezierVertex(xPos+15 *scale, yPos+25 *scale, xPos+15 *scale, yPos-15 *scale, xPos -15*scale, yPos-25*scale);
                endShape();
                pop();
            }
        // Face stamp
        if(stamp == "Face")
            {
                if(defaultColors.checked())
                    {
                        strokeColor = "rgb(0,0,0)";
                        fillColor = "rgb(255,255,0)";
                    }
                push();
                stroke(strokeColor);
                fill(fillColor);
                ellipse(xPos,yPos,25*scale);
                fill(255,255,255);
                ellipse(xPos-5*scale,yPos-5*scale, 5*scale);
                ellipse(xPos+5*scale,yPos-5*scale, 5*scale);
                fill(0,0,0);
                ellipse(xPos-5*scale,yPos-5*scale, 1*scale);
                ellipse(xPos+5*scale,yPos-5*scale, 1*scale);
                noFill();
                beginShape();
                vertex(xPos - 6*scale, yPos);
                curveVertex(xPos-4*scale, yPos +5*scale);
                curveVertex(xPos+4*scale, yPos +5*scale);
                vertex(xPos + 6*scale, yPos);
                endShape();
                pop();
            }
        // Cloud stamp
        if(stamp == "Cloud")
            {
                if(defaultColors.checked())
                    {
                        strokeColor = "rgb(200,200,200)";
                        fillColor = "rgb(255,255,255)";
                    }
                push();
                noStroke();
                fill(strokeColor);
                ellipse(xPos,yPos +1 *scale, 28 *scale,10 *scale);    
                fill(fillColor);    
                ellipse(xPos,yPos, 20 *scale,10 *scale);
                ellipse(xPos +8 *scale,yPos, 12 *scale,6 *scale);
                ellipse(xPos -8 *scale,yPos, 12 *scale,6 *scale);
                pop();
            }
        // Tree stamp
        if(stamp == "Tree")
            {
                if(defaultColors.checked())
                    {
                        strokeColor = "rgb(150,75,0)";
                        fillColor = "rgb(10,200,0)";
                    }
                push();
                noStroke();
                fill(strokeColor);
                rect(xPos,yPos,5 *scale,20 *scale);
                fill(fillColor);
                ellipse(xPos +2 *scale,yPos +2 *scale,32 *scale,16 *scale);
                ellipse(xPos +2 *scale,yPos - 9 *scale,22 *scale,16 *scale);
                triangle(xPos - 5 *scale,yPos - 13 *scale,xPos + 10 *scale,yPos - 13 *scale,xPos + 2 *scale,yPos - 25 *scale);
                pop();
            }
        // Grass Stamp
        if(stamp == "Grass")
            {
                if(defaultColors.checked())
                    {
                        strokeColor = "rgb(60,176,17)";
                        fillColor = "rgb(46,148,71)";
                    }
                push();
                stroke(strokeColor);
                fill(fillColor);
                beginShape();
                vertex(xPos -20 *scale, yPos-30*scale);
                bezierVertex(xPos+10 *scale, yPos-20 *scale, xPos+10 *scale, yPos+20 *scale, xPos, yPos+15 *scale);
                bezierVertex(xPos, yPos+15 *scale, xPos+10 *scale, yPos, xPos - 20*scale, yPos-30 *scale);
                endShape();
                // Highlight
                fill(strokeColor);
                beginShape();
                vertex(xPos -20 *scale, yPos-30*scale);
                bezierVertex(xPos+5 *scale, yPos-20 *scale, xPos+5 *scale, yPos+20 *scale, xPos, yPos+15 *scale);
                bezierVertex(xPos, yPos+15 *scale, xPos+10 *scale, yPos, xPos - 20*scale, yPos-30 *scale);
                endShape();
                pop();
            }
        
    };
    
    // Resets the stamp offset array
    var updateStamps = function() {
        stamps = [];
            var stampXOffset;
            var stampYOffset;
            
            if(stampNumber > 1)
                {
                    for(var i = 0; i < stampNumber; i++)
                        {
                            stampXOffset = random(-10 * stampSpread,10 * stampSpread);
                            stampYOffset = random(-10 * stampSpread,10 * stampSpread);

                            stamps.push([stampXOffset, stampYOffset]);
                        }
                }
    };
    
    // Clear the options when tool is unselected
	this.unselectTool = function() {
		//clear options
		select(".options").html("");
        select(".secondaryOptions").html("");
	};
    
    // Creates the options menu for selecting the desired stamp and the size
    this.populateOptions = function() {
        
        stampSelect = createSelect();
        defaultColors = createCheckbox('Default Colours', true);
        
        stampSelect.option("Alien");
        stampSelect.option("Star");
        stampSelect.option("Moon");
        stampSelect.option("Cloud");
        stampSelect.option("Grass");
        stampSelect.option("Tree");
        stampSelect.option("Face");
        
        this.stamp = stampSelect.value();
        
        stampSelect.changed(function(){
            self.stamp = stampSelect.value();
        })
        
        // Create the sliders
        stampSizeSlider = createSlider(5, 50, 20);
        stampNumberSlider = createSlider(1, 10, 1);
        stampSpreadSlider = createSlider(0,20,0);
        
        // Assign stamp values based on sliders
        stampSize = stampSizeSlider.value();
        stampNumber = stampNumberSlider.value();
        stampSpread = stampSpreadSlider.value();
        
        // Add event listeners. 
        stampNumberSlider.changed(function(){
            stampNumber = stampNumberSlider.value();
            updateStamps();
        });
        
        stampSpreadSlider.changed(function() {
            stampSpread = stampSpreadSlider.value();
            updateStamps();
        });
        
        stampSizeSlider.changed(function() {
            stampSize = stampSizeSlider.value();
            updateStamps();
        })
        
        // Add the dropdown to options
        select(".options").html(
			"<div id='stampSelect'>Select Stamp</div>");
        stampSelect.parent("#stampSelect");
        defaultColors.parent("#stampSelect",true);
        
        
        // Add the sliders to Secondary Options
        select(".secondaryOptions").html(
			"<div id='sizeSlider'>Size of Stamp</div>");
        select(".secondaryOptions").html(
			"<div id='numberSlider'>Number of Stamps</div>",true);
        select(".secondaryOptions").html(
			"<div id='spreadSlider'>Stamp Spread</div>",true);
        stampSizeSlider.parent("#sizeSlider");
        stampNumberSlider.parent("#numberSlider");
        stampSpreadSlider.parent("#spreadSlider");
        
    }
}