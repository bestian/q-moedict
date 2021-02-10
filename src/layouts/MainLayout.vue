<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class = "no-print">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          name="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <input id="s" type="search" name="s" v-model.trim="myKey" list="words" :placeholder="s('輸入字詞')" @keydown.enter="$router.push('/w/' + pre + myKey)"/>
          <label for="s">-</label>
          <datalist id ="words">
            <option v-for = "d in has(data, myKey).slice(0,n)" :key="d" :value="d"></option>
            }
          </datalist>
          <button :aria-label="s('查詢')" @click="$router.push('/w/' + pre + myKey)">{{ s('查詢') }}</button>
        </q-toolbar-title>

        <a name="sify" class="big btn si no-print" v-if = "!si" @click="s1(true)" :title="s('轉成簡體')">
          簡
        </a>
        <a name="tify" class="big btn ti no-print" v-else @click="s1(false)" :title="s('轉成正體')">
          正
        </a>

        <a name="print" class="big fat-only btn no-print" @click="leftDrawerOpen = false" onclick = "setTimeout(() => {window.print()}, 500)"><q-icon name="print" :title="s('列印本頁')"/>
        </a>

        <a name="radom" class="big btn no-print" @click = "randomRoute()" :title="s('隨機條目')"><q-icon name="ion-shuffle" /></a>

        <a name="github" class="big fat-only btn no-print" href="https://www.github.com/bestian/q-moedict/" target="_blank" :title="s('源碼')" rel="noreferrer noopener">
          <q-icon name = "ion-logo-github" />
        </a>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      class = "no-print"
      :width = "200"
    >
    <q-list bordered>
      <q-item clickable v-close-popup to = "/about">{{ s('關於本站') }}</q-item>
      <q-item clickable v-close-popup @click="leftDrawerOpen = false" onclick = "setTimeout(() => {window.print()}, 500)">{{ s('列印本頁') }}<q-icon name="print" /></q-item>
      <q-item clickable @click = "randomRoute()">{{ s('隨機條目') }}<q-icon name="ion-shuffle" /></q-item>
      <q-item clickable v-close-popup to = "/head/">{{ s('部首表') }}</q-item>
      <q-btn size = "lg" label="分類辭典">
        <q-icon name = "arrow_drop_down" />
        <q-menu>
          <q-list>
            <q-item clickable v-close-popup to = "/w/萌">{{ s('國語萌典') }}</q-item>
            <q-item clickable v-close-popup to = "/w/~萌">{{ s('兩岸萌典') }}</q-item>
            <q-item clickable v-close-popup to = "/w/'發穎">{{ s('臺灣閩南語') }}</q-item>
            <q-item clickable v-close-popup to = "/w/:發芽">{{ s('臺灣客家語') }}</q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <br/>
    <q-btn size = "lg" label="分類搜尋">
      <q-icon name = "arrow_drop_down" />
      <q-menu>
        <q-list>
          <q-item clickable v-close-popup @click="$router.push('/list/成語')">
            <q-item-section>
              <q-item-label>{{ s('成語')}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="$router.push('/list/諺語')">
            <q-item-section>
              <q-item-label>{{ s('諺語')}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="$router.push('/list/歇後語')">
            <q-item-section>
              <q-item-label>{{ s('歇後語')}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="$router.push('/list/音譯')">
            <q-item-section>
              <q-item-label>{{ s('外來語-音譯')}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="$router.push('/list/義譯')">
            <q-item-section>
              <q-item-label>{{ s('外來語-義譯')}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="$router.push('/list/音義合譯')">
            <q-item-section>
              <q-item-label>{{ s('外來語-音義合譯')}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="$router.push('/list/無法考證者')">
            <q-item-section>
              <q-item-label>{{ s('外來語-無法考證者')}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
      <q-item>
        <b><q-icon name="star"/>{{ s('已加星號') }}</b>
      </q-item>
      <q-item clickable v-for = "k in stars" :to = "'/w/' + k" :key="k">
        {{s(k)}}
      </q-item>
      <q-item>
        <b><q-icon name="ion-time"/>{{ s('近期搜尋') }}</b>
      </q-item>
      <q-item clickable v-for = "(k, idx) in res.slice(0,6)" :to = "'/w/' + k" :key="k + idx" v-show="k">
        {{s(k)}}
      </q-item>
    </q-list>
    </q-drawer>

    <q-page-container>
      <div class="gcse-search"></div>
      <router-view @updateStars = "updateStars" @updateRes = "updateRes" @updateSi = "s1" @pre1="pre1" :stars="stars" @closeD = "closeD" :si="si"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { sify } from 'chinese-conv'

export default {
  name: 'MainLayout',
  data () {
    return {
      myKey: '',
      pre: '',
      url: 'a',
      data: [],
      stars: [],
      res: [],
      leftDrawerOpen: false,
      n: 100,
      si: false
    }
  },
  methods: {
    randomRoute () {
      var p = this.$q.localStorage.getItem('pre') || ''
      var u = this.$q.localStorage.getItem('url') || 'a'
      this.pre = p
      this.url = u
      console.log(this.url)
      this.$axios.get('' + this.url + '/index.json')
        .then((response) => {
          this.data = response.data
          const r = this.data[Math.floor(Math.random() * this.data.length)]
          this.$router.push('/w/' + this.pre + r)
        })
    },
    closeD () {
      this.leftDrawerOpen = false
    },
    pre1 (p, u) {
      p = this.$q.localStorage.getItem('pre') || p || ''
      u = this.$q.localStorage.getItem('url') || u || ''
      this.pre = p
      this.url = u
      this.$axios.get('' + this.url + '/index.json')
        .then((response) => {
          this.data = response.data
        })
    },
    s (t) {
      if (this.si) {
        return sify(t)
      } else {
        return t
      }
    },
    s1 (k) {
      var si = this.$q.localStorage.getItem('si')
      if (typeof k !== 'undefined') {
        si = k
      }
      console.log(si)
      if (!si) { si = false }
      this.si = si
      this.$q.localStorage.set('si', si)
    },
    deep () {
      var p = this.s('全站搜尋')
      window.IS_GOOGLE_AFS_IFRAME_ = true
      const cx = '007966820757635393756:sasf0rnevk4'
      var gcse = document.createElement('script')
      gcse.type = 'text/javascript'
      gcse.async = true
      gcse.src = 'https://www.google.com/cse/cse.js?cx=' + cx
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(gcse, s)
      setInterval(function () {
        var e = document.getElementById('gsc-i-id1')
        if (e) {
          e.setAttribute('placeholder', p)
        }
      }, 500)
    },
    onLoad () {
      this.n += 50
    },
    has (data, k) {
      // console.log(data)
      if (!k) {
        return []
      }
      return data.filter((x) => { return x.indexOf(k) > -1 })
    },
    updateStars () {
      this.stars = this.$q.localStorage.getItem('words') || []
    },
    updateRes () {
      this.res = this.$q.localStorage.getItem('res') || []
    }
  },
  mounted () {
    if (navigator.language === 'zh-cn' || navigator.language === 'zh-CN' || navigator.userLanguage === 'zh-cn') {
      this.si = true
    }
    this.s1(this.si)
    var vm = this
    this.deep()
    this.$axios.get('https://www.moedict.tw/' + this.url + '/index.json')
      .then((response) => {
        this.data = response.data
      })
    this.stars = this.$q.localStorage.getItem('words') || []
    setInterval(function () {
      var list = document.getElementsByClassName('gs-title')
      for (var i = 0; i < list.length; i++) {
        const e = list[i]
        if (e.getAttribute('href')) {
          var l = e.getAttribute('href')
          l = ('' + l).replace('https://www.moedict.tw/', '')
          e.removeAttribute('href')
          e.removeAttribute('data-cturl')
          e.removeAttribute('data-ctorig')
          e.setAttribute('data-h', l)
          e.setAttribute('target', 'self')
          e.setAttribute('rel', 'noreferrer')
          e.addEventListener('click', function (event) {
            event.preventDefault()
            console.log(this.getAttribute('data-h'))
            vm.$router.push('/w/' + this.getAttribute('data-h'))
            var x = document.getElementsByClassName('gsc-modal-background-image gsc-modal-background-image-visible')
            x[0].click()
            vm.$forceUpdate()
          })
        }
      }
    }, 1000)
  }
}
</script>

<style type="text/css">
  #s {
    width: 130px !important;
  }

  @media screen and (min-width: 420px) {
    #s {
      width: 250px !important;
    }
  }

  a.btn {
    text-decoration: none;
    margin: 0 .2em;
    cursor: pointer;
  }

  .ellipsis {
    text-overflow: inherit;
  }

  .q-btn__wrapper:before {
    box-shadow: none;
  }
</style>
