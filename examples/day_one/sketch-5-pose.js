let myVid;
let bodyPose;
let poses = [];

function preload() {
  bodyPose = ml5.bodyPose({flipped:true, enableSmoothing:true});
}

function setup() {
  createCanvas(640, 480);
  myVid = createCapture(VIDEO, {flipped: true});
  myVid.hide();

  bodyPose.detectStart(myVid, gotPoses);

}

function draw() {
  background( 255,255,0);
  // image(myVid, 0,0, width, height);  

  if (poses.length < 1) return; 
  // let nose = poses[0].nose;

  const keypoints = poses[0].keypoints;

  for (let i = 0; i < keypoints.length; i++) {
  
    const keypoint = keypoints[i]; 

    if (keypoint.confidence > 0.5 ) { 
      fill(255,0,255);
      stroke(0,255,255);
      ellipse(keypoint.x, keypoint.y, 50,50);
    }
    
  } 
}

function gotPoses(results) {
  poses = results; 
}


