const taskInput = document.getElementById("input");
const addButton = document.getElementById("buttonAdd");
const taskList = document.querySelector("#listTask");
const filterButtons = document.querySelectorAll(".btnFilter")
let currentFilter ="all";
let tasks= JSON.parse(localStorage.getItem("tasks"))||[];
let clickTimer = null;


function saveTask(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function render(){
    taskList.innerHTML="";

    let filterTasks = tasks.filter(function(task){
        if (currentFilter ==="active"){
            return !task.completed;
        }

        if(currentFilter === "done"){
            return task.completed;
        }
        return true;
    });

    filterTasks.forEach(function(task){

        const newtask = document.createElement("li");
        const deleteBtn = document.createElement("button");
        const taskTextElement = document.createElement("span");

        const originalIndex = tasks.findIndex(function(item){
            return item === task;
        });

        taskTextElement.textContent = task.taskText;
        deleteBtn.textContent ="Delete";

        taskTextElement.classList.add("flex-1",
            "min-w-0",
            "break-words"
        );

        newtask.classList.add(
            "bg-gray-100",
            "p-3",
            "rounded-lg",
            "flex",
            "justify-between",
            "items-center"
        );

        deleteBtn.classList.add(
            "deleteBtn",
            "shrink-0",
            "bg-red-500",
            "text-white",
            "px-3",
            "py-1",
            "rounded",
            "hover:bg-red-700",
            "cursor-pointer",
        );
        if(task.completed){
            taskTextElement.classList.add("line-through", "text-gray-600");
        }
        newtask.dataset.index= originalIndex;
        deleteBtn.dataset.index = originalIndex;
        newtask.append(taskTextElement,deleteBtn);
        taskList.append(newtask);
    });

    filterButtons.forEach(function(button){
        if(button.dataset.filter === currentFilter){
            button.classList.add("bg-blue-600","text-white");
            button.classList.remove("bg-gray-200", "text-gray-700");
        }
        else{
            button.classList.remove("bg-blue-600", "text-white");
            button.classList.add("bg-gray-200", "text-gray-700");
        }
    });
}

addButton.addEventListener("click", function(){

    const taskText = taskInput.value.trim();    

    
    if(taskText===""){
        alert("No task input yet!");
        return;
    }

    tasks.push({
        taskText : taskText,
        completed : false
    });


    taskInput.value="";
    saveTask();
    render();
});

taskList.addEventListener("click", function(event) {

    if (event.target.tagName === "INPUT") return;

    const index = Number(event.target.dataset.index);

    if (event.target.classList.contains("deleteBtn")) {
        tasks.splice(index, 1);
        saveTask();
        render();
        return;
    }

    const taskElement = event.target.closest("li");

    if (!taskElement) return;

    const taskIndex = Number(taskElement.dataset.index);

    clearTimeout(clickTimer);

    clickTimer = setTimeout(function() {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;

        saveTask();
        render();

    }, 250);

});

filterButtons.forEach(function(button){
    button.addEventListener("click", function(){
        currentFilter = button.dataset.filter;

        render();
    });
});

taskInput.addEventListener("keydown",function(onKey){
    if(onKey.key ==="Enter"){
        if(taskInput.value.trim()===""){
            alert("No task input yet!");
            return;
        }else{

        addButton.click();
        }
    }
});
taskList.addEventListener("dblclick", function(event) {

    clearTimeout(clickTimer);

    const taskElement = event.target.closest("li");

    if (!taskElement) return;

    const taskTextElement = taskElement.querySelector("span");

    if (!taskTextElement) return;

    const index = Number(taskElement.dataset.index);
    const task = tasks[index];

    const input = document.createElement("input");

    input.value = task.taskText;

    input.classList.add(
        "border",
        "border-blue-500",
        "rounded",
        "px-2",
        "py-1"
    );

    taskTextElement.replaceWith(input);

    input.focus();

    let finished = false;

    function finishEditing(save) {

        if (finished) return;

        finished = true;

        if (save && input.value.trim() !== "") {
            task.taskText = input.value.trim();
            saveTask();
        }

        render();
    }

    input.addEventListener("keydown", function(e) {

        if (e.key === "Enter") {
            finishEditing(true);
        }

        if (e.key === "Escape") {
            finishEditing(false);
        }

    });

    input.addEventListener("blur", function() {
        finishEditing(true);
    });

});
render();