<template>
  <section class="characters-header">
    <ul class="container">
      <li v-for="(item, index) in items" class="characters-header-col" :key="index">
        {{item}}
      </li>
    </ul>
  </section>
</template>
<script lang="ts">
import Vue, {PropOptions} from 'vue'
export default Vue.extend({
  name: 'TabHeader',
  props: {
    items: {
      type: Array,
      default: []
    } as PropOptions<Array<String>>
  }
});
</script>
<style lang="scss" scoped>
.characters-header {
  width: 100%;
  background: $lightSecondary;

  @media screen and ($sm-max) {
    display: none;
  }
  .container {
    height: 54px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .characters-header-col {
      width: calc(100% / 7);
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
}
</style>