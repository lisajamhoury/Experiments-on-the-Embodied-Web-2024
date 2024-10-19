let myVid;
let bodyPose;
let poses = [];

let pointsCreated = false; 

const numFrames = 150;
const numKeyPoints = 17;
let pastPoses = [];

function preload() {
  bodyPose = ml5.bodyPose({flipped:true, enableSmoothing:true});
}

function setup() {
  createCanvas(640, 480);
  myVid = createCapture(VIDEO, {flipped: true});
  myVid.hide();

  bodyPose.detectStart(myVid, gotPoses);

    for (i = 0; i < numKeyPoints; i++ ) { 
    pastPoses.push([]);
  }
}

function draw() {
  background( 0,255,0,1);
  // image(myVid, 0,0, width, height);
  
  if (poses.length < 1) return; 

  let keypoints = poses[0].keypoints;

  smoothPoints(keypoints);  
  drawKeypoints(keypoints);  



}

function drawKeypoints(keypoints) {
  for (let i = 0; i < keypoints.length; i++) { 
      const keypoint = keypoints[i];

      if (keypoint.confidence > .0) { 
          fill('magenta');
          stroke('yellow')
          ellipse(keypoint.x, keypoint.y, 50,50);
      }    
  }

}

function smoothPoints(keypoints) { 
  for (let i = 0; i < keypoints.length; i++) { 
      const smPoint = smoothPoint(keypoints[i], i); 
      keypoints[i].x = smPoint.x;
      keypoints[i].y = smPoint.y;
  }

  return keypoints;
}

function smoothPoint(point, index) {
  const newPoint = {x:point.x, y:point.y}; 
  
  if (pastPoses[index].length < numFrames) { 
      for ( i=0; i < numFrames; i++){ 
          pastPoses[index].push(newPoint);
      } 
  } else { 
      pastPoses[index].shift();
      pastPoses[index].push(newPoint);
  }
  
  let avgPoint = {x:0, y:0};
  // now average points together
  for ( i=0; i < pastPoses[index].length; i++){ 

   avgPoint.x+=pastPoses[index][i].x;
   avgPoint.y+=pastPoses[index][i].y;
   
  } 

  avgPoint.x = avgPoint.x/pastPoses[index].length;
  avgPoint.y = avgPoint.y/pastPoses[index].length; 

  return avgPoint;


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
