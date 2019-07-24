"use strict";

document.getElementById("entire-form").addEventListener("submit", saveTask);

function saveTask(e) {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;

    const task = {
        title,
        description
    };

    if (localStorage.getItem("tasks") === null) {
        let tasks = [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    //document.getElementById("entire-form").reset();
    getTasks();
    e.preventDefault();
}


function getTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let viewTask = document.getElementById("tasks");

    viewTask.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title;
        let description = tasks[i].description;
        viewTask.innerHTML += `<div class ="card with-margin">
            <div class ="card-body">
            <p>${title} - ${description}</p>
            <a class ="delete" onclick="deleteTask('${title}')">Delete</a>
            </div>
       </div >`
    }
}


function deleteTask(title) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title == title) {
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    getTasks();
}

getTasks();
