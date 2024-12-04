<template>
  <v-list-item>
    <v-list-item-title>
      <v-checkbox
        :value="task.completed"
        @change="onCheckboxChange"
        :label="task.title"
      ></v-checkbox>
    </v-list-item-title>
    <v-list-item-subtitle>
      {{ task.description }}
    </v-list-item-subtitle>
    <v-list-item-subtitle>
      <v-chip :color="priorityColor" dark>
        {{ task.priority }}
      </v-chip>
      <span>{{ formattedDate }}</span>
    </v-list-item-subtitle>
    <v-list-item-action>
      <v-btn icon @click.stop="$emit('editTask', task)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon @click.stop="$emit('deleteTask', task.id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

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
      return "red";
    case "Medium":
      return "orange";
    case "Low":
      return "green";
    default:
      return "grey";
  }
});

const formattedDate = computed(() => {
  return new Date(props.task.dueDate).toLocaleDateString();
});

const onCheckboxChange = () => {
  emit("updateTask", { ...props.task, completed: !props.task.completed });
};
</script>

<style scoped>
.v-list-item-title {
  display: flex;
  align-items: center;
}

.v-list-item-subtitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.v-chip {
  margin-right: 10px;
}
</style>
