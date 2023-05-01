const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

//Set the dimensions
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 700;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

//Create Image objs for each image we will work with
const backgroundLayer1 = new Image();
backgroundLayer1.src = "./images/layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "./images/layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "./images/layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "./images/layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "./images/layer-5.png";

let gameSpeed = 15;
const MAX_IMAGE_WIDTH = 2400; //Width of all the images

//X position of image
let x_position = 0;

function animate() {
  //Clear the entire canvas each time this function is called
  //Clears everthing from coords 0,0 to CANVAS_WIDTH, CANVAS_HEIGHT
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(backgroundLayer4, x_position, 0);
  ctx.drawImage(backgroundLayer4, x_position + MAX_IMAGE_WIDTH, 0);
  x_position = x_position === MAX_IMAGE_WIDTH * -1 ? 0 : x_position - gameSpeed;
  requestAnimationFrame(animate);
}
animate();
