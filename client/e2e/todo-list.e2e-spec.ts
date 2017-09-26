import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';

describe('angular-spark-lab', () => {
    let page: TodoPage;

    beforeEach(() => {
        page = new TodoPage();
    });

    it('should get and highlight Tasks attribute ', () => {
        page.navigateTo();
        expect(page.getTodoTitle()).toEqual('Tasks');
    });

    it('should type something in filer name box and check that it returned correct element', () => {
        page.navigateTo();
        page.typeAnOwner("workman");
        page.toggleSearch();
        expect(page.getFirstTodo()).toEqual("Workman is in software design");
    });

    it('should click on the limit 10 times and return 10 elements then ', () => {
        page.navigateTo();
        page.limitTodos();
        for (let i = 0; i < 10; i++) {
            page.selectUpKey();
        }

        expect(page.getFirstTodo()).toEqual("Stokes Clayton is 27 years old");

        page.typeAnOwner("Merrill");

        expect(page.getFirstTodo()).toEqual("Merrill Parker is 27 years old");

    });
});
