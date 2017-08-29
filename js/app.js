function dragstart_handler(ev) {
 // Add the target element's id to the data transfer object
 ev.dataTransfer.setData("text/plain", ev.target.id);
 ev.dropEffect = "move";
}
function dragover_handler(ev) {
 ev.preventDefault();
 // Set the dropEffect to move
 ev.dataTransfer.dropEffect = "move"
}
function drop_handler(ev) {
 ev.preventDefault();
 // Get the id of the target and add the moved element to the target's DOM
 var data = ev.dataTransfer.getData("text");
 ev.target.appendChild(document.getElementById(data));
}

var taskInput = document.getElementById("new-task");
var addButton = document.getElementById("add-task");
var tasksHolder = document.getElementById("to-do_task-holder");
var i = 0;

var createNewTask = function(taskString){
    var listItem = document.createElement("li");
    var taskName = document.createElement("label");
    var deleteButton = document.createElement("i");
    var editInput = document.createElement("input"); 
    editInput.type = "text";
    editInput.className = "edit";
    deleteButton.className= "material-icons";
    deleteButton.className = "close";
    taskName.className = "taskName";
    taskName.innerText = taskString;
    deleteButton.innerHTML = "X";
    listItem.className = "chip";
    listItem.setAttribute("id","tasklist" + i++);
    listItem.setAttribute("draggable","true");
    listItem.setAttribute("ondragstart","dragstart_handler(event);");
    listItem.appendChild(taskName);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editInput);
    return listItem;
}

var editTask = function(){
    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input[type=text]");
    var taskName = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");
    if(containsClass) {
        taskName.innerText = editInput.value;
    }
    else {
        editInput.value = taskName.innerText;
    }
    listItem.classList.toggle("editMode");
}

var addTask = function(){
    if(taskInput.value !== ""){
        var listItem = createNewTask(taskInput.value);
                listItem.ondblclick = editTask;
        tasksHolder.appendChild(listItem);

        taskInput.value = "";
    }
    else{
        alert("Input cannot be empty");
    }
}

addButton.addEventListener("click", addTask);