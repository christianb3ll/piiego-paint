// sets up variables for global use
function GlobalOptions() {
    
    var fillCheckbox;
    var lineWeightInput;
    var opacitySlider;
    
    var self = this;
    
    // Setup the user input fields
    lineWeightInput = createSlider(1,20,1);
    fillCheckbox = createCheckbox("Fill",true);
    opacitySlider = createSlider(1,255,255);
    
    // establish default values
    this.lineWeight = lineWeightInput.value();
    this.fill = fillCheckbox.checked();
    this.opacity = opacitySlider.value();
    
    // Add the fields to the DOM
    var globalOptionsDiv = select(".globalOptions");
    
    select(".globalOptions").html(
			"<div id='lineWeightSlider'><img src='assets/line-weight.png' title='Line Weight'></div>");
    select(".globalOptions").html(
			"<div id='opacitySlider'><img src='assets/opacity.png' title='Line Weight'></div>",true);
    lineWeightInput.parent("#lineWeightSlider");
    fillCheckbox.parent(globalOptionsDiv);
    opacitySlider.parent("#opacitySlider");
    
    
    
    
    // Updates the parameters of the global options
    this.updateOptions = function() {
        // Stroke Weight
        self.lineWeight = lineWeightInput.value();
        strokeWeight(self.lineWeight);
        
        // Opacity - fill and stroke for all tools
        self.opacity = opacitySlider.value();
        
        // Updates the colours to include selected opacity
        colourP.updateColours();
        
        // Control Shape Fill
        self.fill = fillCheckbox.checked();
        if(self.fill)
            {
                fill(colourP.selectedFillColour);
            }
        else{
                noFill();
        }
    }
    
    // Create the event listeners and update the parameters
    lineWeightInput.changed(this.updateOptions);
    fillCheckbox.changed(this.updateOptions);
    opacitySlider.changed(this.updateOptions);
}