var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector('#tasks-to-do');
var taskIdCounter = 0;
var pageContentEl = document.querySelector('#page-content');

var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    //check if input values are empty strings
    if(!taskNameInput || !taskTypeInput) {
        alert('You need to fill out the task form!');
        return false;
    }
    formEl.reset();
    //package up data as an object
    var isEdit = formEl.hasAttribute("data-task-id");

    //send it as an argument to createTaskEL
   if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
   }
   else {
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    createTaskEL(taskDataObj);
   };
};
var completeEditTask = function(taskName, taskType, taskId) {
    //find the matching task item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};
var createTaskEL = function(taskDataObj) {
    //create list item
   var listItemEl = document.createElement('li');
   listItemEl.className = 'task-item';
   //add task id as a custom attribute
   listItemEl.setAttribute('data-task-id', taskIdCounter);

   //create div to hold task info and add to list item
   var taskInfoEl = document.createElement('div');
   //give it a class name
   taskInfoEl.className = "task-info";
   //add html content to div 
   taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>"

    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    taskToDoEl.appendChild(listItemEl);
   //listItemEl.textContent = taskNameInput;
  //add entire list item to list
   taskToDoEl.appendChild(listItemEl);

//increase task counter for next unique id 
    taskIdCounter++;
};

var createTaskActions = function(taskId) {
    //creates div and assigns a class
    var actionContainerEl = document.createElement('div');
    actionContainerEl.className = 'task-actions';
    //create edit button
    var editButtonEl = document.createElement('button');
    editButtonEl.textContent = 'Edit';
    editButtonEl.className = 'btn-edit-btn';
    editButtonEl.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement('button');
    deleteButtonEl.textContent = 'Delete';
    deleteButtonEl.className = 'btn-delete-btn';
    deleteButtonEl.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement('select');
    statusSelectEl.className = 'select-status';
    statusSelectEl.setAttribute('name', 'status-change');
    statusSelectEl.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ['To Do', 'In Progress', 'Completed'];

    for(var i = 0; i < statusChoices.length; i++) {
        var statusOptionEl = document.createElement('option');
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute('value', statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
        
    }
return actionContainerEl;
};

formEl.addEventListener('submit', taskFormHandler);

var taskButtonHandler = function(event) {
    //get target element from event
    var targetEl = event.target;

    //edit button was clicked
    if (targetEl.matches('.btn-edit-btn')) {
        var taskId = targetEl.getAttribute('data-task-id');
        editTask(taskId);
    }
    //delete button was clicked
    else if (event.target.matches('.btn-delete-btn')) {
        var taskId = event.target.getAttribute('data-task-id');
        deleteTask(taskId);
    }
};
pageContentEl.addEventListener('click', taskButtonHandler);

var deleteTask = function(taskId) {
   var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
   taskSelected.remove();
};

var editTask = function(taskId) {
    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector('#save-task').textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
};

