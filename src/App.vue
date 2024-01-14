<template>
  <h1>Headtracker</h1>

  <form @submit.prevent="addTodo">
    <input
      type="text"
      v-model="newTodoContent"
    />
    <button>Add info</button>
  </form>

  <div
    v-for="todo in todos"
    :key="todo.id"
    class="entry"
  >
    {{ todo.date }} - {{ todo.content }} - {{ todo.done ? 'done' : 'not done' }}
    <button @click="deleteTodo(todo.id)">Delete</button>
    <button @click="toggleDone(todo.id)">Done?</button>
  </div>
</template>

<script setup>
/* Imports */
import { ref, onMounted } from 'vue'
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore'
import { todosRef } from '@/firebase'
import { useCollection } from 'vuefire'

/* Firebase Refs */
const todosCollectionQuery = query(todosRef, orderBy('date', 'desc'))

const todos = useCollection(todosCollectionQuery)

/* Add todos */
const newTodoContent = ref('')
const addTodo = () => {
  addDoc(todosRef, {
    content: newTodoContent.value,
    date: Date.now(),
    done: false,
  })
  newTodoContent.value = ''
}

/* Delete todo */
const deleteTodo = (id) => {
  deleteDoc(doc(todosRef, id))
}

/* Mark Done */
const toggleDone = (id) => {
  const index = todos.value.findIndex((todo) => todo.id === id)
  updateDoc(doc(todosRef, id), {
    done: !todos.value[index].done,
  })
}
</script>

<style>
.entry {
  margin: 15px 0;
}
</style>
