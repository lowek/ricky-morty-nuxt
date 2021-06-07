<template>
  <main>
    <span v-if="this.$apollo.loading">Loading...</span>
    <tabs>
      <tab title="All Characters">
        <TabHeader :items="header" />
        <template v-if="getAllCharacters && getAllCharacters.length > 0">
          <span  class="no-record" v-if="!getAllCharacters.length">No records.</span>
          <section class="characters" v-for="(item, index) in getAllCharacters">
            <Card :person="item"
                  :key="index"
                  @add="addToFav($event)"/>
          </section>
        </template>
        <Pagination />
      </tab>
      <tab title="Favorites">
        <TabHeader :items="header" />
        <span  class="no-record" v-if="!getAllFav.length">No records.</span>
        <template v-if="getAllFav && getAllFav.length > 0">
          <section class="fav" v-for="(item, index) in getAllFav">
            <Card :person="item"
                  :key="index"
                  @add="addToFav($event)"/>
          </section>
        </template>
      </tab>
    </tabs>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters, mapMutations} from 'vuex'
import Tab from '@/components/Table/Tab.vue'
import Tabs from '@/components/Table/Tabs.vue'
import TabHeader from '@/components/Table/TabHeader.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import Card from "~/components/Card/Card.vue";

export default Vue.extend({
  name: 'HomePage',
  components: {
    Tab,
    Tabs,
    Pagination,
    Card,
    TabHeader
  },
  data() {
    return {
      loading: 0 as number,
      header: ['Photo', 'Character ID', 'Name','Gender','Species','Last Episode', 'Add To Favorites'] as Array<string>
    }
  },
  computed: {
    ...mapGetters(['getAllCharacters', 'getAllFav']),
  },
  async mounted() {
    const isNumber = this.$route.params.id || 1;
    await this.$store.dispatch('fetchNextCharacters', isNumber);
  },
  methods: {
    ...mapMutations(['setAllFav', 'removeFav']),
    addToFav(obj: object): void {
      const newFav = this.getAllFav;
      if(!newFav.includes(obj)) {
        this.setAllFav(obj)
      } else {
        this.removeFav(obj);
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.no-record {
  width: 100%;
  display: block;
  text-align: center;
  margin: 10vh 0;
}
</style>
