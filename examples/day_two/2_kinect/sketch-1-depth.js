// let depthImage;

function setup() {
    createCanvas(640, 576);
  
    let kinectron = new Kinectron("10.18.181.149");
    kinectron.setKinectType('azure');
    kinectron.makeConnection();
    kinectron.startDepth(gotDepth);
  }
  
  function gotDepth(depthData) { 
    loadImage(depthData.src, drawDepthImage);
  }
  
  function drawDepthImage(depthImage) { 
    image(depthImage, 0,0, width, height);
  
    depthImage.loadPixels(); 
  
    loadPixels();
  
    for (y = 0; y < height; y++) { 
      for (x = 0; x < width; x++) { 
  
        let i = (y*width+x)*4;
  
        let depthValue = depthImage.pixels[i];
  
        let hueValue = map(depthValue, 0,255,0,.75)
  
        let newColor = HSVtoRGB(hueValue, 1, 1);
  
        pixels[i+0] = newColor.r;
        pixels[i+1] = newColor.g;
        pixels[i+2] = newColor.b;
        pixels[i+3] = 255;
      }
    }
  
    updatePixels();
  
  
  
  }
  
  function draw() {
    
  }
  
  
  
  // https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately/54024653
  /* accepts parameters
   * h  Object = {h:x, s:y, v:z}
   * OR 
   * h, s, v
  */
  function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
  }
  