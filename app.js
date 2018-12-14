const form = document.getElementById('formTask')

function saveTask (e){
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value

    const task = {
        title, description
    }

    if (localStorage.getItem('tasks') === null){
        let tasks = []
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks)) // almacena valores del objeto en forma array
    }else{
        let tasks = JSON.parse(localStorage.getItem('tasks')) //obtener valores del array en Objeto
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    getTaks()
    form.reset() // Limpiamos el formularion con el método reset
    e.preventDefault() // Evitamos que se envie el formulario y se actualize la pagína
}

function getTasks(){
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    let tasksView = document.getElementById('tasks')
    tasksView.innerHTML = ''
    
    for (let i = 0; i < tasks.length; i++){
        let title = tasks[i].title
        let description = tasks[i].description;

        tasksView.innerHTML += `<div class="card mb3">
          <div class="card-body">
            <p>${title} - ${description}</p>
            <a class="btn btn-danger" onclick="deleteTask('${title}')">
                Delete
            </a>
          </div>
        </div>`
    }
}

function deleteTask(title){
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    console.log(tasks)
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].title == title){
            tasks.splice(i, 1)
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
    getTasks()
}

getTasks()

form.addEventListener('submit', saveTask)