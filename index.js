

  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
  import {  getDatabase, ref, set, push,onValue,child,remove  } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js"

  const firebaseConfig = {
    apiKey: "AIzaSyCnW2PBJRaDJNTfGPFGpItNyadT4zMFTuk",
    authDomain: "my-first-project-a4387.firebaseapp.com",
    databaseURL: "https://my-first-project-a4387-default-rtdb.firebaseio.com",
    projectId: "my-first-project-a4387",
    storageBucket: "my-first-project-a4387.appspot.com",
    messagingSenderId: "1028057817868",
    appId: "1:1028057817868:web:a6588162ae9ee564219f29"
  };


  // Initialize Firebase
  initializeApp(firebaseConfig);
  const database=getDatabase()
  console.log(database);


  const taskInput=document.querySelector("#taskInput")
  const addTaskButton=document.querySelector("#addTaskButton")
  const taskList=document.querySelector("#taskList")

  const tasksRef=ref(database,'tasks')

  addTaskButton.addEventListener("click",addTask)
  onValue(tasksRef,updateTaskList)


  function addTask(){
    const taskValue=taskInput.value.trim()

    if(!taskValue){
        alert("please enter a task")
        return
    }
    push(tasksRef,{task:taskValue})
    .then(()=>taskInput.value='')
    .catch(err=>console.error(err))
  }


  function updateTaskList(snapshot) {
    const data = snapshot.val();
    taskList.innerHTML = '';

    if (data) {
        Object.entries(data).forEach(([key, task]) => {
            const taskElement = createTaskElement(key, task);
            taskList.appendChild(taskElement);
        });
    } else {
        taskList.innerHTML = "<p>No tasks found.</p>";
    }
}


function createTaskElement(key, task) {
    const listItem = document.createElement('li');
    const textSpan = document.createElement('span');
    textSpan.textContent = task.task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(key));

    listItem.appendChild(textSpan);
    listItem.appendChild(deleteButton);

    return listItem;
}


function deleteTask(key) {
    const taskToDeleteRef = child(tasksRef, key);
    remove(taskToDeleteRef).catch(error => console.error(error));
}



