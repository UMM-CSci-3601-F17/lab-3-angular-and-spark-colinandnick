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
                    body: "Write tests for todo-list component",
                    category: "software design"
                },
                {
                    id: "pat_id",
                    owner: "Pat",
                    status: false,
                    body: "Win a game of rocket league",
                    category: "video games"
                },
                {
                    id: "jamie_id",
                    owner: "Jamie",
                    status: true,
                    body: "Finish installing steam",
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

    it("has at least one todo with a status of false", () => {
        expect(todoList.todos.some((todo: Todo) => todo.status == false)).toBe(true);
    });

    it("has at least one todo with a status of true", () => {
        expect(todoList.todos.some((todo: Todo) => todo.status === true)).toBe(true);
    });

    it("has two todos with a status of false", () => {
        expect(todoList.todos.filter((todo: Todo) => todo.status === false).length).toBe(2);
    });

    it("has one todos with a status of true", () => {
        expect(todoList.todos.filter((todo: Todo) => todo.status === true).length).toBe(1);
    });

    it("has two todos that are in Video Games", () => {
        expect(todoList.todos.filter((todo: Todo) => todo.category === "video games").length).toBe(2);
    });

    it("has one todo with a category of software design", () => {
        expect(todoList.todos.filter((todo: Todo) => todo.category === "software design").length).toBe(1);
    });

    it("has no todos with a category of groceries", () => {
        expect(todoList.todos.filter((todo: Todo) => todo.category === "groceries").length).toBe(0);
    });

    it("has no todos with a category of groceries", () => {
        expect(todoList.todos.some((todo: Todo) => todo.category === "groceries")).toBe(false);
    });

    it("has at least one todo that is in in Video Games", () => {
        expect(todoList.todos.some((todo: Todo) => todo.category === "video games")).toBe(true);
    });

    it("has at least one todo that is in software design", () => {
        expect(todoList.todos.some((todo: Todo) => todo.category === "software design")).toBe(true);
    });

    it("has one todo that has the content 'Win a game of rocket league' in the body", () => {
        expect(todoList.todos.filter((todo: Todo) => todo.body === "Win a game of rocket league").length).toBe(1);
    });

    it("has no todos that has the content 'Ketchup' in the body", () => {
        expect(todoList.todos.filter((todo: Todo) => todo.body === "Ketchup").length).toBe(0);
    });

    it("has a todo with the body: 'Finish installing steam'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.body === "Finish installing steam")).toBe(true);
    });

    it("has no todos with the body: 'Fix copying machine'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.body === "Fix copying machine")).toBe(false);
    });

});

describe("Todo list filtering method", () => {

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
                    body: "Write tests for todo-list component",
                    category: "software design"
                },
                {
                    id: "pat_id",
                    owner: "Pat",
                    status: false,
                    body: "Win a game of rocket league",
                    category: "video games"
                },
                {
                    id: "jamie_id",
                    owner: "Jamie",
                    status: true,
                    body: "Finish installing steam",
                    category: "video games"
                },
                {
                    id: "jamie_id",
                    owner: "Jamie",
                    status: true,
                    body: "Complete math problem 7",
                    category: "homework"
                }
            ])
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

    it("can return todos that only belong to Jamie", () => {
    expect(todoList.filterTodos("Jamie","","", null).length).toBe(2)
    });

    it("will not return todos that belong to Santa", () => {
        expect(todoList.filterTodos("Santa","","", null).length).toBe(0)
    });

    it("can return todos that are in the video games category", () => {
        expect(todoList.filterTodos("","video games","", null).length).toBe(2)
    });

    it("will not return todos that are in the astronaut category", () => {
        expect(todoList.filterTodos("","astronaut","", null).length).toBe(0)
    });

    it("can return todos that have the content 'rocket' in their body", () => {
        expect(todoList.filterTodos("","","rocket", null).length).toBe(1)
    });

    it("can return todos that have the letter 'o' in their body", () => {
        expect(todoList.filterTodos("","","o", null).length).toBe(3)
    });

    it("will not return todos that contain 'supercalifragileisticexpialadocious' in their body", () => {
        expect(todoList.filterTodos("","","supercalifragileisticexpialadocious", null).length).toBe(0)
    });

    it("will not return todos that contain the letter 'z' in their body", () => {
        expect(todoList.filterTodos("","","z", null).length).toBe(0)
    });

    it("can return todos that only have a true status", () => {
        expect(todoList.filterTodos("","","", true).length).toBe(2)
    });

    it("can return todos that only have a false status", () => {
        expect(todoList.filterTodos("","","", false).length).toBe(2)
    });

    it("will return all todos if no status is specified", () => {
        expect(todoList.filterTodos("Jamie","","", null).length).toBe(4)
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
