const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

//Set the dimensions
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 700;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

//Create Image objs for each image we will work with
const backgroundLayer4 = new Image();
backgroundLayer4.src = "./images/layer-4.png";

let gameSpeed = 15;
const MAX_IMAGE_WIDTH = 2400; //Width of all the images

let x_position = 0;

function animate() {
  //Clear the entire canvas each time this function is called
  //Clears everthing from coords 0,0 to CANVAS_WIDTH, CANVAS_HEIGHT
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  /*Explantion:
   * In order to do continuous scroll, we will draw the same image twice, one directly after the other.
   * The first image is at position 0, and the second is MAX_IMAGE_WIDTH to the right, or directly next to image 1
   * Foreach call to "animate", we check if x has moved MAX_IMAGE_WIDTH to the left: x_position === MAX_IMAGE_WIDTH * -1
   * If true, that means the the second image is now at position 0. Since the images are identical, we reset x to 0. On repaint, the image will have no change
   * Else, we move the image to the left using gameSpeed: x_position - gameSpeed
   */
  ctx.drawImage(backgroundLayer4, x_position, 0);
  ctx.drawImage(backgroundLayer4, x_position + MAX_IMAGE_WIDTH, 0);
  x_position = x_position === MAX_IMAGE_WIDTH * -1 ? 0 : x_position - gameSpeed;

  requestAnimationFrame(animate);
}
animate();
