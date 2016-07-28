function Dying(sheep){
  this.sheep = sheep;
}

Dying.prototype.update = function(){
  console.log('lollolololol');
  console.log(this.sheep);
  console.log(this.sheep.sprite);
  console.log(this.sheep.sprite.position);
  var position = new PIXI.Point(this.sheep.sprite.position.x, this.sheep.sprite.position.y);
  // var position = PIXI.Point.copy(this.sheep.sprite.position);
  this.sheep.container.removeChild(this.sheep.sprite);
  this.sheep.sprite = new PIXI.Sprite(PIXI.loader.resources[this.sheep.deadTexture].texture);
  this.sheep.container.addChild(this.sheep.sprite);
  this.sheep.sprite.anchor.x = 0.5;
  this.sheep.sprite.anchor.y = 0.5;
  this.sheep.sprite.scale = new PIXI.Point(0.7, 0.7);

  this.sheep.state = this.sheep.dead;
  this.sheep.sprite.position = position.clone();
};
Dying.prototype.toString = function(){
  return 'dying';
};

////////////////////

function Dead(sheep){
  this.sheep = sheep;
}

Dead.prototype.update = function(){

};
Dead.prototype.toString = function(){
  return 'dead';
};
////////////////////

function StartTraveling(animal){
  this.animal = animal;
}

StartTraveling.prototype.update = function(){
  if (this.animal.rally_point.x > this.animal.sprite.x && this.animal.sprite.scale.x < 0 ){
    this.animal.turn();
  }
  else if (this.animal.rally_point.x < this.animal.sprite.x && this.animal.sprite.scale.x > 0 ) {
    this.animal.turn();
  }
  this.animal.state = this.animal.traveling;
  // console.log(this.animal.state.toString());
};

StartTraveling.prototype.toString = function(){
  return 'start traveling';
};

///////////////

function Traveling(sheep){
  this.sheep = sheep;
}

Traveling.prototype.update = function(){
  if (this.sheep.rally_point) {
    var tx = this.sheep.rally_point.x - this.sheep.sprite.x;
    var ty = this.sheep.rally_point.y - this.sheep.sprite.y;
    var dist = Math.sqrt(tx * tx + ty * ty);
    var velX = (tx / dist) * this.sheep.speed;
    var velY = (ty / dist) * this.sheep.speed;
    if (dist >= 1.50001) {
      this.sheep.sprite.x += velX;
      this.sheep.sprite.y += velY;
    }
    else {
      if (this.sheep instanceof Dog){
        this.sheep.state = this.sheep.waiting;
      }
      else if (this.sheep instanceof Sheep) {
        this.sheep.state = this.sheep.eating;
      }
      // console.log(this.sheep.state.toString());
    }
  }
};
Traveling.prototype.toString = function(){
  return 'traveling';
};

////////////////////////////////////////////////

function Eating(sheep){
  this.sheep = sheep;
}

Eating.prototype.update = function(){
  var random = Math.random();
  if (random <= 0.005) {
    this.sheep.state = this.sheep.lookingForFood;
    console.log(this.sheep.state.toString());
  }
  else if (random <= 0.00509) {
    this.sheep.state = this.sheep.dying;
    console.log(this.sheep.state.toString());

  }
};
Eating.prototype.toString = function(){
  return 'eating';
};

///////////////////////////////////////////////////

function LookingForFood(sheep){
  this.maxDistance = 50;
  this.sheep = sheep;
}

LookingForFood.prototype.update = function(){
  var xMod = (Math.random() * this.maxDistance * 2) - this.maxDistance;
  var yMod = (Math.random() * this.maxDistance * 2) - this.maxDistance;
  this.sheep.rally_point.set(this.sheep.rally_point.x+= xMod, this.sheep.rally_point.y+=yMod);
  this.sheep.state = this.sheep.startTraveling;
  // console.log(this.sheep.state.toString());
};
LookingForFood.prototype.toString = function(){
  return 'looking for food';
};

/////////////////////////////////////////////////////////////

function Waiting(animal){
  this.animal = animal;
}

Waiting.prototype.update = function(){

};
Waiting.prototype.toString = function(){
  return 'waiting';
};

function Scared(sheep){
  this.sheep = sheep;
}

Scared.prototype.update = function(){

};