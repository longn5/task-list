let adder = document.getElementById("addBtn");
let inputValue = document.getElementById("inputText");
let list = document.getElementById("list");
let outerDiv = document.getElementById("outer-div");
let innerDiv = document.getElementById("inner-div");
let clockTime = document.getElementById("clock");
let form = document.getElementById("formElement");

// event listener for user input
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addEvent(event);
});

//moves background up or down
let moveDiv = (event) => {
  let fromAdd = event.currentTarget;
  let fromRemove = event.target;
  let marginVal;
  if (list.childNodes.length > 6) {
    if (fromAdd.className == "formElement") {
      marginVal = parseInt(innerDiv.style.height);
      marginVal += 40;
      innerDiv.style.height = marginVal + "px";
    }

  if (fromRemove.className == "btn btn-danger") {
    marginVal = parseInt(innerDiv.style.height);
    marginVal -= 40;
    innerDiv.style.height = marginVal + "px";
  }
}
}

//create list item and check mark elements
let addEvent = (event) => {
  if (inputValue.value != "") {

    //create main list item
    let newTask = document.createElement("li");
    newTask.style.listStyleType = "none";
    let newText = document.createTextNode(inputValue.value);

    //add class to checkMark and make hidden until list item is clicked on
    let checkMark = document.createElement("span");
    checkMark.className = "glyphicon glyphicon-ok";
    checkMark.style.visibility = "hidden";

    //add check mark and list item to list
    newTask.appendChild(newText);
    list.appendChild(checkMark);
    list.appendChild(newTask);

    //clear input field after list item is added to list
    inputValue.value = "";
    //add remove button to list item
    remove(newTask);
    //move background if necessary
    moveDiv(event);
  } else {
    alert("Cannot add empty task!");
  }
};

//create new remove button for list item
let remove = (newTask) => {
  let removeBtn = document.createElement("button");
  removeBtn.className = "btn btn-danger";
  removeBtn.textContent = "remove";
  //removeBtn.style.marginLeft = "10em";
  newTask.appendChild(removeBtn);
};

//Event listner for remove or strikethrough on list item
list.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.tagName == "BUTTON") {
    if (event.target.className == "btn btn-danger") {
      moveDiv(event);
      let li = event.target.parentNode;
      let ul = li.parentNode;
      let checkMark = event.target.parentNode.previousSibling;

      ul.removeChild(li);
      ul.removeChild(checkMark);

    }
  }
  if (event.target.tagName == "LI") {
    let strike = event.target;
    if (strike.style.textDecoration === "none" || strike.style.textDecoration === "") {
      strike.style.textDecoration = "line-through";
      strike.previousSibling.style.visibility = "visible";
    } else {
      strike.style.textDecoration = "none";
      strike.previousSibling.style.visibility = "hidden";
    }
  }
});

let clock = () =>{
  let time = new Date();
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  clockTime.innerHTML = h + ":" + m + ":" + s;
  let t = setTimeout(clock, 500);
};

let checkTime = (i) =>{
  if (i<10){
    i = "0" + i;
  }
  return i;
};
