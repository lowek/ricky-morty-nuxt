<template>
  <div class="card" v-if="person">
    <div class="card-row">
      <div class="card-col">
        <img :src="person.image" :alt="person.name">
      </div>
      <div class="card-col">
        <label>Identity</label>
        {{person.id}}
      </div>
      <div class="card-col">
        <label>Name</label>
        {{person.name}}
      </div>
      <div class="card-col">
        <label>Gender</label>
        <template v-if="person.gender === 'Male' || person.gender === 'Female'">
          <span class="card-col-icon" v-html="require(`@/assets/icons/${person.gender}.svg?raw`)"></span>
          {{person.gender}}
        </template>
        <template v-else> -- </template>
      </div>
      <div class="card-col">
        <label>Species</label>
        {{person.species}}
      </div>
      <div class="card-col">
        <label>Episode</label>
        {{getLastEpisode}}
      </div>
      <div class="card-col">
        <button @click="$emit('add',person)"
                class="card-col-btn"
                :class="[{'card-col-btn--selected': isFav}]" v-html="require('~/assets/icons/star.svg?raw')"></button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import {mapGetters} from "vuex";

export default Vue.extend({
  name: 'Card',
  props: {
    person: {
      type: Object,
    }
  },
  computed: {
    ...mapGetters(['getAllFav','getAllEpisode']),
    isFav(): boolean {
      return this.getAllFav.find((item: any) => item.id === this.person.id)
    },
    getLastEpisode(): string {
      const last = this.person.episode[this.person.episode.length - 1]
      const lastEpisode = this.getAllEpisode.find((item: any) => item.id === last.id)
      return lastEpisode ? lastEpisode.episode : '-';
    }
  }
})
</script>

<style lang="scss">
.card {
  width: 100%;
  display: flex;
  min-height: 84px;
  border-bottom: 1px solid $lightSecondary !important;
  position: relative;
  &:hover {
    background-color: $lightSecondary;
  }

  &-row {
    @include container;
    display: flex;
    flex-wrap: wrap;
  }

  &-col {
    width: calc(100%/7);
    padding-right: 12px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 8px 0;

    label {
      font-size: 10px;
      display: none;
    }

    @media screen and ($sm-max) {
      width: 50%;
      flex-direction: column;
      align-items: flex-start;
      label {
        width: 100%;
        display: block;
      }
    }

    &-icon {
      line-height: 1;
      @media screen and ($sm-max) {
        display: none;
      }
    }

    img {
      max-width: 42px;
      min-height: 68px;
      object-fit: cover;
    }

    &-btn {
      width: 44px;
      height: 44px;
      border-radius: 8px;
      border: 2px solid $primary;
      background: transparent;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      @media screen and ($sm-max) {
        position: absolute;
        top: 10px;
        right: 12px;
      }
      &:hover {
        cursor: pointer;
        background: $primary;
        box-shadow: 0 3px 6px rgba(0,0,0,0.13);
        & svg {
          path {
            fill: white;
          }
        }
      }

      &--selected {
        background: $primary !important;
        & svg {
          path {
            fill: white;
          }
        }
      }
    }
  }
}
</style>
