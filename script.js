

const board = document.getElementById("board")
const ctx = board.getContext("2d")

const scoreTitle = document.querySelector(".h1-title")


let intervalID


let score = 1


let foodX
let foodY


foodX = getRandomNum()
foodY = getRandomNum()


const ceilWidth = 25
const ceilHeight = 25


let currentDirection



let snakeHeadX = 9
let snakeHeadY = 9



let snakeTail = []

snakeTail.push([8, 9])



document.addEventListener("keyup", changeDirection)



drawGameBoard()
drawSnakeTail()
drawSnakeHead()
drawFood()



intervalID = setInterval(update, 120)






//////////////////////////////


function drawSnakeHead() {

    ctx.fillStyle = "red"
    ctx.fillRect(snakeHeadX * ceilWidth,snakeHeadY * ceilHeight, ceilWidth, ceilHeight)


    ctx.strokeStyle = "black"
    ctx.lineWidth = 2
    ctx.strokeRect(snakeHeadX * ceilWidth,snakeHeadY * ceilHeight, ceilWidth, ceilHeight)

}




function drawSnakeTail() {


    for (let i = 0; i < snakeTail.length; i++) {

        ctx.fillStyle = "orange"
        ctx.fillRect(snakeTail[i][0] * ceilWidth,snakeTail[i][1] * ceilHeight, ceilWidth, ceilHeight)

        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        ctx.strokeRect(snakeTail[i][0] * ceilWidth,snakeTail[i][1] * ceilHeight, ceilWidth, ceilHeight)

    }


}





function changeDirection(event) {


    if (event.code === "ArrowUp" && currentDirection !== "ArrowDown") {

        currentDirection = event.code
    }

    else if (event.code === "ArrowDown" && currentDirection !== "ArrowUp") {

        currentDirection = event.code
    }


    else if (event.code === "ArrowLeft" && currentDirection !== "ArrowRight") {

        currentDirection = event.code
    }

    else if (event.code === "ArrowRight" && currentDirection !== "ArrowLeft") {

        currentDirection = event.code
    }


}




function drawGameBoard() {

    ctx.fillStyle = "steelblue"
    ctx.fillRect(0,0, 500, 500)

}



function update() {

    if (currentDirection !== undefined) {

        snakeTail.unshift([snakeHeadX, snakeHeadY])
        snakeTail.length = score

        if (currentDirection === "ArrowUp") {
            snakeHeadY = snakeHeadY - 1
        }

        else if (currentDirection === "ArrowDown") {
            snakeHeadY = snakeHeadY + 1
        }


        else if (currentDirection === "ArrowLeft") {
            snakeHeadX = snakeHeadX - 1
        }

        else if (currentDirection === "ArrowRight") {
            snakeHeadX = snakeHeadX + 1
        }


        checkBoardFail()
        checkTailFail()
        addScore()
        drawGameBoard()
        drawSnakeTail()
        drawSnakeHead()
        drawFood()

    }

}




function drawFood() {

    ctx.fillStyle = "green"
    ctx.fillRect(foodX * ceilWidth,foodY * ceilHeight, ceilWidth, ceilHeight)

    ctx.strokeStyle = "black"
    ctx.lineWidth = 1
    ctx.strokeRect(foodX * ceilWidth,foodY * ceilHeight, ceilWidth, ceilHeight)

}




function addScore() {

    if (snakeHeadX === foodX && snakeHeadY === foodY) {
        score++

        updateScore()

        foodX = getRandomNum()
        foodY = getRandomNum()

        drawFood()
    }

}





function checkBoardFail() {

    if (snakeHeadX === 20 || snakeHeadX === -1 || snakeHeadY === 20 || snakeHeadY === -1 ) {

        restartGame()

    }

}





function checkTailFail() {

    for (let i = 0; i < snakeTail.length; i++) {

        if (snakeHeadX === snakeTail[i][0] && snakeHeadY === snakeTail[i][1]) {

            restartGame()

        }

    }

}




function restartGame() {

    console.log("FAIL")

    clearInterval(intervalID)


    currentDirection = undefined

    snakeHeadX = 9
    snakeHeadY = 9


    snakeTail = []
    snakeTail.push([8, 9])
    score = 1
    updateScore()

    intervalID = setInterval(update, 120)

}






function updateScore() {
    scoreTitle.textContent = `Snake Score : ${Number(score) - 1}`
}




function getRandomNum() {
    return Math.floor(Math.random() * 20)
}


