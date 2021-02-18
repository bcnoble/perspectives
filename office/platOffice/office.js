
let x = 500;
let y = 500;
const character_face_up = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950505/Yang_Back_2x_wfa5l1.png"
const character_face_down = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950509/Yang_Front_2x_j9ad21.png"
const character_face_left = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950538/Yang_RightSide_2x_i223zj.png"
const character_face_right = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950517/Yang_LeftSide_2x_qc1sg5.png"

const player = document.getElementById("player");
const playerImg = document.getElementById("playerImg");
player.style.left = `${x}px`
player.style.top = `${y}px`

document.addEventListener("keydown", handleKeyDown)


document.addEventListener("DOMContentLoaded", event => {
  const audio = document.querySelector("audio");
  audio.volume = 0.2;
  audio.play();
});

function handleKeyDown(e){
  const audio = document.querySelector("audio");
  audio.volume = 0.2;
  audio.play();
  
    console.log('x', x, 'y', y)
    if (e.key === "ArrowRight"){
        playerImg.src = character_face_right
        x = x + 10
    } else if (e.key === "ArrowLeft"){
        playerImg.src = character_face_left
        x = x - 10
    } else if (e.key === "ArrowDown"){
        playerImg.src = character_face_down
        y = y + 10
    } else if (e.key === "ArrowUp"){
        playerImg.src = character_face_up
        y = y - 10
    }

    if (!isInsideRectangle([{x: 620, y: 290}, {x: 970, y: 450}, {x: 670, y: 690}, {x: 310, y: 480}], {x: x, y: y})){
      document.getElementById("message").innerHTML = "Do not go there!"
    } else {
      document.getElementById("message").innerHTML = "Welcome to Yang office :)"
    }
    
    player.style.left = `${x}px`
    player.style.top = `${y}px`
}

function rectArea(x1, y1, x2, y2, x3, y3, x4, y4){
    return Math.floor(Math.sqrt(Math.pow(x1-x4,2) + Math.pow(y1-y4,2))*Math.sqrt(Math.pow(x3-x4,2) + Math.pow(y3-y4,2)))
  }

function dist(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2))
  }

function triangArea(x1, y1, x2, y2, x3, y3){
    const a = dist(x1, y1, x2, y2)
    const b = dist(x1, y1, x3, y3)
    const c = dist(x2, y2, x3, y3)
    const p = a + b + c
    const s = p/2
    return Math.floor(Math.sqrt(s*(s-a)*(s-b)*(s-c)))
  }

function isInsideRectangle(rect, target){
    const topLeft = rect[0]
    const topRight = rect[1]
    const bottomRight = rect[2]
    const bottomLeft = rect[3]

    if (  triangArea(topLeft.x, topLeft.y, target.x, target.y, bottomLeft.x, bottomLeft.y) 
        + triangArea(topLeft.x, topLeft.y, target.x, target.y, topRight.x, topRight.y)
        + triangArea(topRight.x, topRight.y, target.x, target.y, bottomRight.x, bottomRight.y)
        + triangArea(bottomRight.x, bottomRight.y, target.x, target.y, bottomLeft.x, bottomLeft.y) 
        > rectArea(topLeft.x, topLeft.y, topRight.x, topRight.y, bottomRight.x, bottomRight.y, bottomLeft.x, bottomLeft.y)
        ) {
          return false
        }
    return true
  }