
//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList= document.querySelector('.todo-list');
const filterOption = document.querySelector('.fliter-todo')
const todo_input = document.querySelector('.todo-input')


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
document.addEventListener('DOMContentLoaded', realtimeClock)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todoInput.addEventListener('keyup', stoppedTyping)
//filterOption.addEventListener('change', filterTodo)


//disables the button of the input value of todo-input is empty
function stoppedTyping(){
    console.log(this.value.length)
    if(this.value.length > 0) { 
       
        document.querySelector('.todo-button').disabled = false; 
    } else { 

        document.querySelector('.todo-button').disabled = true;
    }
}


//functions
function addTodo(event){
    //prevent form form submitted
    event.preventDefault()

    //create todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    
    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Add todo to localstorage
    saveLocalTodos(todoInput.value)

    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton);

     //check delete button
     const deleteButton = document.createElement('button');
     deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
     deleteButton.classList.add("trash-btn")
     todoDiv.appendChild(deleteButton);

     //Append to List
     todoList.appendChild(todoDiv)

     todoInput.value = ""

}


//deletion of an todo item
function deleteCheck(event){
   const item = event.target;
   //Deleter todo
   if(item.classList[0] ==='trash-btn'){
       const todo = item.parentElement;

       //Animation
       todo.classList.add('fall');
       removeLocalTodos(todo)
       todo.addEventListener('transitionend', function(){
           todo.remove()

       })
   }

   //check mark
   if(item.classList[0] ==='complete-btn'){
       const todo = item.parentElement;
       todo.classList.toggle("completed");
   }

}

//filtering the todos (currently not in use)
function filterTodo(event){
    const todos = todoList.childNodes;
    console.log(event.target.value)
    todos.forEach(function(todo){
        if(todo.classList === undefined){
            
        }else{
        switch(event.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "Uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;

        }}
    })
}


//saving the todos in the local storage once added to the list 
function saveLocalTodos(todo){
    //Check --- Do I already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[]
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[]
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        
        //create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Add todo to localstorage
    
        //check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn")
        todoDiv.appendChild(completedButton);
    
         //check delete button
         const deleteButton = document.createElement('button');
         deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
         deleteButton.classList.add("trash-btn")
         todoDiv.appendChild(deleteButton);
    
         //Append to List
         todoList.appendChild(todoDiv)

    })

}


//removing the todo-items once deleted from the todo-list
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[]
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)

    localStorage.setItem('todos', JSON.stringify(todos))

}


//sets up the current time for the user
function realtimeClock(){
    var rtClock = new Date()

    var hours = rtClock.getHours();
    var minutes = rtClock.getMinutes();

    var amPm = (hours < 12 ) ? "AM" : "PM";

    hours = (hours > 12) ? hours - 12 : hours;

    hours = ("0" + hours).slice(-2)
    minutes = ("0" + minutes).slice(-2)

    document.getElementById('clock').innerHTML = 
        hours + " : " + minutes + " " + amPm
    
    var t = setTimeout(realtimeClock, 500)

}


