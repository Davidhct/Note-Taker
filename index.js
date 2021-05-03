let index = 0;

if (window.localStorage.getItem("noteStorage") == undefined) {
  let noteStorage = [];

  window.localStorage.setItem("noteStorage", JSON.stringify(noteStorage));
}

let noteArray = localStorage.getItem("noteStorage");
let noteStorage = JSON.parse(noteArray);

document.getElementById("add-btn").addEventListener("click", run);

onload = function () {
  while (index < noteStorage.length) {
    let mytitle = noteStorage[index].title;
    let mynote = noteStorage[index].note;

    const note = new Note(mytitle, mynote);
    note.createNote();

    index++;
  }
};

class Note {
  constructor(title, note) {
    this.title = title;
    this.note = note;
    console.log(title);
    console.log(this.title);
  }

  createNote() {
    let section = document.getElementById("board");

    let article = document.createElement("article");
    let span = document.createElement("span");
    let p = document.createElement("p");
    let div = document.createElement("div");
    let viewBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");

    let editIcon = document.createElement("img");
    let deleteIcon = document.createElement("img");

    let divModal = document.createElement("div");

    article.id = "modal";
    span.id = "inner-title";
    p.id = "inner-para";
    div.id = "inner-div-btn";
    viewBtn.id = "detail-btn";
    editBtn.id = "edit-btn";
    deleteBtn.id = "delete-btn";
    editIcon.id = "edit-icon";
    deleteIcon.id = "delete-icon";

    editIcon.src = "./css/images/edit_icon.png";
    deleteIcon.src = "./css/images/delete_icon.png";
    viewBtn.innerHTML = "View Detail";

    editBtn.appendChild(editIcon);
    deleteBtn.appendChild(deleteIcon);

    viewBtn.classList.add("detail-btn");
    editBtn.classList.add("edit-btn");
    deleteBtn.classList.add("delete-btn");

    span.innerHTML = this.title;
    p.innerHTML = this.note;

    console.log(this.title);
    div.appendChild(viewBtn);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);

    article.appendChild(span);
    article.appendChild(p);
    article.appendChild(div);
    divModal.appendChild(article);
    section.appendChild(divModal);

    viewBtn.addEventListener("click", this.viewDetail);
  }

  viewDetail(event) {
    let modal = event.target.parentNode.parentNode.parentNode;
    let modalDetail = event.target.parentNode.parentNode;
    console.log(modalDetail);
    console.log(modalDetail.childNode);

    modal.classList.toggle("modal");
    modalDetail.classList.toggle("display");

    // modalDetail[1].classList.toggle("modal-para");
    modal.style.display = "block";

    // console.log((this.parentNode.parentNode.));
  }
}

function run() {
  let mytitle = document.getElementById("title").value.trim();
  let mynote = document.getElementById("note").value.trim();

  if (mytitle === "") {
    mytitle = "Note".concat(index);
  }
  if (mynote === "") {
    alert("You did not write anything! ");
  } else {
    obj = {
      title: mytitle,
      note: mynote,
    };

    noteStorage.push(obj);
    updateStorage();

    mytitle = noteStorage[index].title;
    mynote = noteStorage[index].note;

    const note = new Note(mytitle, mynote);

    note.createNote();
  }
  document.getElementById("title").value = "";
  document.getElementById("note").value = "";
  index++;
}

function updateStorage() {
  localStorage.setItem("noteStorage", JSON.stringify(noteStorage));
}
