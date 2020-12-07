console.log(localStorage.length);
let listHTML = "";
let list = [];
isEdit: boolean = false;
currentGuid = "";
document.getElementById("inputField").innerHTML =
  "<input type=text id=input Placeholder='Add a to-do'>";
document.getElementById("button").innerHTML =
  "<input id=button value=Add onclick=msg()>";

// Nothing to study here. Everytime just have to copy and paste to use it

function CreateGuid() {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

for (let i = 0; i < localStorage.length; ++i) {
  list.push({
    ItemId: localStorage.key(i),
    item: localStorage.getItem(localStorage.key(i)),
  });
  listHTML +=
    "<li>" +
    list[i].item +
    "<button onclick=clickDone(list['" +
    i +
    "'])>Done</button>" +
    "<button onclick = deleteItem(list['" +
    i +
    "'])>Delete</button> <button onclick = editList(list['" +
    i +
    "'])>Edit</button></li>";
  document.getElementById("LIST").innerHTML = listHTML;
}
console.log(list);

// var list1 = document.querySelector('ul');
// list1.addEventListener('click', function(ev) {
//   // console.log(ev) ;
//   if (ev.target.tagName === 'LI') {
//     console.log(ev)
//     ev.target.classList.toggle('checked');
//   }
// }, false);

function clickDone(arg) {
  console.log("click done", arg);
}

function deleteItem(arg) {
  console.log("Item deleted", arg);
  localStorage.removeItem(arg.ItemId);
  location.reload();
}

function editList(arg) {
  document.getElementById("button").innerHTML =
    "<input id=button value=Update onclick=update()>";
  currentGuid = arg.ItemId;
  document.getElementById("input").value = arg.item;
}

function msg() {
  // console.log("Hello World", document.getElementById("input").value);
  localStorage.setItem(CreateGuid(), document.getElementById("input").value);
  // console.log(localStorage.key(0), localStorage.getItem(localStorage.key(0)));
  location.reload();
}

function update() {
  localStorage.setItem(currentGuid, document.getElementById("input").value);
  currentGuid = "";
  location.reload();
}
