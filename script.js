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
    let span = document.createElement("span");
    span.textContent = inputValue.value;

    //add class to checkMark and make hidden until list item is clicked on
    let checkMark = document.createElement("span");
    checkMark.className = "glyphicon glyphicon-ok";
    checkMark.style.visibility = "hidden";

    //add check mark and list item to list
    newTask.appendChild(span);
    list.appendChild(checkMark);
    list.appendChild(newTask);

    //clear input field after list item is added to list
    inputValue.value = "";
    //add edit and remove button to list item
    removeBtn(newTask);
    editBtn(newTask);
    //move background if necessary
    moveDiv(event);
  } else {
    alert("Cannot add empty task!");
  }
};

//create new remove button for list item
let removeBtn = (newTask) => {
  let removeBtn = document.createElement("button");
  removeBtn.className = "btn btn-danger";
  removeBtn.textContent = "X";
  newTask.appendChild(removeBtn);
};

//create new edit button for list item
let editBtn = (newTask) => {
  let editBtn = document.createElement("button");
  editBtn.className = "btn btn-warning";
  editBtn.textContent = "edit";
  newTask.appendChild(editBtn);
  return editBtn;
};

//create save button for list item
let saveBtn = (liItem) => {
  let saveBtn = document.createElement("button");
  saveBtn.className = "btn btn-success";
  saveBtn.textContent = "save";
  liItem.appendChild(saveBtn);
  return saveBtn;
};

//Event listner for remove or strikethrough on list item
list.addEventListener("click", (event) => {
  event.preventDefault();

  if (event.target.tagName == "BUTTON") {

    let li = event.target.parentNode;
    let ul = li.parentNode;

    if (event.target.className == "btn btn-danger") {
      moveDiv(event);

      let checkMark = event.target.parentNode.previousSibling;

      ul.removeChild(li);
      ul.removeChild(checkMark//lets user edit a list item
      );

    } else if (event.target.className == "btn btn-warning") {
      let span = li.firstElementChild;
      //create input text field and sets style
      let input = document.createElement("input");
      input.type = "text";
      input.value = span.textContent;
      input.style.background = "#40AAD3";
      input.style.border = "none";
      input.style.outlline = "none";
      const editBtn = event.target;
      li.insertBefore(input, span);
      li.removeChild(span);
      li.replaceChild(saveBtn(li), editBtn);
    } else if (event.target.className == "btn btn-success") {
      let span = document.createElement("span");
      let input = li.firstElementChild;
      span.textContent = input.value;
      li.insertBefore(span, input);
      li.removeChild(input);
      const saveBtn = document.getElementsByClassName("btn btn-success")[0];
      // const editBtn = document.getElementsByClassName("btn btn-warning")[0];
      li.replaceChild(editBtn(li), saveBtn);
    }
  }

  if (event.target.tagName == "SPAN") {
    let strike = event.target;
    if (strike.style.textDecoration === "none" || strike.style.textDecoration === "") {
      strike.style.textDecoration = "line-through";
      strike.parentNode.previousSibling.style.visibility = "visible";
    } else {
      strike.style.textDecoration = "none";
      strike.parentNode.previousSibling.style.visibility = "hidden";
    }
  }
});

//create and load a digial clock
let clock = () => {
  let time = new Date();
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  clockTime.innerHTML = h + ":" + m + ":" + s;
  let t = setTimeout(clock, 500);
};

let checkTime = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};
