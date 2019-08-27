<template lang="pug">
main
  article
    section(v-for="(type, index) in contents")
      h2 {{ type.name }}
      b-table.pr-2.position-relative.bg-secondary.rounded-sm(
        style="overflow: hidden"
        fill
        striped
        small
        bordered
        outlined
        :fields="fields"
        :items="type.list"
        thead-class="d-none"
        tbody-class="bg-white"
      )
        template(slot="sample" slot-scope="row")
          b-button(
            size="sm"
            @click="row.toggleDetails"
            :class="{disabled: 0 < (row.item.samples || []).length}"
          ) 詳細
        template(slot="row-details" slot-scope="row")
          b-card(body-class="p-1")
            b-row(v-for="(sample, index) in row.item.samples")
              b-col.text-sm-right(sm="3") {{ index + 1 }}
              b-col {{ sample }}
</template>

<script>
export default {
  data() {
    return {
      fields: ['char', 'description', 'sample'],
      contents: [
        {
          name: '文字クラス',
          list: [
            { char: ".", description: "任意の1文字", samples: [ 'サンプル１', 'サンプル２', ] },
            { char: "\\d", description: "半角数字([0~9]に相当)" },
            { char: "\\D", description: "半角数字以外" },
            { char: "\\s", description: "空白文字(半角スペース,タブ,改行,キャリッジリターン)" },
            { char: "\\S", description: "空白文字以外" },
            { char: "\\w", description: "半角英単語を構成する文字([a~zA~Z1~9_]に相当)" },
            { char: "\\W", description: "半角英単語を構成する文字以外" },
            { char: "[xyz]", description: "指定された文字のどれか(この場合xyzのいずれかに一致)" },
            { char: "[a-z]", description: "文字の範囲を指定(文字コードが連続していれば使える。この場合aからzまで。)" },
            { char: "[^xyz]", description: "指定された文字以外のどれか(この場合xyz以外に一致)" },
            { char: "[^a-z]", description: "指定した文字の範囲以外(この場合aからz以外)" },
            { char: "(pattern1|pattern2)", description: "指定されたパターンのどれかにマッチする表現" },
          ]
        },
        {
          name: '量指定子',
          list: [
            { char: "■*", description: "■を0回以上" },
            { char: "■+", description: "■を1回以上" },
            { char: "■?", description: "■を0回または1回" },
            { char: "■{n}", description: "■をn回" },
            { char: "■{n,}", description: "■をn回以上" },
            { char: "■{n,m}", description: "■をn回以上m回以下" },
            { char: "■*?", description: "最短マッチで■を0回以上" },
            { char: "■+?", description: "最短マッチで■を1回以上" },
            { char: "■{n}?", description: "最短マッチで■をn回" },
            { char: "■{n,}?", description: "最短マッチで■をn回以上" },
            { char: "■{n,m}?", description: "最短マッチで■をn回以上m回以下" },
          ],
        },
        {
          name: '位置にマッチするメタキャラクタ',
          list: [
            { char: "^", description: "文字列の先頭に一致(複数行モードの場合は任意の改行の直後)" },
            { char: "$", description: "文字列の末尾に一致(複数行モードの場合は任意の改行の直前)" },
            { char: "\\b", description: "単語の境界" },
            { char: "\\B", description: "単語の境界以外" },
          ],
        },
        {
          name: 'グループ化/キャプチャ/制御構造',
          list: [
            { char: "(■■■)", description: "キャプチャ付きのグループ化" },
            { char: "\\n", description: "n番目のキャプチャにマッチした文字列" },
            { char: "(?:■■■)", description: "キャプチャ無しのグループ化" },
            { char: "■■■|□□□", description: "選択" },
            { char: "(?=■■■)", description: "先読み" },
            { char: "(?!■■■)", description: "否定先読み" },
          ],
        },
        {
          name: 'オプションフラグ',
          list: [
            { char: "g", description: "最初のマッチの後に止まらず全マッチを探す（無指定の場合は最初のマッチで終了）" },
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
