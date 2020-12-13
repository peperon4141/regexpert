<template lang="pug">
body.d-flex.flex-column
  custom-header(:routes="routes")
  router-view.flex-grow-1.bg-white
  custom-footer
</template>

<script>
import 'normalize.css'
import CustomHeader from '@components/Header.vue'
import CustomFooter from '@components/Footer.vue'

export default {
  components: {
    CustomHeader,
    CustomFooter
  },
  data() {
    return {
      routes: [
        {name: 'クイズ', to: '/quiz'},
        {name: 'サンドボックス', to: '/sandbox'},
        {name: 'チートシート', to: '/cheetsheet'},
        // {name: 'クイズ追加', to: '/form'},
      ]
    }
  },
}
</script>

<style lang="sass">
html, body
  height: 100%
  font-size: 16px

html
  scroll-behavior: smooth
  touch-action: manipulation
  background-color: #343a40

body
  overflow: hidden
  > main
    overflow-x: hidden
    overflow-y: scroll
    overflow-scrolling: auto
    -webkit-overflow-scrolling: auto
  > footer
    min-height: 100px
    height: 100px
    padding: 0 20px
    flex-direction: row
</style>
