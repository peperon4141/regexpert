(function(t){function e(e){for(var s,i,o=e[0],c=e[1],l=e[2],p=0,d=[];p<o.length;p++)i=o[p],a[i]&&d.push(a[i][0]),a[i]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);u&&u(e);while(d.length)d.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],s=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(s=!1)}s&&(r.splice(e--,1),t=i(i.s=n[0]))}return t}var s={},a={index:0},r=[];function i(e){if(s[e])return s[e].exports;var n=s[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=s,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"04a6":function(t,e,n){},"0cfb":function(t,e,n){},"20b4":function(t,e,n){"use strict";var s=n("acde"),a=n.n(s);a.a},"9d35":function(t,e,n){"use strict";var s=n("04a6"),a=n.n(s);a.a},acde:function(t,e,n){},b411:function(t,e,n){"use strict";var s=n("e71e"),a=n.n(s);a.a},cd49:function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var s=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("body",{staticClass:"d-flex flex-column"},[n("header",{staticClass:"bg-dark sticky-top"},[n("b-navbar",{attrs:{toggleable:"sm",type:"dark"}},[n("b-navbar-brand",{staticClass:"font-italic m-0",attrs:{variant:"faded",tag:"h1"}},[t._v("Regexpert")]),n("b-navbar-toggle",{staticClass:"border-0",attrs:{target:"nav-collapse"}}),n("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[n("b-navbar-nav",{staticClass:"ml-auto"},t._l(t.routes,function(e){return n("b-nav-item",{staticClass:"mx-3",attrs:{to:e.to}},[t._v(t._s(e.name))])}),1)],1)],1)],1),n("router-view",{staticClass:"flex-grow-1 bg-white"}),t._m(0)],1)},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",{staticClass:"bg-dark sticky-bottom d-flex justify-content-center align-items-center"},[n("span",{staticClass:"text-light"},[t._v("Created by Tohru Ver. 0.2")])])}],i=(n("f5df"),{name:"App",data:function(){return{routes:[{name:"クイズ",to:"/quiz"},{name:"砂場",to:"/sandbox"},{name:"チートシート",to:"/cheetsheet"}]}}}),o=i,c=(n("cf25"),n("2877")),l=Object(c["a"])(o,a,r,!1,null,null,null),u=l.exports,p=n("8c4f"),d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",{attrs:{id:"sandbox"}},[n("article",[n("section",[n("h2",[n("span",[t._v("関数選択")]),n("font-awesome-icon",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-1",modifiers:{"modal-1":!0}}],staticClass:"ml-2 text-secondary",attrs:{icon:["far","question-circle"]}}),n("b-modal",{attrs:{id:"modal-1",title:"説明","ok-only":""}},[n("p",{staticClass:"my-4"},[t._v("JavaScriptの正規表現に関する関数の選択ができます。")])])],1),n("b-form-group",[n("b-form-radio-group",{attrs:{options:t.funcSelection},model:{value:t.funcType,callback:function(e){t.funcType=e},expression:"funcType"}})],1)],1),n("section",[n("h2",[t._v("正規表現設定")]),"replace"==t.funcType?[n("b-badge",{staticClass:"p-2 pb-3 font-weight-light",attrs:{variant:"secondary"}},[t._v("置換後文字列")]),n("b-form-input",{staticClass:"position-relative mt-n2 mb-2 border-secondary",attrs:{placeholder:"置換後の文字列を書いて下さい。"},model:{value:t.replacement,callback:function(e){t.replacement=e},expression:"replacement"}})]:t._e(),[n("b-badge",{staticClass:"p-2 pb-3 font-weight-light",attrs:{variant:"secondary"}},[t._v("ターゲット文字列")]),n("b-form-textarea",{staticClass:"position-relative mt-n2 mb-2 border-secondary",attrs:{rows:"6",placeholder:"正規表現をチェックする対象を入力"},model:{value:t.targetStr,callback:function(e){t.targetStr=e},expression:"targetStr"}})],[n("b-badge",{staticClass:"p-2 pb-3 font-weight-light",attrs:{variant:"secondary"}},[t._v("正規表現パターン")]),n("regular-pattern-textbox",{staticClass:"position-relative mt-n2 mb-2",attrs:{pattern:t.pattern,optionFlags:t.optionFlags},on:{"input-pattern":function(e){t.pattern=e.value},"input-options":function(e){t.optionFlags=e.value}}})]],2),n("section",[n("h2",[n("span",[t._v("実行結果")]),t.time?n("b-badge",{staticClass:"ml-2",attrs:{variant:"secondary"}},[t._v("time: "+t._s(t.time)+"[ms]")]):t._e(),t.isArray?n("b-badge",{staticClass:"ml-2",attrs:{variant:"secondary"}},[t._v("count: "+t._s(t.results.length))]):t._e()],1),t.results&&0!=t.results.length?n("ul",{staticClass:"pl-1"},t._l(t.results,function(e){return n("li",{staticClass:"list-unstyled"},[n("font-awesome-icon",{staticClass:"mr-2 text-secondary",attrs:{icon:["fas","check"]}}),n("span",[t._v(t._s(e))])],1)}),0):n("span",[t._v("結果はありません。")])]),n("section",[n("h2",{directives:[{name:"b-toggle",rawName:"v-b-toggle.collapse-vals",modifiers:{"collapse-vals":!0}}]},[n("span",[t._v("RegExp変数")]),n("font-awesome-icon",{staticClass:"fa-lg mx-2 text-secondary",class:{"fa-flip-vertical":!t.showVals},attrs:{icon:["fas","angle-down"]}})],1),n("b-collapse",{attrs:{id:"collapse-vals"},model:{value:t.showVals,callback:function(e){t.showVals=e},expression:"showVals"}},[[n("b-badge",{staticClass:"p-2 pb-3 font-weight-light",attrs:{variant:"secondary"}},[t._v("$n変数")]),n("b-table",{staticClass:"mt-n2 pr-2 position-relative bg-secondary rounded-sm",staticStyle:{overflow:"hidden"},attrs:{fields:t.fields,items:t.regexpNums,"thead-class":"d-none","tbody-class":"bg-white",fill:"",striped:"",small:"",bordered:"",outlined:"",hover:""}})],[n("b-badge",{staticClass:"p-2 pb-3 font-weight-light",attrs:{variant:"secondary"}},[t._v("変数")]),n("b-table",{staticClass:"mt-n2 pr-2 position-relative bg-secondary rounded-sm",staticStyle:{overflow:"hidden"},attrs:{items:t.regexpVals,"thead-class":"d-none","tbody-class":"bg-white",fill:"",striped:"",small:"",bordered:"",outlined:"",hover:""}})]],2)],1)])])},f=[],h=(n("6b54"),n("28a5"),n("386d"),n("a481"),n("4917"),n("3b2b"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"regular-pattern-textbox"}},[n("b-form-input",{staticClass:"border-secondary",attrs:{placeholder:"正規表現式を書いてください","aria-describedby":"input-live-help input-live-feedback",state:t.checkRegexp(t.computedPattern,t.computedOptionFlags)},model:{value:t.computedPattern,callback:function(e){t.computedPattern=e},expression:"computedPattern"}}),n("b-form-invalid-feedback",{attrs:{id:"input-live-feedback"}},[t._v(t._s(t.error))]),n("b-form-checkbox-group",{attrs:{options:t.optionSelection},model:{value:t.computedOptionFlags,callback:function(e){t.computedOptionFlags=e},expression:"computedOptionFlags"}})],1)}),g=[],m=[{value:"i",text:"i:ignore"},{value:"g",text:"g:global"},{value:"m",text:"m:multiline"},{value:"u",text:"u:unicode"}],b={data:function(){return{optionSelection:m,error:""}},props:{pattern:{type:String,required:!0,default:""},optionFlags:{type:Array,required:!0,default:[]}},computed:{computedPattern:{get:function(){return this.pattern},set:function(t){this.$emit("input-pattern",{value:t})}},computedOptionFlags:{get:function(){return this.optionFlags},set:function(t){this.$emit("input-options",{value:t})}}},methods:{checkRegexp:function(t,e){try{return new RegExp(t,e.join("")),!0}catch(n){return this.error=n.message,!1}}}},v=b,x=Object(c["a"])(v,h,g,!1,null,"584d1f24",null),y=x.exports,_=["param","value"],z=[1,2,3,4,5,6,7,8,9].map(function(t){return"$".concat(t)}),w=["input","lastMatch","lastParen","leftContext","rightContext"],C=[{text:"match",value:"match"},{text:"replace",value:"replace"},{text:"exec",value:"exec"},{text:"test",value:"test"},{text:"search",value:"search"},{text:"split",value:"split"}],k=1e3,P={components:{RegularPatternTextbox:y},data:function(){return{funcSelection:C,results:[],regexpNums:[],regexpVals:[],time:null,isArray:!1,fields:_}},computed:{optionsStr:function(){return this.optionFlags.join("")},regexp_nums_count:function(){return this.regexpNums?this.regexpNums.filter(function(t){return!!t.value}).length:0},funcType:{get:function(){return this.$store.state.sandboxPage.funcType},set:function(t){this.$store.commit("setFuncType",t),this.updateResults()}},pattern:{get:function(){return this.$store.state.sandboxPage.pattern},set:function(t){this.$store.commit("setPattern",t),this.updateResults()}},optionFlags:{get:function(){return this.$store.state.sandboxPage.optionFlags},set:function(t){this.$store.commit("setOptionFlags",t),this.updateResults()}},replacement:{get:function(){return this.$store.state.sandboxPage.replacement},set:function(t){this.$store.commit("setReplacement",t),this.updateResults()}},targetStr:{get:function(){return this.$store.state.sandboxPage.target},set:function(t){this.$store.commit("setTarget",t),this.updateResults()}},showVals:{get:function(){return this.$store.state.sandboxPage.showVals},set:function(t){this.$store.commit("setShowVals",t)}}},created:function(){this.$store.commit("restore","sandboxPage")},mounted:function(){this.updateResults()},methods:{runRegexpFunc:function(){var t=new RegExp(this.pattern,this.optionsStr);switch(this.funcType){case"match":return this.targetStr.match(t);case"replace":return this.targetStr.replace(t,this.replacement);case"exec":return t.exec(this.targetStr);case"test":return t.test(this.targetStr);case"search":return this.targetStr.search(t);case"split":return this.targetStr.split(t)}},updateResults:function(){this.initializeVariables();try{var t=this.runRegexpFunc();this.isArray=Array.isArray(t),this.results=this.isArray?t:[t],this.updateVariables(),this.checkPerformance()}catch(e){}},initializeVariables:function(){"".match(RegExp("")),this.regexpNums=z.map(function(t){return{param:t,value:""}}),this.regexpVals=w.map(function(t){return{param:t,value:""}})},updateVariables:function(){this.regexpNums=z.map(function(t){return{param:t,value:RegExp[t]}}),this.regexpVals=w.map(function(t){return{param:t,value:RegExp[t].toString()}})},checkPerformance:function(){var t=this;this.time=null,setTimeout(function(){for(var e=performance.now(),n=0;n<k;n++)t.runRegexpFunc();var s=performance.now();t.time=((s-e)/k).toFixed(3)},10)}}},Q=P,S=(n("9d35"),Object(c["a"])(Q,d,f,!1,null,"2b3c10bd",null)),F=S.exports,$=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",[n("article",t._l(t.contents,function(e,s){return n("section",[n("h2",[t._v(t._s(e.name))]),n("b-table",{staticClass:"pr-2 position-relative bg-secondary rounded-sm",staticStyle:{overflow:"hidden"},attrs:{fill:"",striped:"",small:"",bordered:"",outlined:"",fields:t.fields,items:e.list,"thead-class":"d-none","tbody-class":"bg-white"},scopedSlots:t._u([{key:"sample",fn:function(e){return[n("b-button",{class:{disabled:0<(e.item.samples||[]).length},attrs:{size:"sm"},on:{click:e.toggleDetails}},[t._v("詳細")])]}},{key:"row-details",fn:function(e){return[n("b-card",{attrs:{"body-class":"p-1"}},t._l(e.item.samples,function(e,s){return n("b-row",[n("b-col",{staticClass:"text-sm-right",attrs:{sm:"3"}},[t._v(t._s(s+1))]),n("b-col",[t._v(t._s(e))])],1)}),1)]}}],null,!0)})],1)}),0)])},O=[],q={data:function(){return{fields:["char","description","sample"],contents:[{name:"文字クラス",list:[{char:".",description:"任意の1文字",samples:["サンプル１","サンプル２"]},{char:"\\d",description:"半角数字([0~9]に相当)"},{char:"\\D",description:"半角数字以外"},{char:"\\s",description:"空白文字(半角スペース,タブ,改行,キャリッジリターン)"},{char:"\\S",description:"空白文字以外"},{char:"\\w",description:"半角英単語を構成する文字([a~zA~Z1~9_]に相当)"},{char:"\\W",description:"半角英単語を構成する文字以外"},{char:"[xyz]",description:"指定された文字のどれか(この場合xyzのいずれかに一致)"},{char:"[a-z]",description:"文字の範囲を指定(文字コードが連続していれば使える。この場合aからzまで。)"},{char:"[^xyz]",description:"指定された文字以外のどれか(この場合xyz以外に一致)"},{char:"[^a-z]",description:"指定した文字の範囲以外(この場合aからz以外)"},{char:"(pattern1|pattern2)",description:"指定されたパターンのどれかにマッチする表現"}]},{name:"量指定子",list:[{char:"■*",description:"■を0回以上"},{char:"■+",description:"■を1回以上"},{char:"■?",description:"■を0回または1回"},{char:"■{n}",description:"■をn回"},{char:"■{n,}",description:"■をn回以上"},{char:"■{n,m}",description:"■をn回以上m回以下"},{char:"■*?",description:"最短マッチで■を0回以上"},{char:"■+?",description:"最短マッチで■を1回以上"},{char:"■{n}?",description:"最短マッチで■をn回"},{char:"■{n,}?",description:"最短マッチで■をn回以上"},{char:"■{n,m}?",description:"最短マッチで■をn回以上m回以下"}]},{name:"位置にマッチするメタキャラクタ",list:[{char:"^",description:"文字列の先頭に一致(複数行モードの場合は任意の改行の直後)"},{char:"$",description:"文字列の末尾に一致(複数行モードの場合は任意の改行の直前)"},{char:"\\b",description:"単語の境界"},{char:"\\B",description:"単語の境界以外"}]},{name:"グループ化/キャプチャ/制御構造",list:[{char:"(■■■)",description:"キャプチャ付きのグループ化"},{char:"\\n",description:"n番目のキャプチャにマッチした文字列"},{char:"(?:■■■)",description:"キャプチャ無しのグループ化"},{char:"■■■|□□□",description:"選択"},{char:"(?=■■■)",description:"先読み"},{char:"(?!■■■)",description:"否定先読み"}]},{name:"オプションフラグ",list:[{char:"g",description:"最初のマッチの後に止まらず全マッチを探す（無指定の場合は最初のマッチで終了）"},{char:"i",description:"大文字／小文字を無視（無指定の場合は区別する）"},{char:"m",description:"複数行の入力文字列を複数行として扱う（^及び$が各行の先頭末尾にマッチする）"},{char:"u",description:"Unicode対応（漢字などを認識してくれるようになる）"}]}]}}},R=q,T=(n("d191"),Object(c["a"])(R,$,O,!1,null,"2373c918",null)),j=T.exports,E=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",[t.quizzes.length<=0?n("b-spinner",{attrs:{id:"spinner"}}):n("article",{staticClass:"h-100 d-flex flex-row"},[n("div",{staticClass:"flex-grow-1 position-relative",attrs:{id:"contents"}},[n("section",{staticClass:"w-100"},[n("h2",[n("span",[t._v("クイズ :")]),n("b-badge",{staticClass:"mx-2",attrs:{pill:"",variant:"secondary"}},[t._v("LEVEL "+t._s(t.currentQuiz.level))]),n("span",{domProps:{textContent:t._s(" > ")}}),n("b-badge",{staticClass:"mx-2",attrs:{pill:"",variant:"secondary"}},[t._v(t._s(t.currentQuiz.title))])],1),t.currentQuiz.rule?n("p",{staticClass:"rule mb-2"},[t._v(t._s(t.currentQuiz.rule))]):t._e(),n("regular-pattern-textbox",{attrs:{pattern:t.pattern,optionFlags:t.optionFlags},on:{"input-pattern":function(e){t.pattern=e.value},"input-options":function(e){t.optionFlags=e.value}}})],1),n("section",{staticClass:"w-100"},[n("h2",[t._v("結果")]),n("b-row",{staticClass:"d-flex flex-row"},[n("div",{staticClass:"col flex-grow-1"},[n("h3",{staticClass:"text-success"},[t._v("OK")]),n("ul",{staticClass:"pl-0"},t._l(t.okList,function(e,s){return n("li",{staticClass:"check-list list-unstyled"},[n("font-awesome-icon",{staticClass:"mx-2",class:[t.checkRegularExpression(e)?"text-success":"text-dark"],attrs:{icon:[t.check-t.circle]}}),n("span",[t._v(t._s(e))])],1)}),0)]),n("div",{staticClass:"col flex-grow-1"},[n("h3",{staticClass:"text-danger"},[t._v("NG")]),n("ul",{staticClass:"pl-0"},t._l(t.ngList,function(e){return n("li",{staticClass:"check-list list-unstyled"},[n("font-awesome-icon",{staticClass:"mx-2",class:[t.checkRegularExpression(e)?"text-dark":"text-danger"],attrs:{icon:"check-circle"}}),n("span",[t._v(t._s(e))])],1)}),0)])])],1),n("div",{staticClass:"position-absolute w-100 d-flex",attrs:{id:"selector"}},[n("b-button",{staticClass:"m-1",attrs:{size:"lg",variant:"secondary"},on:{click:function(e){return e.target!==e.currentTarget?null:t.prevLevel()}}},[t._v("«1")]),n("b-button",{staticClass:"m-1 mr-auto",attrs:{size:"lg",variant:"secondary"},on:{click:function(e){return e.target!==e.currentTarget?null:t.prevQuiz()}}},[t._v("‹2")]),n("b-button",{staticClass:"m-1",attrs:{size:"lg",variant:"secondary"},on:{click:function(e){return e.target!==e.currentTarget?null:t.nextQuiz()}}},[t._v("3›")]),n("b-button",{staticClass:"m-1",attrs:{size:"lg",variant:"secondary"},on:{click:function(e){return e.target!==e.currentTarget?null:t.nextLevel()}}},[t._v("4»")])],1)]),n("div",{staticClass:"border-left d-none d-sm-block d-md-block",attrs:{id:"sidebar"}},[n("section",[n("h2",[t._v("クイズ選択")]),t._l(t.levels,function(e,s){return n("b-card",{key:"level-"+e,staticClass:"border-secondary overflow-hidden",attrs:{"header-tag":"header","no-body":""}},[n("h6",{directives:[{name:"b-toggle",rawName:"v-b-toggle",value:"accordion-"+s,expression:"'accordion-' + index"}],staticClass:"mb-0 d-flex justify-content-between",class:{"text-primary":e===t.currentLevel},attrs:{slot:"header"},slot:"header"},[n("b-badge",{staticClass:"px-2",attrs:{variant:"primary",pill:""}},[t._v(t._s(t.getQuizzesInLevel(e).length))]),n("span",[t._v(t._s("level-"+e))]),n("font-awesome-icon",{staticClass:"mx-2",attrs:{icon:"angle-down"}})],1),n("b-collapse",{attrs:{id:"accordion-"+s,role:"tabpanel",visible:e==t.currentLevel}},[n("b-list-group",{attrs:{flush:""}},t._l(t.getQuizzesInLevel(e),function(e,s){return n("b-list-group-item",{staticClass:"py-2 d-flex justify-content-between",class:{"text-primary":t.currentQuiz===e}},[n("span",[t._v(t._s(e.title))]),n("b-button",{staticClass:"py-0",attrs:{size:"sm"},on:{click:function(n){return n.target!==n.currentTarget?null:t.selectQuiz(e)}}},[t._v("選択")])],1)}),1)],1)],1)})],2)])])],1)},L=[],V=n("7618"),A=(n("1c4c"),n("ac6a"),n("5df3"),n("4f7f"),n("55dd"),n("bc3a")),N=n.n(A),I={components:{RegularPatternTextbox:y},data:function(){return{quizzes:[]}},created:function(){this.$store.commit("restore","quizPage");var t=this;N.a.get("https://script.google.com/macros/s/AKfycbwX35ewjC6DxJV8ehrtI8nex0X3KWKYYv2kEYJJcISfTaYfMX8/exec").then(function(e){var n=e.data;t.quizzes=n.sort(function(t,e){return t.level<e.level}),t.currentQuiz=t.quizzes[0]}).catch(function(t){console.log(t)})},computed:{okList:function(){return this.currentQuiz?this.currentQuiz.ok.split(/\r\n|\n/):[]},ngList:function(){return this.currentQuiz?this.currentQuiz.ng.split(/\r\n|\n/):[]},levels:function(){var t=new Set;return this.quizzes.forEach(function(e){return t.add(e.level)}),Array.from(t)},currentLevel:function(){return this.currentQuiz?this.currentQuiz.level:1},maxLevel:function(){return this.levels?this.levels[this.levels.length-1]:1},currentQuizIndex:function(){return this.quizzes.indexOf(this.currentQuiz)},optionsStr:function(){return this.optionFlags.join("")},currentQuiz:{get:function(){return this.$store.state.quizPage.currentQuiz},set:function(t){this.$store.commit("setCurrentQuiz",t)}},pattern:{get:function(){return this.$store.state.quizPage.pattern},set:function(t){this.$store.commit("setQuizPattern",t)}},optionFlags:{get:function(){return this.$store.state.quizPage.optionFlags},set:function(t){this.$store.commit("setQuizOptionFlags",t)}}},methods:{getQuizzesInLevel:function(t){return this.quizzes.filter(function(e){return e.level===t})},checkRegularExpression:function(t){return RegExp(this.pattern,this.optionsStr).test(t)},selectLevel:function(t){var e=Math.min(Math.max(1,t),this.maxLevel);this.selectQuiz(this.getQuizzesInLevel(e)[0])},selectQuiz:function(t){var e=t;if("object"===Object(V["a"])(t)&&(e=this.quizzes.indexOf(t)),e){var n=Math.min(Math.max(0,e),this.quizzes.length-1);this.currentQuiz=this.quizzes[n]}},prevLevel:function(){this.selectLevel(this.currentQuiz.level-1)},nextLevel:function(){this.selectLevel(this.currentQuiz.level+1)},prevQuiz:function(){this.selectQuiz(this.currentQuizIndex-1)},nextQuiz:function(){this.selectQuiz(this.currentQuizIndex+1)}}},M=I,J=(n("20b4"),Object(c["a"])(M,E,L,!1,null,"40a4d882",null)),Y=J.exports,K=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},B=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",[n("article",{staticClass:"h-100"},[n("iframe",{attrs:{src:"https://docs.google.com/forms/d/e/1FAIpQLSdY4N1MMQx05eszHyyOi98fTkByPf-JckwaeQYi6ypVng024A/viewform?embedded=true",width:"100%",height:"100%",frameborder:"0",marginheight:"0",marginwidth:"0"}},[t._v("読み込んでいます…")])])])}],D={},X=D,W=(n("b411"),Object(c["a"])(X,K,B,!1,null,"3d6b705e",null)),G=W.exports;s["default"].use(p["a"]);var H=new p["a"]({mode:"hash",base:"/",linkActiveClass:"active",routes:[{path:"/sandbox",component:F},{path:"/cheetsheet",component:j},{path:"/quiz",component:Y},{path:"/form",component:G},{path:"*",redirect:"/sandbox"}]}),U=H,Z=n("2f62");function tt(t,e){localStorage.setItem("store_".concat(t),JSON.stringify(e[t]))}function et(t,e){var n=localStorage.getItem("store_".concat(t));n&&Object.assign(e[t],JSON.parse(n))}s["default"].use(Z["a"]);var nt=new Z["a"].Store({state:{sandboxPage:{funcType:"match",target:"aaa@gmail.com\nbbb@gmail.com",pattern:"^.*?@gmail\\.com",optionFlags:[],replacement:"test",showVals:!1},quizPage:{currentQuiz:null,pattern:"",optionFlags:[]}},mutations:{restore:function(t,e){et(e,t)},setFuncType:function(t,e){t.sandboxPage.funcType=e,tt("sandboxPage",t)},setTarget:function(t,e){t.sandboxPage.target=e,tt("sandboxPage",t)},setReplacement:function(t,e){t.sandboxPage.replacement=e,tt("sandboxPage",t)},setPattern:function(t,e){t.sandboxPage.pattern=e,tt("sandboxPage",t)},setShowVals:function(t,e){t.sandboxPage.showVals=e,tt("sandboxPage",t)},setOptionFlags:function(t,e){t.sandboxPage.optionFlags=e,tt("sandboxPage",t)},setCurrentQuiz:function(t,e){t.quizPage.currentQuiz=e,tt("quizPage",t)},setQuizPattern:function(t,e){t.quizPage.pattern=e,tt("quizPage",t)},setQuizOptionFlags:function(t,e){t.quizPage.optionFlags=e,tt("quizPage",t)}}}),st=n("9483");Object(st["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}});var at=n("5f5b"),rt=(n("f9e3"),n("2dd8"),n("ecee")),it=n("c074"),ot=n("b702"),ct=n("ad3d");s["default"].config.productionTip=!1,s["default"].use(at["a"]),rt["c"].add(it["b"],it["c"],it["a"],ot["a"]),s["default"].component("font-awesome-icon",ct["a"]),new s["default"]({router:U,store:nt,render:function(t){return t(u)}}).$mount("#app")},cf25:function(t,e,n){"use strict";var s=n("0cfb"),a=n.n(s);a.a},d191:function(t,e,n){"use strict";var s=n("d210"),a=n.n(s);a.a},d210:function(t,e,n){},e71e:function(t,e,n){}});
//# sourceMappingURL=index.509d5b9d.js.map