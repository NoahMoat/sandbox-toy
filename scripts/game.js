function Game() {
  this.cells = [];
  this.cellsLookup = [];
  this.width=128;
  this.height=128;
  this.unit=704/this.width;
  this.gravity = 5;
  this.friction = 0.3;
  this.FlowRate = 4;
  this.SmokeFlowRate=2;
  

  id=0;

  this.random = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  
  this.AddCell = function(c) {
    if (c.type==3) {
      c.lifetime = 17+this.random(40);
    }
    if (c.x >=0 && c.x <this.width && c.y >=0 && c.y < this.height) {
      this.cells[c.x][c.y] = c;
    }
  }

  for(i=0;i<this.width;i++) {
    this.cells[i] = [];
    for(j=0;j<this.height;j++) {
      this.cells[i][j] = [];
      if(false) {
      if (i%2 == 1 && j%2==0 || i%2==0 && j%2==1) {
      this.cells[i][j] = new cell(id,i,j,0,0,'#C1C91A');
      }
    }
    }
  }
  console.log(this.cells);

  this.cells[14][14] = new cell(id,15,15,0,0,'#C1C91A');


  this.getUnit = function(obj,x_off,y_off) {
    x = obj.x+x_off;
    y = obj.y+y_off;
    temp = undefined;
    if (y >= 0 && y < this.height && x >= 0 && x < this.width) {
    temp = this.cells[x][y];
    return temp;
    }
    return temp;
  }

  this.moveUnit = function(obj,x,y) {
    let _x = obj.x;
    let _y = obj.y;
    obj.x+=x;
    obj.y+=y;
    this.cells[_x+x][_y+y] = obj;
    this.cells[_x][_y] = [];
    obj.updated = true;
    this.updateVel(obj);
  }

  this.moveUnitVel = function(obj,x,y,FL) {
    starter=0;
    FRICMIN = 0;
    if (FL != null) {
      FRICMIN = FL;
    }
    if (Math.floor(obj.vel) == 0) {
      starter=1;  
    }
    for(c=0;c<obj.vel+starter;c++) {
      if (this.getUnit(obj,x,y) instanceof cell) {
        obj.vel*=this.friction;
        c=this.gravity+10;
        break;
      } else if (obj.y < this.height-1 && obj.y > 0 && obj.x < this.width-1 && obj.x > 0) {

        if (obj.vel < FRICMIN) {
          obj.vel = FRICMIN;
        }

        let _x = obj.x;
        let _y = obj.y;
        obj.x+=x;
        obj.y+=y;
        this.cells[_x+x][_y+y] = obj;
        this.cells[_x][_y] = [];
        obj.updated = true;
        if (obj.y > _y) {
          this.updateVel(obj);
        }
      }
      starter = 0;
    }
  }

  this.swapUnit = function(obj, obj2) {
    tx=obj.x;
    ty=obj.y;
    
    obj.x=obj2.x;
    obj.y=obj2.y;
    obj2.x=tx;
    obj2.y=ty;

    this.cells[obj2.x][obj2.y] = obj2;
    this.cells[obj.x][obj.y] = obj;
  };

  this.ruleset = function(obj) {
    switch(obj.type) {
      case 0:
        if(obj.y<this.height-1) {
          below = this.getUnit(obj,0,1);
          if (below instanceof cell) {
            b_left = this.getUnit(obj,-1,1);
            b_right = this.getUnit(obj,1,1);
            if (below.type == 1) {
              this.swapUnit(obj,below);
              break;
            } else if (obj.x>0&&b_left.type==1) {
              this.swapUnit(obj,b_left);
              break;
            } else if (obj.x<this.width-1 && b_right.type==1) {
              this.swapUnit(obj,b_right);
              break;
            } 
           
            if (obj.x > 0 && !(b_left instanceof cell)) {
              this.moveUnitVel(obj,-1,1);
            } else if (obj.x < this.width-1 && !(b_right instanceof cell)) {
              this.moveUnitVel(obj,1,1);
            }
          } else {
            this.moveUnitVel(obj,0,1);
          }
        }
      break;

      case 1:
          bel = this.getUnit(obj,0,1);
          if(obj.y < this.height-1) {
          if(bel instanceof cell) {
              b_left = this.getUnit(obj,-1,1);
              b_l = this.getUnit(obj,-1,0);
              b_right = this.getUnit(obj,1,1);
              b_r = this.getUnit(obj,1,0);
              if(obj.x > 0 && !(b_left instanceof cell)){
                this.moveUnit(obj,-1,1,this.FlowRate);
              } 
              else if(obj.x < this.width-1 && !(b_right instanceof cell)){
                this.moveUnit(obj,1,1,this.FlowRate);
              }
              else if (!(b_l instanceof cell) &&obj.x>0) {
                this.moveUnitVel(obj,-1,0,this.FlowRate);
              }
              else if (!(b_r instanceof cell) &&obj.x<this.width-1) {
                this.moveUnitVel(obj,1,0,this.FlowRate);
              }
          } else {
            this.moveUnitVel(obj,0,1);
          }
        }
      break;

      case 2:

      break;
      case 3:
        obj.lifetime--;
        bel = this.getUnit(obj,0,-1);
          if(obj.y > 0) {
          if(bel instanceof cell) {
              b_left = this.getUnit(obj,-1,-1);
              b_l = this.getUnit(obj,-1,0);
              b_right = this.getUnit(obj,1,-1);
              b_r = this.getUnit(obj,1,0);
              if(obj.x > 0 && !(b_left instanceof cell)){
                this.moveUnit(obj,-1,-1,this.SmokeFlowRate);
              } 
              else if(obj.x < this.width-1 && !(b_right instanceof cell)){
                this.moveUnit(obj,1,-1,this.SmokeFlowRate);
              }
              else if (!(b_l instanceof cell) &&obj.x>0) {
                this.moveUnitVel(obj,-1,0,this.SmokeFlowRate);
              }
              else if (!(b_r instanceof cell) &&obj.x<this.width-1) {
                this.moveUnitVel(obj,1,0,this.SmokeFlowRate);
              }
          } else {
            this.moveUnitVel(obj,0,-1,this.SmokeFlowRate);
          }
        }
        if (obj.lifetime <= 0) {
          this.removeBlockAt(obj.x,obj.y);
        }
    }
  }

  this.map = function(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  this.getColor = function(type) {
    var result = '#FFFFFF';
    switch(type){
      case 0:
        result = '#C1C91A';
        break;
      case 1:
        result = '#349beb';
        break;
      case 2:
        result = '#705b3d'; 
        break;
      case 3:
        result = 'rgba(205, 192, 192, 0.91)';
        break;
    }
    return result;
  };

this.removeBlocksAt = function(x,y,s) {
    _x=x-Math.floor(s/2)+this.random(s+1);
    _y=y-Math.floor(s/2)+this.random(s+1);
    for(i=0;i<s;i++) {
      if (_x>=0&&_x<this.width&&_y>=0&&_y<this.height) {
        this.cells[_x][_y] = [];
      }
      _x=x-Math.floor(s/2)+this.random(s+1);
      _y=y-Math.floor(s/2)+this.random(s+1);
    }
}
  this.removeBlockAt = function(x,y) {
    this.cells[x][y] = [];
  }

  this.createBlocksAt = function(x,y,t,s) {
    x=x-Math.floor(s/2);
    y=y-Math.floor(s/2);
    for(i=0;i<s;i++) {
      this.AddCell(new cell(id,x+this.random(s+1),y+this.random(s+1),t,0,this.getColor(t)));
      id++;
    }
  }

  this.createBlockAt = function(x,y,t) {
    this.AddCell(new cell(id,x,y,t,0,this.getColor(t)));
    id++;
  }

  this.update = function() {
    id++;
    if (id < 600) {
      this.AddCell(new cell(id,32+this.random(4),15+this.random(4),0,0,'#C1C91A'));
    id++;
    this.AddCell(new cell(id,15+this.random(4),30+this.random(4),1,0,'#349beb'));
    }
    for(i=0;i<this.width;i++) {
      for (j=0;j<this.height;j++) {
        if(this.cells[i][j].length!=0) {
          this.cells[i][j].updated = false;
        }
      }
    }

    this.updateVel = function(obj) {
      let below = this.getUnit(obj,0,1);
      if (!(below instanceof cell)) {
        if (obj.vel < this.gravity) {
          if (obj.vel == 0) {
            obj.vel+=0.1;
          }
          obj.vel+=0.5
        }
        if (obj.vel > this.gravity) obj.vel = this.gravity;
      }
    }

    for(i=0;i<this.width;i++) {
      for (j=this.height-1;j>0;j--) {
        if (this.cells[i][j].length != 0 && !this.cells[i][j].updated) {
          this.ruleset(this.cells[i][j]);
        }
      }
    }
    
  };
};

Game.prototype = {
  constructor : Game
};