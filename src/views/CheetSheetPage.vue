<template lang="pug">
main
  article
    section(v-for="(type, index) in contents")
      h2 {{ type.name }}
      b-table.pr-2(
        style="overflow: hidden"
        fill
        striped
        small
        bordered
        outlined
        :fields="fields"
        :items="type.list"
        thead-class="d-none"
      )
        template(slot="sample" slot-scope="row")
          b-button(size="sm" @click="row.toggleDetails") 詳細
        template(slot="row-details" slot-scope="row")
          b-card(body-class="p-1")
            b-row
              b-col(sm="3" class="text-sm-right") タイトル:
              b-col 内容
            b-row
              b-col(sm="3" class="text-sm-right") タイトル:
              b-col 内容
</template>

<script>
export default {
  data() {
    return {
      fields: ['char', 'description', 'sample'],
      items: [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        {
          isActive: false,
          age: 89,
          first_name: 'Geneva',
          last_name: 'Wilson',
          _showDetails: true
        },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
      ],
      contents: [
        {
          name: 'メタキャラクタ',
          list: [
            { char: ".", description: "任意の1文字" },
            { char: "w", description: "英単語を構成する文字(a~z,A~Z,_,1~9)" },
            { char: "W", description: "英単語を構成する文字以外" },
            { char: "s", description: "空白文字(半角スペース,タブ,改行,キャリッジリターン)" },
            { char: "S", description: "空白文字以外" },
            { char: "\d", description: "半角数字(0~9)" },
            { char: "D", description: "半角数字以外" },
            { char: "b", description: "単語の境界に一致" },
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
        },
        {
          name: 'オプションフラグ',
          list: [
            { char: "g", description: "最初のマッチの後に止まることなく全てのマッチを探す（無指定の場合は最初のマッチで終了）" },
            { char: "i", description: "大文字／小文字を無視（無指定の場合は区別する）" },
            { char: "m", description: "複数行の入力文字列を複数行として扱う（^及び$が各行の先頭末尾にマッチする）" },
            { char: "u", description: "Unicode対応（漢字などを認識してくれるようになる）" },
          ],
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
@import "@/style/contents.sass"

main
  table
    table-layout: fixed
    ::v-deep td
      &:first-of-type
        width: 20%
        word-wrap: break-word
      &:last-of-type
        width: 58px
</style>
