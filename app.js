let listHTML = "";
let list = [];
let currentGuid = "";
// Creating a form to take input and a button to enter the input
document.getElementById("inputField").innerHTML =
  "<input type = text id=input Placeholder='Add a to-do'>";
document.getElementById("button").innerHTML =
  "<input type=button value=Add onclick=msg()>";

// For creting unique Id

function CreateGuid() {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

function msg() {
  localStorage.setItem(CreateGuid(), document.getElementById("input").value);
  location.reload();
}

for (let i = 0; i < localStorage.length; ++i) {
  list.push({
    ItemID: localStorage.key(i),
    Item: localStorage.getItem(localStorage.key(i))
  });
  listHTML +=
    "<li>" +
    list[i].Item +
    "<button onclick=Done(list['" +
    i +
    "'])>Done</button> <button onclick=Delete(list['" +
    i +
    "'])>Delete</button> <button onclick=Edit(list['" +
    i +
    "'])>Edit</button> </li>";
    document.getElementById("LIST").innerHTML = listHTML ;
}

function Done(event) {
    console.log("Event completed successfully") ;
}

function Delete(event) {
    localStorage.removeItem(event.ItemID) ; 
    let index = list.indexOf(event) ; 
    if(index > -1)list.splice(index, 1) ; 
    location.reload() ; 
}

function Edit(event) {
    document.getElementById("button").innerHTML = "<input type=button value=Update onclick=update()>" ;
    currentGuid = event.ItemID ;
    document.getElementById("input").value = event.Item ;
}

function update() {
    localStorage.setItem(currentGuid, document.getElementById("input").value) ;
    currentGuid = "" ; 
    location.reload() ; 
}



