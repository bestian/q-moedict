<template>
  <q-page class="word" padding flex flex-center>
    <p><a href = "https://www.moedict.tw/" target="_blank">萌典</a>共收錄十六萬筆國語、兩萬筆臺語、一萬四千筆客語條目，並支援「自動完成」功能及「%_ *? ^.$」等萬用字元。

    定義裡的每個字詞都可以點擊連到說明。</p>

    <p>源碼、其他平台版本、API 及原始資料等，均可在<a href = "https://github.com/g0v/moedict-webkit/" target="_blank">GitHub</a> 取得。</p>

    <p>原始資料來源為教育部《<a href = "http://dict.revised.moe.edu.tw/cbdic/" target = "_blank">重編國語辭典修訂本</a>》（CC BY-ND 3.0 臺灣授權）、《<a herf = "https://twblg.dict.edu.tw/holodict_new/" target="_blank">臺灣閩南語常用詞辭典</a>》（CC BY-ND 3.0 臺灣授權）及《<a href = "http://hakka.dict.edu.tw/" target = "_blank">臺灣客家語常用詞辭典</a>》（授權聲明），辭典本文的著作權仍為教育部所有。</p>

    <p>筆劃資料來源為教育部「<a href = "https://stroke-order.learningweb.moe.edu.tw/home.do" target = "_blank">常用國字標準字體筆順學習網</a>」，國語發音資料來源為教育部「<a href = "http://dict.concised.moe.edu.tw/jbdic/" target = "_blank">國語辭典簡編本</a>」（CC BY-ND 3.0 臺灣授權），著作權仍為教育部所有。</p>

    <p>英/法/德文對照表 CC-CEDict、CFDict、HanDeDict 採用 CC BY-SA 4.0 國際授權。</p>

    <p>兩岸詞典由<a href = "http://www.gacc.org.tw/" target = "_blank">中華文化總會</a>提供，採用 CC BY-NC-ND 3.0 臺灣授權。</p>

    <p>歷代書體以內嵌網頁方式，連至中華文化總會網站。字體e筆書寫：張炳煌教授。字體選用：郭晉銓博士。</p>

    <p>Android、Apple iOS 及 Firefox OS 離線版包含下列第三方元件：</p>

    <p>jQuery 及 jQuery UI 由 jQuery Foundation 提供，採用 MIT 授權。</p>
    <p>Cordova 由 Apache 基金會提供，採用 Apache 2.0 授權。</p>
    <p>Fira Sans 字型由 Mozilla 基金會提供，採用 SIL Open Font 1.1 授權。</p>
    <p>字圖分享功能使用下列來源之中文字型：</p>

    <p>中文全字庫採用 CC BY-ND 3.0 臺灣授權。</p>
    <p>逢甲大學中文系採用「不涉及商業行為使用」授權。</p>
    <p>cwTeX Q 採用 GPL 2.0 授權。</p>
    <p>思源黑體採用 SIL Open Font 1.1授權。</p>
    <p>思源宋體採用 SIL Open Font 1.1授權。</p>
    <p>王漢宗自由字型採用 GPL 2.0 授權。</p>
    <p>日星初號楷體採用CC BY-NC-ND 3.0 臺灣授權。</p>
    <p>感謝 #g0v.tw 頻道內所有協助開發的朋友們。</p>

    <h3><a href = "https://creativecommons.org/publicdomain/zero/1.0/deed.zh_TW" target="_blank">CC0 1.0 公眾領域貢獻宣告</a></h3>

    <p>作者 唐鳳 在法律許可的範圍內，拋棄此著作依著作權法所享有之權利，包括所有相關與鄰接的法律權利，並宣告將該著作貢獻至公眾領域。</p>

</q-page>
</template>

<script>
import { sify } from 'chinese-conv'

export default {
  name: 'About',
  data () {
    return {
      title: '萌典',
      si: false
    }
  },
  props: ['stars'],
  meta () {
    return {
      title: '關於本站 - ' + this.title
    }
  },
  mounted () {
  },
  methods: {
    s (t) {
      if (this.si) {
        return sify(t)
      } else {
        return t
      }
    }
  }
}
</script>

<style type="text/css" scoped="">

a {
  text-decoration: none;
  color: #3939ff;
}
</style>
