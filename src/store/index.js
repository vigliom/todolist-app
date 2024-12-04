import { createStore } from "vuex";

export default createStore({
  state: {
    tasks: [],
    categories: [],
    user: null,
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      state.tasks.splice(index, 1, updatedTask);
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    fetchTasks({ commit }) {
      // Fetch tasks from API or database
      const tasks = []; // Replace with actual fetch logic
      commit("setTasks", tasks);
    },
    fetchCategories({ commit }) {
      // Fetch categories from API or database
      const categories = []; // Replace with actual fetch logic
      commit("setCategories", categories);
    },
    login({ commit }, user) {
      // Perform login logic
      commit("setUser", user);
    },
    logout({ commit }) {
      // Perform logout logic
      commit("setUser", null);
    },
  },
  getters: {
    tasks: (state) => state.tasks,
    categories: (state) => state.categories,
    user: (state) => state.user,
  },
});
