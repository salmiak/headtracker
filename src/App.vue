<template>
    <h1>Headtracker</h1>

    <form 
        @submit.prevent="addTodo"
    >
        <input 
            type="text" 
            v-model="newTodoContent"
            >
        <button>Add info</button>
    </form>

    <div
        v-for="todo in todos"
        :key="todo.id"
        class="entry"
    >
        {{todo.date}} - {{todo.content}}
        <button
            @click="deleteTodo(todo.id)"
        >Delete</button>
    </div>
</template>

<script setup>
/* Imports */
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

/* Todos */
const todos = ref([
    {
        id: 'id1',
        content: 'Huvudvärk',
        date: '2024-01-04'
    },
    {
        id: 'id2',
        content: 'Huvudvärk',
        date: '2024-01-01'
    },
    {
        id: 'id3',
        content: 'Huvudvärk',
        date: '2023-12-25'
    }
])

/* Add todos */
const newTodoContent = ref('')
const addTodo = () => {
    const newTodo = {
        id: uuidv4(),
        content: newTodoContent.value,
        date: new Date().toLocaleDateString()
    }
    todos.value.unshift(newTodo)
    newTodoContent.value = ''
}

/* Delete todo */
const deleteTodo = id => {
    todos.value = todos.value.filter(todo => id !== todo.id)
}

/* Mark done : https://youtu.be/84mhLKUM04E?t=1201&si=O2dirhVru5gcOXGA */


</script>

<style>
.entry {
    margin: 15px 0;
}
</style>