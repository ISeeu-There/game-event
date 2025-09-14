<template>
  <div class="upcoming-section">
    <div class="section-header">
      <h2 class="section-title">UPCOMING</h2>
      <div class="section-controls">
        <v-icon size="20" color="#8E9297">mdi-chevron-left</v-icon>
        <v-icon size="20" color="#8E9297">mdi-chevron-right</v-icon>
      </div>
    </div>
    <p class="section-subtitle">Discover the upcoming competitions</p>

    <div class="upcoming-events">
      <div
        class="event-card"
        v-for="(event, index) in comingEvents"
        :key="index"
      >
        <div class="event-image">
          <img :src="event.image" :alt="event.title" />
        </div>
        <div class="event-info">
          <h4 class="event-title">{{ event.title }}</h4>
          <p class="event-date">{{ event.date }}</p>
          <div class="event-participants">
            <span class="participant-count"
              >{{ event.participants }} participants</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { comingEvents } from "../../components/upcomingEvents";
</script>

<style scoped>
/* Upcoming Section */
.upcoming-section {
  padding: 32px 24px;
  background: #1a1d23;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.section-title {
  font-size: 24px;
  font-weight: 10;
  color: #ffffff;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-subtitle {
  font-size: 16px;
  color: #8e9297;
  margin: 0 0 32px 0;
}

.section-controls {
  display: flex;
  gap: 8px;
}

.upcoming-events {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding: 16px 0;
}

.event-card {
  min-width: 200px;
  background: #2c3036;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.event-card:hover {
  transform: scale(1.02);
}

.event-image img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.event-info {
  padding: 16px;
}

.event-title {
  font-size: 14px;
  font-weight: 10;
  color: #ffffff;
  margin: 0 0 4px 0;
}

.event-date {
  font-size: 12px;
  color: #8e9297;
  margin: 0 0 8px 0;
}

.event-participants .participant-count {
  font-size: 12px;
  color: #8e9297;
}

/* Responsive Design */
@media (max-width: 768px) {
  .upcoming-events {
    flex-direction: column;
  }

  .event-card {
    min-width: 240px;
    flex: 0 0 auto;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 20px;
  }

  .section-subtitle {
    font-size: 14px;
  }

  .event-title {
    font-size: 13px;
  }
}
</style>
