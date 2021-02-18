const container = document.getElementById("container")

//class to create a ball
class Ball {
    constructor(){
        this.size = 80;
        this.ball = document.createElement("div");
    }

    setup(){
        this.ball.style.borderRadius = "50%"
        this.ball.style.position = "absolute"
        this.ball.style.width = `${this.size}px`
        this.ball.style.height = `${this.size}px`
        container.appendChild(this.ball)
    }

    updateBgColor(color){
        this.ball.style.backgroundColor = color
    }

    updateCoors(x, y){
        this.ball.style.left = `${x - this.size/2}px`
        this.ball.style.top = `${y - this.size/2}px`
    }

    updateText(text){
        this.ball.style.display = "flex"
        this.ball.style.justifyContent = "center"
        this.ball.style.alignItems = "center"
        this.ball.style.textAlign = "center"
        this.ball.style.fontSize = "22px"
        this.ball.style.color = "white"
        this.ball.appendChild(document.createTextNode(text))
    }
}

const balls = []
const totalRow = 3
const totalCol = 20
let ballRow;

//create balls
let ball ;
for (let r = 0; r < totalRow ; r++){
    ballRow = []
    for (let c = 0; c < totalCol ; c++){
        ball = new Ball
        ballRow.push(ball)
    }
    balls.push(ballRow)
}

function showBalls(){
    for (let r = 0; r < totalRow ; r++){
        for (let c = 0; c < totalCol ; c++){
            if (balls[r][c] != 0){
                const randomColor = `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`
                balls[r][c].setup()
                balls[r][c].updateBgColor(randomColor)
                // balls[r][c].updateText(r*20 + c )
            } else {
                balls[r][c].setup()
                balls[r][c].updateBgColor("white")
            }
            balls[r][c].updateCoors(100 + 80*c, 40+ 80*r)
        }
    }
}

showBalls()

//class to create and update a line
class Line {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.length = 0;
        this.alpha = 0;
        this.line = document.createElement('div')
    }

    setup(){
        container.appendChild(this.line)
    }

    update(x1, y1, x2, y2){
        let a = x1 - x2
        let b = y1 - y2
        this.length = Math.sqrt(a*a + b*b);

        let sx = (x1 + x2)/2
        let sy = (y1+ y2)/2;

        this.x = sx - this.length/2;
        this.y = sy
        
        this.alpha = Math.PI - Math.atan2(-b, a);
        this.updateStyle()
    }

    updateStyle(){
        let styles = 'border: 1px solid black;'
                + 'width: ' + this.length + 'px;'
                + 'height: 0px;'
                + '-moz-transform: rotate(' + this.alpha + 'rad); '
                + '-webkit-transform: rotate(' + this.alpha + 'rad); '
                + '-o-transform: rotate(' + this.alpha + 'rad); '
                + '-ms-transform: rotate(' + this.alpha + 'rad); '
                + 'display: inline-block;'
                + 'position: absolute; '
                + 'top: ' + this.y + 'px; '
                + 'left: ' + this.x + 'px; '
        this.line.setAttribute('style', styles)
    }
}


let mouseX = null;
let mouseY = null;
const line = new Line;
line.setup()

const mainBall = new Ball;
const mainBallRandomColor = `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`
mainBall.setup()
mainBall.updateBgColor(mainBallRandomColor)
mainBall.updateText("^")

function onMouseUpdate(e){
    mouseX = e.pageX;
    mouseY = e.pageY;
    
    //update position of line
    line.update(mouseX, mouseY, window.innerWidth/2, window.innerHeight - 10)
    //update position of ball
    mainBall.updateCoors(mouseX, mouseY)
}

const ballSize = 80

function isTouchingABall(x, y){
    for (let r = 0; r < totalRow ; r++){
        for (let c = 0; c < totalCol ; c++){
            if (x >= 100 + 80*c && x <=  100 + 80*c + ballSize && y >= 40 + 80*r && y <= 40 + 80*r + ballSize
                || x + ballSize >= 100 + 80*c && x + ballSize <=  100 + 80*c + ballSize && y >= 40 + 80*r && y <= 40 + 80*r + ballSize){
                    balls[r][c] = 0
                    return true
            }
        }
    }
    return false
}

//function to throw ball
function throwMainBall(){
    const k = (mouseY - window.innerHeight + 10)/(mouseX - window.innerWidth/2)
    const b = mouseY - mouseX*k
    let cutLineY;
    if (mouseY >= 40 + 80*2){
        cutLineY = 40 + 80*2
    } else if (mouseY < 40 + 80*2 && mouseY > 40 + 80*1){
        cutLineY = 40 + 80*1
    } else if (mouseY <= 40 + 80*1 && mouseY > 40 ){
        cutLineY = 40 
    } 
    const cutLineX = (cutLineY - b)/k

    mainBall.updateCoors(cutLineX, cutLineY)

    //if touch a ball, turn ball in balls array into 0
    if (isTouchingABall(cutLineX, cutLineY)){
        console.log('balls', balls)
        showBalls()
    }

}


document.addEventListener('mousemove', onMouseUpdate, false);
container.addEventListener('click', throwMainBall, false);