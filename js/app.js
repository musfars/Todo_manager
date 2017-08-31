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
function drop_handler(ev,el) {
 ev.preventDefault();
 // Get the id of the target and add the moved element to the target's DOM
 var data = ev.dataTransfer.getData("text");
//  console.log(ev.target.id);
//  console.log(el.id);
var status;
if(el.id == "to-do_task-holder"){
    status = "Progress: To Do";
}
else if(el.id == "in-progress_task-holder"){
    status = "Progress: In Progress";
}
else if(el.id == "in-review_task-holder"){
    status = "Progress: In Review";
}
else{
    status = "Progress: Done";
}
 var progressName = document.getElementById(data).querySelector("div");
 progressName.innerText = status;
 el.appendChild(document.getElementById(data));
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
    var progress = document.createElement("div");
    progress.innerHTML = "Progress: To Do";
    editInput.type = "text";
    editInput.className = "edit";
    deleteButton.className= "material-icons";
    deleteButton.className = "close";
    deleteButton.setAttribute("id","deleteButton");
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
    listItem.appendChild(progress);
    return listItem;
}

var editTask = function(){
    // var listItem=document.getElementById(this.id);
    // // console.log(listItem);
    // var editInput = $("#tasklist0").find(".edit").html();
    // var taskName = $("#tasklist0").find(".taskName").html();
    // var containsClass = listItem.classList.contains("editMode");
    // if(containsClass) {
    //     taskName = editInput;
    // }
    // else {
    //     editInput = taskName;
    // }
    // listItem.classList.toggle("editMode");

    var listItem = document.getElementById(this.id);
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
        var listId = listItem.getAttribute("id");
        // listItem.addEventListener("dblclick",editTask(listId));
        listItem.ondblclick = editTask;
        tasksHolder.appendChild(listItem);
        taskInput.value = "";
    }
    else{
        alert("Input cannot be empty");
    }
}

addButton.addEventListener("click", addTask);