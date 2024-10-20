let p5lm;
let bodyPose;
let friendMouse = {x: 0, y:0};

let myVideo;

function preload() {
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(640, 480);
  myVideo = createCapture(VIDEO);
  myVideo.size(640,480);

  bodyPose.detectStart(myVideo, gotPoses);

  p5lm = new p5LiveMedia(this, "DATA", null, "lisa-all-alone");
  p5lm.on('data', gotData);

}

function draw() {
  background(220);

  fill(255,0,0);
  ellipse(mouseX, mouseY, 50,50);

  fill(0,255,0);
  ellipse(friendMouse.x, friendMouse.y, 30,30);
}

function gotPoses(results) { 
  results[0].nose

}

function gotData(data, id) { 
  let newMouse = JSON.parse(data);

  friendMouse.x = newMouse.x;
  friendMouse.y = newMouse.y;

}

function mouseMoved() {
  let dataToSend = {x:mouseX, y: mouseY};

  // p5lm.send(JSON.stringify(dataToSend));
}


