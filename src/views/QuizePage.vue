<template lang="pug">
main
  b-spinner#spinner(v-if="quizzes.length <= 0")
  article.h-100.d-flex.flex-row(v-else)
    #contents.flex-grow-1.position-relative
      section.w-100
        h2 クイズ : level-{{ current_quiz.level }} > {{ current_quiz.title }}
        p.rule.mb-2(v-if="!!current_quiz.rule") {{ current_quiz.rule }}
        regular-pattern-textbox(
          :prefix="'quiz'"
          :update_expression_callback="update_expression"
          :update_options_callback="update_options_str"
        )
      section.w-100
        h2 結果
        b-row.d-flex.flex-row
          .col.flex-grow-1
            h3.text-success OK
            ul.pl-0
              li.check-list.list-unstyled(v-for="(quiz, index) in ok")
                font-awesome-icon.mx-2(
                  icon="check-circle"
                  :class="[ check_regular_expression(quiz) ? 'text-success' : 'text-dark' ]"
                )
                span {{ quiz }}
          .col.flex-grow-1
            h3.text-danger NG
            ul.pl-0
              li.check-list.list-unstyled(v-for="quiz in ng")
                font-awesome-icon.mx-2(
                  icon="check-circle"
                  :class="[ !check_regular_expression(quiz) ? 'text-danger' : 'text-dark' ]"
                )
                span {{ quiz }}
      #selector.position-absolute.w-100.d-flex
        b-button.m-1(size="lg" variant="secondary" @click.self="prev_level()") &laquo;1
        b-button.m-1.mr-auto(size="lg" variant="secondary" @click.self="prev_quiz()") &lsaquo;2
        b-button.m-1(size="lg" variant="secondary" @click.self="next_quiz()") 3&rsaquo;
        b-button.m-1(size="lg" variant="secondary" @click.self="next_level()") 4&raquo;
    #sidebar.border-left.d-none.d-sm-block.d-md-block
      section
        h2 クイズ選択
        b-card(
          header-tag="header"
          no-body
          v-for="(level, index) in levels"
          :key="`level-${level}`"
        )
          h6.mb-0.d-flex.justify-content-between(
            slot="header"
            :class="{'text-primary': level === current_level }"
            v-b-toggle="'accordion-' + index"
          )
            b-badge.px-2(variant="primary" pill) {{ get_quizzes_in_level(level).length }}
            span {{ `level-${level}` }}
            font-awesome-icon.mx-2(:icon="'angle-down'")
          b-collapse(
            :id="'accordion-' + index"
            role="tabpanel"
            :visible="level == current_level"
          )
            b-list-group(flush)
              b-list-group-item.py-2.d-flex.justify-content-between(
                v-for="(quiz, index) in get_quizzes_in_level(level)"
                :class="{'text-primary': current_quiz === quiz }"
              )
                span {{ quiz.title }}
                b-button.py-0(size="sm" @click.self="select_quiz(quiz)") 選択
</template>

<script>
import axios from 'axios'
import RegularPatternTextbox from '@components/RegularPatternTextbox.vue'

export default {
  components: {
    RegularPatternTextbox
  },
  data() {
    return {
      quizzes: [],
      current_quiz: null,
      expression: '',
      options_str: '',
      results_list: {}
    }
  },
  created: function() {  
    var that = this
    axios.get('https://script.google.com/macros/s/AKfycbwX35ewjC6DxJV8ehrtI8nex0X3KWKYYv2kEYJJcISfTaYfMX8/exec')
      .then((res) => {
        let quizzes = res.data
        that.quizzes = quizzes.sort( (left, right) => left.level < right.level )
        that.current_quiz = that.quizzes[0]
      })
      .catch((res) => {
        console.log(res)
      })
 
  },
  computed: {
    current_level: function() { return this.current_quiz ? this.current_quiz.level : 1 },
    ok: function() { return this.current_quiz ? this.current_quiz.ok.split(/\r\n|\n/) : [] },
    ng: function() { return this.current_quiz ? this.current_quiz.ng.split(/\r\n|\n/) : [] },
    levels: function() {
      var set = new Set()
      this.quizzes.forEach(item => set.add(item.level) )
      return Array.from(set)
    },
    max_level: function () { return this.levels ? this.levels[this.levels.length - 1] : 1 }
  },
  methods: {
    get_quizzes_in_level: function (level) {
      return this.quizzes.filter( item => item.level === level )
    },
    check_regular_expression: function (target) {
      return RegExp(this.expression, this.options_str).test(target)
    },
    update_expression: function(expression) {
      this.expression = expression
    },
    update_options_str: function(options) {
      this.options_str = options.join('')
    },
    select_level: function(level) {
      level = Math.min(Math.max(1, level), this.max_level)
      this.select_quiz(this.get_quizzes_in_level(level)[0])
    },
    select_quiz: function(quiz) {
      if (quiz) this.current_quiz = quiz
    },
    prev_level: function() {
      this.select_level(this.current_quiz.level - 1)
    },
    next_level: function() {
      this.select_level(this.current_quiz.level + 1)
    },
    prev_quiz: function() {
      let current_quiz_index = this.quizzes.indexOf(this.current_quiz)
      this.select_quiz(this.quizzes[Math.max(current_quiz_index - 1, 0)])
    },
    next_quiz: function() {
      let current_quiz_index = this.quizzes.indexOf(this.current_quiz)
      this.select_quiz(this.quizzes[Math.min(current_quiz_index + 1, this.quizzes.length - 1 )])
    }
  }
}
</script>

<style lang="sass" scoped>
@import "@/style/contents.sass"

main
  #sidebar
    min-width: 200px
    width: 30vw

  #spinner
    margin-top: 200px
    margin-left: calc(50% - 50px)
    width: 100px
    height: 100px

  #selector
    bottom: 0

  .check-list
    display: flex
    align-items: center
    svg
      width: 20px
      height: 20px
      margin-left: 0 !important

  .card
    margin-bottom: 12px
</style>
