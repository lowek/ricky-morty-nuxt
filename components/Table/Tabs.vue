<template>
  <div class="tabs">
    <ul class='tabs-header'>
      <li v-for='(tab, index) in tabs'
          :key='tab.title'
          @click='selectTab(index)'
          :class='{"tabs-header--selected": (index === selectedIndex)}'>
        {{ tab.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      selectedIndex: 0 as number,
      tabs: [] as any
    }
  },
  created () {
    this.tabs = this.$children
  },
  mounted () {
    this.selectTab(0)
  },
  methods: {
    selectTab (i: number): void {
      this.selectedIndex = i
      this.tabs.forEach((tab: any, index: number) => {
        tab.isActive = (index === i)
      })
    }
  }
})
</script>

<style lang="scss">
.tabs {
  width: 100%;
  &-header {
    @include container;
    display: flex;
    flex-direction: row;
    margin: 24px auto;
    & li {
      margin-right: 4vw;
      padding-bottom: 6px;
      position: relative;
      cursor: pointer;
    }
    &--selected {
      color: $primary;
      &:after {
        content: '';
        width: 100%;
        height: 3px;
        background: $primary;
        position: absolute;
        bottom: 0;
        left:0;
      }
    }
  }
}
</style>