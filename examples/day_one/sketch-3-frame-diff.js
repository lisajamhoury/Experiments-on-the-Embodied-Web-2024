let myVid;
let pastPixels = [];
let threshold = 75;

let tSlider; 

function setup() {
  createCanvas(640, 480);
  myVid = createCapture(VIDEO, {flipped:true});
  myVid.hide();

  tSlider = createSlider(0,255, 75);
}

function draw() {

  threshold = tSlider.value();
 
  myVid.loadPixels();

  let myPixels = myVid.pixels;

  for (let y = 0; y < height; y++) { 
    for ( let x = 0; x < width; x++) { 

      let index = ( y * width + x) * 4;

      const diffR = abs(pastPixels[index+0] - myPixels[index+0]);
      const diffG = abs(pastPixels[index+1] - myPixels[index+1]);
      const diffB = abs(pastPixels[index+2] - myPixels[index+2]);
    
      const avgDiff = (diffR + diffG + diffB) / 3;

      pastPixels[index+0] = myPixels[index+0];
      pastPixels[index+1] = myPixels[index+1];
      pastPixels[index+2] = myPixels[index+2];
      pastPixels[index+3] = myPixels[index+3];

      if ( avgDiff < threshold) { 
        myPixels[index+0] = 0;
        myPixels[index+1] = 0;
        myPixels[index+2] = 0;
        myPixels[index+3] = 10;
      } else {
        myPixels[index+0] = 255;
        myPixels[index+1] = 255;
        myPixels[index+2] = 0;


       }

    }
  }

  myVid.updatePixels();

  image(myVid, 0,0, width, height);  

}
