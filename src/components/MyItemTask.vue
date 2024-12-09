<template>
  <v-container class="px-0">
    <!-- Card con diseño redondeado -->
    <v-card
      class="pa-3 outlined"
      variant="tonal"
      :color="priorityColor">
      <div class="d-flex justify-space-between align-center">
        <!-- Título -->
        <h3 class="font-weight-medium mb-1">{{ task.title }}</h3>
          <v-chip
            class="mb-2"
            :color="priorityColor"
            text
            outlined
            small>
            {{ task.priority }}
          </v-chip>
          <v-icon color="primary" small>mdi-clock-outline</v-icon>
          <span class="text-muted">{{ formattedDate }}</span>
        </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["deleteTask", "editTask", "updateTask"]);

const priorityColor = computed(() => {
  switch (props.task.priority) {
    case "High":
      return "error";
    case "Medium":
      return "warning";
    case "Low":
      return "info";
    default:
      return "grey-lighten-1";
  }
});

const formattedDate = computed(() => {
  return props.task.dueDate
    ? new Date(props.task.dueDate).toLocaleDateString()
    : "No Due Date";
});
</script>

<style scoped>
h3 {
  font-size: 1.2rem;
  margin: 0;
}

.text-muted {
  color: #757575;
}

.v-card {
  border-radius: 16px;
}

.v-btn {
  margin: 0 4px;
}
</style>
