<template lang="pug">
body.d-flex.flex-column.h-100
  header.align-self-start.bg-dark.py-0.w-100
    b-navbar.py-0(toggleable="sm" type="dark")
      b-navbar-brand.font-italic.m-0(variant="faded" tag="h1") Regexpert
      b-navbar-toggle.border-0(target="nav-collapse")
      b-collapse#nav-collapse(is-nav)
        b-navbar-nav.ml-auto
          template(v-for="item in routes")
            router-link.mx-3(
              :to="item.to"
              tag="b-nav-text"
              active-class="text-light font-weight-bold"
            ) {{ item.name }}
  router-view#main.flex-grow-1.mx-3(role="main")
  footer.fixed-bottom.bg-dark.text-light.d-flex.justify-content-center.align-items-center Created by 〇〇〇
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
$header-height: 40px
$footer-height: 40px

html
  height: 100%

body
  height: calc(100% - $header-height - $footer-height)

  > #main
    margin-bottom: $footer-height

  > footer
    height: $footer-height
</style>
