<template lang="pug">
main.d-flex.flex-row.mr-0
  loading-icon(v-if="quizzes.length <= 0")
  .flex-grow-1.mr-1.border-left.d-flex.flex-column.align-items-start(v-else)
    section.w-100
      h2 クイズ : level-{{ current_quiz.level }} > {{ current_quiz.title }}
      p.rule.mb-2(v-if="!!current_quiz.rule") {{ current_quiz.rule }}
      regular-expression-textbox(
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
            li.list-unstyled(v-for="(quiz, index) in ok")
              font-awesome-icon.mx-2(
                icon="check-circle"
                :class="[ check_regular_expression(quiz) ? 'text-success' : 'text-dark' ]"
              )
              span {{ quiz }}
        .col.flex-grow-1
          h3.text-danger NG
          ul.pl-0
            li.list-unstyled(v-for="quiz in ng")
              font-awesome-icon.mx-2(
                icon="check-circle"
                :class="[ !check_regular_expression(quiz) ? 'text-danger' : 'text-dark' ]"
              )
              span {{ quiz }}
    .w-100.mt-auto.d-flex.justify-content-between
      b-button-group.m-3(size="lg")
        b-button(variant="secondary" @click.self="prev_level()") &laquo;
        b-button(variant="secondary" @click.self="prev_quiz()") &lsaquo;
      b-button-group.m-3(size="lg")
        b-button(variant="secondary" @click.self="next_quiz()") &rsaquo;
        b-button(variant="secondary" @click.self="next_level()") &raquo;
  aside.border-left.d-none.d-sm-block.d-md-block(v-else)
    h3.border-bottom.text-center クイズ選択
    b-card.m-1(
      v-for="(level, index) in levels"
      :key="`level-${level}`"
      no-body
      bg-variant="light"
    )
      b-card-header.p-1.d-flex.justify-content-between.align-items-center(
        visible
        header-tag="header"
        role="tab"
        v-b-toggle="'accordion-' + index"
        :class="{'text-primary': level === current_level }"
      )
        b-badge(variant="light" pill) {{ get_quizzes_in_level(level).length }}
        span {{ `level-${level}` }}
        b-button.py-0(
          size="sm"
          @click.self="select_level(level)"
          variant="secondary"
        ) 選択
      b-collapse(
        accordion="my-accordion"
        :id="'accordion-' + index"
        role="tabpanel"
      )
        b-list-group(flush)
          b-list-group-item.py-1.pr-1.d-flex.justify-content-between.align-items-center(
            v-for="(quiz, index) in get_quizzes_in_level(level)"
            vertical-align="center"
            :class="{'text-primary': current_quiz === quiz }"
          )
            span {{ quiz.title }}
            b-button.py-0(size="sm" @click.self="select_quiz(quiz)") 選択
</template>

<script>
import axios from 'axios'
import RegularExpressionTextbox from '@components/RegularExpressionTextbox.vue'
import LoadingIcon from '@components/LoadingIcon.vue'

export default {
  components: {
    RegularExpressionTextbox,
    LoadingIcon
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

aside
  min-width: 200px
  width: 30vw

.rotate
  transform: rotate(90deg)

</style>
