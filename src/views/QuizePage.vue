<template lang="pug">
main.d-flex.flex-row
  .flex-grow-1.mr-1.border-left.d-flex.flex-column.align-items-start
    section.w-100
      h2 クイズ : {{ current_category.category }} > {{ current_quiz.title }}
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
            li.list-unstyled(v-for="(quiz, index) in current_category.list[0].ok")
              font-awesome-icon.mx-2(
                icon="check-circle"
                :class="[ check_regular_expression(quiz) ? 'text-success' : 'text-dark' ]"
              )
              span {{ quiz }}
        .col.flex-grow-1
          h3.text-danger NG
          ul.pl-0
            li.list-unstyled(v-for="quiz in current_category.list[0].ng")
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
  aside.p-2.border-left.d-none.d-sm-block
    b-card.mb-1(
      v-for="(category, index) in quizzes"
      :key="`${index}-${category.name}`"
      no-body
      bg-variant="light"
    )
      b-card-header.p-1.d-flex.justify-content-between.align-items-center(
        visible
        header-tag="header"
        role="tab"
        v-b-toggle="'accordion-' + index"
        :class="{'text-primary': is_current_level(category)}"
      )
        b-badge(variant="light" pill) {{ category.list.length }}
        span {{ category.name }}
        b-button.py-0(
          size="sm"
          @click.self="select_level(category, null)"
          variant="secondary"
        ) 選択
      b-collapse(
        accordion="my-accordion"
        :id="'accordion-' + index"
        role="tabpanel"
      )
        b-list-group(flush)
          b-list-group-item.py-1.pr-1.d-flex.justify-content-between.align-items-center(
            v-for="(quiz, index) in category.list"
            vertical-align="center"
            :class="{'text-primary': is_current_quiz(category, quiz)}"
          )
            span {{ quiz.title }}
            b-button.py-0(size="sm" @click.self="select_level(category, quiz)") 選択
</template>

<script>
import basicLevel from '@quizzes/basic'
import middleLevel from '@quizzes/middle'
import highLevel from '@quizzes/high'
import RegularExpressionTextbox from '@components/RegularExpressionTextbox.vue'

export default {
  components: {
    RegularExpressionTextbox
  },
  data() {
    return {
      basicLevel,
      middleLevel,
      highLevel,
      current_category: null,
      current_quiz: null,
      expression: '',
      options_str: '',
      results_list: {}
    }
  },
  created: function() {
    this.current_category = this.basicLevel
    this.current_quiz = this.basicLevel.list[0]
  },
  computed: {
    quizzes: () => [ basicLevel, middleLevel, highLevel ]
  },
  methods: {
    check_regular_expression: function (target) {
      return RegExp(this.expression, this.options_str).test(target)
    },
    update_expression: function(expression) {
      this.expression = expression
    },
    update_options_str: function(options) {
      this.options_str = options.join('')
    },
    select_level: function(level, quiz) {
      this.current_category = level
      if (quiz) {
        this.current_quiz = quiz
      } else {
        this.quiz = this.current_category.list[0]
      }
    },
    is_current_level: function(level) {
      return this.is_equal(this.current_category, level)
    },
    is_current_quiz: function(level, quiz){
      if (!this.is_current_level(level))  return false
      return this.is_equal(this.current_quiz, quiz)
    },
    is_equal: function(left, right) {
      return JSON.stringify(left) === JSON.stringify(right)
    },
    prev_level: function() {
      let current_level_index = this.quizzes.indexOf(this.current_category)
      let prev_level_index_candidate = current_level_index - 1
      if (0 <= prev_level_index_candidate) {
        let prev_level_index = Math.max(prev_level_index_candidate, 0)
        this.current_category = this.quizzes[prev_level_index]
        this.current_quiz = this.current_category.list[this.current_category.list.length - 1]
      }
    },
    prev_quiz: function() {
      let current_quiz_index = this.current_category.list.indexOf(this.current_quiz)
      let prev_quiz_index_candidate = current_quiz_index - 1
      if (0 <= prev_quiz_index_candidate) {
        let target_quiz_index = Math.max(prev_quiz_index_candidate, 0) 
        this.current_quiz = this.current_category.list[target_quiz_index]
      } else {
        this.prev_level()
      }
    },
    next_level: function() {
      let current_level_index = this.quizzes.indexOf(this.current_category)
      let next_level_index_candidate = current_level_index + 1
      let max_level_index = this.quizzes.length - 1
      if (next_level_index_candidate <= max_level_index) {
        let target_level_index = Math.min(next_level_index_candidate, max_level_index)
        this.current_category = this.quizzes[target_level_index]
        this.current_quiz = this.quizzes[target_level_index].list[0]
      }
    },
    next_quiz: function() {
      let current_quiz_index = this.current_category.list.indexOf(this.current_quiz)
      let next_quiz_index_candidate = current_quiz_index + 1
      let max_quiz_index = this.current_category.list.length - 1
      if (next_quiz_index_candidate <= max_quiz_index) {
        let target_quiz_index = Math.min(next_quiz_index_candidate, max_quiz_index) 
        this.current_quiz = this.current_category.list[target_quiz_index]
      } else {
        this.next_level()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import "@/style/contents.sass"

aside
  min-width: 240px

.rotate
  transform: rotate(90deg)

</style>
