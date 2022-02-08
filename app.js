
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')


document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addTodo);
filterOption.addEventListener('click', filterTodo)


function addTodo(e){
    e.preventDefault();

// check to see if the input is blank
if (todoInput.value == ""){
    console.log("no")
    const errorMsg = document.createElement('div')
    errorMsg.classList.add('error')
    errorMsg.innerHTML="Please enter a todo..."
    todoList.appendChild(errorMsg)

    setTimeout(()=>errorMsg.remove(),2000)
} 
else {
//create a todo div
const todoDiv = document.createElement('div')
todoDiv.classList.add('todo')
// create a todo list
const newTodo = document.createElement('li')
newTodo.innerText=todoInput.value;
newTodo.classList.add('todo-item')
todoDiv.appendChild(newTodo);

// Add to LocalStorage
saveLocalTodos(todoInput.value);

// check mark btn
const completedBtn = document.createElement('button');
completedBtn.innerHTML='<i class="fas fa-check"></i>'
completedBtn.classList.add('complete-btn');
todoDiv.appendChild(completedBtn)
// Delete Btn
const trashBtn = document.createElement('button');
trashBtn.innerHTML='<i class="fas fa-trash"></i>'
trashBtn.classList.add('trash-btn');
todoDiv.appendChild(trashBtn)

// finally append the todoDiv to ul
todoList.appendChild(todoDiv)

todoInput.value ="";
trashBtn.addEventListener('click',deleteTodo);
completedBtn.addEventListener('click',completeTodo)
}

}

// Delete a Todo
function deleteTodo(){
    // console.log(this.parentNode)
    var listItem=this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem)
    removeLocalTodo(listItem)
}


// Complete a Todo
function completeTodo(){
    console.log('complete')
    var listItem=this.parentNode;
    listItem.classList.toggle('completed')
}

// Filter todo
function filterTodo(e){
    const todos=todoList.children;
    // console.log(todos)
    var arr=Array.from(todos)
    arr.forEach(function(todo){
    
      switch(e.target.value){
            case "all":
            todo.style.display='flex';
              break;
            case "completed":
            if(todo.classList.contains('completed')){
                todo.style.display='flex';
            } else {
                todo.style.display='none'
            }
            break;
            case "incomplete":
                if(!todo.classList.contains('completed')){
                    todo.style.display='flex';
            } else {
                todo.style.display='none'
            }
            break;
}          
     
  })
}

// Save to Local Storage

function saveLocalTodos(todo){
// check for duplicates
let todos;
if(localStorage.getItem('todos')=== null){
    todos=[]
}else {
    todos =JSON.parse(localStorage.getItem('todos'))
}
todos.push(todo);
localStorage.setItem('todos',JSON.stringify(todos))
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos=[]
    }else {
        todos =JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        // create a todo list
        const newTodo = document.createElement('li')
        newTodo.innerText=todo;
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo);
        
        
        // check mark btn
        const completedBtn = document.createElement('button');
        completedBtn.innerHTML='<i class="fas fa-check"></i>'
        completedBtn.classList.add('complete-btn');
        todoDiv.appendChild(completedBtn)
        // Delete Btn
        const trashBtn = document.createElement('button');
        trashBtn.innerHTML='<i class="fas fa-trash"></i>'
        trashBtn.classList.add('trash-btn');
        todoDiv.appendChild(trashBtn)
        
        // finally append the todoDiv to ul
        todoList.appendChild(todoDiv) 
        
        trashBtn.addEventListener('click',deleteTodo);
        completedBtn.addEventListener('click',completeTodo)
    })
}

function removeLocalTodo(todo){
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos=[]
    }else {
        todos =JSON.parse(localStorage.getItem('todos'))
    }
    console.log(todo.children[0].innerText)
var index = (todo.children[0].innerText);
todos.splice(todos.indexOf(index),1);
localStorage.setItem('todos',JSON.stringify(todos))
}
















