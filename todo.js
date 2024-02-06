const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];

const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");

const clearButton = document.querySelector("#clear-todos");




function eventListeners() { // here is is a note that needs to be added to the first 

    form.addEventListener("submit", addToDo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteToDo)
    filter.addEventListener("keyup", filterToDos);
clearButton.addEventListener("click",clearAllToDos);


}



function filterToDos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    console.log("Filter Value:", filterValue);

    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase();

        console.log("Text:", text);

        if (text.indexOf(filterValue) === -1) {
            listItem.setAttribute("style", "display: none !important");
        } else {
            listItem.setAttribute("style", "display: block");
        }
    });
}












function deleteToDoFromStorage(text) {
    let todos = getToDosFromStorage();

    todos = todos.filter(todo => todo !== text);

    localStorage.setItem("todos", JSON.stringify(todos));
}





function deleteToDo(e) {
    if (e.target.className === "fa fa-remove") {
        const todoText = e.target.parentElement.parentElement.firstChild.textContent;
        e.target.parentElement.parentElement.remove();
        showAlert("success", "Todo successfully deleted");
        deleteToDoFromStorage(todoText);
    }
}






function deleteToDoV2(e) {

    if (e.target.className === "fa fa-remove") {

        e.target.parentElement.parentElement.remove();
        showAlert("success", "todos basarilya silindi");
deleteToDoFromStorage(e);

    }
}


// gpt functions 

function addToDoToStorage(newToDo) {
    let todos = getToDosFromStorage();
    todos.push(newToDo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getToDosFromStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function loadAllTodosToUI() {
    let todos = getToDosFromStorage();

    todos.forEach(function (todo) {
        addToDoToUI(todo);
    });
}


function addToDo(e) {

    const newToDo = todoInput.value.trim();



    if (newToDo === "") {


        showAlert("danger", "please enter a valid toDo task!");

    } else {


        addToDoToUI(newToDo);
        showAlert("success", "task added succesfully");

        addToDoToStorage(newToDo);
    }


    console.log(newToDo);





    e.preventDefault();

}


eventListeners();



function addToDoToUI(newToDo) {


    const listItem = document.createElement("li");
    const link = document.createElement("a");

    link.href = "#";
    link.className = "deleteItem";
    link.innerHTML = "<i class='fa fa-remove'></i>";
    listItem.className = "list-group-item d-flex justify-content-between";
    console.log(listItem);


    listItem.appendChild(document.createTextNode(newToDo));
    listItem.appendChild(link);


    todoList.appendChild(listItem);
    todoInput.value = "";


}


function showAlert(type, message) {

    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;


    alert.textContent = message;

    console.log(alert)

    firstCardBody.appendChild(alert)

    setTimeout(function () {
        alert.remove();
    }, 3000);

}

function clearAllToDos(e) {
 



if (confirm("Are you sure you want to delete all the tasks?")) {
    
while (todoList.firstElementChild!=null) {
    
todoList.removeChild(todoList.firstElementChild);


}

localStorage.removeItem("todos");


}







}