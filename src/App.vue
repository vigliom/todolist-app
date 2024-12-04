<template>
  <v-app>
    <v-container fluid class="pa-5">
      <router-view />
    </v-container>
    <my-bottom-nav />
  </v-app>
</template>

<script setup>
import MyBottomNav from "@/components/MyBottomNav.vue";
</script>
