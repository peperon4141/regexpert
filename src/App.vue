<template lang="pug">
body.d-flex.flex-column.h-100
  header.fixed-top.bg-dark.py-0.w-100
    b-navbar.py-0(toggleable="sm" type="dark")
      b-navbar-brand.font-italic.m-0(variant="faded" tag="h1") Regexpert
      b-navbar-toggle.border-0(target="nav-collapse")
      b-collapse#nav-collapse(is-nav)
        b-navbar-nav.ml-auto
          b-nav-item.mx-3(
            v-for="item in routes"
            :to="item.to"
          ) {{ item.name }}
  router-view#main.flex-grow-1.ml-3(role="main")
  footer.sticky-bottom.bg-dark.text-light.d-flex.justify-content-center.align-items-center Created by 〇〇〇
</template>

<script>
import 'normalize.css'

export default {
  name: 'App',
  data() {
    return {
      routes: [
        {name: 'チェッカー', to: '/checker'},
        {name: 'クイズ', to: '/quiz'},
        {name: 'チートシート', to: '/cheetsheet'},
      ]
    }
  }
}
</script>

<style lang="sass">
html
  height: 100%

body
  height: calc(100% - 40px - 40px)

  > #main
    margin-top: 40px

  > footer
    height: 40px
    min-height: 40px
</style>
