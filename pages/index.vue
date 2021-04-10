<template>
    <div class="container">
        <h1 class="title">Nuxt TodoList</h1>
        <h3>Drag and drop todos to delete.</h3>

        <div class="todo-component">
            <div
                class="delete-todo"
                :class="{ hidden: hidedrop }"
                @drop="drop"
                @dragover.prevent
                @dragenter.prevent
            >
                Drag to delete
            </div>
            <input
                v-model="input"
                @keypress="createTodo"
                type="text"
                class="create-todo"
                placeholder="Todo"
            />
            <ul class="todo-list">
                <li
                    draggable="true"
                    @dragstart="startDrag(i, $event)"
                    @dragend="stopDrag"
                    class="todo-item"
                    :class="{ 'delete-target': i === dragging }"
                    v-for="(item, i) in getTodos"
                    :key="i"
                >
                    {{ item }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Mutation, namespace } from 'nuxt-property-decorator';
const TodosModule = namespace('todos');
type Todos = string[];

@Component
export default class extends Vue {
    @TodosModule.Mutation addTodo!: (todo: string) => void;
    @TodosModule.Mutation deleteTodo!: (index: number) => void;
    @TodosModule.Getter getTodos!: Todos;
    input: string = '';
    dragging = -1;
    hidedrop = true;

    createTodo(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            const input = this.input;
            this.addTodo(input);
            this.input = '';
        }
    }

    startDrag(i: number, event: DragEvent) {
        console.log("HEY")
        this.hidedrop = false;
        this.dragging = i;
        event.dataTransfer?.setData('index', i + '');
    }

    stopDrag(event: DragEvent) {
        console.log("Yoasfafs")
        this.hidedrop = true;
        this.dragging = -1;
    }

    drop(event: DragEvent) {
        console.log("Yo")
        const index = parseInt(event.dataTransfer?.getData('index') + '');
        if (index !== NaN) {
            this.deleteTodo(index);
        }
    }
}
</script>

<style lang='scss'>
.create-todo {
    appearance: none;
    border: none;
    border-bottom: 2px solid var(--border);
    outline: none;
    background: none;
    transition: border-color 0.22s;
    transition-timing-function: ease-out;
    color: var(--color);

    &:focus, &:active {
        border-color: var(--accent);
    }
}

.todo-list {
    list-style-type: none;
    text-align: left;
    box-sizing: border-box;
    margin: 20px;
    padding: 10px 0;
    border-top: 2px solid var(--border);

    .todo-item {
        transition: color 0.12s, transform 0.57s;
        transition-timing-function: ease-out;
        padding: 0.3em 0.5em;
        box-sizing: border-box;
        border: 1px solid #0000;

        &:hover {
            color: var(--accent);
            border-color: var(--accent);
            transform: translateX(0.5em) scaleX(0.98);
            cursor: pointer;
        }

        &.delete-target {
            color: var(--primary);
        }
    }
}

.delete-todo {
    display: grid;
    justify-content: center;
    align-content: center;
    box-sizing: border-box;
    padding: 20px;
    margin: 20px;
    height: 150px;
    border: 3px dashed var(--gray-3);

    transition: opacity 0.2s, height 0.5s;
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);

    &.hidden {
        opacity: 0;
        height: 0;
        margin: 0;
    }
}

.container {
    min-height: 100vh;
    display: flex;
    text-align: center;
    display: grid;
    grid-auto-rows: min-content min-content 1fr;
}

.title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
        BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 80px;
    transition: color 0.23s;
    color: var(--primary);
    letter-spacing: 1px;
    outline: none;
    padding: 0;
    user-select: none;
}
</style>
