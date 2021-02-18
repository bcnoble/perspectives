const deployedApp = 'https://nervous-ride-0cfa88.netlify.app' 

//Initiate character movement image variables
let character_image = {
  "UP": "",
  "DOWN": "",
  "LEFT": "",
  "RIGHT": ""
}

//Initiate variables to keep track image index
let moveInd = {
  "UP": 0,
  "DOWN": 0,
  "LEFT": 0,
  "RIGHT": 0
}

//Function to get character image file (that is stored locally)
function getCharacterImg(dir, id){
  if (id < 10){
    id = "0" + id.toString()
  } 
  if (dir === "UP"){
    return `${deployedApp}/asset/Yang_Walk_UP/Yang_Walk_UP_000${id}.png`
  } else if (dir === "DOWN"){
    return `${deployedApp}/asset/Yang_Walk_DN/Yang_Walk_DN_000${id}.png`
  } else if (dir === "LEFT" || dir === "RIGHT"){
    return `${deployedApp}/asset/Yang_Walk_LR/Yang_Walk_LR_000${id}.png`
  } 
}

const maxImageInd = 15

//Function to get a movement
function getCharacterMove(dir){
  character_image[dir] = getCharacterImg(dir, moveInd[dir])
  moveInd[dir] += 1
  if (moveInd[dir] >= maxImageInd){
    moveInd[dir] = 0
  } 
}


//Call DOM elements
const officeWrapper = document.getElementById("wrapper")
const office = document.getElementById("office")
const cupboardLeft = document.getElementById("cupboard-left")
const cupboardRight = document.getElementById("cupboard-right")
const tableLeft = document.getElementById("table-left")
const tableRight1 = document.getElementById("table-right-1")
const tableRight2 = document.getElementById("table-right-2")
const tableRight3 = document.getElementById("table-right-3")
const player = document.getElementById("player")
const sparkling = document.getElementById("sparkling")
const hat = document.getElementById("hat")
const playerImg = document.getElementById("playerImg")
const guide = document.getElementById("guide")
const arrowUp = document.getElementById("arrow-up")
const arrowDown = document.getElementById("arrow-down")
const arrowLeft = document.getElementById("arrow-left")
const arrowRight = document.getElementById("arrow-right")

console.log('cupboardLeft', cupboardLeft)

//Initiate width and height variables
const wrapperWidthPercentage = 70
const playerImgWidth = 100
const playerImgHeight = 120
const hatWidth = 80
const hatHeight = 50
const cupboardWidth = 300
const cupboardHeight = 230
const bigTableWidth = 230
const bigTableHeight = 200
const smallTableWidth = 150
const smallTableHeight = 150
const sparklingWidth = 40
const sparklingHeight = 60
const chaHalfWidth =  playerImgWidth/2
const chaTotalHeight = (playerImgHeight + hatHeight)

//Set width and height for objects
wrapper.style.width = `${wrapperWidthPercentage}%`
cupboardLeft.style.width = `${cupboardWidth}px`
cupboardLeft.style.height = `${cupboardHeight}px`
cupboardRight.style.width = `${cupboardWidth}px`
cupboardRight.style.height = `${cupboardHeight}px`
tableLeft.style.width = `${bigTableWidth}px`
tableLeft.style.height = `${bigTableHeight}px`
tableRight1.style.width = tableRight2.style.width = tableRight3.style.width = `${smallTableWidth}px`
tableRight1.style.height = tableRight2.style.height = tableRight3.style.height = `${smallTableHeight}px`
sparkling.style.width = `${sparklingWidth}px`
sparkling.style.height = `${sparklingHeight}px`
playerImg.style.width = `${playerImgWidth}px`
playerImg.style.height = `${playerImgHeight}px`
hat.style.width = `${hatWidth}px`
hat.style.height = `${hatHeight}px`

//Set positions and coordinates for objects
const officePosition = {
    x: 250,
    y: 0
}

office.style.left = `${officePosition.x}px`
office.style.top = `${officePosition.y}px`

const cupboardLeftPosition = {
    x: 350,
    y: 320
}

cupboardLeft.style.left =  `${cupboardLeftPosition.x}px`
cupboardLeft.style.top =  `${cupboardLeftPosition.y}px`

const tableLeftPosition = {
    x: 750,
    y: 200
}
tableLeft.style.left =  `${tableLeftPosition.x}px`
tableLeft.style.top = `${tableLeftPosition.y}px`

const cupboardRightPosition = {
    x: 1150,
    y: 300
}
cupboardRight.style.left =  `${cupboardRightPosition.x}px`
cupboardRight.style.top =  `${cupboardRightPosition.y}px`

const tableRight1Position = {
    x: 1200,
    y: 500
}
tableRight1.style.left =  `${tableRight1Position.x}px`
tableRight1.style.top = `${tableRight1Position.y}px`

const tableRight2Position = {
    x: tableRight1Position.x -100,
    y: tableRight1Position.y + 60
}
tableRight2.style.left =  `${tableRight2Position.x}px`
tableRight2.style.top =  `${tableRight2Position.y}px`

const tableRight3Position = {
    x: tableRight1Position.x -100*2,
    y: tableRight1Position.y + 60*2
}
tableRight3.style.left =  `${tableRight3Position.x}px`
tableRight3.style.top =  `${tableRight3Position.y}px`

const sparklingPosition = {
  x: 940,
  y: 420
}

sparkling.style.left = `${sparklingPosition.x}px`
sparkling.style.top = `${sparklingPosition.y}px`

const characterPosition = {
  x: 400,
  y: 400
}
player.style.left = `${characterPosition.x}px`
player.style.top = `${characterPosition.y}px`

//Set permission to move in certain direction
let can_go_up = true
let can_go_down = true
let can_go_left = true
let can_go_right = true

//Initiate a variable to keep track current direction
let curDirection = ""

//Function to restrict going further
function restrict(dir){
  if (dir === "UP"){
    can_go_up = can_go_left = can_go_right = false
    guide.innerHTML = "You can only go DOWN"
  } else if (dir === "DOWN"){
    can_go_down = can_go_left = can_go_right = false
    guide.innerHTML = "You can only go UP"
  } else if (dir === "LEFT"){
    can_go_left = can_go_down = can_go_up = false
    guide.innerHTML = "You can only go RIGHT"
  } else if (dir === "RIGHT"){
    can_go_right = can_go_down = can_go_up = false
    guide.innerHTML = "You can only go LEFT"
  } 
}

//Function to control movements of the character
function handleKeyDown(e){
      console.log('x', characterPosition.x, 'y', characterPosition.y)
      if (e.key === "ArrowRight" && can_go_right){
          curDirection = "RIGHT"
          getCharacterMove("RIGHT")
          playerImg.src = character_image["RIGHT"]
          playerImg.style.transform = 'rotateY(360deg)'
          characterPosition.x = characterPosition.x + 10
          arrowRight.style.backgroundColor = "aqua"
          arrowDown.style.backgroundColor = arrowUp.style.backgroundColor = arrowLeft.style.backgroundColor = "#F1F2F3"
      } else if (e.key === "ArrowLeft" && can_go_left){
          curDirection = "LEFT"
          getCharacterMove("LEFT")
          playerImg.src = character_image["LEFT"]
          playerImg.style.transform = 'rotateY(180deg)'
          characterPosition.x = characterPosition.x - 10
          arrowLeft.style.backgroundColor = "aqua"
          arrowDown.style.backgroundColor = arrowUp.style.backgroundColor = arrowRight.style.backgroundColor = "#F1F2F3"
      } else if (e.key === "ArrowDown" && can_go_down){
          curDirection = "DOWN"
          getCharacterMove("DOWN")
          playerImg.src = character_image["DOWN"]
          characterPosition.y = characterPosition.y + 10
          arrowDown.style.backgroundColor = "aqua"
          arrowRight.style.backgroundColor = arrowUp.style.backgroundColor = arrowLeft.style.backgroundColor = "#F1F2F3"
      } else if (e.key === "ArrowUp" && can_go_up){
          curDirection = "UP"
          getCharacterMove("UP")
          playerImg.src = character_image["UP"]
          characterPosition.y = characterPosition.y - 10
          arrowUp.style.backgroundColor = "aqua"
          arrowDown.style.backgroundColor = arrowRight.style.backgroundColor = arrowLeft.style.backgroundColor = "#F1F2F3"
      }

      //if going into the sparkling, transition to the conversation
      console.log('char', characterPosition, 'sparkling', sparklingPosition)
      if (characterPosition.x + chaHalfWidth >= sparklingPosition.x 
          && characterPosition.x + chaHalfWidth <= sparklingPosition.x + sparklingWidth
          && characterPosition.y + chaTotalHeight  >= sparklingPosition.y 
          && characterPosition.y + chaTotalHeight  <= sparklingPosition.y + sparklingHeight
        ){
          //transition to next page
          setTimeout(function(){
            window.location.href = "../../scenario/scenario1/yangConversation.html";
          }, 500)
        }
      
      //check collision with objects
      if (
        isInsideRectangle(
          [
            {x: cupboardLeftPosition.x, y: cupboardLeftPosition.y}, 
            {x: cupboardLeftPosition.x + cupboardWidth, y: cupboardLeftPosition.y}, 
            {x: cupboardLeftPosition.x + cupboardWidth, y: cupboardLeftPosition.y + cupboardHeight}, 
            {x: cupboardLeftPosition.x, y: cupboardLeftPosition.y + cupboardHeight}
          ], 
          {x: characterPosition.x + chaHalfWidth, y: characterPosition.y + chaTotalHeight })
        || isInsideRectangle(
          [
            {x: cupboardRightPosition.x, y: cupboardRightPosition.y}, 
            {x: cupboardRightPosition.x + cupboardWidth, y: cupboardRightPosition.y}, 
            {x: cupboardRightPosition.x + cupboardWidth, y: cupboardRightPosition.y + cupboardHeight}, 
            {x: cupboardRightPosition.x, y: cupboardRightPosition.y + cupboardHeight}
          ], 
          {x: characterPosition.x + chaHalfWidth, y: characterPosition.y + chaTotalHeight })
      ){
        document.getElementById("message").innerHTML = "You are about to touch a cupboard. Do not!"
        document.getElementById("message").style.color = "red"
        restrict(curDirection)
      } else if (
        isInsideRectangle(
          [
            {x: tableLeftPosition.x, y: tableLeftPosition.y}, 
            {x: tableLeftPosition.x + bigTableWidth, y: tableLeftPosition.y}, 
            {x: tableLeftPosition.x + bigTableWidth, y: tableLeftPosition.y + bigTableHeight}, 
            {x: tableLeftPosition.x, y: tableLeftPosition.y + bigTableHeight}
          ], 
          {x: characterPosition.x + chaHalfWidth, y: characterPosition.y + chaTotalHeight })
      ){
        document.getElementById("message").innerHTML = "You are about to touch a big table. Do not!"
        document.getElementById("message").style.color = "blue"
        restrict(curDirection)
      } else if (
        isInsideRectangle(
          [
            {x: tableRight1Position.x, y: tableRight1Position.y}, 
            {x: tableRight1Position.x + smallTableWidth, y: tableRight1Position.y}, 
            {x: tableRight1Position.x + smallTableWidth, y: tableRight1Position.y + smallTableHeight}, 
            {x: tableRight1Position.x, y: tableRight1Position.y + smallTableHeight}
          ], 
          {x: characterPosition.x + chaHalfWidth, y: characterPosition.y + chaTotalHeight })
        || isInsideRectangle(
          [
            {x: tableRight2Position.x, y: tableRight2Position.y}, 
            {x: tableRight2Position.x + smallTableWidth, y: tableRight2Position.y}, 
            {x: tableRight2Position.x + smallTableWidth, y: tableRight2Position.y + smallTableHeight}, 
            {x: tableRight2Position.x, y: tableRight2Position.y + smallTableHeight}
          ], 
          {x: characterPosition.x + chaHalfWidth, y: characterPosition.y + chaTotalHeight })
        || isInsideRectangle(
          [
            {x: tableRight3Position.x, y: tableRight3Position.y}, 
            {x: tableRight3Position.x + smallTableWidth, y: tableRight3Position.y}, 
            {x: tableRight3Position.x + smallTableWidth, y: tableRight3Position.y + smallTableHeight}, 
            {x: tableRight3Position.x, y: tableRight3Position.y + smallTableHeight}
          ], 
          {x: characterPosition.x + chaHalfWidth, y: characterPosition.y + chaTotalHeight })
      ){
        document.getElementById("message").innerHTML = "You are about to touch a small table. Do not!"
        document.getElementById("message").style.color = "purple"
        restrict(curDirection)
      } else if (
        //prevent touching edge left
        isInsideRectangle(
          [
            {x: 250, y: 570}, {x: 900 , y: 950}, {x: 800, y: 1100}, {x: 150, y: 720}
          ], 
          {x: characterPosition.x + chaHalfWidth, y: characterPosition.y + chaTotalHeight })
        //prevent touching edge right
        || isInsideRectangle(
            [
              {x: 900, y: 950}, {x: 1560 , y: 570}, {x: 1700, y: 750}, {x: 1040, y: 1130}
            ], 
            {x: characterPosition.x + chaHalfWidth, y: characterPosition.y + chaTotalHeight })
        ){
          document.getElementById("message").innerHTML = "You are about to touch the edge. Do not!"
          document.getElementById("message").style.color = "red"
          restrict(curDirection)
      } else if (
          //prevent touching wall left
          isInsideRectangle(
            [
               {x: 250 , y: 580}, {x: 910, y: 205}, {x: 840, y: 40}, {x: 160, y: 410}
            ], 
            {x: characterPosition.x + chaHalfWidth, y: characterPosition.y + chaTotalHeight })
          //prevent touching wall right
          || isInsideRectangle(
              [
                {x: 920, y: 210}, {x: 1560 , y: 580}, {x: 1620, y: 390}, {x: 980, y: 20}
              ], 
              {x: characterPosition.x + chaHalfWidth, y: characterPosition.y + chaTotalHeight })
          ){
            document.getElementById("message").innerHTML = "You are about to touch the wall. Do not!"
            document.getElementById("message").style.color = "red"
            restrict(curDirection)
      } else {
        document.getElementById("message").innerHTML = "Welcome to Yang office :)"
        document.getElementById("message").style.color = "black"
        can_go_up = can_go_down = can_go_left = can_go_right = true
        guide.innerHTML = ""
      }
      
      player.style.left = `${characterPosition.x}px`
      player.style.top = `${characterPosition.y}px`
  }
  
//Function to find area of a rectangular 
function rectArea(x1, y1, x2, y2, x3, y3, x4, y4){
    return Math.floor(Math.sqrt(Math.pow(x1-x4,2) + Math.pow(y1-y4,2))*Math.sqrt(Math.pow(x3-x4,2) + Math.pow(y3-y4,2)))
  }

//Function to find distance between 2 points
function dist(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2))
  }
  
//Function to find area of a triangle 
function triangArea(x1, y1, x2, y2, x3, y3){
    const a = dist(x1, y1, x2, y2)
    const b = dist(x1, y1, x3, y3)
    const c = dist(x2, y2, x3, y3)
    const p = a + b + c
    const s = p/2
    return Math.floor(Math.sqrt(s*(s-a)*(s-b)*(s-c)))
  }

//Function to check if a point is inside a rectangular
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


document.addEventListener("keydown", handleKeyDown)