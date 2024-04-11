<template>
    <div class="w-[500px] max-[505px]:w-[95%] mx-auto p-3 max-[505px]:p-1 mt-2 rounded-md   bg-white flex justify-between items-center">
    <h3 class="text-lg max-[505px]:text-base font-bold text-gray-600 ">{{ task.title }}</h3>
     <div class="text-gray-400">
       <i class="material-icons cursor-pointer"  @click="taskStore.deleteTask(task.id)">delete</i>
       <i class="material-icons cursor-pointer" :class="{'text-red-500': task.isFav}" @click="taskStore.toggleFav(task.id)">favorite</i>
     
     </div>
    
    </div>
     
</template>

<script>
import useTaskStore from '../stores/TaskStore'
export default {
    props: ['task'],

    setup () { //using setup(), you can use both option and composition api in the ssame script. inside setup is composition, outside is option
      const taskStore = useTaskStore()

      return {taskStore}

    }
    

}


</script>

