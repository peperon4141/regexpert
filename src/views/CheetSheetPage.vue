<template lang="pug">
main.border-left
  section(v-for="(category, index) in contents")
    h2 {{ category.name }}
    b-table.pr-2(
      style="overflow: hidden"
      fill
      striped
      small
      bordered
      outlined
      :items="category.list"
      thead-class="d-none"
    )
</template>

<script>
export default {
  data() {
    return {
      contents: [
        {
          name: 'メタ',
          list: [
            { char: ".", description: "任意の1文字" },
            { char: "\w", description: "英単語を構成する文字(a~z,A~Z,_,1~9)" },
            { char: "\W", description: "英単語を構成する文字以外" },
            { char: "\s", description: "空白文字(半角スペース,タブ,改行,キャリッジリターン)" },
            { char: "\S", description: "空白文字以外" },
            { char: "\d", description: "半角数字(0~9)" },
            { char: "\D", description: "半角数字以外" },
            { char: "\b", description: "単語の境界に一致" },
            { char: "[xyz]", description: "指定された文字のどれかに一致(この場合xyzのいずれかに一致)" },
            { char: "[a-z]", description: "マッチする文字の範囲を指定する表現(この場合aからzまで他には[1-9][A-Z]など文字コードが連続していれば使える。)" },
            { char: "(pattern1|pattern2)", description: "指定されたパターンのどれかにマッチする表現" },
          ]
        },
        {
          name: '数量指定子',
          list: [
            { char: "*", description: "0回以上の繰り返しにマッチ" },
            { char: "+", description: "1回以上の繰り返しにマッチ" },
            { char: "{n}", description: "n回の繰り返しにマッチする表現" },
            { char: "{n,}", description: "n回以上の繰り返しにマッチする表現" },
            { char: "{n,m}", description: "n回以上m回以下の繰り返しにマッチする表現" },
            { char: "?", description: "0回または1回の出現にマッチする表現" },
          ],
        },
        {
          name: 'アンカー',
          list: [
            { char: "^", description: "文字列の先頭に一致" },
            { char: "$", description: "文字列の末尾に一致" },
          ],
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../style/contents.sass"

</style>
