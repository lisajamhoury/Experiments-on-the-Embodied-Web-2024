// Copyright (c) 2019 Kinectron
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
Kinectron Example
Kinect Azure feed test using p5.js
=== */
//

// declare variable for kinectron
let kinectron = null;

// ip address is a string containing four numbers
// each number is between 0 and 255 and separated with periods
// since it is a string, it goes between double quotes
// we put as example here "1.2.3.4"
// replace it with the kinectron server ip address
// remember to keep the double quotes
const kinectronServerIPAddress = '10.18.181.149';

// declare new HTML elements for displaying text
let textKinectronServerIP;
let textCurrentFeed;
let textFramerate;

let busy = false;

const AZURECOLORWIDTH = 1280 / 2;
const AZURECOLORHEIGHT = 720 / 2;

const AZUREDEPTHWIDTH = 640;
const AZUREDEPTHHEIGHT = 576;

const AZURERAWWIDTH = 640 / 2;
const AZURERAWHEIGHT = 576 / 2;

// variable for storing current
let currentFeed = 'none';

// setup() is a p5.js function
// setup() runs once, at the beginning
function setup() {
  // create canvas the size of depth image
  createCanvas(640, 576);
  pixelDensity(1);
  // white background
  background(255);

  // create new HTML <p> elements for displaying text
  textKinectronServerIP = createP('');
  textCurrentFeed = createP('');
  textFramerate = createP('');

  // create an instance of kinectron
  kinectron = new Kinectron(kinectronServerIPAddress);

  // Set kinect type to azure
  kinectron.setKinectType('azure');

  // Connect with application over peer
  kinectron.makeConnection();

  // define callbacks for all feeds
  kinectron.setColorCallback(drawImage);
  kinectron.setDepthCallback(drawImage);
  kinectron.setRawDepthCallback(drawRawDepth);
  kinectron.setTrackedBodiesCallback(drawBody);
  kinectron.setBodiesCallback(getBodies);
  kinectron.setKeyCallback(drawImage);
  kinectron.setDepthKeyCallback(drawRawDepth);
  kinectron.setRGBDCallback(drawImage);

  // Feeds not implemented for azure
  // kinectron.setInfraredCallback(drawImage);
  // kinectron.setLeInfraredCallback(drawImage);
}

// draw() is a p5.js function
// after setup() runs once, draw() runs on a loop
function draw() {
  // p5.js drawing settings
  // black fill() and stroke()
  fill(0);
  stroke(0);

  // update text of HTML <p> elements with current parameters
  textKinectronServerIP.html(
    'Kinectron server IP address: ' + kinectronServerIPAddress,
  );
  textCurrentFeed.html('Current feed: ' + currentFeed);
  textFramerate.html('frame rate: ' + frameRate().toFixed(0));
}

// keyPressed() is a p5.js function
// choose camera to start based on key pressed
function keyPressed() {
  switch (key) {
    case '1':
      resizeCanvas(AZURECOLORWIDTH, AZURECOLORHEIGHT);
      kinectron.startColor();
      currentFeed = 'color';
      break;

    case '2':
      resizeCanvas(AZUREDEPTHWIDTH, AZUREDEPTHHEIGHT);
      kinectron.startDepth();
      currentFeed = 'depth';
      break;

    case '3':
      resizeCanvas(AZURERAWWIDTH, AZURERAWHEIGHT);
      kinectron.startRawDepth();
      currentFeed = 'raw depth';
      break;

    case '4':
      resizeCanvas(AZUREDEPTHWIDTH, AZUREDEPTHHEIGHT);
      kinectron.startTrackedBodies();
      currentFeed = 'tracked bodies';
      break;

    case '5':
      resizeCanvas(AZUREDEPTHWIDTH, AZUREDEPTHHEIGHT);
      kinectron.startBodies();
      currentFeed = 'bodies';
      break;

    case '6':
      resizeCanvas(AZURECOLORWIDTH, AZURECOLORHEIGHT);
      kinectron.startKey();
      currentFeed = 'key';
      break;

    case '7':
      resizeCanvas(AZURERAWWIDTH, AZURERAWHEIGHT);
      kinectron.startDepthKey();
      currentFeed = 'depth key';
      break;

    // THESE FEEDS ARE NOT YET IMPLEMENTED FOR AZURE
    // case '6':
    //   kinectron.startInfrared();
    //   currentFeed = 'infrared';
    //   break;

    // case '7':
    //   kinectron.startLEInfrared();
    //   currentFeed = 'le infrared';
    //   break;

    case '9':
      kinectron.startRGBD();
      currentFeed = 'rgbd';
      break;

    case '0':
      kinectron.stopAll();
      currentFeed = 'none';
      break;
  }
}

// callback function when feed sends a new frame
function drawImage(newFrame) {
  // loadImage() is a p5.js function
  // load new frame from feed and then place it on p5.js canvas
  loadImage(newFrame.src, function (loadedFrame) {
    // white background
    background(255);
    // place the frame from kinectron at (0,0)
    image(loadedFrame, 0, 0);
  });
}

function drawRawDepth(depthBuffer) {
  if (busy === true) return;

  busy = true;

  loadPixels();
  let j = 0;
  for (let i = 0; i < pixels.length; i++) {
    let imgColor = map(depthBuffer[i], 0, 8191, 0, 255);
    pixels[j + 0] = imgColor;
    pixels[j + 1] = imgColor;
    pixels[j + 2] = imgColor;
    pixels[j + 3] = 255;
    j += 4;
  }
  updatePixels();
  busy = false;
}

function getBodies(allBodies) {
  background(0, 20);

  // kinect azure only sends tracked bodies in bodies array
  for (let i = 0; i < allBodies.bodies.length; i++) {
    let joints = allBodies.bodies[i].skeleton.joints;

    for (let j = 0; j < joints.length; j++) {
      let joint = joints[j];
      drawJoint(joint);
    }
  }
}

function drawBody(body) {
  background(0, 20);

  // Get all the joints off the tracked body and do something with them
  kinectron.getJoints(drawJoint);
}

// Draw skeleton
function drawJoint(joint) {
  fill(100);

  // Kinect location data needs to be normalized to canvas size
  ellipse(joint.depthX * width, joint.depthY * height, 15, 15);

  fill(200);

  // Kinect location data needs to be normalized to canvas size
  ellipse(joint.depthX * width, joint.depthY * height, 3, 3);
}