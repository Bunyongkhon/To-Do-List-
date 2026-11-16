const taskInput = document.getElementById("input");
const addButton = document.getElementById("buttonAdd");
const taskList = document.querySelector("#listTask");
const filterButtons = document.querySelectorAll(".btnFilter")
let currentFilter ="all";
let tasks= JSON.parse(localStorage.getItem("tasks"))||[];

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
taskList.addEventListener("click", function(event){

    const index = Number(event.target.dataset.index);
        if(event.target.classList.contains("deleteBtn")){
            tasks.splice(index,1);
            saveTask();
            render();
            return;
        }
    const task = event.target.closest("LI");
        if(task && taskList.contains(task)){
            const taskIndex = Number(task.dataset.index);

            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            saveTask();
            render();
           
        }
    });

filterButtons.forEach(function(button){
    button.addEventListener("click", function(){
        currentFilter = button.dataset.filter;
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


render();