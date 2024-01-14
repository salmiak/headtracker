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
        {{todo.date}} - {{todo.content}} - {{ todo.done?'done':'not done' }}
        <button
            @click="deleteTodo(todo.id)"
        >Delete</button>
        <button
            @click="toggleDone(todo.id)"
        >Done?</button>
    </div>
</template>

<script setup>
/* Imports */
import { ref, onMounted } from 'vue'
import { 
    collection, onSnapshot, 
    doc, addDoc, deleteDoc, updateDoc, 
    query, orderBy,  
}  from "firebase/firestore"
import { db } from '@/firebase'

/* Firebase Refs */

const todosCollectionRef = collection(db, "todos") 
const todosCollectionQuery = query(todosCollectionRef, orderBy("date", 'desc'));

/* Todos */
const todos = ref([
/*    {
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
    }*/
])

/* Get todos */

onMounted(() => {
    onSnapshot(todosCollectionQuery, (querySnapshot) => {
        const fbTodos = [];
        querySnapshot.forEach((doc) => {
            const todo = {
                id: doc.id,
                content: doc.data().content,
                done: doc.data().done
            }
            fbTodos.push(todo)
        });
        todos.value = fbTodos
    });
})

/* Add todos */
const newTodoContent = ref('')
const addTodo = () => {
    addDoc(todosCollectionRef, {
        content: newTodoContent.value,
        date: Date.now(),
        done: false
    });
    newTodoContent.value = ''
}

/* Delete todo */
const deleteTodo = id => {
    deleteDoc(doc(todosCollectionRef, id))
}

/* Mark Done */
const toggleDone = id => {
    const index = todos.value.findIndex(todo => todo.id === id)
    updateDoc(doc(todosCollectionRef, id), {
        done: !todos.value[index].done
    });
}

</script>

<style>
.entry {
    margin: 15px 0;
}
</style>