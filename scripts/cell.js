

class cell {
  constructor(id,x,y,type,vel,color) {
    this.id=id;
    this.x=x;
    this.y=y;
    this.type=type;
    this.vel=vel;
    this.color=color;
    this.updated=false;
    this.lifetime = undefined;
  }
}