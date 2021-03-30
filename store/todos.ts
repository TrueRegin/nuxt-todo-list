import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import _ from 'lodash';

@Module({ namespaced: true, name: 'todos', stateFactory: true })
export default class extends VuexModule {
    items: string[] = [
        "Hey",
        "lo",
        "is"
    ];

    @Mutation
    public addTodo(value: string) {
        this.items = [value, ...this.items];
    }

    @Mutation
    public changeTodo({
        index,
        newValue,
    }: {
        index: number;
        newValue: string;
    }) {
        if (index >= 0 && index < this.items.length) {
            this.items[index] = newValue;
        }
    }

    @Mutation
    public deleteTodo(index: number) {
        const items = [...this.items];
        if (index >= 0 && index < items.length) items.splice(index, 1);
        this.items = [...items];
    }

    get getTodos() {
        return [...this.items];
    }
}
