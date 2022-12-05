'use strict';

const tasks = [];
const containers = ['current', 'done', 'prioritized']
let globalTaskId = 0;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('createTaskByNameIpt').addEventListener('input', e => {
        enableSubmitButton(e.target.value.length)
    })

    document.getElementById('createTaskByNameIpt').addEventListener('keypress', e => {
        if (e.key === 'Enter' && e.target.value.length > 0) {
            triggerSubmit()
            enableSubmitButton(e.target.value.length)
        }
    })

    document.getElementById('createTaskByNameBtn').addEventListener('click', () => {
        triggerSubmit()
    })
})

const triggerSubmit = () => {
    const taskText = document.getElementById('createTaskByNameIpt').value
    document.getElementById('createTaskByNameIpt').value = ''

    const task = {
        taskId: globalTaskId,
        text: taskText,
        prioritized: false,
        done: false,
        current: true,
        created: Date.now()
    };
    tasks.push(task);

    createHtmlTask(task)
    triggerTaskContainers()
}

const enableSubmitButton = (txtLength) => {
    let button = document.getElementById('createTaskByNameBtn')
    if (txtLength > 0) {
        button.removeAttribute('disabled')
    } else {
        button.setAttribute('disabled', 'true')
    }
}

const enterEditMode = (taskId) => {

}

const triggerRemove = (taskId) => {

}

const triggerPrioritized = (taskId) => {
    triggerTaskFieldChange(taskId, 'prioritized')
}

const triggerDone = (taskId) => {
    triggerTaskFieldChange(taskId, 'done')
}

const triggerTaskFieldChange = (taskId, fieldName) => {
    const task = tasks.find(t => t.taskId === Number.parseInt(taskId));
    task[fieldName] = !task[fieldName];
    task.current = !task.prioritized && !task.done
    removeHtmlTask(task)
    createHtmlTask(task)
}

const removeHtmlTask = ({ taskId }) => {
    document.getElementById(`task-${taskId}`).remove()
}

const triggerTaskContainers = () => {
    const emptyContainer = document.getElementById('empty-container')
    if (tasks.length === 0) {
        emptyContainer.removeAttribute('hidden')
    } else {
        emptyContainer.setAttribute('hidden', 'true')
        containers.forEach(cnt => {
            const tasksContainer = document.getElementsByClassName(`${cnt}-container`)[0]
            if (tasks.filter(t => {
                    if ((cnt !== 'done' && !t['done']) || cnt === 'done') {
                        return t[cnt]
                    } else {
                        return false
                    }
                }).length === 0) {
                tasksContainer.setAttribute('hidden', 'true')
            } else {
                tasksContainer.removeAttribute('hidden')
            }
        })
    }
}

const createHtmlTask = ({ taskId, text, prioritized, done }) => {
    const targetContainer = done ? 'done' : prioritized ? 'prioritized' : 'current'
    const tasksContainer = document.getElementsByClassName(`${targetContainer}-container-body`)[0]

    const taskHtml = document.createElement('div')
    taskHtml.id = `task-${taskId}`
    taskHtml.className = `card ${done ? 'bg-success' : prioritized ? 'bg-warning' : ''}`

    const divCardBody = document.createElement('div')
    divCardBody.className = 'card-body row'

    const divCol10 = document.createElement('div')
    divCol10.className = 'col-10'

    const inputBox = document.createElement('input')
    inputBox.type = 'checkbox'
    inputBox.className = 'check-task-done'
    inputBox.setAttribute('task-id', taskId)
    inputBox.checked = done
    inputBox.addEventListener('change', e => {
        triggerDone(e.currentTarget.getAttribute('task-id'))
    })
    const spanTaskName = document.createElement('span')
    spanTaskName.className = 'task-body card-text'
    spanTaskName.textContent = text

    const divCol2 = document.createElement('div')
    divCol2.className = 'col-2'

    const btnEditTask = document.createElement('button')
    btnEditTask.type = 'button'
    btnEditTask.className = 'btn btn-right'
    btnEditTask.addEventListener('click', e => {

    })
    const glyphEdit = document.createElement('i')
    glyphEdit.className = 'bi bi-pencil'
    btnEditTask.appendChild(glyphEdit)

    const btnFavouriteTask = document.createElement('button')
    btnFavouriteTask.type = 'button'
    btnFavouriteTask.className = 'btn btn-right'
    btnFavouriteTask.setAttribute('task-id', taskId)
    btnFavouriteTask.addEventListener('click', e => {
        triggerPrioritized(e.currentTarget.getAttribute('task-id'))
    })
    const glyphStar = document.createElement('i')
    glyphStar.className = prioritized ? 'bi bi-star-fill' : 'bi bi-star';
    btnFavouriteTask.appendChild(glyphStar)

    divCol10.appendChild(inputBox)
    divCol10.appendChild(spanTaskName)

    divCol2.appendChild(btnEditTask)
    divCol2.appendChild(btnFavouriteTask)

    divCardBody.appendChild(divCol10)
    divCardBody.appendChild(divCol2)
    taskHtml.appendChild(divCardBody)

    tasksContainer.append(taskHtml)

    globalTaskId++

    triggerTaskContainers()
}