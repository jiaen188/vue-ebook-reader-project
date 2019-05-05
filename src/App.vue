<template>
  <div id="app" :class="rootClass">
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['rootClass'])
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})
</script>

<style scoped lang="scss">
#app {
  width: 100%;
  height: 100%;
  background: #7d8188;
  overflow: hidden;
}
</style>

<style lang="scss">
@import './assets/styles/theme/theme_default.scss';
@import './assets/styles/theme/theme_eye.scss';
@import './assets/styles/theme/theme_gold.scss';
@import './assets/styles/theme/theme_night.scss';
</style>
