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
    public serviceOwner: string = "";
    public serviceLimit: number = null;
    //public loadReady: boolean = false;
//comment
    constructor(private http: Http) {
    }

   /* categoryChange(catStr): void{
        this.serviceCategory = catStr;
    }*/

    getTodos(): Observable<Todo[]> {
        this.todoUrl = environment.API_URL + "todos";
            if (this.serviceLimit !== null) {
                 console.log("limit specified");
                if(this.todoUrl.indexOf('&')!== -1){
                    this.todoUrl += 'limit=' + this.serviceLimit +'&';
                }
                else{this.todoUrl += "?limit=" + this.serviceLimit + "&";}
                 console.log(this.todoUrl);
            }
            console.log("server call");
            if (this.serviceCategory !== "") {
                console.log("category specified");
                if(this.todoUrl.indexOf('&')!== -1){
                    this.todoUrl += 'category=' + this.serviceCategory +'&';
                }
                else{this.todoUrl += "?category=" + this.serviceCategory + "&";}

                console.log(this.todoUrl);
            }
            if (this.serviceOwner !== "") {
                console.log("owner specified");

                if(this.todoUrl.indexOf('&')!== -1){
                    this.todoUrl += 'owner=' + this.serviceOwner +'&';
                }
                else{this.todoUrl += "?owner=" + this.serviceOwner + "&";}
                console.log(this.todoUrl);
            }

            console.log(this.serviceCategory);
            let observable: Observable<any> = this.http.request(this.todoUrl);
            return observable.map(res => res.json());

    }

    getTodoById(id: string): Observable<Todo> {
        return this.http.request(this.todoUrl + "/" + id).map(res => res.json());
    }
}
