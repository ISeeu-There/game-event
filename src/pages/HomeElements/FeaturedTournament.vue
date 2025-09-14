<template>
  <div class="tournaments-section">
    <h2 class="section-title">FEATURED TOURNAMENTS</h2>
    <p class="section-subtitle">Participate in tournaments and earn prizes</p>

    <div class="tournaments-grid">
      <div
        class="tournament-card"
        v-for="(tournament, index) in featuredTournaments"
        :key="index"
      >
        <div class="tournament-image">
          <img :src="tournament.image" :alt="tournament.title" />
          <div
            class="tournament-status"
            :class="tournament.status.toLowerCase()"
          >
            {{ tournament.status }}
          </div>
        </div>

        <div class="tournament-content">
          <h3 class="tournament-title">{{ tournament.title }}</h3>
          <p class="tournament-description">
            {{ tournament.description }}
          </p>

          <div class="tournament-meta">
            <div class="tournament-prize">
              <span class="prize-amount">${{ tournament.prize }}</span>
              <v-btn
                class="join-btn"
                size="small"
                :color="tournament.buttonColor"
                variant="flat"
              >
                {{ tournament.jointournament }}
              </v-btn>
            </div>
          </div>

          <div class="tournament-participants">
            <div class="participant-avatars">
              <v-avatar
                v-for="n in 4"
                :key="n"
                size="24"
                class="participant-avatar"
                :class="{ 'avatar-overlap': n > 1 }"
              >
                <!-- <v-img
                      :src="`https://via.placeholder.com/24x24/${
                        tournament.avatarColors[n - 1]
                      }/FFFFFF?text=${n}`"
                    /> -->
              </v-avatar>
            </div>
            <span class="participant-count"
              >{{ tournament.participants }} others</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { featuredTournaments } from "../../components/featuredTournaments";
</script>

<style scoped>
.tournaments-section {
  padding: 32px 24px;
  background: rgba(15, 15, 15, 0.95);
  backdrop-filter: blur(10px);
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

.tournaments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.tournament-card {
  background: #1a1d23;
  border: 1px solid #2c3036;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    border-color: #5865f2;
  }
}

.tournament-image {
  position: relative;

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }

  .tournament-status {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 10;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &.live {
      background: #ff4655;
      color: #ffffff;
    }

    &.starting {
      background: #ffd93d;
      color: #000000;
    }

    &.upcoming {
      background: #8b5cf6;
      color: #ffffff;
    }

    &.featured {
      background: #00d4aa;
      color: #000000;
    }
  }
}

.tournament-content {
  padding: 20px;

  .tournament-title {
    font-size: 18px;
    font-weight: 10;
    color: #ffffff;
    margin: 0 0 8px 0;
  }

  .tournament-description {
    font-size: 14px;
    color: #8e9297;
    line-height: 1.4;
    margin: 0 0 20px 0;
  }

  .tournament-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .tournament-prize {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .prize-amount {
        font-size: 20px;
        font-weight: 10;
        color: #ffffff;
      }

      .join-btn {
        font-size: 12px;
        font-weight: 10;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-left: 10px;
      }
    }
  }

  .tournament-participants {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .participant-avatars {
      display: flex;

      .participant-avatar {
        border: 2px solid #1a1d23;

        &.avatar-overlap {
          margin-left: -8px;
        }
      }
    }

    .participant-count {
      font-size: 14px;
      color: #8e9297;
    }
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .tournaments-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .tournament-title {
    font-size: 16px;
  }
}
</style>
