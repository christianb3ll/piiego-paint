//Displays and handles the colour picker.
function ColourPicker() {

	// Create the colour pickers and make the start stroke colour be black
    // start fill colour is red
    var strokePicker = createColorPicker("#000000");
    var fillPicker = createColorPicker("#FF0000");
    
    this.selectedStrokeColour = strokePicker.color();
    this.selectedFillColour = fillPicker.color();
    var self = this;
    
    
    // Updates the selected colours and alpha values and
    // asigns them to fill and stroke
    this.updateColours = function() {
        self.selectedStrokeColour = strokePicker.color();
        self.selectedFillColour = fillPicker.color();
        
        self.selectedStrokeColour.setAlpha(globalOpts.opacity);
        self.selectedFillColour.setAlpha(globalOpts.opacity);
        
        fill(self.selectedFillColour);
        stroke(self.selectedStrokeColour);
    }
    
    // Set up the colour pickers
    this.loadColours = function() {
		fill(fillPicker.color());
        stroke(strokePicker.color());
        

        select(".colourPalette").child(strokePicker);
        select(".colourPalette").child(fillPicker);
        
        strokePicker.changed(self.updateColours);
        fillPicker.changed(self.updateColours);
        
	};
	//call the loadColours function now it is declared
	this.loadColours();
}