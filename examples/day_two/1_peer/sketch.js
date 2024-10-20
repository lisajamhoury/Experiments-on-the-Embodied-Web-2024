let p5lm;
let bodyPose;
let myPose = [];
let friendPose = [];

let myVideo;

function preload() {
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(640, 480);
  myVideo = createCapture(VIDEO);
  myVideo.size(640,480);
  myVideo.hide();

  bodyPose.detectStart(myVideo, gotPoses);

  p5lm = new p5LiveMedia(this, "DATA", null, "lisa-all-alone");
  p5lm.on('data', gotData);

}

function draw() {
  background(220);

  if (myPose.length < 1) {
    console.log('waiting for pose');
    return;
  }

  for (let i =0; i < myPose.length; i++) { 
    let keypoint = myPose[i];
    fill(255,0,0);
    ellipse(keypoint.x, keypoint.y,50,50);
  }


  if (friendPose.length < 1) {
    console.log('waiting for pose');
    return;
  }

  for (let i =0; i < friendPose.length; i++) { 
    let keypoint = friendPose[i];
    fill(0,255,0);
    ellipse(keypoint.x, keypoint.y,30,30);
  }
}

function gotPoses(results) { 
  if (results.length < 1) { 
    console.log('waiting for keypoints');
    return;
  }
  myPose = results[0].keypoints;
  
  p5lm.send(JSON.stringify(myPose));
}

function gotData(data, id) { 
  friendPose = JSON.parse(data);
}
