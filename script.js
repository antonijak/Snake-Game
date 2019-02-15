/* Select HTML element
 * cvs - standard shorthand for canvas
 * ctx - standard shorthand for context
 */
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var box = 15; // Width for one cell

cvs.height = 20 * box;
cvs.width = 20 * box;

var width = cvs.width;
var height = cvs.height;

// Variable needed for game
var direction; // Direction of snake

// Food img
var foodImg = new Image();
foodImg.src =
  "http://www.kasparsvendelis.com/wp-content/uploads/2018/04/Vegetarian2.png";

// Game variables
var food; //Object { x , y }

// Create snake.
var snake; //Array [ { x, y }, { x, y } ]

// Updates the canvas
function refreshCanvas() {
  // Clear the canvas
  ctx.clearRect(0, 0, cvs.width, cvs.height);

  // Draw food
  ctx.drawImage(foodImg, food.x, food.y, box, box);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "#EB8921";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "white";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
}

function createSnake() {
  // Initiate snake
  snake = [{
    x: randomNumber(),
    y: randomNumber()
  }]
}

function randomNumber() {
  return Math.floor(Math.random() * width / box) * box;
}

// Create food
function createFood() {
  let a = randomNumber();
  let b = randomNumber();
  snake.forEach(obj => {
    if (obj.x !== a && obj.y !== b){
      food = {
        x: a,
        y: b
      }
    }
  })
  // Check collision
}

// Draw scene
function drawScene() {
  // Add your code here!
  if (direction === 'left') {
    snake.unshift({
      x: snake[0].x - 15,
      y: snake[0].y
    })
    snake.pop();
  } else if (direction === 'right') {
    let box = {
      x: snake[0].x + 15,
      y: snake[0].y
    };
    snake.unshift(box)
    snake.pop();
  } else if (direction === 'up') {
    let box = {
      x: snake[0].x,
      y: snake[0].y - 15
    };
    snake.unshift(box)
    snake.pop();
  } else if (direction === 'down') {
    let box = {
      x: snake[0].x,
      y: snake[0].y + 15
    };
    snake.unshift(box)
    snake.pop();
  }
  if (food.x === snake[0].x && food.y === snake[0].y) {
    createFood();
    if (direction === 'left') {
      snake.push({
        x: snake[0].x + box,
        y: snake[0].y
      });
    } else if (direction === 'right') {
      snake.push({
        x: snake[0].x - box,
        y: snake[0].y
      });
    } else if (direction === 'up') {
      snake.push({
        x: snake[0].x,
        y: snake[0].y + box
      });
    } else if (direction === 'down') {
      snake.push({
        x: snake[0].x,
        y: snake[0].y - box
      });
    }
  }
  if (snake[0].x > width || snake[0].x < 0 || snake[0].y > height || snake[0].y < 0) {
    createSnake();
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y){
      createSnake();
    }
  }

refreshCanvas();
}

// Records input direction
document.addEventListener("keydown", moveSnake);

function moveSnake(event) {
  if (event.keyCode == 37) {
    direction = "left";
  } else if (event.keyCode == 38) {
    direction = "up";
  } else if (event.keyCode == 39) {
    direction = "right";
  } else if (event.keyCode == 40) {
    direction = "down";
  }

}

// CAll draw function every 200 ms
var drawLoop = setInterval(drawScene, 300);

// Setup game objects to initial values
function setupNewGame() {
  direction = "right";
  createSnake();
  createFood();
  refreshCanvas();


}

// Init game
setupNewGame();