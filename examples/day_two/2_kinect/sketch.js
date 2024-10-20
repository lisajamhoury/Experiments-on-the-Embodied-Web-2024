const DEPTHWIDTH = 320;
const DEPTHHEIGHT = 288;
const NUMPARTICLES = DEPTHWIDTH * DEPTHHEIGHT;

let points = [];
let depthBuffer = [];

function preload() {
  createPointCloud();

}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  let kinectron = new Kinectron("10.18.181.149");
  kinectron.setKinectType('azure');
  kinectron.makeConnection();
  kinectron.startDepthKey(gotDepth);
}

function gotDepth (depthData) { 
  depthBuffer = depthData; 
}




function draw() {
  background('green');
  orbitControl();

  if (depthBuffer.length < 1) { 
    console.log('waiting for depth');
    return;
  }

  const MINVAL = 100;
  const MAXVAL = 1000; 

  for (let y =0; y < DEPTHHEIGHT; y+=5) { 
    for (let x = 0; x < DEPTHWIDTH; x+=5) { 

      let i = (y*DEPTHWIDTH+x);

      let depthValue = depthBuffer[i]; // 0 - 3128

      if (depthValue < MINVAL || depthValue > MAXVAL) { 
        depthValue = Number.MAX_VALUE;
      } else { 
        depthValue = map(depthValue,0,3000,0,1000);
      }

      let newR = (i/NUMPARTICLES) * 255;

      stroke(newR,255-newR,255-newR);
      point(points[i].x, points[i].y, depthValue);


    }
  }
}

function createPointCloud() {

  for (let y =0; y < DEPTHHEIGHT; y++) { 
    for (let x = 0; x < DEPTHWIDTH; x++) { 

      let newX = x - DEPTHWIDTH/2;
      let newY = y - DEPTHHEIGHT/2;

      let newVertex = {x: newX, y: newY, z:0};
      points.push(newVertex);

    }
  }
}
