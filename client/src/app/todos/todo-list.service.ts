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
//comment
    constructor(private http: Http) {
    }

    getTodos(): Observable<Todo[]> {
        let observable: Observable<any> = this.http.request(this.todoUrl);
        if(this.isStatus === "complete"){

        }
        else if(this.isStatus === "incomplete"){

        }
        return observable.map(res => res.json());
    }

    getTodoById(id: string): Observable<Todo> {
        return this.http.request(this.todoUrl + "/" + id).map(res => res.json());
    }
}
