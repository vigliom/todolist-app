<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>ToDo it!</h1>
        <v-btn color="primary" @click="showAddTaskDialog = true"
          >Add Task</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list>
          <v-list-item
            v-for="task in tasks"
            :key="task.id"
            @click="editTask(task)"
          >
            <v-list-item-title>{{ task.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
            <v-list-item-action>
              <v-btn icon @click.stop="deleteTask(task.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

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

<script setup>
import { ref } from "vue";

const tasks = ref([
  { id: 1, title: "Task 1", description: "Description 1" },
  { id: 2, title: "Task 2", description: "Description 2" },
]);

const showAddTaskDialog = ref(false);
const showEditTaskDialog = ref(false);
const newTask = ref({ title: "", description: "" });
const currentTask = ref({ id: null, title: "", description: "" });

const addTask = () => {
  if (newTask.value.title && newTask.value.description) {
    tasks.value.push({
      id: Date.now(),
      title: newTask.value.title,
      description: newTask.value.description,
    });
    newTask.value.title = "";
    newTask.value.description = "";
    showAddTaskDialog.value = false;
  }
};

const editTask = (task) => {
  currentTask.value = { ...task };
  showEditTaskDialog.value = true;
};

const updateTask = () => {
  const index = tasks.value.findIndex(
    (task) => task.id === currentTask.value.id
  );
  if (index !== -1) {
    tasks.value[index] = { ...currentTask.value };
    showEditTaskDialog.value = false;
  }
};

const deleteTask = (id) => {
  tasks.value = tasks.value.filter((task) => task.id !== id);
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
