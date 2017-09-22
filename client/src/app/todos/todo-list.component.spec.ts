import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {Todo} from "./todo";
import {TodoListComponent} from "./todo-list.component";
import {TodoListService} from "./todo-list.service";
import {Observable} from "rxjs";

describe("Todo list", () => {

    let userList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoListServiceStub: {
        getTodos: () => Observable<Todo[]>
    };

    beforeEach(() => {
        // stub UserService for test purposes
        todoListServiceStub = {
            getTodos: () => Observable.of([
                {
                    id: "chris_id",
                    owner: "Chris",
                    status: false,
                    body: "UMM",
                    category: "chris@this.that"
                },
                {
                    id: "pat_id",
                    owner: "Pat",
                    status: false,
                    body: "IBM",
                    category: "pat@something.com"
                },
                {
                    id: "jamie_id",
                    owner: "Jamie",
                    status: true,
                    body: "Frogs, Inc.",
                    category: "jamie@frogs.com"
                }
            ])
        };

        TestBed.configureTestingModule({
            //imports: [PipeModule],
            declarations: [TodoListComponent],
            // providers:    [ UserListService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers: [{provide: TodoListService, useValue: userListServiceStub}]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(UserListComponent);
            userList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("contains all the users", () => {
        expect(userList.users.length).toBe(3);
    });

    it("contains a user named 'Chris'", () => {
        expect(userList.users.some((user: User) => user.name === "Chris")).toBe(true);
    });

    it("contain a user named 'Jamie'", () => {
        expect(userList.users.some((user: User) => user.name === "Jamie")).toBe(true);
    });

    it("doesn't contain a user named 'Santa'", () => {
        expect(userList.users.some((user: User) => user.name === "Santa")).toBe(false);
    });

    it("has two users that are 37 years old", () => {
        expect(userList.users.filter((user: User) => user.age === 37).length).toBe(2);
    });

});

describe("Misbehaving User List", () => {
    let userList: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;

    let userListServiceStub: {
        getUsers: () => Observable<User[]>
    };

    beforeEach(() => {
        // stub UserService for test purposes
        userListServiceStub = {
            getUsers: () => Observable.create(observer => {
                observer.error("Error-prone observable");
            })
        };

        TestBed.configureTestingModule({
            declarations: [UserListComponent],
            providers: [{provide: UserListService, useValue: userListServiceStub}]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(UserListComponent);
            userList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("generates an error if we don't set up a UserListService", () => {
        // Since the observer throws an error, we don't expect users to be defined.
        expect(userList.users).toBeUndefined();
    });
});
