var TYPE = 0;
var SIZE = 10;
window.addEventListener("load", function(event) {
  var resize = function(event) {
    display.resize(704, 704, 1);
    display.render();
  };


var update = function() {
  if(controller.right.active) {
    TYPE++;
    controller.right.active = false;
  }
  if(controller.left.active) {
    TYPE--;
    controller.left.active = false;
  }
  if(controller.up.active) {
    SIZE++;
    controller.up.active = false;
  }
  if(controller.down.active) {
    SIZE--;
    controller.down.active = false;
  }

  game.update();
};

var draw = function() {
  display.renderColor("black");
  
  for(i=0;i<game.width;i++) {
    for(j=0;j<game.height;j++) {
    
    c=game.cells[j][i];
    if (c != undefined) {
    u=game.unit;
    display.Rect(c.x*u,c.y*u,u,u,c.color);
    }
    //display.Rect(i*11,11,11,11,'red');
    }
  }
  //display.Rect(20,20,100,100,'red');
  display.render();
};

var keyDownUp = function(event) {
  controller.keyDownUp(event.type, event.keyCode);
};

_mouseD = false;

function mouseMove(event) {
  if(_mouseD) {
  x = event.pageX;
  y = event.pageY;
  if (TYPE != -1) {
  game.createBlocksAt(Math.floor(x/game.unit),Math.floor(y/game.unit),TYPE,SIZE);
  } else {
    game.removeBlocksAt(Math.floor(x/game.unit),Math.floor(y/game.unit),SIZE);
  }
  }
}

function MouseUp(event) {
  _mouseD = false;
}
function MouseDown(event) {
 _mouseD = true;
};


var display = new Display(canvas = document.getElementById('CANVAS'));
var game = new Game();
var engine = new Engine(1000/20, draw, update);
var controller = new Controller();
//var controller = new Controller();


_can = document.getElementById('CANVAS');
_can.addEventListener("mousedown",MouseDown,false);
_can.addEventListener("mouseup",MouseUp,false);
_can.addEventListener("mousemove",mouseMove,false);
window.addEventListener("keydown", keyDownUp, false);
window.addEventListener("keyup",   keyDownUp, false);


  display.buffer.canvas.height=704;
  display.buffer.canvas.width=704;
  resize();
  engine.start();
});
