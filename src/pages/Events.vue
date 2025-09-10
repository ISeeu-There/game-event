<template>
  <v-container>
    <h1 class="text-center mb-6">Upcoming Events</h1>

    <v-row>
      <v-col v-for="event in events" :key="event.id" cols="12" sm="6" md="4">
        <v-card class="hover:shadow-lg transition">
          <v-img :src="event.image" height="200px"></v-img>

          <v-card-title>{{ event.title }}</v-card-title>
          <v-card-subtitle>
            {{ event.date }} • {{ event.location }}
          </v-card-subtitle>

          <v-card-text> Organizer: {{ event.organizer }} </v-card-text>

          <v-card-actions>
            <v-btn color="primary" @click="openDialog(event)">
              See Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card v-if="selectedEvent">
        <v-img :src="selectedEvent.image" height="200px"></v-img>
        <v-card-title>{{ selectedEvent.title }}</v-card-title>
        <v-card-subtitle>
          {{ selectedEvent.date }} • {{ selectedEvent.location }}
        </v-card-subtitle>
        <v-card-text>
          <p><strong>Organizer:</strong> {{ selectedEvent.organizer }}</p>
          <p>{{ selectedEvent.description }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import type { Event } from "../types/Event";
import { ref } from "vue";

const events: Event[] = [
  {
    id: 1,
    title: "Vue Conference",
    date: "2025-09-20",
    location: "Algiers",
    organizer: "Vue Community",
    description: "A meetup for Vue.js developers across Algeria.",
    image: "https://picsum.photos/seed/vue/400/200",
  },
  {
    id: 2,
    title: "Music Festival",
    date: "2025-10-05",
    location: "Oran",
    organizer: "Oran Events",
    description: "A celebration of music, culture, and joy!",
    image: "https://picsum.photos/seed/music/400/200",
  },
  {
    id: 3,
    title: "Startup Meetup",
    date: "2025-11-12",
    location: "Algiers",
    organizer: "Tech Hub",
    description: "Network with entrepreneurs and investors.",
    image: "https://picsum.photos/seed/startup/400/200",
  },
];

const dialog = ref(false);
const selectedEvent = ref<Event | null>(null);

function openDialog(event: Event) {
  selectedEvent.value = event;
  dialog.value = true;
}
</script>
