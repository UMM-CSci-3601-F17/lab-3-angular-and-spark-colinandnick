import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {Todo} from "./todo";
import {TodoListComponent} from "./todo-list.component";
import {TodoListService} from "./todo-list.service";
import {Observable} from "rxjs";

describe("Todo list", () => {

    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoListServiceStub: {
        getTodos: () => Observable<Todo[]>
    };

    beforeEach(() => {
        // stub TodoService for test purposes
        todoListServiceStub = {
            getTodos: () => Observable.of([
                {
                    id: "chris_id",
                    owner: "Chris",
                    status: false,
                    body: "UMM",
                    category: "software design"
                },
                {
                    id: "pat_id",
                    owner: "Pat",
                    status: false,
                    body: "IBM",
                    category: "video games"
                },
                {
                    id: "jamie_id",
                    owner: "Jamie",
                    status: true,
                    body: "Frogs, Inc.",
                    category: "video games"
                }
            ])
        };

        TestBed.configureTestingModule({
            //imports: [PipeModule],
            declarations: [TodoListComponent],
            // providers:    [ todoListService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers: [{provide: TodoListService, useValue: todoListServiceStub}]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoListComponent);
            todoList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("contains all the todos", () => {
        expect(todoList.todos.length).toBe(3);
    });

    it("contains a todo named 'Chris'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Chris")).toBe(true);
    });

    it("contain a todo named 'Jamie'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Jamie")).toBe(true);
    });

    it("doesn't contain a todo named 'Santa'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Santa")).toBe(false);
    });

    it("has two todos that are in Video Games", () => {
        expect(todoList.todos.filter((todo: Todo) => todo.category === "video games").length).toBe(2);
    });
    it("has two todos with a status of false", () => {
        expect(todoList.todos.filter((todo: Todo) => todo.status == false).length).toBe(2);
    });

});

describe("Misbehaving Todo List", () => {
    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoListServiceStub: {
        getTodos: () => Observable<Todo[]>
    };

    beforeEach(() => {
        // stub TodoService for test purposes
        todoListServiceStub = {
            getTodos: () => Observable.create(observer => {
                observer.error("Error-prone observable");
            })
        };

        TestBed.configureTestingModule({
            declarations: [TodoListComponent],
            providers: [{provide: TodoListService, useValue: todoListServiceStub}]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoListComponent);
            todoList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("generates an error if we don't set up a TodoListService", () => {
        // Since the observer throws an error, we don't expect todos to be defined.
        expect(todoList.todos).toBeUndefined();
    });
});
