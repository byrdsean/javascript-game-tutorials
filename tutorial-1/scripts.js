//Get the canvas from index.html. Make sure to specify the height and width
const canvas = document.getElementById("canvas1");
canvas.height = 600;
canvas.width = 600;

//Get the 2d context of the canvas
const ctx = canvas.getContext("2d");
const CANVAS_HEIGHT = canvas.height;
const CANVAS_WIDTH = canvas.width;

//Get the animation controls
let currentState = "idle";
const animationControls = document.getElementById("animations");
animationControls.addEventListener("change", (e) => {
  currentState = e.target.value;
});

//The Image class is similar to using the <img> tag in HTML, but this stores the data in the class.
//We could add this to the DOM programmatically if we wanted to
const playerImage = new Image();
playerImage.src = "./images/shadow_dog.png";

//Get the dimensions of a single sprint image from the sprite map
const spriteWidth = 575; //width of entire file divided by # of columns
const spriteHeight = 523; //height of entire file divided by # of rows

//Specify the sprite frame on a particular row and column
let frame = 0;

//Vars to control "speed" of animation.
//In other words, it staggers the frames at a certain rate
let gameFrame = 0;
let staggerFramesBy = 5;

//Obj to contain the different types of states and # of frames per state
const states = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];
const statesMap = {};

function populateStatePositions() {
  states.forEach((state, index) => {
    const locations = [];
    for (let i = 0; i < state["frames"]; i++) {
      locations.push({ x: i * spriteWidth, y: index * spriteHeight });
    }
    state["loc"] = locations;
    statesMap[state.name] = locations;
  });
}

//Will contain all logic to animate the image
function animate() {
  //Clear the entire canvas each time this function is called
  //Clears everthing from coords 0,0 to CANVAS_WIDTH, CANVAS_HEIGHT
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  //Create a rectangle from coords 50,50 to 100,100
  //Defaults to black if no color is specified
  // ctx.fillRect(50, 50, 50, 50);

  //Draw a single sprite from the sprite image
  // sx, sy: x,y coordinate location of the image on sprite map
  // sw, wh: width and height to crop out
  // dx, dy: x,y coordinate in canvas to place cropped sprite image
  // dw, dh: width and height of the image on canvas
  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)

  //Draw the image based on the states information.
  //We can then change state by updating "currentState" to the appropriate stateMap key
  ctx.drawImage(
    playerImage,
    statesMap[currentState][frame].x, //Display a specific sprite frame on a row
    statesMap[currentState][frame].y, //Display a specific sprite frame on a column
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  //Slow down the animation by only updating the frame value when we should stagger
  if (gameFrame % staggerFramesBy === 0) {
    frame = ++frame % statesMap[currentState].length;
  }
  gameFrame = ++gameFrame % staggerFramesBy;

  //Build in method to call another method on every iteration
  //https://www.w3schools.com/jsref/met_win_requestanimationframe.asp
  requestAnimationFrame(animate);
}

//Start animation
populateStatePositions();
animate();
