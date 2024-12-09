<template>
  <v-bottom-navigation v-model="active" color="primary" app>
    <v-btn value="home" to="/">
      <v-icon>mdi-home</v-icon>
      <span>Home</span>
    </v-btn>
    <v-btn value="categories" to="/categories">
      <v-icon>mdi-label</v-icon>
      <span>Categories</span>
    </v-btn>
    <v-btn value="settings" to="/settings">
      <v-icon>mdi-cog-outline</v-icon>
      <span>Settings</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      active: "home",
    };
  },
  methods: {
    navigateTo(page) {
      this.$router.push({ name: page });
    },
  },
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
