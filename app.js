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
        "deleteBtn",
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


    taskInput.value="";
});
taskList.addEventListener("click", function(event){
        if(event.target.classList.contains("deleteBtn")){
            event.target.parentElement.remove();
            return;
        }
        if(event.target.tagName==="LI"){
            event.target.classList.toggle("line-through");
            event.target.classList.toggle("text-gray-500");
        }
    });

taskInput.addEventListener("keydown",function(onKey){
    if(onKey.key ==="Enter"){
        addButton.click();
    }
});
