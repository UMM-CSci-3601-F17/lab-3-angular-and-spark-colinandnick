import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from "rxjs";
import "rxjs/add/operator/map";

import {Todo} from './todo';
import {environment} from "../../environments/environment";

@Injectable()
export class TodoListService {
    private todoUrl: string = environment.API_URL + "todos";
    public isStatus: string = "";
    public serviceCategory: string = "";
    //public loadReady: boolean = false;
//comment
    constructor(private http: Http) {
    }

    categoryChange(catStr): void{
        this.serviceCategory = catStr;
    }

    getTodos(): Observable<Todo[]> {

            console.log("server call");
            if (this.serviceCategory !== "") {
                console.log("category specified");
                this.todoUrl += "?category=" + this.serviceCategory;
            }
            let observable: Observable<any> = this.http.request(this.todoUrl);
            return observable.map(res => res.json());

    }

    getTodoById(id: string): Observable<Todo> {
        return this.http.request(this.todoUrl + "/" + id).map(res => res.json());
    }
}
