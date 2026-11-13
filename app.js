const taskInput = document.getElementById("input");
const addButton = document.getElementById("buttonAdd");
const taskList = document.querySelector("#listTask");




addButton.addEventListener("click", function(){
    const newtask = document.createElement("li");

    newtask.textContent = taskInput.value;
    taskList.append(newtask);

    taskInput.value="";
});