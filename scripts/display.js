const Display = function(c) {
  this.buffer = document.createElement("canvas").getContext("2d");
  this.context = c.getContext("2d");


  this.Rect = function(x,y,w,h,c) {
    this.buffer.fillStyle = c;
    this.buffer.fillRect(x, y, w, h);
  };

  this.renderColor = function(color) {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(0,0,this.buffer.canvas.width,this.buffer.canvas.height);
  };

  this.render = function() { this.context.drawImage(this.buffer.canvas, 0, 0, 
    this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, 
    this.context.canvas.width, this.context.canvas.height);};

    this.resize = function(width, height, height_width_ratio) {

      if (height / width > height_width_ratio) {
  
        this.context.canvas.height = width * height_width_ratio;
        this.context.canvas.width = width;
  
      } else {
  
        this.context.canvas.height = height;
        this.context.canvas.width = height / height_width_ratio;
  
      }
  
      this.context.imageSmoothingEnabled = false;
    };

};

Display.prototype = {
  constructor : Display
}