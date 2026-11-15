const taskInput = document.getElementById("input");
const addButton = document.getElementById("buttonAdd");
const taskList = document.querySelector("#listTask");
let tasks= JSON.parse(localStorage.getItem("tasks"))||[];

function saveTask(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function render(){
    taskList.innerHTML="";

    tasks.forEach(function(task, index){

        const newtask = document.createElement("li");
        const deleteBtn = document.createElement("button");

        newtask.textContent = task.taskText;
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
            newtask.classList.add("line-through", "text-gray-600");
        }
        newtask.dataset.index= index;
        deleteBtn.dataset.index = index;
        newtask.append(deleteBtn);
        taskList.append(newtask);
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
