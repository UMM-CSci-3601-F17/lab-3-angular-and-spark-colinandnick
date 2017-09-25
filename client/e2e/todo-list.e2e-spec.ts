import {TodoPage} from './todo-list.po'
import {browser, protractor} from 'protractor';

describe('angular-spark-lab', () => {
    let page: TodoPage;

    beforeEach(() => {
        page = new TodoPage();
    });

    it('should get and highlight Todo Owner attribute', ()=> {
        page.navigateTo();
        expect(page.getTodoOwner()).toEqual('Todo Owner')
    });

    it('should type something in filter owner box and check that it returned correct element', () => {
        page.navigateTo();
        page.typeAOwner("Fry");
        expect(page.getFirstTodo()).toContain("Fry")
    });

    /*
    it("should return todos when the status filter is used")

    page.navigateTo();
    page.selectStatus(true);
    expect(page.getFirstTodo()).toContain(true);
    */
});
