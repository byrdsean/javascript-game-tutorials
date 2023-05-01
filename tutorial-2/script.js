const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

//Set the dimensions
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 720;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let gameSpeed = 15;
const MAX_IMAGE_WIDTH = 2400; //Width of all the images
const MAX_IMAGE_HEIGHT = 720; //Height of all the images

class Layer {
  constructor(imagePath, speedModifier, width, height) {
    this.layerImage = new Image();
    this.layerImage.src = imagePath;

    this.speedModifier = speedModifier;
    this.x_position = 0;
    this.y_position = CANVAS_HEIGHT - height; //Set y position so image vertically aligns to bottom of canvas

    this.width = width;
  }

  updateXPosition() {
    this.x_position =
      this.x_position <= this.width * -1
        ? //Find the -x offset from 0 (number of pixels we need to place the image to the left of origin)
          this.x_position + this.width
        : //Move the x position to the left (adjust gamespeed for speed modifier)
          this.x_position - gameSpeed * this.speedModifier;
  }
}

const background1 = new Layer(
  "./images/layer-1.png",
  0.125,
  MAX_IMAGE_WIDTH,
  MAX_IMAGE_HEIGHT
);
const background2 = new Layer(
  "./images/layer-2.png",
  0.25,
  MAX_IMAGE_WIDTH,
  MAX_IMAGE_HEIGHT
);
const background3 = new Layer(
  "./images/layer-3.png",
  0.5,
  MAX_IMAGE_WIDTH,
  MAX_IMAGE_HEIGHT
);
const background4 = new Layer(
  "./images/layer-4.png",
  0.75,
  MAX_IMAGE_WIDTH,
  MAX_IMAGE_HEIGHT
);
const background5 = new Layer(
  "./images/layer-5.png",
  1,
  MAX_IMAGE_WIDTH,
  MAX_IMAGE_HEIGHT
);
// const ballImage = new Layer("./images/ball.jpg", 1, 360, 360);

const backgroundLayers = [
  background1,
  background2,
  background3,
  background4,
  background5,
  // ballImage,
];

// const MAX_GAME_SPEED = 200;
// const speedUpFrameCount = 10;
// let frameCount = 0;
function animate() {
  // //Increase game speed after a specific interval. Do not go past a max limit.
  // if (frameCount % speedUpFrameCount === 0 && gameSpeed < MAX_GAME_SPEED) {
  //   gameSpeed++;
  //   console.log(gameSpeed);
  // }
  // frameCount = ++frameCount % speedUpFrameCount;

  //Clear the entire canvas each time this function is called
  //Clears everthing from coords 0,0 to CANVAS_WIDTH, CANVAS_HEIGHT
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  backgroundLayers.forEach((layer) => {
    //Determine how many repeated images we need for continuous scroll
    //Need to calculate this in case the image we are displaying is less than the canvas width
    const repetitionNumber = Math.ceil(CANVAS_WIDTH / layer.width) + 1;

    //"New" way of using a for loop to display multiple images
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#using_arrow_functions_and_array.from
    //Displays multiple copies of the same image directly next to each other to continuously scroll from one to another
    Array.from({ length: repetitionNumber }).forEach((x, index) =>
      ctx.drawImage(
        layer.layerImage,
        layer.x_position + layer.width * index,
        layer.y_position
      )
    );

    layer.updateXPosition();
  });
  requestAnimationFrame(animate);
}
animate();
