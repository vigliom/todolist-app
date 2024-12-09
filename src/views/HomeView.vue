<template>
  <v-container>
    <v-card class="rounded rounded-xl bg-primary">
        <v-col>
           <v-date-picker-months :locale="'es'" :year="new Date().getFullYear()"/>
        </v-col>
    </v-card>
    
    <v-col>
      <v-list>
        <v-expansion-panels variant="accordion">
          <my-item-task
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            @deleteTask="deleteTask"
            @editTask="editTask"
            @toggleComplete="toggleComplete"
          ></my-item-task>
        </v-expansion-panels>
      </v-list>
    </v-col>

    <!-- Add Task Dialog -->
    <v-dialog v-model="showAddTaskDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Task</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="newTask.title"
              label="Title"
              required
            ></v-text-field>
            <v-textarea
              v-model="newTask.description"
              label="Description"
              required
            ></v-textarea>
            <v-select
              v-model="newTask.priority"
              :items="['High', 'Medium', 'Low']"
              label="Priority"
              required
            ></v-select>
            <v-menu
              ref="dueDateMenu"
              v-model="dueDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="newTask.dueDate"
                  label="Due Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="newTask.dueDate"
                @input="dueDateMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showAddTaskDialog = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="addTask">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Task Dialog -->
    <v-dialog v-model="showEditTaskDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Task</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="editForm">
            <v-text-field
              v-model="currentTask.title"
              label="Title"
              required
            ></v-text-field>
            <v-textarea
              v-model="currentTask.description"
              label="Description"
              required
            ></v-textarea>
            <v-select
              v-model="currentTask.priority"
              :items="['High', 'Medium', 'Low']"
              label="Priority"
              required
            ></v-select>
            <v-menu
              ref="editDueDateMenu"
              v-model="editDueDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="currentTask.dueDate"
                  label="Due Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="currentTask.dueDate"
                @input="editDueDateMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showEditTaskDialog = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="updateTask">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { ref } from "vue";
import MyItemTask from "../components/MyItemTask.vue";

export default {
  name: "HomeView",
  components: {
    MyItemTask,
  },
  setup() {
    const tasks = ref([
      { id: 1, title: "Task 1", description: "Description 1", priority: "High", dueDate: new Date(), completed: false },
      { id: 2, title: "Task 2", description: "Description 2", priority: "Medium", dueDate: new Date(), completed: false },
      { id: 3, title: "Task 3", description: "Description 2", priority: "Medium", dueDate: new Date(), completed: false },
      { id: 4, title: "Task 4", description: "Description 4", priority: "Low", dueDate: new Date(), completed: false },
      { id: 5, title: "Task 5", description: "Description 5", priority: "Medium", dueDate: new Date(), completed: false },
    ]);
    
    const showAddTaskDialog = ref(false);
    const showEditTaskDialog = ref(false);
    const newTask = ref({ title: "", description: "", priority: "Medium", dueDate: new Date(), completed: false });
    const currentTask = ref({ id: null, title: "", description: "", priority: "Medium", dueDate: new Date(), completed: false });
    const dueDateMenu = ref(false);
    const editDueDateMenu = ref(false);
    const selectedDate = ref(new Date());
    const dateMenu = ref(false);

    const addTask = () => {
      if (newTask.value.title && newTask.value.description) {
        tasks.value.push({
          id: Date.now(),
          ...newTask.value,
        });
        newTask.value.title = "";
        newTask.value.description = "";
        newTask.value.priority = "Medium";
        newTask.value.dueDate = new Date();
        showAddTaskDialog.value = false;
      }
    };

    const editTask = (task) => {
      currentTask.value = { ...task };
      showEditTaskDialog.value = true;
    };

    const updateTask = () => {
      const index = tasks.value.findIndex(task => task.id === currentTask.value.id);
      if (index !== -1) {
        tasks.value[index] = { ...currentTask.value };
        showEditTaskDialog.value = false;
      }
    };

    const deleteTask = (id) => {
      tasks.value = tasks.value.filter(task => task.id !== id);
    };

    const toggleComplete = (task) => {
      const index = tasks.value.findIndex(t => t.id === task.id);
      if (index !== -1) {
        tasks.value[index].completed = !tasks.value[index].completed;
      }
    };

    return {
      tasks,
      showAddTaskDialog,
      showEditTaskDialog,
      newTask,
      currentTask,
      dueDateMenu,
      editDueDateMenu,
      addTask,
      editTask,
      updateTask,
      deleteTask,
      toggleComplete,
      dateMenu,
      selectedDate,
    };
  },
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
