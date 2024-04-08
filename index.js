const clearBtn = document.querySelector(".clear");
const todoText = document.querySelector(".todo-text");
const textBtn = document.querySelector("form");
const textSpan = document.querySelector(".text-span");
const textUl = document.querySelector(".text-ul");
const todoItemCount = document.querySelector(".todo-item-span");
let todoCount = 0;
textBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  if (todoText.value.trim() === "") {
    alert("Input is required!");
  } else {
    const newTodo = document.createElement("li");
    const blueBtn = document.querySelector(".blue-btn");
    console.log(blueBtn);
    newTodo.innerHTML = `
        <span class="text-span">${todoText.value}</span>
        <div>
        <button class=" btn-outline-primary blue-btn"><i class="fa-solid fa-check"></i></button>
        <button class="red-btn"><i class="fa-solid fa-trash"></i></button>
        <button class="yellow-btn"><i class="fa-solid fa-pen-to-square"></i></button>
    </div> `;
    textUl.appendChild(newTodo);
    textUl.style.display = "block";
    todoText.value = "";
    todoCount++;
    todoItemCount.textContent = todoCount;

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});

textUl.addEventListener("click", (e) => {
  const spanTarget = e.target.parentNode.parentNode.parentNode.children[0];
  if (e.target.className === "fa-solid fa-trash") {
    e.target.parentNode.parentNode.parentNode.remove();
    todoCount--;
    todoItemCount.textContent = todoCount;
    if (todoItemCount.textContent < 1) todoItemCount.textContent = "no";
  }
  if (e.target.className === "fa-solid fa-check") {
    if (spanTarget.style.textDecoration === "line-through") {
      spanTarget.style.textDecoration = "";
    } else {
      spanTarget.style.textDecoration = "line-through";
    }
  }
  if (e.target.className === "fa-solid fa-pen-to-square") {
    Swal.fire({
      title: "Edit To do",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Update",
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        try {
          console.log(login);
          spanTarget.innerHTML = login;
        } catch (error) {
          Swal.showValidationMessage(`
              Request failed: ${error}
            `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {});
    const swalInput = document.querySelector(".swal2-input");
    swalInput.value = spanTarget.textContent;
  }
});

clearBtn.addEventListener("click", () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      [...textUl.children].forEach((item) => {
        item.remove();
      });
    }
  });
});
