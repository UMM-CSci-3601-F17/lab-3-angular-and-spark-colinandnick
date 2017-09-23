import {Component, OnInit} from '@angular/core';
import {TodoListService} from "./todo-list.service";
import {Todo} from "./todo";

@Component({
    selector: 'todo-list-component',
    templateUrl: 'todo-list.component.html',
    providers: []
})
export class TodoListComponent implements OnInit {
    public todos: Todo[];
    public filteredTodos: Todo[];

    constructor(private todoListService: TodoListService){

    }

    public filterTodos(searchOwner: string, searchCategory: string, searchContent: string): Todo[] {

        this.filteredTodos = this.todos;

        //Filter by name
        if (searchOwner != null) {
            searchOwner = searchOwner.toLocaleLowerCase();

            this.filteredTodos = this.filteredTodos.filter(todo => {
                return !searchOwner || todo.owner.toLowerCase().indexOf(searchOwner) !== -1;
            });
        }

        //Filter by category
        if (searchCategory != null) {
            this.filteredTodos = this.filteredTodos.filter(todo => {
                return !searchCategory || todo.category == searchCategory;
            });
        }

        return this.filteredTodos;
    }

    ngOnInit(): void {
        //Get Users returns an Observable, basically a "promise" that
        //we will get the data from the server.
        //
        //Subscribe waits until the data is fully downloaded, then
        //performs an action on it (the first lambda)
        this.todoListService.getTodos().subscribe(
            todos => {
                this.todos = todos;
                this.filteredTodos = this.todos;
            },
            err => {
                console.log(err);
            }
        );
    }
}
