let listHTML = "";
let list = [];
let currentGuid = "";
let key = "ToDo";

// Style part

document.body.style.cssText =
  "margin: 100px auto; width: 50%; height: 100%; box-sizing: border-box; background-color: lightgray;";
document.getElementById("header").style.cssText =
  "background-color: white; box-shadow: 0px 5px rgba(70, 70, 70, 0.1); display: flex; justify-content: center; margin: 20px 0px;";
document.getElementById("title").style.cssText =
  "font-size: 60px; letter-spacing: 50px; color: darkgray; box-sizing: border-box; margin: 50px; text-align: center;";
document.getElementById("inputField").style.cssText = "float: left;";
//document.getElementById("button").style.cssText = "background-color: #4287f5; color: white; width: 60px; height: 30px; font-size: 18px;" ;
document.getElementById("container").style.cssText =
  "background-color: white; padding: 5px";
document.getElementById("add-to-do").style.cssText = "margin: 5px";

// Creating a form to take input and a button to enter the input

document.getElementById("inputField").innerHTML =
  "<input type = text id=input Placeholder='Add a to-do'>";
document.getElementById("button").innerHTML =
  "<input type=button value=Add onclick=message()>";

// For creting unique Id

function CreateGuid() {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

function message() {
  let id = CreateGuid();
//   console.log(typeof id);
  var newTask = {
    title: document.getElementById("input").value,
    taskId: id,
    done: false,
    due_time: "",
    due_date: "",
  };
//   console.log(newTask);
  if (localStorage.getItem(key) != null)
    list = JSON.parse(localStorage.getItem(key));
//   console.log(list);
  list.push(newTask);
  localStorage.setItem(key, JSON.stringify(list));
  location.reload();
}

var newList = JSON.parse(localStorage.getItem(key));

let lengthOfList = newList == null ? 0 : newList.length;

for (let i = 0; i < lengthOfList; ++i) {
  //   console.log(newList[i]);
  listHTML +=
    "<li id='" +
    newList[i].taskId +
    "'>" +
    newList[i].title +
    "<button onclick=Done(newList['" +
    i +
    "'])>Done</button> <button onclick=Delete(newList['" +
    i +
    "'])>Delete</button> <button onclick=Edit(newList['" +
    i +
    "'])>Edit</button> </li>";
  document.getElementById("LIST").innerHTML = listHTML;
//   if (newList[i].done == true) {
//     let id = newList[o].taskId;
//     document.getElementById(id).style.color = "green";
//   }
//   console.log(listHTML);
}

function Done(event) {
  console.log("Event completed successfully");
//   console.log(event);
  let id = event.taskId;
  document.getElementById(id).style.color = "green";
  if (localStorage.getItem(key) != null) {
    list = JSON.parse(localStorage.getItem(key));
    // console.log(list);
    let itemId = -1;
    for (let i = 0; i < list.length; ++i) {
      if (CheckEqulity(event, list[i]) === 1) {
        itemId = i;
        break;
      }
    }
    // console.log(itemId);
    list[itemId].done = true;
    localStorage.setItem(key, JSON.stringify(list));
  }
//   location.reload() ; 
}

function CheckEqulity(event1, event2) {
  if (
    event1.title === event2.title &&
    event1.taskId === event2.taskId &&
    event1.due_time === event2.due_time &&
    event1.due_date === event2.due_date &&
    event1.done === event2.done
  )
    return 1;
  else return 0;
}

function Delete(event) {
  localStorage.removeItem(event.taskId);
  let index = list.indexOf(event);
  if (index > -1) list.splice(index, 1);
  location.reload();
}

function Edit(event) {
  document.getElementById("button").innerHTML =
    "<input type=button value=Update onclick=update()>";
  currentGuid = event.ItemID;
  document.getElementById("input").value = event.Item;
}

function update() {
  localStorage.setItem(currentGuid, document.getElementById("input").value);
  currentGuid = "";
  location.reload();
}
