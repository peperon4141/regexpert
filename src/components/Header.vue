<template lang="pug">
header.bg-dark.sticky-top.shadow-sm
  b-navbar(toggleable="sm" type="dark")
    b-navbar-brand.font-italic.m-0(variant="faded" tag="h1") Regexpert
    b-navbar-toggle.border-0(target="nav-collapse")
    b-collapse#nav-collapse(is-nav)
      b-navbar-nav.ml-auto
        b-nav-item.mx-3(v-for="item in routes" :to="item.to") {{ item.name }}
</template>

<script>
export default {
  props: {
    routes: {
      type: Object,
      requiered: true
    }
  }
}
</script>

<style lang="sass">
</style>
