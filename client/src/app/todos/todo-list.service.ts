import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from "rxjs";
import "rxjs/add/operator/map";

import {Todo} from './todo';
import {environment} from "../../environments/environment";

@Injectable()
export class TodoListService {
    private todoUrl: string = environment.API_URL + "todos";
    public serviceOwner: string = "";
    constructor(private http: Http) {
    }

    /*
    We chose to have owner filtering occur on the server side. We made this decision
    because we thought that filtering todos by a particular owner would, on average,
    narrow down the todos by more than any other filter (a more specific content request
    would be even more narrow though).

    By narrowing down the todos to be returned on the
    server side, less data needs to be transferred over to the client, and in turn,
    filtering on the client side is less intensive because there are less todos. Please
    note that one of the implications of this decision is that our "Search" button
    is only effective for Owner filtering.
     */


    getTodos(): Observable<Todo[]> {
        this.todoUrl = environment.API_URL + "todos";
            if (this.serviceOwner !== "") {
                console.log("owner specified");

                if(this.todoUrl.indexOf('&')!== -1){
                    this.todoUrl += 'owner=' + this.serviceOwner +'&';
                }
                else{this.todoUrl += "?owner=" + this.serviceOwner + "&";}
                console.log(this.todoUrl);
            }

            let observable: Observable<any> = this.http.request(this.todoUrl);
            return observable.map(res => res.json());

    }

}
