<template>
  <header class="header">
    <div class="container">
      <Logo @click.native="refresh"/>
      <Search />
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

/** COMPONENTS **/
import Logo from '@/components/Molecules/Logo.vue'
import Search from '@/components/Molecules/Search.vue'

export default Vue.extend({
  name: 'Header',
  components: {
    Logo,
    Search
  },
  methods: {
    refresh(): void {
      this.$store.dispatch('fetchPagesCharacters');
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  border-bottom: 1px solid $secondary;
  .container {
    min-height: 134px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 16px 12px;

    @media screen and ($md) {
      justify-content: center;
    }

    ::v-deep .logo {
      margin-right: 80px;
      @media screen and ($md) {
        margin: 0 12px;
      }
    }
  }
}
</style>