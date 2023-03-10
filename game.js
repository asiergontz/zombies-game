window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        startGame();
    };
    
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');



canvas.width = innerWidth
canvas.height = innerHeight

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
    randomY,
    20,
    40,
    ctx
  )

  const human = new Humans(
    canvas.width  - 10,
    randomX,
    20,
    40,
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
        const zombie = new Zombies(canvas.width, randomY, 70, 100, ctx);
        zombies.push(zombie);
      }
      


      // Create random human //


    if (frames % 50 === 0){
        const human = new Humans(randomX, 700, 50, 70, ctx);
        humans.push(human)
    }
    

 // ------------------ Collisions ------------------

 zombies.forEach((zombie, index) => {

// Robot - Zombie //

if (robot.x < zombie.x + zombie.width &&
    robot.x + robot.width > zombie.x &&
    robot.y < zombie.y + zombie.height &&
    robot.y + robot.height > zombie.y) {
        zombies.splice(index, 1);
    }

// Human - Zombie //

if (human.x < zombie.x + zombie.width &&
    human.x + human.width > zombie.x &&
    human.y < zombie.y + zombie.height &&
    human.y + human.height > zombie.y) {
        humans.splice(index, 1);
    }

})


    // remove humans if they reach the boat//
humans.forEach((human, index) => {
if (human.y < canvas.height) {
    humans.splice(index, 1)
}
})
    }
    , 1000 / 60)
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
