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

    it('should type something in the Owner box and check that it returned correct element', () => {
        page.navigateTo();
        page.typeAnOwner("workman");
        page.toggleSearch();
        expect(page.getFirstTodo()).toEqual("Workman has completed this software design task:");
    });

    it('Should select a category and check that it returned correct element', () => {
        page.navigateTo();
        page.grabACategory('homework');
        expect(page.getFirstTodo()).toEqual("Fry has completed this homework task:");

        //page.typeAnOwner("Blanche");
        //page.toggleSearch();
        //expect(page.getFirstTodo()).toEqual("Blanche has not completed this homework task:");

    });
});
