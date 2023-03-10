window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        startGame();
    };
    
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');



canvas.width = innerWidth
canvas.height = innerHeight/1.5

const randomY = Math.floor(Math.random() * canvas.height);
const randomX = Math.floor(Math.random() * (300 - 100 + 1)) + 50


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
  

 // ------------------ Game logic ------------------ //

 

function startGame () {
    let frames = 0
 let zombies = []
 let humans = []

    const gameInterval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    robot.draw();
    
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

    if (frames % 50 === 0) {
        const randomY = Math.floor(Math.random() * canvas.height);
        const zombie = new Zombies(canvas.width, randomY, ctx);
        zombies.push(zombie);
      }
      
      // Create random human //


    if (frames % 10 === 0){
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
if (human.y < 0) {
   humans.splice(index, 1)
}
})

    } 
    , 1000 / 30)
}

// ------------------ Event listeners ------------------ //

 window.addEventListener('keydown', (event) => {
    console.log("hello")
         switch (event.code) {
             case "ArrowLeft":
                 robot.moveLeft();
                 console.log("left")
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
