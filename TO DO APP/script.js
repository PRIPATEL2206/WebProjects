var titleBox = document.getElementsByTagName("input")[0];
var discribtionBox = document.getElementsByTagName("textarea")[0];
var saveButton = document.getElementsByTagName("button")[0];
var contentBox = document.getElementsByClassName("contener")[0];


// add all local store items
if (localStorage.getItem("todoItem") != null) {
    todojson = JSON.parse(localStorage.getItem("todoItem"));
    for (let i = 0; i < todojson.title.length; i++) {
        addInTaskbar(todojson.title[i], todojson.disc[i]);
    }
}

// chack if empy
if (contentBox.children.length == 3) {
    contentBox.children[0].textContent = "Their is no pending work 🥳🥳";
}

function saveIt() {

    // chack for empy titel box
    if (titleBox.value == "") {
        alert("Title field is required");
        return;
    }

    // save the content
    addInTaskbar(titleBox.value, discribtionBox.value);
    addInLocal(titleBox.value, discribtionBox.value);
    titleBox.value = "";
    discribtionBox.value = "";

    if (contentBox.childElementCount == 4) {
        contentBox.children[0].textContent = "Pending Work";
    }

}


// add in task bar
function addInTaskbar(title, disc) {
    var newcontentBox = document.createElement("div");
    newcontentBox.classList.add("contentBox");
    newcontentBox.innerHTML = `<h3 class="content">${title}</h3>
        <h3 class="content">${disc}</h3>
        <button class="editButton" onclick="openEdit(this)">&#x270f</button>
        <button class="removebutton" onclick="remove(this)">X</button>`;
    contentBox.append(newcontentBox);
}

// add in local storage
function addInLocal(title, disc) {
    let todojson = {};
    if (localStorage.getItem("todoItem") == null) {
        todojson['title'] = [];
        todojson['disc'] = [];
    }
    else {
        todojson = JSON.parse(localStorage.getItem("todoItem"));
    }

    todojson.title.unshift(`${title}`);
    todojson.disc.unshift(`${disc}`);
    localStorage.setItem("todoItem", JSON.stringify(todojson));

}
// open edit box for edit
function openEdit(e) {
    if (e.innerHTML == "✔") {
        // place text return

        // take previes title and disc
        preTitle=e.parentElement.children[4].children[0].innerHTML;
        PreDesc=e.parentElement.children[4].children[1].innerHTML;

        // place title
        var title = document.createElement("h3");
        title.classList.add("content");
        titleValue = e.parentElement.children[0].value;
        title.textContent = titleValue;
        e.parentElement.replaceChild(title, e.parentElement.children[0]);

        // place discription
        var discribtion = document.createElement("h3");
        discribtion.classList.add("content");
        descValue = e.parentElement.children[1].value;
        discribtion.textContent = descValue;
        e.parentElement.replaceChild(discribtion, e.parentElement.children[1]);

        // update in local
        todojson = JSON.parse(localStorage.getItem("todoItem"));
        index = chackIscontain(todojson.title, todojson.disc, preTitle, PreDesc);

        todojson.title[index] = titleValue;
        todojson.disc[index] = descValue;

        localStorage.setItem("todoItem", JSON.stringify(todojson));

        // out from edit mode
        e.innerHTML = "✏";
        return;
    }

    //to edit title 
    var editTitle = document.createElement("input");
    editTitle.classList.add("content");
    editTitle.type = "text";
    editTitle.value = e.parentElement.children[0].textContent;
    e.parentElement.replaceChild(editTitle, e.parentElement.children[0]);
    // document.textContent


    //to edit discribtion
    var editDiscribtion = document.createElement("input");
    editDiscribtion.classList.add("content");
    editDiscribtion.type = "text";
    editDiscribtion.value = e.parentElement.children[1].textContent;
    e.parentElement.replaceChild(editDiscribtion, e.parentElement.children[1]);

    // storing prewus title and desc
    preTag=document.createElement('div');
    preTag.style="display:none";
    preTag.innerHTML = `
    <span>${editTitle.value}</span>
    <span>${editDiscribtion.value}</span>`;
    e.parentElement.appendChild(preTag);

        // change edit symbol
        e.innerHTML = "&#10004;";
}

// remove box
function remove(e) {
    title = e.parentElement.children[0].innerHTML;
    desc = e.parentElement.children[1].innerHTML;

    todojson = JSON.parse(localStorage.getItem("todoItem"));
    index = chackIscontain(todojson.title, todojson.disc, title, desc);

    todojson.title.splice(index, 1);
    todojson.disc.splice(index, 1);
    localStorage.setItem("todoItem", JSON.stringify(todojson));
    e.parentElement.remove();

    if (contentBox.children.length == 3) {
        contentBox.children[0].textContent = "Their is no pending work 🥳🥳";
    }
}

function chackIscontain(l1, l2, title, desc) {
    index = l2.indexOf((desc));
    if (l1[index] === title) {
        return index;
    }
    return -1;
}

saveButton.addEventListener("click", saveIt);