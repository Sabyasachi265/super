img = "";
wristX = 0;
wristY = 0;
pingX = 325;
pongY = 300;
rightWrist = 0;

function preload(){
ball_touch = loadSound("ball_touch_paddel.wav");
missed = loadSound("missed.wav");
}

function setup() {
	canvas = createCanvas(1240,336);
	canvas.parent('canvas');
	instializeInSetup(pingpong);
    video = createCapture(VIDEO);
  	video.size(600,400);

  poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);

}

function draw() {
  if(game_status == "start"){}
  background(220);
  if(rightWrist > 0.2)
  { 
    fill('#f6546a')
    stroke('#668f25')
    circle(wristX, wristY, 2)
  }
  game_status = "";
}

function modelLoaded() {
	console.log('Model Loaded!');
  }

  function gotPoses(results)
  {
	if(results.length > 0)
	{
	  wristX = results[0].pose.wrist.x;
	  wristY = results[0].pose.wrist.y;
	  console.log("wristX = " + wristX +", wristY = " + wristY);
	}
  }

function startGame(){
  game_status = "start";
  document.getElementById("status").innerHTML = "Game is Loaded";
}

function move(){
  if(ball.y>=paddle1Y && ball.y <= paddle1Y+paddle1Height){
    ball_touch.play();
  }
  else{
    missed.play();
  }
}

function restart(){
  pcscore = 0;
  playerscore = 0;
  loop();
}