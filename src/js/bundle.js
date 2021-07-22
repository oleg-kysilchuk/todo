import '../styles/style.scss';


const dateBlock = document.querySelector('.header__date'); // day DOM element
const timeBlock = document.querySelector('.header__time'); // clock DOM element

const addNewTaskBtn = document.querySelector('.sidebar__open-btn'); // add new task button (opens text input)
const newTaskForm = document.getElementById('new-task-form'); // new task form
const taskInput = document.querySelector('.sidebar__add-text'); // textarea input

const board = document.querySelector('.board'); // tasks board
const list = document.querySelector('.sidebar__list'); // tasks list


function setClock() {

    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();

    if(hours <= 9) {
        hours = '0'+hours;
    }

    if(minutes <= 9) {
        minutes = '0'+minutes;
    }

    let currentTime = `${hours} : ${minutes}`;
    let currentDay = currentDate.toLocaleString('en-us', {weekday: 'long'});
    dateBlock.innerHTML = currentDay;
    timeBlock.innerHTML = currentTime;
} // clock function

setInterval(setClock, 1000); // clock refreshing


function createEditForm(liItem, taskBlock, txtEl) {
    const editForm = document.createElement('form');
    editForm.setAttribute('id', 'edit-form');
    editForm.classList.add('edit-form'); //edit form

    const editInput = document.createElement('textarea');
    editInput.setAttribute('type', 'text');
    editInput.setAttribute('maxlength', '50');
    editInput.setAttribute('rows', '3');
    editInput.classList.add('edit-input'); //edit input
    editInput.innerText = txtEl.innerText;

    const editFormBtn = document.createElement('button');
    editFormBtn.setAttribute('type', 'submit');
    editFormBtn.setAttribute('form', 'edit-form');
    editFormBtn.innerText = 'Edit';
    editFormBtn.classList.add('edit-form-btn'); // edit form submit button

    editForm.appendChild(editInput);
    editForm.appendChild(editFormBtn);

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputText = editInput.value;
        replaceTaskText(inputText, taskBlock, txtEl, e.target, liItem);
    })

    taskBlock.replaceChild(editForm, txtEl);
}


function replaceTaskText(newText, currentTask, currentText, edForm, liEl) {
    currentText.innerText = newText;
    currentTask.firstChild.setAttribute('data-value', newText);
    liEl.setAttribute('data-value', newText);
    liEl.innerText = newText;
    currentTask.replaceChild(currentText, edForm);
    edForm = null;
} // function replacing task and it's list item text to new one


function attrCheck(el, item, tsk, txt) {
    let a = el.parentNode.getAttribute('data-value');
    let b = item.getAttribute('data-value');

    if (el.className == 'task-check' && a === b) {
        item.classList.toggle('isDone');
    }

    if (el.classList.contains('task-edit')) {
        createEditForm(item, tsk, txt);
    }

    if (el.classList.contains('task-delete') && a === b) {
        tsk.remove();
        tsk = null;
        item.remove();
    }
} // task block buttons events function


function createNewTask(textValue) {

    const taskCheck = document.createElement('input')
    taskCheck.classList.add('task-check');
    taskCheck.setAttribute('type', 'checkbox'); // creating checkbox

    const editTask = document.createElement('button');
    editTask.classList.add('task-edit', 'task-btn');
    editTask.setAttribute('type', 'button');
    editTask.innerText = String.fromCodePoint(parseInt('9998')); // creating edit task button

    const deleteTask = document.createElement('button');
    deleteTask.classList.add('task-delete', 'task-btn');
    deleteTask.setAttribute('type', 'button');
    deleteTask.innerText = String.fromCodePoint(parseInt('10006')); // creating delete task button

    const taskBtns = document.createElement('div');
    taskBtns.classList.add('task-btns');
    taskBtns.appendChild(taskCheck);
    taskBtns.appendChild(editTask);
    taskBtns.appendChild(deleteTask); 
    taskBtns.setAttribute('data-value', textValue); // creating task buttons container

    const taskText = document.createElement('p');
    taskText.classList.add('task-text');
    taskText.innerText = textValue.trim(); // creating task text block
    
    const taskItem = document.createElement('div')
    taskItem.classList.add('task');
    taskItem.appendChild(taskBtns);
    taskItem.appendChild(taskText); // new task block

    const listItem = document.createElement('li');
    listItem.classList.add('sidebar__list-item');
    listItem.setAttribute('data-value', textValue);
    listItem.innerText = textValue.trim(); // creating list item with task text
    

    board.appendChild(taskItem);
    list.appendChild(listItem);
    taskInput.value = '';

    taskBtns.addEventListener('click', (e) => {
        attrCheck(e.target, listItem, taskItem, taskText);
    }) // task buttons event listener

}   // create new task item function


addNewTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if(e.target !== addNewTaskBtn) {
        return;
    }

    if(e.target === addNewTaskBtn) {
        newTaskForm.classList.toggle('open-inp');
    }

})   // toggle textarea event


newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let text = taskInput.value;
    createNewTask(text);

}) // creating new task on submit                                      