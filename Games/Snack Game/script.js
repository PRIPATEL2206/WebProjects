//add some grid 
coloms = 18;
rows = 18;
gameBord.style["grid-template-columns"] = `repeat(${coloms},${(100 / 18)}%)`;
gameBord.style["grid-template-rows"] = `repeat(${rows},${(100 / 18)}%)`;

//variables
let previusTime = 20;
let delayFram = 200;
let deg = 180;
let score = 0;
let nextPosition = { x: 0, y: 0 };
let snack = [
    { x: 2 + parseInt((coloms - 1) * Math.random()), y: 2 + parseInt((rows - 1) * Math.random()) }
];
let food = { x: 2 + parseInt((coloms - 1) * Math.random()), y: 2 + parseInt((rows - 1) * Math.random()) };

//main logic of game
function main(stime) {
    window.requestAnimationFrame(main);
    if (stime - previusTime < delayFram) {
        return;
    }
    previusTime = stime;
    gameEngin();
    if (iscolleps()) {
        alert("Game Over");
        score = 0;
        deg = 180;
        nextPosition = { x: 0, y: 0 };
        snack = [
            { x: 2 + parseInt((coloms - 1) * Math.random()), y: 2 + parseInt((rows - 1) * Math.random()) }
        ];
        food = { x: 2 + parseInt((coloms - 1) * Math.random()), y: 2 + parseInt((rows - 1) * Math.random()) };
        scoreTag.textContent = `Score : ${score}`;
    }
}


// funtions
window.requestAnimationFrame(main);

//move snake
function moveTop() {
    if (snack.length > 1) {
        if (snack[0].x - 1 === snack[1].x) {
            return;
        }
    }
    nextPosition = { x: -1, y: 0 };
    deg = 90;
}
function moveLeft() {
    if (snack.length > 1) {
        if (snack[0].y - 1 === snack[1].y) {
            return;
        }
    }
    nextPosition = { x: 0, y: -1 };
    deg = 0;
}

function moveRight() {
    if (snack.length > 1) {
        if (snack[0].y + 1 === snack[1].y) {
            return;
        }
    }
    nextPosition = { x: 0, y: 1 };
    deg = 180;
}
function moveBottom() {
    if (snack.length > 1) {
        if (snack[0].x + 1 === snack[1].x) {
            return;
        }
    }
    nextPosition = { x: 1, y: 0 };
    deg = 270;
}

function stop() {
    nextPosition = { x: 0, y: 0 };
}

function iscolleps() {
    if (snack[0].x < 0 || snack[0].x > rows || snack[0].y < 0 || snack[0].y > coloms) {
        return true;
    }
    for (let index = 1; index < snack.length; index++) {
        if (snack[0].x === snack[index].x && snack[0].y === snack[index].y) {
            return true;
        }
    }

    return false;
}

function gameEngin() {
    //change position of snack and food

    // chack for snack eat food
    if (snack[0].x === food.x && snack[0].y === food.y) {
        //increment the snack
        snack.unshift({ x: nextPosition.x + snack[0].x, y: nextPosition.y + snack[0].y });

        //change food
        food.x = 2 + parseInt((coloms - 1) * Math.random());
        food.y = 2 + parseInt((rows - 1) * Math.random());
        score += 1;
        scoreTag.textContent = `Score : ${score}`;

    }

    //change snack 
    for (let index = snack.length - 1; index >= 0; index--) {
        if (nextPosition.x === 0 && nextPosition.y === 0) {
            break;
        }
        if (index === 0) {
            snack[index].x += nextPosition.x;
            snack[index].y += nextPosition.y;
        }
        else {
            snack[index].x = snack[index - 1].x;
            snack[index].y = snack[index - 1].y;
        }
    }


    //Display food and snack

    //clear bord
    gameBord.innerHTML = "";

    //Display food
    let selement = document.createElement("div");
    selement.classList.add("food");
    selement.style["grid-row-start"] = `${food.x}`;
    selement.style["grid-column-start"] = `${food.y}`;
    gameBord.appendChild(selement);

    //display snack
    snack.forEach((element, index) => {
        let selement = document.createElement("div");
        if (index === 0) {
            selement.classList.add("snackHead");
            selement.id = "snackHead";
            selement.style.transform = `rotate(${deg}deg)`;
        }
        else {
            selement.classList.add("snackBody");
        }
        selement.style["grid-row-start"] = `${element.x}`;
        selement.style["grid-column-start"] = `${element.y}`;
        gameBord.appendChild(selement);
    })
}

//chack fo key press
window.addEventListener("keydown", (key) => {
    if (key.key === "s") {
        nextPosition = { x: 0, y: 0 };
    }
    let predeg = deg;
    let previusPosition = { ...nextPosition };
    if (key.key === "ArrowUp") {
        deg = 90;
        nextPosition = { x: -1, y: 0 };
    }
    else if (key.code === "ArrowDown") {
        deg = 270;
        nextPosition = { x: 1, y: 0 };

    }
    else if (key.code === "ArrowLeft") {
        deg = 0;
        nextPosition = { x: 0, y: -1 };
    }
    else if (key.code === "ArrowRight") {
        deg = 180;
        nextPosition = { x: 0, y: 1 };

    }
    if (snack.length > 1) {
        if (snack[0].x + nextPosition.x === snack[1].x && snack[0].y + nextPosition.y === snack[1].y) {
            nextPosition = { ...previusPosition };
            deg = predeg;
        }
    }
})