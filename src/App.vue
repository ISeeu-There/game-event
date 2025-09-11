<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script setup lang="ts"></script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&family=Jaro:opsz@6..72&family=Luckiest+Guy&display=swap");
.v-application {
  font-family: "jaro", sans-serif !important;
}

/* Test with even more specificity */
.v-application * {
  font-family: "jaro", sans-serif !important;
}
</style>
