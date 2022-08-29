
//varibales
allBoxes = document.getElementsByClassName("box");
let selectedElementIndex = null;
let currentTurn = "l";
let oftype;
let atIndex;
let selectedPathIndexes = [];
const allElementClasses = [["l-s", "d-s", "l-e", "l-h", "l-c", "l-q", "l-k", "l-c", "l-h", "l-e"], ["d-e", "d-h", "d-c", "d-q", "d-k", "d-c", "d-h", "d-e"]];

//onclick on any box
Array.from(allBoxes).forEach((element, index) => {
    element.addEventListener("click", (e) => {

        let targetedBox = e.target;
        // clicked on element 
        if (targetedBox.classList.contains("elm")) {

            if (selectedElementIndex !== null) {

                if (selectedPathIndexes.includes(index)) {

                    // remove targeted element
                    const targetedElementClass = getElementClass(targetedBox);
                    const typeOfElm = targetedBox.classList.contains("l") ? "l" : "d";
                    targetedBox.classList.remove(targetedElementClass);
                    targetedBox.classList.remove("elm");
                    targetedBox.classList.remove(typeOfElm);

                    // add targeted element in deleted box

                    // make element 
                    deletedElement = document.createElement("div");
                    deletedElement.classList.value = `deletedElm ${typeOfElm} elm ${targetedElementClass}`

                    // add in deleted box
                    // add in white deleted class
                    if (deletedElement.classList.contains("l")) {
                        deletedLight.appendChild(deletedElement);
                    }
                    // add in black deleted class
                    else {
                        deletedDark.appendChild(deletedElement);
                    }

                    // put selected element at targete box
                    putSelectedElementAt(targetedBox);

                    // if it is king then game over
                    if (targetedElementClass === "l-k" || targetedElementClass === "d-k") {
                        const win = typeOfElm === "d" ? "l" : "d";
                        const winnerObj = {
                            "l": "Light",
                            "d": "Dark"
                        }
                        alert(`${winnerObj[win]} is Win`);
                        document.location.reload();
                    }

                    // chack for sldure reach at top
                    if ((targetedBox.classList.contains("d-s") || targetedBox.classList.contains("l-s")) && isSoldurereachAtTop(index)) {
                        showAddPanel(targetedBox, index);
                        const solType = targetedBox.classList.contains("d") ? "d" : "l";
                        targetedBox.classList.remove(`${solType}-s`);
                        targetedBox.classList.remove("elm");
                        targetedBox.classList.remove(solType);
                        currentTurn = "";

                    }

                    changeTurn();
                }
                removePrewusPath();
                removePrewusSelectedElement();
            }
            else {
                highlightPath(targetedBox, index);
            }
        }

        // clicked on blank box
        else {
            if (selectedElementIndex === null) {
                return;
            }

            // remove from perwus
            if (selectedPathIndexes.includes(index)) {
                putSelectedElementAt(targetedBox);
                changeTurn();
            }

            // show add element panal

            // chack for sldure reach at top
            if ((targetedBox.classList.contains("d-s") || targetedBox.classList.contains("l-s")) && isSoldurereachAtTop(index)) {
                showAddPanel(targetedBox, index);
                const solType = targetedBox.classList.contains("d") ? "d" : "l";
                targetedBox.classList.remove(`${solType}-s`);
                targetedBox.classList.remove("elm");
                targetedBox.classList.remove(solType);
                currentTurn = "";
            }

            removePrewusPath();
            removePrewusSelectedElement();

        }

    })
});


addElment.addEventListener("click", () => {
    addElement(atIndex, oftype, selectElement.value);
    currentTurn = oftype==="l"?"d":"l";
    document.getElementsByClassName("selectBox")[0].style.display = "none";

    // delete if exixst in deleted box
    // for dark
    if (oftype === "d") {
        elementInDarkDelete = deletedDark.children;
        for (let i = 0; i < elementInDarkDelete.length; i++) {
            if (elementInDarkDelete[i].classList.contains(`${oftype}-${selectElement.value}`)) {
                elementInDarkDelete[i].remove();
                break;
            }
        }
    }

    // for light
    else if (oftype === "l") {
        elementInLightDelete = deletedLight.children;
        for (let i = 0; i < elementInLightDelete.length; i++) {
            if (elementInLightDelete[i].classList.contains(`${oftype}-${selectElement.value}`)) {
                elementInLightDelete[i].remove();
                break;
            }
        }
    }
});

// add element
function addElement(atIndex, oftype, ename) {
    allBoxes[atIndex].classList.add(oftype);
    allBoxes[atIndex].classList.add("elm");
    allBoxes[atIndex].classList.add(`${oftype}-${ename}`);
}

// funcions
//get elment class 
function getElementClass(element) {
    classes = element.classList;
    for (let index = 0; index < allElementClasses[0].length; index++) {
        const eClass = allElementClasses[0][index];
        if (classes.contains(eClass)) {
            // console.log("ok")
            return eClass;
        }
    }

    for (let index = 0; index < allElementClasses[1].length; index++) {
        const eClass = allElementClasses[1][index];
        if (classes.contains(eClass)) {
            // console.log("ok")
            return eClass;
        }
    }
    return NaN;
}

// remove prewu path
function removePrewusPath() {
    //remove perwius selected paths
    selectedPathIndexes.forEach(index => {
        allBoxes[index].classList.remove("selectedPath");
        allBoxes[index].classList.remove("canAttackPath");

    })
}

// remove prewus selected element
function removePrewusSelectedElement() {
    // delete the styling of prewus selected element
    if (selectedElementIndex === null) {
        return;
    }
    allBoxes[selectedElementIndex].classList.remove("selectedElm");
    selectedElementIndex = null;
}

// change turn
function changeTurn() {
    if (currentTurn !== "") {
        currentTurn = currentTurn === "l" ? "d" : "l";
        // console.log(currentTurn);
    }
}


// put selected element at targeted element
function putSelectedElementAt(targete) {
    const elementClass = getElementClass(allBoxes[selectedElementIndex]);
    const typeOfElm = allBoxes[selectedElementIndex].classList.contains("l") ? "l" : "d";
    allBoxes[selectedElementIndex].classList.remove(elementClass);
    allBoxes[selectedElementIndex].classList.remove("elm");
    allBoxes[selectedElementIndex].classList.remove(typeOfElm);

    // add in new place
    targete.classList.add(elementClass);
    targete.classList.add("elm");
    targete.classList.add(typeOfElm);

}

// chack soldere reach at top or not
function isSoldurereachAtTop(index) {
    if (index < 8 || index > 56) {
        return true;
    }
    return false;
}

// show Add Panel
function showAddPanel(addBoxof, index) {
    document.getElementsByClassName("selectBox")[0].style.display = "block";
    oftype = addBoxof.classList.contains("l") ? "l" : "d";
    atIndex = index;

}

//elements paths

//soldure path
function soldurePath(index) {
    let returnPath = [];
    if (allBoxes[index].classList.contains("d")) {
        // left
        if ((index % 8 !== 0) && allBoxes[index + 7].classList.contains("elm")) {
            if (allBoxes[index + 7].classList.contains("l")) {
                allBoxes[index + 7].classList.add("canAttackPath");
                returnPath.push(index + 7);
            }
        }

        // right
        if (((index + 1) % 8 !== 0) && allBoxes[index + 9].classList.contains("elm")) {
            if (allBoxes[index + 9].classList.contains("l")) {
                allBoxes[index + 9].classList.add("canAttackPath");
                returnPath.push(index + 9);
            }
        }

        //regular stap
        if (!(allBoxes[index + 8].classList.contains("elm")) && (index + 8 < 64)) {
            allBoxes[index + 8].classList.add("selectedPath");
            returnPath.push(index + 8);
            if ((index < 16) && index > 7 && !(allBoxes[index + 16].classList.contains("elm"))) {
                allBoxes[index + 16].classList.add("selectedPath");
                returnPath.push(index + 16);
            }
        }

    }
    else {
        // right atteck
        if (((index + 1) % 8 !== 0) && allBoxes[index - 7].classList.contains("elm")) {
            if (allBoxes[index - 7].classList.contains("d")) {
                allBoxes[index - 7].classList.add("canAttackPath");
                returnPath.push(index - 7);
            }
        }

        // left atteck
        if ((index % 8 !== 0) && allBoxes[index - 9].classList.contains("elm")) {
            if (allBoxes[index - 9].classList.contains("d")) {
                allBoxes[index - 9].classList.add("canAttackPath");
                returnPath.push(index - 9);
            }
        }

        //regular stap
        if (!(allBoxes[index - 8].classList.contains("elm")) && (index - 8 > 0)) {
            allBoxes[index - 8].classList.add("selectedPath");
            returnPath.push(index - 8);
            if ((index > 47) && index < 64 && !(allBoxes[index - 16].classList.contains("elm"))) {
                allBoxes[index - 16].classList.add("selectedPath");
                returnPath.push(index - 16);
            }
        }

    }
    return returnPath;
}

// Elephent Path
function elephentPath(index) {

    let returnPath = [];
    let opositeElement = "l";
    let leftPossible = true, rightPossible = true, topPossible = true, bottomPossible = true;
    const leftBoxes = index < 8 ? index : index % 8;
    const rightBoxes = 7 - leftBoxes;
    // console.log("ele")
    if (allBoxes[index].classList.contains("l")) {
        opositeElement = "d"
    }

    for (let i = 1; i < 8; i++) {

        // for left side boxes
        if ((i <= leftBoxes) && leftPossible) {
            if (allBoxes[index - i].classList.contains("elm")) {
                leftPossible = false;
                if (allBoxes[index - i].classList.contains(opositeElement)) {
                    allBoxes[index - i].classList.add("canAttackPath");
                    returnPath.push(index - i);
                }
            }

            else {
                allBoxes[index - i].classList.add("selectedPath");
                returnPath.push(index - i);
            }
        }

        // for right side boxes
        if ((i <= rightBoxes) && rightPossible) {
            if (allBoxes[index + i].classList.contains("elm")) {
                rightPossible = false;
                if (allBoxes[index + i].classList.contains(opositeElement)) {
                    allBoxes[index + i].classList.add("canAttackPath");
                    returnPath.push(index + i);
                }
            }

            else {
                allBoxes[index + i].classList.add("selectedPath");
                returnPath.push(index + i);
            }
        }

        // for bottom side boxies
        if (index + (i * 8) < 64 && bottomPossible) {
            if (allBoxes[index + i * 8].classList.contains("elm")) {
                bottomPossible = false;
                if (allBoxes[index + i * 8].classList.contains(opositeElement)) {
                    allBoxes[index + i * 8].classList.add("canAttackPath");
                    returnPath.push(index + i * 8);
                }
            }

            else {
                allBoxes[index + i * 8].classList.add("selectedPath");
                returnPath.push(index + i * 8);
            }
        }

        // for top side boxies
        if (index - (i * 8) >= 0 && topPossible) {
            if (allBoxes[index - i * 8].classList.contains("elm")) {
                topPossible = false;
                if (allBoxes[index - i * 8].classList.contains(opositeElement)) {
                    allBoxes[index - i * 8].classList.add("canAttackPath");
                    returnPath.push(index - i * 8);
                }
            }

            else {
                allBoxes[index - i * 8].classList.add("selectedPath");
                returnPath.push(index - i * 8);
            }
        }
    }
    return returnPath;

}


// hours path
function hoursPath(index) {
    let returnPath = [];
    const topBoxes = parseInt(index / 8);
    const bottomBoxes = 7 - topBoxes;
    const leftBoxes = index < 8 ? index : index % 8;
    const rightBoxes = 7 - leftBoxes;
    const typeofelm = allBoxes[index].classList.contains("l") ? "l" : "d";

    // console.log("topBoxes:", topBoxes, "bottomBoxes:", bottomBoxes, "leftBoxes:", leftBoxes, "rightBoxes:", rightBoxes, "typeofelm:", typeofelm)

    if (topBoxes > 0) {
        if (leftBoxes > 1 && !allBoxes[index - 10].classList.contains(typeofelm)) {
            returnPath.push(index - 10);
        }

        if (rightBoxes > 1 && !allBoxes[index - 6].classList.contains(typeofelm)) {
            returnPath.push(index - 6);
        }

        if (topBoxes > 1) {
            if (leftBoxes > 0 && !allBoxes[index - 17].classList.contains(typeofelm)) {
                returnPath.push(index - 17);
            }

            if (rightBoxes > 0 && !allBoxes[index - 15].classList.contains(typeofelm)) {
                returnPath.push(index - 15);

            }

        }
    }

    if (bottomBoxes > 0) {
        if (leftBoxes > 1 && !allBoxes[index + 6].classList.contains(typeofelm)) {
            returnPath.push(index + 6);
        }

        if (rightBoxes > 1 && !allBoxes[index + 10].classList.contains(typeofelm)) {
            returnPath.push(index + 10);
        }

        if (bottomBoxes > 1) {
            if (leftBoxes > 0 && !allBoxes[index + 15].classList.contains(typeofelm)) {
                returnPath.push(index + 15);
            }

            if (rightBoxes > 0 && !allBoxes[index + 17].classList.contains(typeofelm)) {
                returnPath.push(index + 17);
            }

        }
    }
    returnPath.forEach((elm => {
        if (allBoxes[elm].classList.contains("elm")) {
            allBoxes[elm].classList.add("canAttackPath");
        }
        else {
            allBoxes[elm].classList.add("selectedPath");
        }
    }))

    return returnPath;

}


// camal path
function camalPath(index) {
    let returnPath = [];
    let topRightPosible = true, bottomRightPosible = true, topLeftPosible = true, bottomLeftPosible = true;
    const topBoxes = parseInt(index / 8);
    const bottomBoxes = 7 - topBoxes;
    const leftBoxes = index < 8 ? index : index % 8;
    const rightBoxes = 7 - leftBoxes;
    const opositeElement = allBoxes[index].classList.contains("d") ? "l" : "d";

    for (let i = 1; i < 8; i++) {

        // top left
        if (topLeftPosible && i <= topBoxes && i <= leftBoxes) {
            if (allBoxes[index - 9 * i].classList.contains("elm")) {
                topLeftPosible = false;
                if (allBoxes[index - 9 * i].classList.contains(opositeElement)) {
                    allBoxes[index - 9 * i].classList.add("canAttackPath");
                    returnPath.push(index - 9 * i);
                }
            }
            else {
                allBoxes[index - 9 * i].classList.add("selectedPath");
                returnPath.push(index - 9 * i);
            }
        }

        // top right
        if (topRightPosible && i <= topBoxes && i <= rightBoxes) {
            if (allBoxes[index - 7 * i].classList.contains("elm")) {
                topRightPosible = false;
                if (allBoxes[index - 7 * i].classList.contains(opositeElement)) {
                    allBoxes[index - 7 * i].classList.add("canAttackPath");
                    returnPath.push(index - 7 * i);
                }
            }
            else {
                allBoxes[index - 7 * i].classList.add("selectedPath");
                returnPath.push(index - 7 * i);
            }
        }

        // bottom left
        if (bottomLeftPosible && i <= bottomBoxes && i <= leftBoxes) {
            if (allBoxes[index + 7 * i].classList.contains("elm")) {
                bottomLeftPosible = false;
                if (allBoxes[index + 7 * i].classList.contains(opositeElement)) {
                    allBoxes[index + 7 * i].classList.add("canAttackPath");
                    returnPath.push(index + 7 * i);
                }
            }
            else {
                allBoxes[index + 7 * i].classList.add("selectedPath");
                returnPath.push(index + 7 * i);
            }
        }
        // bottom right
        if (bottomRightPosible && i <= bottomBoxes && i <= rightBoxes) {
            if (allBoxes[index + 9 * i].classList.contains("elm")) {
                bottomRightPosible = false;
                if (allBoxes[index + 9 * i].classList.contains(opositeElement)) {
                    allBoxes[index + 9 * i].classList.add("canAttackPath");
                    returnPath.push(index + 9 * i);
                }
            }
            else {
                allBoxes[index + 9 * i].classList.add("selectedPath");
                returnPath.push(index + 9 * i);
            }
        }
    }
    return returnPath;

}


// Queen path 
function queenPath(index) {
    let returnPath = [];
    returnPath = elephentPath(index).concat(camalPath(index));
    return returnPath;

}


// king path
function kingPath(index) {
    let returnPath = [];
    // let topRightPosible = true, bottomRightPosible = true, topLeftPosible = true, bottomLeftPosible = true;
    const topBoxes = parseInt(index / 8);
    const bottomBoxes = 7 - topBoxes;
    const leftBoxes = index < 8 ? index : index % 8;
    const rightBoxes = 7 - leftBoxes;
    const elementType = allBoxes[index].classList.contains("l") ? "l" : "d";

    if (topBoxes > 0) {
        if (!allBoxes[index - 8].classList.contains(elementType)) {
            returnPath.push(index - 8);
        }

        if (leftBoxes > 0 && !allBoxes[index - 9].classList.contains(elementType)) {
            returnPath.push(index - 9);
        }

        if (rightBoxes > 0 && !allBoxes[index - 7].classList.contains(elementType)) {
            returnPath.push(index - 7);
        }
    }

    if (bottomBoxes > 0) {
        if (!allBoxes[index + 8].classList.contains(elementType)) {
            returnPath.push(index + 8);
        }

        if (leftBoxes > 0 && !allBoxes[index + 7].classList.contains(elementType)) {
            returnPath.push(index + 7);
        }

        if (rightBoxes > 0 && !allBoxes[index + 9].classList.contains(elementType)) {
            returnPath.push(index + 9);
        }
    }

    if (leftBoxes > 0 && !allBoxes[index - 1].classList.contains(elementType)) {
        returnPath.push(index - 1);
    }

    if (rightBoxes > 0 && !allBoxes[index + 1].classList.contains(elementType)) {
        returnPath.push(index + 1);
    }

    returnPath.forEach((elm => {
        if (allBoxes[elm].classList.contains("elm")) {
            allBoxes[elm].classList.add("canAttackPath");
        }
        else {
            allBoxes[elm].classList.add("selectedPath");
        }
    }))

    return returnPath;

}

//select selected element path
function highlightPath(elm, index) {
    if (elm.classList.contains(currentTurn)) { // if turn is selected

        elm.classList.add("selectedElm");

        if (elm.classList.contains("d-s") || elm.classList.contains("l-s")) {
            selectedPathIndexes = soldurePath(index);
        }
        else if (elm.classList.contains("d-e") || elm.classList.contains("l-e")) {
            selectedPathIndexes = elephentPath(index);
        }
        else if (elm.classList.contains("d-h") || elm.classList.contains("l-h")) {
            selectedPathIndexes = hoursPath(index);
        }
        else if (elm.classList.contains("d-c") || elm.classList.contains("l-c")) {
            selectedPathIndexes = camalPath(index);
        }
        else if (elm.classList.contains("d-q") || elm.classList.contains("l-q")) {
            selectedPathIndexes = queenPath(index);
        }
        else if (elm.classList.contains("d-k") || elm.classList.contains("l-k")) {
            selectedPathIndexes = kingPath(index);
        }

        //chamge selected element
        selectedElementIndex = index;
    }
}

