<template>
    <div>
        <form class="w-[500px] max-[505px]:w-[95%] mx-auto mt-4 flex space-x-2"
        @submit.prevent="handleSubmit">
            <input class="p-1 focus:outline-blue-500 shadow-md rounded-sm w-full" type="text" placeholder="Add new task"
                v-model="newTask">
            <button class="p-1 bg-yellow-500 text-sm font-bold rounded-lg hover:bg-yellow-600">Add Task</button>
        </form>

    </div>
</template>

<script setup>
import useTaskStore from '../stores/TaskStore'
import { ref } from 'vue'

const taskStore = useTaskStore()
const newTask = ref('')

const handleSubmit = () => {
    if (newTask.value.length > 0) {
        taskStore.addTask({ //this object is what is passed as the 'task' i the addTask function action in TaskStore.js
            id: Math.floor(Math.random() * 1000000).toString(), //if I don't change to string, the json deleteTask and toggleFav won't work, the id has to be string.
            title: newTask.value,
            isFav: false
        })
        newTask.value = ""
    }

}

</script>
