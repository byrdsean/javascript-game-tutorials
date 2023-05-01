const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

//Set the dimensions
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 700;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let gameSpeed = 15;
const MAX_IMAGE_WIDTH = 2400; //Width of all the images

class Layer {
  constructor(imagePath, speedModifier) {
    this.layerImage = new Image();
    this.layerImage.src = imagePath;

    this.speedModifier = speedModifier;
    this.x_position = 0;
    this.y_position = 0;
  }

  updateXPosition() {
    this.x_position =
      this.x_position === MAX_IMAGE_WIDTH * -1
        ? 0
        : this.x_position - gameSpeed * this.speedModifier;
  }
}

const background1 = new Layer("./images/layer-1.png", 0.125);
const background2 = new Layer("./images/layer-2.png", 0.25);
const background3 = new Layer("./images/layer-3.png", 0.5);
const background4 = new Layer("./images/layer-4.png", 0.75);
const background5 = new Layer("./images/layer-5.png", 1);

const backgroundLayers = [
  background1,
  background2,
  background3,
  background4,
  background5,
];

function animate() {
  //Clear the entire canvas each time this function is called
  //Clears everthing from coords 0,0 to CANVAS_WIDTH, CANVAS_HEIGHT
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  backgroundLayers.forEach((layer) => {
    ctx.drawImage(layer.layerImage, layer.x_position, 0);
    ctx.drawImage(layer.layerImage, layer.x_position + MAX_IMAGE_WIDTH, 0);
    layer.updateXPosition();
  });
  requestAnimationFrame(animate);
}
animate();
