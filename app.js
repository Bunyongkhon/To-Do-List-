const taskInput = document.getElementById("input");
const addButton = document.getElementById("buttonAdd");
const taskList = document.querySelector("#listTask");
let tasks=[];



async function render(){
    taskList.innerHTML="";
        console.log("Tasks:", tasks);

    tasks.forEach(function(task, index){
                console.log("Rendering:", task.taskText);

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
        if(task.complete){
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
        complete : false
    });


    taskInput.value="";
    render();
});
taskList.addEventListener("click", function(event){

    const index = Number(event.target.dataset.index);
        if(event.target.classList.contains("deleteBtn")){
            tasks.splice(index,1);
            render();
            return;
        }
    const task = event.target.closest("LI");
        if(task){
            const taskIndex = Number(task.dataset.index);

            tasks[taskIndex].complete = !tasks[taskIndex].complete;
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
