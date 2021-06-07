<template>
    <footer class="pagination" v-if="getAllPages > 0">
      <div class="container">
          <ul class="pagination-list">
            <li v-if="getCurrentRoute > 1">
              <nuxt-link :to="`/${getLastPage}`" class="pagination-list-item">
                <
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="`/${isPath}`"
                         class="pagination-list-item pagination-list-item-active"
              >
                {{isPath}}
              </nuxt-link>
            </li>
            <template v-if="getCurrentRoute<= getAllPages-5">
              <template v-for="i in 3">
                <li>
                  <nuxt-link :to="`/${isPath+i}`" class="pagination-list-item">
                    {{isPath+i}}
                  </nuxt-link>
                </li>
              </template>
              <li>
                <span class="pagination-list-item">
                  ...
                </span>
              </li>
            </template>
            <template v-else-if="getCurrentRoute > getAllPages-5 && getCurrentRoute <= getAllPages">
              <template v-for="i in 3">
                <li v-if="isPath+i < getAllPages">
                  <nuxt-link :to="`/${isPath+i}`" class="pagination-list-item">
                    {{isPath+i}}
                  </nuxt-link>
                </li>
              </template>
            </template>
            <li v-if="getCurrentRoute !== getAllPages">
              <nuxt-link :to="`/${getAllPages}`" class="pagination-list-item">
                {{getAllPages}}
              </nuxt-link>
            </li>
            <li v-if="getCurrentRoute < getAllPages">
              <nuxt-link :to="`/${getNextPage}`" class="pagination-list-item">
                >
              </nuxt-link>
            </li>
          </ul>
      </div>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from "vuex";

export default Vue.extend({
  name: 'Pagination',
  computed: {
    ...mapGetters(['getAllPages']),
    getCurrentRoute(): number {
      return Number(this.$route.params.id);
    },
    getLastPage(): number {
      return this.$route.path === '/' ? 1 : Number(this.$route.params.id)-1;
    },
    isPath(): number {
      return this.$route.path === '/' ? 1 : Number(this.$route.params.id);
    },
    getNextPage(): number {
      return this.$route.path === '/' ? 2 : Number(this.$route.params.id)+1;
    }
  }
})
</script>

<style lang="scss" scoped>
.pagination {
  width: 100%;
  margin: 60px 0;
  &-list {
    display: flex;
    flex-direction: row;

    &-item {
      width: 40px;
      height: 40px;
      margin-right: 8px;
      border-radius: 4px;
      border: 1px solid $secondary;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      text-decoration: none;
      color: $secondary;

      &:hover {
        background: $primary;
        color: $white;
        border-color: $primary;
        box-shadow: 0 3px 5px rgba(0,0,0,0.11);
      }

      &.nuxt-link-active {
        background: $primary;
        color: $white;
        border-color: $primary;
        box-shadow: 0 3px 5px rgba(0,0,0,0.11);
      }
    }
  }
}
</style>