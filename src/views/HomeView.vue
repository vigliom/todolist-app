<template>
  <v-container fluid class="pa-0">
    <v-col cols="12">
      <v-date-picker view-mode="month" :landscape="true" show-adjacent-months hide-weekdays hide-header hide-days
        class="w-100" header="Selecciona un dia" title="AppName" />
    </v-col>
    <v-col cols="12">
      <v-list>
        <my-item-task v-for="task in tasks" :key="task.id" :task="task" @deleteTask="deleteTask" @editTask="editTask"
          @toggleComplete="toggleComplete"></my-item-task>
      </v-list>
    </v-col>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import MyItemTask from "../components/MyItemTask.vue";

const tasks = ref([
  { id: 1, title: "Comprar comestibles", description: "Comprar leche, pan, huevos y frutas", priority: "High", dueDate: new Date('2024-12-06'), completed: false },
  { id: 2, title: "Reunión con el equipo", description: "Reunión semanal de seguimiento del proyecto", priority: "Medium", dueDate: new Date('2024-12-07'), completed: false },
  { id: 3, title: "Enviar informe mensual", description: "Preparar y enviar el informe mensual de ventas", priority: "Medium", dueDate: new Date('2024-12-08'), completed: false },
  { id: 4, title: "Llamar al médico", description: "Programar una cita para el chequeo anual", priority: "Low", dueDate: new Date('2024-12-09'), completed: false },
  { id: 5, title: "Limpiar la casa", description: "Limpiar la sala, cocina y baños", priority: "Medium", dueDate: new Date('2024-12-10'), completed: false },
  { id: 6, title: "Pagar facturas", description: "Pagar la factura de electricidad y agua", priority: "High", dueDate: new Date('2024-12-11'), completed: false },
  { id: 7, title: "Estudiar para el examen", description: "Revisar los capítulos 4 y 5 del libro de matemáticas", priority: "Low", dueDate: new Date('2024-12-12'), completed: false },
  { id: 8, title: "Actualizar CV", description: "Agregar la experiencia laboral reciente al CV", priority: "Medium", dueDate: new Date('2024-12-13'), completed: false },
  { id: 9, title: "Planificar vacaciones", description: "Investigar destinos y reservar vuelos y hoteles", priority: "High", dueDate: new Date('2024-12-14'), completed: false },
  { id: 10, title: "Leer un libro", description: "Leer al menos 50 páginas del libro actual", priority: "Low", dueDate: new Date('2024-12-15'), completed: false },
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

</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
