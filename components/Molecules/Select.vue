<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ 'custom-select-hide': !open }">
      <div
          v-for="(option, i) of options"
          :key="i"
          @click="
            selected = option;
            open = false;
            $emit('input', option);
          "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
          ? this.default
          : this.options.length > 0
              ? this.options[0]
              : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
};
</script>

<style lang="scss" scoped>

.custom-select {
  position: relative;
  outline: none;
  margin-right: 12px;

  & .selected {
    border: 1px solid $secondary;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    height: 56px;
    width: 128px;
    padding: 0 12px;
  }

  &.open {
    outline: none;
    border: 1px solid $secondary;
  }

  &:after {
    position: absolute;
    content: "";
    top: calc(50% - 2px);
    right: 15px;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-color: $secondary transparent transparent transparent;
  }

  & .items {
    border-radius: 0 0 6px 6px;
    overflow: hidden;
    border-right: 1px solid $secondary;
    border-left: 1px solid $secondary;
    border-bottom: 1px solid $secondary;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: $white;
  }

  & .items div {
    cursor: pointer;
    user-select: none;
    height: 56px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    &:not(:last-child) {
      border-bottom: 1px solid $secondary;
    }

    &:hover {
      color: $primary;
    }
  }

  &-hide {
    display:none;
  }

}
</style>