let listHTML = "";
let list = [];
let currentGuid = "" ;

// Style part

document.body.style.cssText = "margin: 100px auto; width: 50%; height: 100%; box-sizing: border-box; background-color: lightgray;" ;
document.getElementById("header").style.cssText = "background-color: white; box-shadow: 0px 5px rgba(70, 70, 70, 0.1); display: flex; justify-content: center; margin: 20px 0px;" ;
document.getElementById("title").style.cssText = "font-size: 60px; letter-spacing: 50px; color: darkgray; box-sizing: border-box; margin: 50px; text-align: center;" ;
document.getElementById("inputField").style.cssText = "float: left;" ;
//document.getElementById("button").style.cssText = "background-color: #4287f5; color: white; width: 60px; height: 30px; font-size: 18px;" ;
document.getElementById("container").style.cssText = "background-color: white; padding: 5px" ;
document.getElementById("add-to-do").style.cssText = "margin: 5px" ;



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

let idCounter = 0 ; 

for (let i = 0; i < localStorage.length; ++i) {
  list.push({
    elementId: ++idCounter,
    ItemID: localStorage.key(i),
    Item: localStorage.getItem(localStorage.key(i))
  });
  listHTML +=
    "<li id='"+idCounter+"'>" +
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
    let id = event.elementId ; 
    document.getElementById(id).style.color = "green" ;
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



