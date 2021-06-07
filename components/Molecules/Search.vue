<template>
  <div class="search">
    <span>Search by</span>
    <form class="search-form" v-on:submit.prevent="findCharacter">
      <Select
        :options="['name', 'identity', 'episode']"
        :default="'name'"
        @input="selectedCategory($event)"
      />
      <input type="text" name="search" v-model="search">
      <input type="submit" value="" class="search-form-btn">
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'

import Select from '@/components/Molecules/Select.vue'

export default Vue.extend({
  name: 'Search',
  components: {
    Select,
  },
  computed: {
    ...mapGetters(['getAllEpisode'])
  },
  data() {
    return {
      type: '' as string,
      search: '' as string
    }
  },
  methods: {
    selectedCategory(item: string): void {
      this.type = item;
    },
    findCharacter(): void {
        const params = {
          type: this.type,
          search: this.search
        }
        if(this.type === 'name' && this.search !== '') {
          this.$store.dispatch('fetchbyName', params);
        }
        if(this.type === 'identity' && this.search !== '') {
          this.$store.dispatch('fetchbyId', params)
        }
        if(this.type === 'episode' && this.search !== '') {
            const episode = this.getAllEpisode.find((item: any) => item.episode === params.search);
            const episodeList =  episode ? episode.characters.map((item: any) => item.id) : null;
            if(episodeList) {
              this.$store.dispatch('fetchbyEpisode', episodeList)
            }
        }
    }
  }
})
</script>

<style lang="scss" scoped>
.search {
  max-width: 460px;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 12px;
  border: 1px solid $secondary;

  @media screen and ($sm-max) {
    flex-direction: column;
    height: initial;
  }

  span {
    font-weight: $font-weight-medium;
    width: 100%;
    text-align: center;
    margin: 12px 0;
  }

  &-form {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;

    @media screen and ($sm-max) {
      border-top: 1px solid $secondary;

      ::v-deep .custom-select {
        .selected {
          border-top: none;
          border-bottom: none;
          border-left: none;
        }
      }
    }

    input[type=text] {
      border: 0;
    }

    input[type=submit] {
      width: 24px;
      height: 24px;
      background-image: url("~/assets/icons/search.svg");
      background-repeat: no-repeat;
      background-position: center;
      border: 0;
      padding: 0;
      background-color: transparent;
      transition: all 0.3s ease-in-out;
      cursor: pointer;
      margin-left: auto;
      margin-right: 14px;
      color: $secondary;
      &:hover {
        opacity: 0.4;
      }
    }
  }
}
</style>