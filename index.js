let index = 0;
let viewFlag = true;
let noteIndex = 0;
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
  }

  createNote() {
    let section = document.getElementById("board");

    let article = document.createElement("article");
    let span = document.createElement("span");
    let ta = document.createElement("textarea");
    let div = document.createElement("div");
    let viewBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");

    let editIcon = document.createElement("img");
    let imgEditting = document.createElement("img");
    let deleteIcon = document.createElement("img");

    let divModal = document.createElement("div");

    article.id = "modal";
    span.id = "inner-title";
    ta.id = "inner-textarea";
    div.id = "inner-div-btn";
    viewBtn.id = "detail-btn";

    deleteBtn.id = "delete-btn";
    editIcon.id = "edit-icon";
    deleteIcon.id = "delete-icon";

    ta.disabled = true;

    editIcon.src = "./css/images/edit_icon.png";
    imgEditting.src = "./css/images/editting_icon.png";
    deleteIcon.src = "./css/images/delete_icon.png";
    viewBtn.innerHTML = "View Detail";

    editBtn.appendChild(editIcon);
    deleteBtn.appendChild(deleteIcon);

    editBtn.classList.add("edit-btn");
    deleteBtn.classList.add("delete-btn");

    span.innerHTML = this.title;
    ta.innerHTML = this.note;

    div.appendChild(viewBtn);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);

    article.appendChild(span);
    article.appendChild(ta);
    article.appendChild(div);
    divModal.appendChild(article);
    section.appendChild(divModal);
    editBtn.style.display = "none";
    viewBtn.addEventListener("click", () =>
      this.viewDetail(viewBtn, editBtn, deleteBtn, ta, imgEditting, editIcon)
    );
    editBtn.addEventListener("click", () =>
      this.edit(editBtn, editIcon, imgEditting, ta)
    );
    deleteBtn.addEventListener("click", () => this.delete(deleteBtn, ta));
  }

  viewDetail(viewBtn, editBtn, deleteBtn, ta, imgEditting, editIcon) {
    let modal = viewBtn.parentNode.parentNode.parentNode;
    let modalDetail = viewBtn.parentNode.parentNode;

    if (viewFlag === true) {
      modal.classList.toggle("modal");
      modalDetail.classList.toggle("display");
      ta.classList.toggle("inner-textarea");

      viewBtn.innerHTML = "Close Detail";
      viewBtn.classList.toggle("detail-btn");

      modal.style.display = "block";
      editBtn.style.display = "block";
      deleteBtn.style.display = "none";

      viewFlag = false;
    } else if (!viewFlag) {
      if (!ta.disabled) {
        ta.disabled = !ta.disabled;
        editBtn.removeChild(imgEditting);
        editBtn.appendChild(editIcon);
      }

      modal.classList.toggle("modal");
      modalDetail.classList.toggle("display");
      ta.classList.toggle("inner-textarea");
      viewBtn.innerHTML = "View Detail";
      viewBtn.classList.toggle("detail-btn");

      editBtn.style.display = "none";
      deleteBtn.style.display = "block";
      viewFlag = true;
    }
  }

  edit(editBtn, editIcon, imgEditting, ta) {
    findIndex(ta);

    if (ta.disabled) {
      ta.disabled = !ta.disabled;

      editBtn.removeChild(editIcon);
      editBtn.appendChild(imgEditting);
    } else {
      ta.disabled = !ta.disabled;
      editBtn.removeChild(imgEditting);
      editBtn.appendChild(editIcon);
      noteStorage[noteIndex].note = ta.value;
      updateStorage();
      noteIndex = 0;
    }
  }

  delete(deleteBtn, ta) {
    findIndex(ta);
    deleteBtn.parentNode.parentNode.remove();
    noteStorage.splice(noteIndex, 1);
    updateStorage();
    noteIndex = 0;
    index--;
  }
}

function updateStorage() {
  localStorage.setItem("noteStorage", JSON.stringify(noteStorage));
}

function findIndex(ta) {
  for (let k = 0; k < noteStorage.length; k++) {
    if (noteStorage[k].note === ta.value) {
      noteIndex = k;
    }
  }
}

function run() {
  let mytitle = document.getElementById("title").value.trim();
  let mynote = document.getElementById("note").value.trim();

  if (mytitle === "") {
    mytitle = "Note ".concat(index);
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
