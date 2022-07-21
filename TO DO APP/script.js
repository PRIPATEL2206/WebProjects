var titleBox=document.getElementsByTagName("input")[0];
var discribtionBox=document.getElementsByTagName("textarea")[0];
var saveButton=document.getElementsByTagName("button")[0];
var contentBox=document.getElementsByClassName("contener")[0];

function saveIt(){

    // chack for empy titel box
    if(titleBox.value==""){
         alert("Title field is required")
         return;
    }

    // save the content
    var newcontentBox=document.createElement("div");
    newcontentBox.classList.add("contentBox");
    newcontentBox.innerHTML=`<h3 class="content">${titleBox.value}</h3>
        <h3 class="content">${discribtionBox.value}</h3>
        <button class="editButton" onclick="openEdit(this)">&#x270f</button>
        <button class="removebutton" onclick="remove(this)">X</button>`;
    contentBox.append(newcontentBox);
    titleBox.value="";
    discribtionBox.value=""

    if(contentBox.childElementCount==4){
        contentBox.children[0].textContent="Pending Work";  

    }

}

// open edit box for edit
function openEdit(e){
    if(e.innerHTML=="✔"){
        // place text return

        // place title
        var title = document.createElement("h3");
        title.classList.add("content");
        title.textContent=e.parentElement.children[0].value;
        e.parentElement.replaceChild(title,e.parentElement.children[0]);

        // place discription
        var discribtion = document.createElement("h3");
        discribtion.classList.add("content");
        discribtion.textContent=e.parentElement.children[1].value;
        e.parentElement.replaceChild(discribtion,e.parentElement.children[1]);
        
        // out from edit mode
        e.innerHTML="✏";
        return ;
    }
   
    //to edit title 
    var editTitle=document.createElement("input");
    editTitle.classList.add("content");
    editTitle.type="text";
    editTitle.value=e.parentElement.children[0].textContent;
    e.parentElement.replaceChild(editTitle,e.parentElement.children[0]);
    // document.textContent

    //to edit discribtion
    var editDiscribtion=document.createElement("input");
    editDiscribtion.classList.add("content");
    editDiscribtion.type="text";
    editDiscribtion.value=e.parentElement.children[1].textContent;
    e.parentElement.replaceChild(editDiscribtion,e.parentElement.children[1]);        
    
    // change edit symbol
    e.innerHTML="&#10004;";
}

// remove box
function remove(e){

    e.parentElement.remove();
    if(contentBox.children.length==3){
        contentBox.children[0].textContent="Their is no pending work 🥳🥳";
    }
}

saveButton.addEventListener("click",saveIt);