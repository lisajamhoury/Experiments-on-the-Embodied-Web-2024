let p5lm;
let bodyPose;
let friendNose = {x: 0, y:0};
let myNose = {x:0, y:0};

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
  ellipse(myNose.x, myNose.y, 50,50);

  fill(0,255,0);
  ellipse(friendNose.x, friendNose.y, 30,30);
}

function gotPoses(results) { 
  myNose.x = results[0].nose.x;
  myNose.y = results[0].nose.y;

  let dataToSend = {x:myNose.x, y: myNose.y};
  p5lm.send(JSON.stringify(dataToSend));
}

function gotData(data, id) { 
  let newNose = JSON.parse(data);

  friendNose.x = newNose.x;
  friendNose.y = newNose.y;
  
}
