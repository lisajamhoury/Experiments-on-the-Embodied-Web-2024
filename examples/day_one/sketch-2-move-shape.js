let myVid;
let bufferLength;
let bufferCounter = 0;

function setup() {
  createCanvas(640, 480);
  myVid = createCapture(VIDEO, {flipped:true});
  myVid.hide();

  bufferLength = width * height;
}

function draw() {

  myVid.loadPixels();

  let myPixels = myVid.pixels;

  for (let y = 0; y < height; y++) { 
    for ( let x = 0; x < width; x++) { 

      let index = ( y * width + x) * 4;

      // myPixels[index+0] = 0;
      // myPixels[index+1] = 255;
      // myPixels[index+2] = 0;
      myPixels[index+3] = 75;

    }
  }

  myVid.updatePixels();

  image(myVid, 0,0, width, height);

  push();
  translate(width,0);
  scale(-1,1);
  image(myVid,0,0,width,height);
  pop();

  if (bufferCounter < bufferLength ) { 
    bufferCounter++;
  } else { 
    bufferCounter = 0;
  }



  let yVal = floor(bufferCounter/4/width);
  let xVal = (bufferCounter/4) - (yVal*width);

  fill('green');
  ellipse (xVal, yVal, 40,40);

  

}
