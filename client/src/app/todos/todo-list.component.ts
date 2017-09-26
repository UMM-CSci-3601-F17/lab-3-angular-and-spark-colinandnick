import {Component, OnInit} from '@angular/core';
import {TodoListService} from "./todo-list.service";
import {Todo} from "./todo";

@Component({
    selector: 'todo-list-component',
    templateUrl: 'todo-list.component.html',
    styleUrls: ['../app.component.css'],
    providers: []
})
export class TodoListComponent implements OnInit{
    public todos: Todo[];
    public filteredTodos: Todo[];
    public todoContent: String;
    public todoCategory: String;
    public todoStatus: String;
    public loadReady: boolean = false;


    constructor(private todoListService: TodoListService){

    }

    public filterTodos(searchCategory: string, searchContent: string, searchStatus: string): Todo[] {

        this.filteredTodos = this.todos;

        //Filter by category
        if (searchCategory != null) {
            this.filteredTodos = this.filteredTodos.filter(todo => {
                return !searchCategory || todo.category.toLowerCase().indexOf(searchCategory) !== -1;
            });
        }

        //Filter by content
        if (searchContent != null) {
            searchContent = searchContent.toLocaleLowerCase();
            this.filteredTodos = this.filteredTodos.filter(todo => {
                return !searchContent || todo.body.toLowerCase().indexOf(searchContent) !== -1;
            })
        }

        //Filter by status
        if (searchStatus != null) {
            searchStatus = searchStatus.toLocaleLowerCase();
            this.filteredTodos = this.filteredTodos.filter(todo => {
                return !searchStatus || todo.status.toString().toLowerCase().indexOf(searchStatus) !== -1;
            });
        }

        return this.filteredTodos;
    }

    ownerChange(ownStr): void{
        this.todoListService.serviceOwner = ownStr;
    }

    loadService(): void {
        console.log("yay");
        this.loadReady = true;
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
