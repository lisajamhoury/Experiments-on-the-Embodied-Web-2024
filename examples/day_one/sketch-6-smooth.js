let myVid;
let bodyPose;
let poses = [];

const numEyes = 100;
let pastEyes = [];

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
  let eye = poses[0].right_eye;

  const newEye = {x: eye.x, y:eye.y};

  if (pastEyes.length < 1) { 
    for (let i =0; i< numEyes; i++) { 
      console.log('filling the eyes');
      pastEyes.push(newEye); 
    } 
  } else {
    pastEyes.shift();
    pastEyes.push(newEye);
  }

  let eyeX = 0;
  let eyeY = 0;

  for ( let i = 0; i < numEyes; i++) { 
    eyeX += pastEyes[i].x;
    eyeY += pastEyes[i].y;
  }

  let finalX = eyeX / numEyes;
  let finalY = eyeY / numEyes;

  fill(255,0,255);
  stroke(0,255,255);
  ellipse(finalX, finalY, 50,50);

  }



  // const keypoints = poses[0].keypoints;

  // for (let i = 0; i < keypoints.length; i++) {
  
  //   const keypoint = keypoints[i]; 

  //   if (keypoint.confidence > 0.5 ) { 
  //     fill(255,0,255);
  //     stroke(0,255,255);
  //     ellipse(keypoint.x, keypoint.y, 50,50);
  //   }
    
  // } 


function gotPoses(results) {
  poses = results; 
}


