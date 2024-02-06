export const state = () => ({
  tasks: [],
});

export const mutations = {
  removeAllTasks (state) {
    state.tasks = [];
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  },
  removeCompletedTasks (state) {
    state.tasks = state.tasks.filter(task => !task.done);
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  },
  addTask (state, task) {
    state.tasks.push({ ...task, done: false });
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  },
  deleteTask (state, index) {
    console.log(state)
    console.log(index)
    state.tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  },
  updateTask (state, { index, updatedTask }) {
    state.tasks.splice(index, 1, updatedTask);
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  },
  toggleDone (state, index) {
    state.tasks[index].done = !state.tasks[index].done;
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  },
  initializeStore (state) {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      state.tasks = JSON.parse(storedTasks);
    }
  },
};
