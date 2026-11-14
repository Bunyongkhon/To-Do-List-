const taskInput = document.getElementById("input");
const addButton = document.getElementById("buttonAdd");
const taskList = document.querySelector("#listTask");




addButton.addEventListener("click", function(){

    const newtask = document.createElement("li");
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent ="Delete";
    newtask.textContent = taskInput.value;

    newtask.classList.add(
        "bg-gray-100",
        "p-3",
        "rounded-lg",
        "flex",
        "justify-between",
        "items-center"
    );

    deleteBtn.classList.add(
        "bg-red-500",
        "text-white",
        "px-3",
        "py-1",
        "rounded",
        "hover:bg-red-700",
        "cursor-pointer",
    );
    newtask.append(deleteBtn);
    taskList.append(newtask);

    deleteBtn.addEventListener("click", function(){
        newtask.remove();
    });

    taskInput.value="";
});