<template>
  <v-app>
    <v-app-bar app color="primary" title="ToDo it!" />
    <v-container class="pa-0 mt-16">
      <router-view />
    </v-container>
    <my-bottom-nav />
  </v-app>
</template>

<script setup>
import MyBottomNav from "@/components/MyBottomNav.vue";
</script>
