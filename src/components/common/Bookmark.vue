<template>
  <div ref="bookmark" class="bookmark" :style="style"></div>
</template>

<script>
import { px2rem } from '../../utils/utils'

export default {
  props: {
    width: Number,
    height: Number,
    color: String
  },
  computed: {
    style() {
      return this.color ? {
        borderColor: `${this.color} ${this.color} transparent ${this.color}`
      } : {}
    }
  },
  methods: {
    refresh() {
      if (this.width && this.height) {
        this.$refs.bookmark.style.borderWidth = `${px2rem(this.height - 5)}rem ${px2rem(this.width / 2)}rem ${px2rem(5)}rem ${px2rem(this.width / 2)}rem`
      }
    }
  },
  mounted() {
    this.refresh()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';

.bookmark {
  width: 0;
  height: 0;
  border-width: px2rem(50) px2rem(10) px2rem(10) px2rem(10);
  border-style: solid;
  border-color: white white transparent white;
}
</style>
