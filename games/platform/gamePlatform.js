const container = document.getElementById("container")

//initiate main variables
const platformWidth = 100
const platformHeight = 20
const platformSpeed = 50; 

//class to create a platform
class Platform{
    constructor(x, y, w, h, speed, platform, text){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.platform = platform;
        this.width = w;
        this.height = h; 
        this.text = text;
        this.rightTurn = false;
        this.leftTurn = false;
    }

    setup(){
        this.platform.style.width = `${this.width}px`
        this.platform.style.height = `${this.height}px`
        this.platform.style.borderRadius = '20px'
        this.platform.style.position = 'absolute'
        this.platform.style.left = `${this.x}px`
        this.platform.style.top = `${this.y}px`
        this.platform.style.textAlign = "center"
        this.platform.style.border = "4px solid grey"
        this.platform.style.padding = "0px 10px"
        this.platform.appendChild(document.createTextNode(this.text))
        container.appendChild(this.platform)
    }

    moveRight(){
        if (this.x > window.innerWidth -5){
            this.rightTurn = true
        } 
        if (this.x <= 0){
            this.rightTurn = false
        }

        if (!this.rightTurn){
            this.x += 5
        } else {
            this.x -= 5
        }
        this.platform.style.left = `${this.x}px`
        setTimeout(this.moveRight.bind(this), this.speed)
    }

    moveLeft(){
        if (this.x <= 0){
            this.leftTurn = true
        }

        if (this.x > window.innerWidth -5){
            this.leftTurn = false
        } 
        

        if (! this.leftTurn){
            this.x -= 5
        } else {
            this.x += 5
        }
        this.platform.style.left = `${this.x}px`
        setTimeout(this.moveLeft.bind(this), this.speed)
    }

}

//array to contain platforms
const platforms = []

//loop to instantiate and create platform
for (let i = 0; i < 4; i++){
    if (i%2 === 0){
        platforms.push(new Platform(0, 100 + 100*i*2, platformWidth, platformHeight, platformSpeed, document.createElement("div"), "Team Bias"))
        platforms[i].setup()
        platforms[i].moveRight()
    } else {
        platforms.push(new Platform(window.innerWidth, 100 + 100*i*2, platformWidth, platformHeight, platformSpeed, document.createElement("div"), "Team Non-bias"))
        platforms[i].setup()
        platforms[i].moveLeft()
    }

}

//add character
const character = document.createElement("img");
const characterSize = {
    width: 80,
    height: 100
}
const characterPos = {
    x: window.innerWidth/2 - characterSize.width/2,
    y: window.innerHeight - characterSize.height - 100,
}
const characterDir = {
    front: "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950509/Yang_Front_2x_j9ad21.png",
    left: "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950538/Yang_RightSide_2x_i223zj.png",
    right: "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950517/Yang_LeftSide_2x_qc1sg5.png"
}
character.src = characterDir.front;
character.style.width = `${characterSize.width}px`
character.style.height = `${characterSize.height}px`
character.style.position = 'absolute'
character.style.left = `${characterPos.x}px`
character.style.top = `${characterPos.y}px`
container.appendChild(character)

//function for character to jump
let countStep = 0
function jumpRight(){
    if (countStep < 20) {
        characterPos.y -= 5
        characterPos.x += 0.1
    } else if (countStep >= 20 && countStep < 40){
        characterPos.y += 5
        characterPos.x += 0.1 
    }   
    //if touch platform, stop
    countStep += 1

    character.style.left = `${characterPos.x}px`
    character.style.top = `${characterPos.y}px`
    setTimeout(jumpRight, 50)
}

const keys = {}

function handleKeyDown(e){
    //if space bar is pressed
    // if (e.keyCode === 32){
    //     keys["Space"] = true
    // } 
    // if (e.key === "ArrowRight"){
    //     keys["ArrowRight"] = true
    // } 

    // if (keys["Space"] && keys["ArrowRight"]){
    //     countStep = 0
    //     jumpRight()
    // }

    if (e.keyCode === 32){
        countStep = 0
        jumpRight()
    }
}

document.addEventListener("keydown", handleKeyDown)
