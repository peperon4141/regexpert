<template lang="pug">
body.d-flex.flex-column.bg-dark
  header.sticky-top
    b-navbar(toggleable="sm" type="dark")
      b-navbar-brand.font-italic.m-0(variant="faded" tag="h1") Regexpert
      b-navbar-toggle.border-0(target="nav-collapse")
      b-collapse#nav-collapse(is-nav)
        b-navbar-nav.ml-auto
          b-nav-item.mx-3(
            v-for="item in routes"
            :to="item.to"
          ) {{ item.name }}
  router-view.flex-grow-1.bg-white
  footer.sticky-bottom.d-flex.justify-content-center.align-items-center
    span.bg-dark.text-light Created by Tohru
</template>

<script>
import 'normalize.css'

export default {
  name: 'App',
  data() {
    return {
      routes: [
        {name: 'クイズ', to: '/quiz'},
        {name: '砂場', to: '/sandbox'},
        {name: 'チートシート', to: '/cheetsheet'},
        {name: 'クイズ追加', to: '/form'},
      ]
    }
  }
}
</script>

<style lang="sass">
html, body
  height: 100%

body
  > main
    overflow-y: scroll

  > footer
    min-height: 40px
    height: 40px
</style>
