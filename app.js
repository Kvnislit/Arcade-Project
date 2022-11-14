//Dom Elements
let grid = document.querySelector('.grid');
const resetButton = document.getElementById('start');
const scoreDisplay = document.getElementById("score");
const gameOver = document.getElementById('game-over'); 


//GAME STATE
let poisonIndex = 0;
let intervalTime = 1000;
let speed = 0.7;
let timerId = 0;
let score = 0;
let foodIndex = 0;
let direction = 1;
let squares = [];
let currentSnake = [2,1,0];
const walls = 20;



//Game Grid 
//creating 400 elements and putting it into the grid and adding it to stylesheet
for(let i =0; i <  400; i++){
    let box = document.createElement('div')
    box.classList.add('box')
    grid.appendChild(box);
    squares.push(box)
}

//drawing a snake on the grid 
currentSnake.forEach(index => squares[index].classList.add('snake'));

//Game starts on load
window.onload = function resetGame () {
    //remove snake 
     currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //remove food
    squares[foodIndex].classList.remove('food')
    clearInterval(timerId)
    currentSnake = [2,1,0];
    score = 0;
    //new score to browser 
    scoreDisplay.textContent = score;
    direction = 1;
    intervalTime = 1000;

    generateFood();
    generatePoison();

    //re add class of snake to currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, ++intervalTime)

    resetButton.addEventListener('click', resetGame)
};

function displayGameOver (){

}

function move (){
    //when the snake reaches the bottom of the grid or top
    //clear the timer
    if(
        (currentSnake[0] + walls > 400 && direction === 10) ||
        (currentSnake[0] - walls < 0 && direction === -10) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
        
    )
   return clearInterval(timerId)


    //removing last element from currentSnake
    const tail = currentSnake.pop()
    //removing styling from last element
    squares[tail].classList.remove('snake')
    //adding a new box in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)

    //snake head get poison 
    if( squares[currentSnake[0]].classList.contains('poison'))
    {
        //remove the class of poison
        squares[currentSnake[0]].classList.remove('poison')
        //generate new poison
        generatePoison()
     
        //slow down the timer
        clearInterval(timerId)
        timerId = setInterval(move , 1500)
    }

    ///Snake head gets food
    if( squares[currentSnake[0]].classList.contains('food'))
    {
        //remove the class of food
        squares[currentSnake[0]].classList.remove('food')
        //grow snake by adding class snake
        squares[tail].classList.add('snake')
        //grow snake array
        currentSnake.push(tail)
        //generate new food
        generateFood()
        //add 1 to the score
        score++
        //display the score
        scoreDisplay.textContent = score
        //speed up the timer
        clearInterval(timerId)
        intervalTime = intervalTime * speed;
        timerId = setInterval(move , intervalTime)
       
    }

    
    //adding class to grid
    squares[currentSnake[0]].classList.add('snake')


    }
move()


//creating the food element 
function generateFood()
{
    do {
        //random number
        foodIndex = Math.floor(Math.random() * squares.length)
        //adding food to the grid element if it contains    
    }while(squares[foodIndex].classList.contains('snake'))
    squares[foodIndex].classList.add('food')
}
generateFood()

function generatePoison() {
    do {
        //random number
        poisonIndex = Math.floor(Math.random() * squares.length)
        //adding food to the grid element if it contains    
    }while(squares[poisonIndex].classList.contains('snake'))
    squares[poisonIndex].classList.add('poison')
    
}
generatePoison()


//creating controls for movement on grid
function control(e){
    if(e.keyCode === 39)
    {
        direction = 1
    } else if(e.keyCode === 38)
    {
        direction = -walls
    }else if (e.keyCode === 37)
    {
        direction= - 1
    }else if (e.keyCode === 40)
    {    
        direction = +walls
    }
}

document.addEventListener('keyup', control)


