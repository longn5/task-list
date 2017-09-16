let adder = document.getElementById("addBtn");
let inputValue = document.getElementById("inputText");
let list = document.getElementById("list");
let outerDiv = document.getElementById("outer-div");
let innerDiv = document.getElementById("inner-div");
let clockTime = document.getElementById("clock");
let form = document.getElementById("formElement");
let listItems = [];
let needToLoad = false;
let indexLocation = 0;

/*load list from localStorage
*if list exist in localStorage then list is copied to listItems variable
*/
if (localStorage.getItem("listItems") == null) {
  console.log("List is empty");
} else {
  listItems = JSON.parse(localStorage.getItem("listItems"));
  needToLoad = true;
  for (let i = 0; i < listItems.length; i++) {
    listFromStorage(listItems[i]);
  }
}

//function to add localStorage list items to screen
function listFromStorage(listItem) {
  function createElement(elementName, property, value) {
    const element = document.createElement(elementName);
    element[property] = value;
    return element;
  }

  //create main list item
  let newTask = document.createElement("li");
  newTask.style.listStyleType = "none";
  let span = createElement("span", "textContent", listItem);

  //add class to checkMark and make hidden until list item is clicked on
  let checkMark = createElement("span", "className", "glyphicon glyphicon-ok");
  checkMark.style.visibility = "hidden";

  //add check mark and list item to list
  newTask.appendChild(span);
  list.appendChild(checkMark);
  list.appendChild(newTask);

  //add edit and remove button to list item
  removeBtn(newTask);
  editBtn(newTask);

  //function to move div up or down depending on which button is clicked
  let marginVal = parseInt(innerDiv.style.height);
  function modDiv(marginVal) {
    marginVal = marginVal + "px";
    innerDiv.style.height = marginVal;
  }
  if (list.childNodes.length > 6) {
      marginVal += 40;
      modDiv(marginVal);
    }
}

// event listener for user input
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addEvent(event, needToLoad);
});

//create list item and check mark elements
let addEvent = (event) => {
  if (inputValue.value != "" || needToLoad) {

    //function to create elements
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    }

    //create main list item
    let newTask = document.createElement("li");
    newTask.style.listStyleType = "none";
    let span = createElement("span", "textContent", inputValue.value);
    saveToStorage(inputValue.value);

    //add class to checkMark and make hidden until list item is clicked on
    let checkMark = createElement("span", "className", "glyphicon glyphicon-ok");
    checkMark.style.visibility = "hidden";

    //add check mark and list item to list
    newTask.appendChild(span);
    list.appendChild(checkMark);
    list.appendChild(newTask);
    inputValue.value = ""; //clear input field after list item is added to list

    //add edit and remove button to list item
    removeBtn(newTask);
    editBtn(newTask);

    moveDiv(event); //move background if necessary
  } else {
    alert("Cannot add empty task!");
  }
};

//moves background up or down
function moveDiv (event) {

  let fromAdd = event.currentTarget;
  let fromRemove = event.target;
  let marginVal = parseInt(innerDiv.style.height);

  //function to move div up or down depending on which button is clicked
  function modDiv(marginVal) {
    marginVal = marginVal + "px";
    innerDiv.style.height = marginVal;
  }

  if (list.childNodes.length > 6) {
    if (fromAdd.className == "formElement") {
      marginVal += 40;
      modDiv(marginVal);
    }
    if (fromRemove.className == "btn btn-danger") {
      marginVal -= 40;
      modDiv(marginVal);
    }
  }
}

//create new remove button for list item
function removeBtn(newTask) {
  let removeBtn = document.createElement("button");
  removeBtn.className = "btn btn-danger";
  removeBtn.textContent = "X";
  newTask.appendChild(removeBtn);
};

//create new edit button for list item
function editBtn(newTask) {
  let editBtn = document.createElement("button");
  editBtn.className = "btn btn-warning";
  editBtn.textContent = "edit";
  newTask.appendChild(editBtn);
  return editBtn;
};

//create save button for list item
function saveBtn(liItem) {
  let saveBtn = document.createElement("button");
  saveBtn.className = "btn btn-success";
  saveBtn.textContent = "save";
  liItem.appendChild(saveBtn);
  return saveBtn;
};

//function to remove list item from localStorage
function removeFromStorage(item) {
  for(let i = 0 ; i < listItems.length; i++){
    if(listItems[i] === item){
      listItems.splice(i,1);
      localStorage.setItem('listItems', JSON.stringify(listItems));
      indexLocation = i;
    }
  }
}
function addToStorage(item){
  listItems.splice(indexLocation, 0, item);
  localStorage.setItem('listItems', JSON.stringify(listItems));
}

//Event listner for remove/edit or strikethrough on list item
list.addEventListener("click", (event) => {
  event.preventDefault();
  const userClickedOn = event.target;

  if (userClickedOn.tagName == "BUTTON") {
    let li = userClickedOn.parentNode;
    let ul = li.parentNode;

    function removeLI() {
      moveDiv(event);
      let checkMark = userClickedOn.parentNode.previousSibling;
      ul.removeChild(li);
      ul.removeChild(checkMark);
      removeFromStorage(li.firstElementChild.textContent);
    }

    function edit() {
      let span = li.firstElementChild;

      //create input text field and sets style
      let input = document.createElement("input");
      input.type = "text";
      input.value = span.textContent;

      //removes targeted list item from array when edit button is clicked

      for(let i = 0 ; i < listItems.length; i++){
        if(listItems[i] === span.textContent){
          listItems.splice(i,1);
          indexLocation = i;
        }
      }

      input.style.background = "#40AAD3";
      input.style.border = "none";
      input.style.outlline = "none";
      const editBtn = userClickedOn;
      li.insertBefore(input, span);
      li.removeChild(span);
      li.replaceChild(saveBtn(li), editBtn);
    }

    function save(indexLocation) {
      let span = document.createElement("span");
      let input = li.firstElementChild;
      span.textContent = input.value;
      addToStorage(span.textContent);//adds edited item to localStorage
      li.insertBefore(span, input);
      li.removeChild(input);
      const saveBtn = document.getElementsByClassName("btn btn-success")[0];
      li.replaceChild(editBtn(li), saveBtn);
    }

    if (userClickedOn.className == "btn btn-danger") {
      removeLI();
    } else if (userClickedOn.className == "btn btn-warning") {
      edit();
    } else if (userClickedOn.className == "btn btn-success") {
      save(indexLocation);
    }
  } else if (userClickedOn.tagName == "SPAN") {
    let strike = userClickedOn;
    if (strike.style.textDecoration === "none" || strike.style.textDecoration === "") {
      strike.style.textDecoration = "line-through";
      strike.parentNode.previousSibling.style.visibility = "visible";
      removeFromStorage(strike.textContent);
    } else {
      strike.style.textDecoration = "none";
      strike.parentNode.previousSibling.style.visibility = "hidden";
      addToStorage(strike.textContent);
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

/*functions to store list items to localStorage
*/
let saveToStorage = (value) => {

  listItems.push(value);
  localStorage.setItem('listItems', JSON.stringify(listItems));

};
