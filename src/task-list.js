'use strict';

(function () {
    class TaskPlaner extends HTMLElement {
        constructor() {
            super();

            const taskListContainer = document.createElement('div')
            taskListContainer.classList.add('task-planer')
            taskListContainer.setAttribute('id', 'task-planer')

            taskListContainer.innerHTML = `
                <div class="sticky-top" style="background-color: white;">
                    <h2>Task planer</h2>
                    <div class="input-group mb-3">
                        <input id="createTaskByNameIpt" type="text" class="form-control" placeholder="Task name" maxlength="50">
                        <button id="createTaskByNameBtn" type="button" class="btn btn-success" disabled>Create</button>
                    </div>
                </div>
                <div class="tasks-body">
                    <h3>Your tasks:</h3>
            
                    <div id="empty-container">
                        <h4 class="no-tasks-message">Currently you don't have any tasks</h4>
                    </div>
            
                    <div class="prioritized-container" ${'hidden'}>
                        <h4>Prioritized:</h4>
                        <div class="prioritized-container-body">
                        ${}
                        </div>
                    </div>
            
                    <div class="current-container" ${'hidden'}>
                        <h4>Current:</h4>
                        <div class="current-container-body">
                        ${}
                        </div>
                    </div>
            
                    <div class="done-container" ${'hidden'}>
                        <h4>Done:</h4>
                        <div class="done-container-body">
                        ${}
                        </div>
                    </div>
            
                </div>`
        }
    }
})()