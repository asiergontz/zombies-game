window.onload = () => {

    const instructions = document.getElementById("instructions")
    const gameboard = document.getElementById("game-board")
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext('2d')
    

    document.getElementById('start-button').onclick = () => {
        instructions.style.display = "none";
        canvas.id = "canvas";
        canvas.width = 1000;  
        canvas.height = 600;
        gameboard.appendChild(canvas)
        startGame();
    };





// ------------------ random variables ------------------ //

const randomY = Math.floor(Math.random() * canvas.height);
const randomX = Math.floor(Math.random() * (300 - 100 + 1)) + 50
let humansSaved = 0
let humansDead = 0



  

 // ------------------ Game logic ------------------ //

 

function startGame () {
    console.log
    let frames = 0
    let zombies = []
    let humans = []

    // ------------------ the gang ------------------ //

    const robot = new Robot(
        canvas.width / 2,
        canvas.height /2,
        50,
        100,
        ctx
      )
    
      const zombie = new Zombies(
        canvas.width,
        this.y,
        ctx
      )
    
      const human = new Humans(
        canvas.width  - 10,
        this.x,
        ctx
      )

    // ------------------ interval ------------------ //
    const gameInterval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    robot.draw();

        // show score on canvas
        ctx.font = "15px Chalkduster";
        ctx.fillStyle = "Red";
        ctx.fillText("Humans saved: " + humansSaved + "/70", 40, 65);
        ctx.fillText("Humans killed: " + humansDead +"/10", 40, 100)

    zombies.forEach((zombie) => {
        zombie.draw();
        zombie.moveLeft();
      });

    humans.forEach((human) => {
        human.draw();
        human.moveUp();
      });
    frames++;


    // Create random zombie //

    if (frames % 5 === 0) {
        const randomY = Math.floor(Math.random() * (540 - 170 + 1)) + 170;;
        const zombie = new Zombies(canvas.width, randomY, ctx);
        zombies.push(zombie);
      }
      
      // Create random human //


    if (frames % 15 === 0){
        const randomX = Math.floor(Math.random() * (300 - 100 + 1)) + 50
        const human = new Humans(randomX, canvas.height, ctx);
        humans.push(human)
    }
    

 // ------------------ Collisions ------------------//

// Robot - Zombie //
 zombies.forEach((zombie, index) => {
    if (robot.x < zombie.x + zombie.width &&
        robot.x + robot.width > zombie.x &&
        robot.y < zombie.y + zombie.height &&
        robot.y + robot.height > zombie.y) {
            zombies.splice(index, 1)
            console.log("zombie death");
        }
})
// Human - Zombie //

humans.forEach(function(human, i) {
    zombies.forEach(function(zombie, j) {
      if (zombie.x + zombie.width > human.x &&
        zombie.x < human.x + human.width &&
        zombie.y + zombie.height > human.y &&
        zombie.y < human.y + human.height) {
        humans.splice(i, 1);
        console.log(humansDead++)
      }
    });
  });



    // remove zombies if they reach the limit//

zombies.forEach((zombie, index) => {  
if (zombie.x < 0) {
    zombies.splice(index, 1)
}
})


    // remove humans if they reach the boat//
humans.forEach((human, index) => {
if (human.y < 180) {
   humans.splice(index, 1)
    humansSaved++
}

// ------------------ Game Stoppers ------------------ //

function gameOver() {
    clearInterval(gameInterval);
    const gameOverScreen = document.getElementById("game-over-screen");
    gameOverScreen.style.display = "block";
  }

function restartGame() {
    humansSaved = 0;
    humansDead = 0;
    const gameOverScreen = document.getElementById("game-over-screen");
    gameOverScreen.style.display = "none";
    startGame();
}

gameOverScreen = document.getElementById("game-over-screen").onclick = () => {
    restartGame()
}

if (humansSaved === 100) {
    clearInterval(gameInterval)
    console.log("YOU WON!")
}

if (humansDead === 10) {
    clearInterval(gameInterval)
    gameOver();
}

})

 } , 1000 / 30)


// ------------------ Event listeners ------------------ //

 window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case "ArrowLeft":
            robot.moveLeft();
            break;
        case "ArrowRight":
            robot.moveRight();
            break;
        case "ArrowUp":
            robot.moveUp();
            break;

        case "ArrowDown":
            robot.moveDown();
            break;
       
    }

    // robot not leaving the canvas//
    if (robot.x < 0) {
        robot.x = 0;
    }

    if (robot.x + robot.width > canvas.width) {
        robot.x = canvas.width - robot.width;
    }

    if (robot.y < 0) {
        robot.y = 0;
    }

    if (robot.y + robot.height > canvas.height) {
        robot.y = canvas.height - robot.height;
    }
})

}
 

}
