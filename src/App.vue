<template>
  <v-app>
    <v-app-bar app color="blue-darken-3" dark>
      <v-toolbar-title>Event Organizer</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" variant="text">Home</v-btn>
      <v-btn to="/events" variant="text">Events</v-btn>
      <v-btn to="/contact" variant="text">Contact</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script setup lang="ts"></script>
