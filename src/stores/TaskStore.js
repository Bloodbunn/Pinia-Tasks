import { defineStore } from "pinia";

const useTaskStore = defineStore('taskStore', { //this name has to be unique (taskStore)
    state: () => ({ //state is where we store the data
        tasks: [],
        isLoading: false,
    }),

    getters: { //getters are like computed functions, get something specific from the state data.
        fav() {
            return this.tasks.filter((task) => task.isFav)
        },

        favCount() { //returns fav count 
            return this.tasks.reduce((acc, task) => {
                return task.isFav ? acc + 1 : acc
            }, 0)
        },

        totalCount: (state) => { //arrow function needs state to be passed into, and does not use this keyword
            return state.tasks.length

        }
    },

    actions: { //actions allow us to modify the state data (such as adding new data, toggling fav, and deleting data)

         getTasksFromLocalStorage() { //populating the tasks array from local storage
            this.isLoading = true
            const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'))

            if (tasksFromLocalStorage) {
                this.tasks = tasksFromLocalStorage
                this.isLoading = false
            }
            this.isLoading = false
        },

         setTasksToLocalStorage () { //invoke this in every action function where changes are made to the tasks
            localStorage.setItem('tasks', JSON.stringify(this.tasks))
        },

         addTask(task) { //task is what is passed in the place where addTask is used. 
            this.tasks.push(task) //this updates the tasks array in order for the web UI to be updated rapidly without waiting for data form local storage, then after this we update the local storage. this is why we update both the tasks array and local

            this.setTasksToLocalStorage()

        },

        deleteTask(id) {
            this.tasks = this.tasks.filter((task) => { return task.id !== id })

            this.setTasksToLocalStorage()

        },

         toggleFav(id) {
            const task = this.tasks.find((task) => task.id === id)
            task.isFav = !task.isFav

            this.setTasksToLocalStorage()

        }

    }
})

export default useTaskStore

//so now that we have stored the data in a function (useTaskStore) and we have exported it, we can import this function anywhere and use the data there