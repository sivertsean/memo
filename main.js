class Todo {
    constructor(text,time) {
        this.text = text;
        this.time = time;
    }
}

class TodoManager {
    constructor() {
        this.todos = [];
    }

    add(todo){
        this.todos.push(todo);
    }

    remove(index){
        this.todos.splice(index, 1);
    }
}

const manager = new TodoManager();

const gjore = prompt("skriv noe å gjøre");
const tid = prompt("skriv noe tid");

const promtTodo = new Todo(gjore, tid);
manager.add(promtTodo);

console.log(manager);