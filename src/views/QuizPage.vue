<template lang="pug">
main
  b-spinner#spinner(v-if="quizzes.length <= 0")
  article.h-100.d-flex.flex-row(v-else)
    #contents.flex-grow-1.position-relative
      section
        h2
          span クイズ :
          b-badge.mx-2(pill variant="secondary") LEVEL {{ currentQuiz.level }}
          span(v-text="' > '")
          b-badge.mx-2(pill variant="secondary") {{ currentQuiz.title }}
        p.rule.mb-2(v-if="!!currentQuiz.rule") {{ currentQuiz.rule }}
        regular-pattern-textbox(
          :pattern="pattern" v-on:input-pattern="pattern = $event.value"
          :optionFlags="optionFlags" v-on:input-options="optionFlags = $event.value"
        )
      section
        h2 結果
        b-row.d-flex.flex-row
          .col.flex-grow-1
            h3.text-success OK
            ul.pl-0
              li.check-list.list-unstyled.mb-2(v-for="(quiz, index) in okList")
                font-awesome-icon.mr-2.fa-lg(
                  :icon="['fas', 'check-circle']"
                  :class="[ checkRegularExpression(quiz) ? 'text-success' : 'text-dark' ]"
                )
                span {{ quiz }}
          .col.flex-grow-1
            h3.text-danger NG
            ul.pl-0
              li.check-list.list-unstyled.mb-2(v-for="quiz in ngList")
                font-awesome-icon.mr-2.fa-lg(
                  :icon="['fas','check-circle']"
                  :class="[ !checkRegularExpression(quiz) ? 'text-danger' : 'text-dark' ]"
                )
                span {{ quiz }}
      #selector.position-absolute.w-100.d-flex
        b-button.m-1(size="lg" variant="secondary" @click.self="prevLevel()") &laquo;1
        b-button.m-1.mr-auto(size="lg" variant="secondary" @click.self="prevQuiz()") &lsaquo;2
        b-button.m-1(size="lg" variant="secondary" @click.self="nextQuiz()") 3&rsaquo;
        b-button.m-1(size="lg" variant="secondary" @click.self="nextLevel()") 4&raquo;
    #sidebar.border-left.d-none.d-sm-block.d-md-block
      section
        h2 クイズ選択
        b-card.border-secondary.overflow-hidden(
          header-tag="header"
          no-body
          v-for="(level, index) in levels"
          :key="`level-${level}`"
        )
          h6.mb-0.d-flex.justify-content-between(
            slot="header"
            :class="{'text-primary': level === currentLevel }"
            v-b-toggle="'accordion-' + index"
          )
            b-badge.px-2(variant="primary" pill) {{ getQuizzesInLevel(level).length }}
            span {{ `level-${level}` }}
            font-awesome-icon.mx-2(:icon="['fas', 'angle-down']")
          b-collapse(
            :id="'accordion-' + index"
            role="tabpanel"
            :visible="level == currentLevel"
          )
            b-list-group(flush)
              b-list-group-item.py-2.d-flex.justify-content-between(
                v-for="(quiz, index) in getQuizzesInLevel(level)"
                :class="{'text-primary': currentQuiz === quiz }"
              )
                span {{ quiz.title }}
                b-button.py-0(size="sm" @click.self="selectQuiz(quiz)") 選択
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
      quizzes: []
    }
  },
  created: function() {
    this.$store.commit('restore', 'quizPage')
    var that = this
    axios.get('https://script.google.com/macros/s/AKfycbwX35ewjC6DxJV8ehrtI8nex0X3KWKYYv2kEYJJcISfTaYfMX8/exec')
      .then((res) => {
        let quizzes = res.data
        that.quizzes = quizzes.sort( (left, right) => left.level < right.level ? -1 : 0)
        that.currentQuiz = that.quizzes[0]
      })
      .catch((res) => {
        console.log(res)
      })
  },
  computed: {
    okList: function() { return this.currentQuiz ? this.currentQuiz.ok.split(/\r\n|\n/) : [] },
    ngList: function() { return this.currentQuiz ? this.currentQuiz.ng.split(/\r\n|\n/) : [] },
    levels: function() {
      var set = new Set()
      this.quizzes.forEach(item => set.add(item.level) )
      return Array.from(set)
    },
    currentLevel: function() { return this.currentQuiz ? this.currentQuiz.level : 1 },
    maxLevel: function () { return this.levels ? this.levels[this.levels.length - 1] : 1 },
    currentQuizIndex: function () { return this.quizzes.indexOf(this.currentQuiz) },
    optionsStr: function() { return this.optionFlags.join('') },
    currentQuiz: {
      get() { return this.$store.state.quizPage.currentQuiz },
      set(currentQuiz) { this.$store.commit('setCurrentQuiz', currentQuiz) }
    },
    pattern: {
      get() { return this.$store.state.quizPage.pattern },
      set(pattern) { this.$store.commit('setQuizPattern', pattern) }
    },
    optionFlags: {
      get() { return this.$store.state.quizPage.optionFlags },
      set(optionFlags) { this.$store.commit('setQuizOptionFlags', optionFlags) }
    },
  },
  methods: {
    getQuizzesInLevel: function (level) {
      return this.quizzes.filter( item => item.level === level )
    },
    checkRegularExpression: function (target) {
      return RegExp(this.pattern, this.optionsStr).test(target)
    },
    selectLevel: function(level) {
      const validatedLevel = Math.min(Math.max(1, level), this.maxLevel)
      this.selectQuiz(this.getQuizzesInLevel(validatedLevel)[0])
    },
    selectQuiz: function(quiz) {
      let quizIndex = quiz
      if (typeof quiz === 'object') quizIndex = this.quizzes.indexOf(quiz)
      if (!quizIndex) return
      const validated_quiz_index = Math.min(Math.max(0, quizIndex), this.quizzes.length - 1)
      this.currentQuiz = this.quizzes[validated_quiz_index]
    },
    prevLevel: function() { this.selectLevel(this.currentQuiz.level - 1) },
    nextLevel: function() { this.selectLevel(this.currentQuiz.level + 1) },
    prevQuiz: function() { this.selectQuiz(this.currentQuizIndex - 1) },
    nextQuiz: function() { this.selectQuiz(this.currentQuizIndex + 1) }
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
    // svg
    //   width: 20px
    //   height: 20px
    //   margin-left: 0 !important

  .card
    margin-bottom: 12px
</style>
