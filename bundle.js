/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/style.scss":
/*!*******************************!*\
  !*** ./src/styles/style.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/bundle.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/style.scss */ "./src/styles/style.scss");

var dateBlock = document.querySelector('.header__date'); // day DOM element

var timeBlock = document.querySelector('.header__time'); // clock DOM element

var addNewTaskBtn = document.querySelector('.sidebar__open-btn'); // add new task button (opens text input)

var newTaskForm = document.getElementById('new-task-form'); // new task form

var taskInput = document.querySelector('.sidebar__add-text'); // textarea input

var board = document.querySelector('.board'); // tasks board

var list = document.querySelector('.sidebar__list'); // tasks list

function setClock() {
  var currentDate = new Date();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();

  if (hours <= 9) {
    hours = '0' + hours;
  }

  if (minutes <= 9) {
    minutes = '0' + minutes;
  }

  var currentTime = "".concat(hours, " : ").concat(minutes);
  var currentDay = currentDate.toLocaleString('en-us', {
    weekday: 'long'
  });
  dateBlock.innerHTML = currentDay;
  timeBlock.innerHTML = currentTime;
} // clock function


setInterval(setClock, 1000); // clock refreshing

function createEditForm(liItem, taskBlock, txtEl) {
  var editForm = document.createElement('form');
  editForm.setAttribute('id', 'edit-form');
  editForm.classList.add('edit-form'); //edit form

  var editInput = document.createElement('textarea');
  editInput.setAttribute('type', 'text');
  editInput.setAttribute('maxlength', '50');
  editInput.setAttribute('rows', '3');
  editInput.classList.add('edit-input'); //edit input

  editInput.innerText = txtEl.innerText;
  var editFormBtn = document.createElement('button');
  editFormBtn.setAttribute('type', 'submit');
  editFormBtn.setAttribute('form', 'edit-form');
  editFormBtn.innerText = 'Edit';
  editFormBtn.classList.add('edit-form-btn'); // edit form submit button

  editForm.appendChild(editInput);
  editForm.appendChild(editFormBtn);
  editForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var inputText = editInput.value;
    replaceTaskText(inputText, taskBlock, txtEl, e.target, liItem);
  });
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
  var a = el.parentNode.getAttribute('data-value');
  var b = item.getAttribute('data-value');

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
  var taskCheck = document.createElement('input');
  taskCheck.classList.add('task-check');
  taskCheck.setAttribute('type', 'checkbox'); // creating checkbox

  var editTask = document.createElement('button');
  editTask.classList.add('task-edit', 'task-btn');
  editTask.setAttribute('type', 'button');
  editTask.innerText = String.fromCodePoint(parseInt('9998')); // creating edit task button

  var deleteTask = document.createElement('button');
  deleteTask.classList.add('task-delete', 'task-btn');
  deleteTask.setAttribute('type', 'button');
  deleteTask.innerText = String.fromCodePoint(parseInt('10006')); // creating delete task button

  var taskBtns = document.createElement('div');
  taskBtns.classList.add('task-btns');
  taskBtns.appendChild(taskCheck);
  taskBtns.appendChild(editTask);
  taskBtns.appendChild(deleteTask);
  taskBtns.setAttribute('data-value', textValue); // creating task buttons container

  var taskText = document.createElement('p');
  taskText.classList.add('task-text');
  taskText.innerText = textValue.trim(); // creating task text block

  var taskItem = document.createElement('div');
  taskItem.classList.add('task');
  taskItem.appendChild(taskBtns);
  taskItem.appendChild(taskText); // new task block

  var listItem = document.createElement('li');
  listItem.classList.add('sidebar__list-item');
  listItem.setAttribute('data-value', textValue);
  listItem.innerText = textValue.trim(); // creating list item with task text

  board.appendChild(taskItem);
  list.appendChild(listItem);
  taskInput.value = '';
  taskBtns.addEventListener('click', function (e) {
    attrCheck(e.target, listItem, taskItem, taskText);
  }); // task buttons event listener
} // create new task item function


addNewTaskBtn.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target !== addNewTaskBtn) {
    return;
  }

  if (e.target === addNewTaskBtn) {
    newTaskForm.classList.toggle('open-inp');
  }
}); // toggle textarea event

newTaskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var text = taskInput.value;
  createNewTask(text);
}); // creating new task on submit
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map