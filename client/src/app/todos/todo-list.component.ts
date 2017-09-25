import {Component, OnInit} from '@angular/core';
import {TodoListService} from "./todo-list.service";
import {Todo} from "./todo";
import {environment} from "../../environments/environment";
@Component({
    selector: 'todo-list-component',
    templateUrl: 'todo-list.component.html',
    providers: []
})
export class TodoListComponent implements OnInit {
    public todos: Todo[];
    public filteredTodos: Todo[];
    public todoOwner: String;
    public todoContent: String;
    public todoCategory: String;
    public loadReady: boolean = false;


    constructor(private todoListService: TodoListService){

    }

    public filterTodos(searchOwner: string, searchCategory: string, searchContent: string, searchStatus: string): Todo[] {

        this.filteredTodos = this.todos;

        /*
        Note that how the return statements are written affects how the data is
        displayed on the screen. For instance, an exact match is needed for searchCategory before any
        data is displayed.
         */

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
                return !searchCategory || todo.category.toLowerCase().indexOf(searchCategory) !== -1;
            });
        }

        //Filter by content
        if (searchContent != null) {
            this.filteredTodos = this.filteredTodos.filter(todo => {
                return !searchContent || todo.body.includes(searchContent);
            })
        }

        //Filter by status
        if (searchStatus != null) {
            this.filteredTodos = this.filteredTodos.filter(todo => {
                return todo.status === searchStatus;
            });
        }

        return this.filteredTodos;
    }

    categoryChange(catStr): void{
        this.todoListService.serviceCategory = catStr;
    }
    ownerChange(ownStr): void{
        this.todoListService.serviceOwner = ownStr;
    }
    limitChange(limit): void{
        this.todoListService.serviceLimit = limit;
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
        this.todoListService.todoUrl = environment.API_URL + "todos";
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
