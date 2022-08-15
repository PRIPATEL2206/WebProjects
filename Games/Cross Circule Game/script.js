// variables
let box=document.getElementsByClassName("box");
boxArray=Array.from(box);
let tearn="X"
let info=document.getElementById("turn");
let resetButton=document.getElementById("reset");
let winner="";

function changeTern(){
    return tearn==="X"?"O":"X";
}

function changeInfo(){
    info.textContent=`${tearn}'s terns`
}

function isNotEmty(){
    let space=0
    boxArray.forEach((element)=>{
        // console.log(element.textContent)
        if(element.textContent===""){
            space+=1;
        }
    })
    return space===0?true: false;
}

function chackForWon(){
    let winCondition=[
        [0,1,2,2,5,0],
        [3,4,5,2,17,0],
        [6,7,8,2,27,0],
        [0,3,6,-9,16,90],
        [1,4,7,2,16,90],
        [2,5,8,14,16,90],
        [0,4,8,2,16,45],
        [2,4,6,2,16,135]  
    ]
    
    winCondition.forEach((element)=>{
       if((boxArray[element[0]].textContent===boxArray[element[1]].textContent) && (boxArray[element[0]].textContent===boxArray[element[2]].textContent) &&(boxArray[element[0]].textContent!=="")){
        winner=boxArray[element[0]].textContent;
            info.textContent=`${winner} is won`;
            exited.style.width="12vw";
            line.style.height= "0.175vw";
            line.style.left=`${element[3]}vw`;
            line.style.top=`${element[4]}vw`;
            line.style.transform=`rotate(${element[5]}deg)`;
       }
    })

}
boxArray.forEach((element)=>{
    element.addEventListener("click",(e)=>{
        // console.log(e.target.content);
        if((e.target.textContent==="")&&winner===""){
        e.target.textContent=tearn;
        tearn=changeTern();
        changeInfo();
        // console.log(isNotEmty())
        if(isNotEmty()){
            info.textContent=`Thise match is drew`;
        }
        else{
            chackForWon();
        }
        }
    })
})

resetButton.addEventListener("click",()=>{
   boxArray.forEach((element)=>{
        element.textContent="";
        exited.style.width="0vw";
        tearn="X"
        winner="";
        changeInfo();
        line.style.height=`0`;
        // console.log(element.textContent)
    })
})