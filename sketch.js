var ground,lander
var landerImg
var bgImg
var vx=0
var g=0.05
var vy=0
var thrust,crash,land;
var left_thruster,right_thruster;
var base,baseImg;
var obstacle,obstacleImg;
var fuel =100

function preload() {
  landerImg=loadImage("normal.png")
  bgImg=loadImage("bg.png")
  thrust= loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png")
  crash=loadAnimation("crash1.png","crash2.png","crash3.png")
  land=loadAnimation("landing1.png","landing2.png","landing_3.png")
  left_thruster=loadAnimation("left_thruster_1.png","left_thruster_2.png")
  right_thruster=loadAnimation("right_thruster_1.png","right_thruster_2.png")
  baseImg=loadImage("lz.png")
  obstacleImg=loadImage("obstacle.png")

  thrust.playing=true
  thrust.looping=false
  right_thruster.looping=false
  left_thruster.looping=false
}

function setup() {
    createCanvas(1200,750)
    frameRate(80)
    timer=1500
    thrust.frameDelay=5
    right_thruster.frameDelay=5
    left_thruster.frameDelay=5

    lander=createSprite(600,90,30,30)
    lander.addImage("lander",landerImg)
    lander.scale=0.1
    
    lander.addAnimation("thrusting",thrust)
    lander.addAnimation("crashing",crash)
    lander.addAnimation("landing",land)
    lander.addAnimation("right",right_thruster)
    lander.addAnimation("left",left_thruster)

    obstacle=createSprite(350,430,50,45)
    obstacle.addImage("obstacle",obstacleImg)

    base=createSprite(1000,560,40,20)
    base.addImage("base",baseImg)
    base.scale=0.6
    
    ground=createSprite(600,740,1200,20)
    
    rectMode(CENTER)
    textSize(15)
  
}

function draw() {
  background("blue")
  image(bgImg,0,0,1200,750)

  push()
  fill(255)
  text("Vertical Velocity : "+round(vy),1000,50)
  text("Horizontal Velocity : "+round(vx),1000,70)
  text("Fuel : " + fuel,1000,90)

  pop()

  vy=vy+g
  lander.position.y=lander.position.y+vy
  lander.position.x=lander.position.x+vx
  
  drawSprites()
}

function keyPressed() {
  if (keyCode===UP_ARROW){
    upward_thrust()
    lander.changeAnimation("thrusting")
    thrust.nextFrame()
  }

  if (keyCode===RIGHT_ARROW && fuel>0){
    lander.changeAnimation("left")
    right_thrust()

  }

  if (keyCode===LEFT_ARROW && fuel>0){
    lander.changeAnimation("right")
    left_thrust()
  }
}

function upward_thrust() {
  vy=-1
}

function right_thrust() {
  vx=vx+0.2
  fuel=fuel-1
  
}

function left_thrust() {
  vx=vx-0.2
  fuel=fuel-1
}