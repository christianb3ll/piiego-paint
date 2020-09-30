//spray can constructor function
function SprayCanTool() {
    // Sets the name and icon for the spray can tool
    this.name = "sprayCanTool";
    this.icon = "assets/sprayCan.png";
    
    // sets the number of points and the spread of the spray can
    this.points = 13;
    this.spread = 10;
    
    var self = this;
    
    this.draw = function(){
        // Update the spread based on selected strokeweight
        this.spread = 10 * globalOpts.lineWeight;
        
        //if the mouse is pressed paint on the canvas
        //spread describes how far to spread the paint from the mouse pointer
        //points holds how many pixels of paint for each mouse press.
        if(mouseIsPressed && helpers.mousePressOnCanvas()){
            for(var i = 0; i < this.points; i++){
                spraySpread();
            }
        }
    };
    
    // Creates a point at a random point in a circle
    // based on selected lineweight.
    // code adapted from: https://stackoverflow.com/questions/43195899/how-to-generate-random-coordinates-within-a-circle-with-specified-radius
    var spraySpread = function()
    {
        var r = self.spread * (random()**0.5);
        var theta = random() * 2 * PI;
        point(mouseX + r * cos(theta), mouseY +r * sin(theta));
        
    };
};