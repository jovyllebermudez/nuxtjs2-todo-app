<template>
  <div class="my-app">
    <v-container class="my-container">
      <div class="">
        <h1 class="title"> Jov Vue Todo List</h1>
        <div 
          class="my-card"
          >
          <div class="card-head">
            <div class="badge">
              <div class="label">Tasks</div>
              <div class="num">{{ tasks.length }}</div>
            </div>
            <div class="badge">
              <div class="label">Tasks Done</div>
              <div class="num">{{ tasks.filter((task) => task.done).length }}</div>
            </div>
            <button v-if="tasks.filter((task) => task.done).length" class="badge badge-button"  @click="removeCompletedTasks">
              <svg class="badge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
              <div class="label">Tasks Done</div>
            </button>
            <button class="badge badge-button"  @click="removeAllTasks">
              <svg class="badge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
              <div class="label">Tasks</div>
            </button>
          </div>
          <div class="card-body">
            <div v-if="tasks.length <=0" style="color:grey">
              Empty task list
            </div>
            <div v-for="(task, index) in tasks" :key="index" cols="12" md="4">
              <Task
                :task="task"
                :index="index"
                :deleteTask="() => deleteTask(index)"
                :editTask="() => editTask(index)"
                :toggleDone="toggleDone"
              />
            </div>
          </div>
          <div class="card-footer">
            <v-form @submit.prevent="addTask" class="input-wrap" style="position: relative;">
              <input :maxlength="maxCharacters" title="task input" type="text" placeholder="New task" v-model="newTask" label="New Task" required></input>
              <p v-if="newTask.length >= maxCharacters" class="popup" >Maximum character limit reached!</p>
              <button title="task button" class="hehe" type="submit"><svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg></button>
            </v-form>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: "",
      maxCharacters: 40 // Maximum number of characters
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== "") {
        this.$store.commit("addTask", { title: this.newTask });
        this.newTask = "";
      }
    },
    deleteTask(index) {
      console.log("here's him");
      console.log(index);
      this.$store.commit("deleteTask", index);
    },
    editTask(index) {
      const updatedTask = prompt("Edit task:", this.tasks[index]?.title);
      if (updatedTask !== null) {
        this.$store.commit("updateTask", {
          index,
          updatedTask: { title: updatedTask },
        });
      }
    },
    toggleDone(index) {
      this.$store.commit("toggleDone", index);
    },
    removeAllTasks() {
      this.$store.commit("removeAllTasks");
    },
    removeCompletedTasks() {
      this.$store.commit("removeCompletedTasks");
    },
  },
  mounted() {
    this.$store.commit("initializeStore");
  },
};
</script>

<style lang="scss">
</style>