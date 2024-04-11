<template >
  <header class="flex justify-center items-center  bg-gray-200 p-5 max-[505px]:p-2">
    <img class="w-[50px] -rotate-12" src="./assets/pinia-logo.svg" alt="pinia logo">
    <h1 class="text-xl text-gray-500 font-bold ml-3 rotate-3 mt-2">Pinia Tasks</h1>
  </header>

  <div>
    <TaskForm />
  </div>

  
  
  <nav class="w-[500px] max-[505px]:w-[95%] mx-auto flex justify-center space-x-2 mt-3">
    <button @click="filter = 'all'" class="p-2 rounded-md bg-yellow-500 hover:bg-yellow-600  text-black text-sm font-bold">All Tasks</button>
    <button @click="filter = 'fav'" class="p-2 rounded-md bg-yellow-500 hover:bg-yellow-600  text-black text-sm font-bold">Favorite Tasks</button>
  </nav>
  
  <div v-if="taskStore.isLoading" class="w-[500px] max-[505px]:w-[95%] mx-auto text-center text-2xl font-bold my-2">
    Loading content...
  </div>


  <div class="w-[500px] max-[505px]:w-[95%] mx-auto" v-if="filter === 'all'">
    <p class="text-sm mt-3 text-gray-600">You have {{ taskStore.totalCount }} tasks left to do</p>
     <ul v-for="task in taskStore.tasks" :key="task.id"> <!--taskStore.tasks refers to the tasks in the TaskStore.js-->
      <TaskDetails :task="task" />
     </ul>
  </div>
  
  <div class="w-[500px] max-[505px]:w-[95%] mx-auto mt-3" v-if="filter === 'fav'">
    <p class="text-sm text-gray-600">You have {{ taskStore.favCount }} favs left to do</p>

     <ul v-for="task in taskStore.fav" :key="task.id"> 
      <TaskDetails :task="task" />
     </ul>

  </div>

  <div class="w-[500px] max-[505px]:w-[95%] mx-auto mt-3">
    <button class="p-1 bg-red-600 hover:bg-red-800 rounded-md text-sm text-white font-bold" @click="taskStore.$reset">Reset State</button> <!--this resets the tasks in the state to original (which is empty array) but does not change the local storage, unless after pressing it, you pass a new task, in that case setTasksToLocalStorage function is executed and the new task will replace all the previous tasks. because the new array will have that task alone and that will be passed to the local storage.-->

  </div>

</template>

<script setup>
import useTaskStore from './stores/TaskStore'
import TaskDetails from './components/TaskDetails.vue';
import TaskForm from './components/TaskForm.vue'
import {ref} from 'vue'
import { storeToRefs } from 'pinia';

const taskStore = useTaskStore() //importing and invoking the function that holds the data

taskStore.getTasksFromLocalStorage() //this invokes the getTasksFromLocalStorage action in the TaskStore.js in order to get our saved tasks form the local storage

const filter = ref('all')

const {tasks, isLoading, totalCount, favCount, fav} = storeToRefs(taskStore) //this allows us to use the state properties and getter functions (but no action function) in the template without using the word taskStore (so writing favCount in place of taskStore.favCount)


</script>

