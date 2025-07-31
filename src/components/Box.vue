<template>
  <div class="box no-print" :style="{top: t + 5 + 'px', left: l + 5 + 'px'}">
    <div v-if="!err">
      <div v-for = "(b, idx) in bs" :key = "idx">
        <span v-for = "(y, i) in yindiao(w, bs[idx], data.h[idx].p, data.h[idx].T)" :key="i">
          <h1 class="stroke">{{ y.w }}</h1>
          <span id ="b">
            <span class="yindiao">
              <span class = "yin stroke"> {{y.yin}} </span>
              <span class = "diao stroke"> {{y.diao}} </span>
            </span>
          </span>
        </span>
        <hr class="topper">
        <div v-if = "data">
            <div v-for = "d in data.h[idx].d" :key = "d.f">
              <span v-if = "d.type">
                <span class="type">{{ s(p(d.type)[0]) }}</span>：
              </span>
              <span class="def" v-if = "d.f">
                <router-link class="big" v-for = "(r, idx) in p(d.f)" :to = "'/w/' + pre + r" :key = "r+idx" :disabled="dis(r)" :event="!dis(r) ? 'click' : ''">{{ s(r) }}</router-link>
              </span>
              <div v-if = "d.e">
                <div v-for = "e in d.e" :key="e">
                  <router-link class="big" v-for = "(r, idx) in p(e)" :to = "'/w/' + pre + r" :key = "r+idx" :disabled="dis(r)"  :event="!dis(r) ? 'click' : ''">{{ s(r) }}</router-link>
                </div>
              </div>
              <br/>
              <ol>
                <li v-for = "q in d.q" :key="q">
                  <router-link class="big" v-for = "(r, idx) in p(q)" :to = "'/w/' + pre + r" :key = "r+idx" :disabled="dis(r)"  :event="!dis(r) ? 'click' : ''">{{ s(r) }}</router-link>
                </li>
              </ol>
              <span class="antonyms" v-if = "d.a">
                <span class="type">反</span>
                  <router-link class="big" v-for = "(r, idx) in p(d.a)" :to = "'/w/' + pre + r" :key = "r+idx" :disabled="dis(r)"  :event="!dis(r) ? 'click' : ''">{{ s(r) }}</router-link>
              </span>
              <br/>
            </div>
        </div>
        <span class="antonyms" v-if = "data.English">
          <span class="type">英</span> {{data.English}}<br/>
        </span>
        <span class="antonyms" v-if = "data.Deutsch">
          <span class="type">德</span> {{data.Deutsch}}<br/>
        </span>
        <span class="antonyms" v-if = "data.francais">
          <span class="type">法</span> {{data.francais}}<br/>
        </span>
      </div>
    </div>
    <div v-else class = "no-print">
      對不起，找不到你要查詢的條目
    </div>
    <div class="print-only">
      <img :src = "'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://www.moedict.tw/' + pre + w + '&choe=UTF-8'" />
    </div>
  </div>
</template>

<script>
import { sify } from 'chinese-conv'
// eslint-disable-next-line

export default {
  name: 'PageIndex',
  data () {
    return {
      w2: '',
      moes: [],
      bs: [],
      data: null,
      playing: false,
      pre: '',
      title: '萌典',
      url: 'a',
      err: false,
      num: 0,
      progress: [],
      showDraw: false,
      idx: 0
    }
  },
  props: ['stars', 'si', 't', 'l', 'w'],
  mounted () {
    this.set()
    this.s1()
  },
  methods: {
    startDraw () {
      setInterval(this.draw, 1)
    },
    draw () {
      // console.log(this.progress)
      this.progress = this.progress.map((o) => { return parseInt(o) })
      this.progress[this.idx] += 25
      if (this.progress[this.idx] >= 10000) {
        this.idx++
      }
      if (this.idx === this.progress.length) {
        this.idx = 0
        this.progress = this.progress.map(() => { return 0 })
      }
    },
    bucketOf: function (it) {
      // console.log(it)
      var code
      if (/^[=@]/.exec(it)) {
        return it[0]
      }
      code = it.charCodeAt(0)
      if (code >= 0xD800 && code <= 0xDBFF) {
        code = it.charCodeAt(1) - 0xDC00
      }
      return code % (this.url === 'a' ? 1024 : 128)
    },
    fillBucket: function (id, bucket, cb) {
      var vm = this
      // 暫時使用 Quasar LocalStorage 替代 Vue LocalForage
      var d = this.$q.localStorage.getItem('p' + this.url + 'ck/' + bucket)
      if (d) {
        var key = escape(id)
        var part = d[key]
        // console.log(part)
        this.data = part
        // console.log(this.data)
        if (this.data) {
          this.bs = this.data.h.map((o) => { return o.b || '' })
        }
        this.playing = false
        // addToLru(id)
      } else {
        vm.$axios.get('p' + vm.url + 'ck/' + bucket + '.txt').then((response) => {
          // console.log(response.data)
          /* var raw = JSON.stringify(response.data)
          var key, idx, part
          key = escape(id)
          idx = raw.indexOf('"' + key + '"')
          if (idx === -1) {
            return
          }
          part = raw.slice(idx + key.length + 3)
          idx = part.indexOf('\n')
          part = part.slice(0, idx) */
          var key = escape(id)
          var part = response.data[key]
          // console.log(part)
          vm.data = part
          // console.log(this.data)
          if (vm.data) {
            vm.bs = vm.data.h.map((o) => { return o.b || '' })
          }
          vm.playing = false
          // addToLru(id)
        }).catch(err => {
          vm.err = true
          console.log(err)
        })
      }
    },
    closeD () {
      this.$emit('closeD')
    },
    s (t) {
      if (this.si) {
        return sify(t)
      } else {
        return t
      }
    },
    s1 (s) {
      var si = this.$q.localStorage.getItem('si')
      si = s
      if (!si) { si = false }
      // this.si = si
      this.$q.localStorage.set('si', si)
      this.$emit('updateSi')
    },
    set (k) {
      this.remember(this.w)
      this.pre = ''
      this.url = 'a'
      this.title = '萌典'
      this.w2 = this.w
      if (this.w.match(/^(~)/)) {
        this.pre = '~'
        this.url = 'c'
        this.title = '兩岸萌典'
        this.w2 = this.w.replace('~', '')
      }
      if (this.w.match(/^(')/)) {
        this.pre = '\''
        this.url = 't'
        this.title = '台灣閩南語'
        this.w2 = this.w.replace('\'', '')
      }
      if (this.w.match(/^(:)/)) {
        this.pre = ':'
        this.url = 'h'
        this.title = '台灣客家語'
        this.w2 = this.w.replace(':', '')
      }
      this.$q.localStorage.set('pre', this.pre)
      this.$q.localStorage.set('url', this.url)
      this.$emit('pre1', this.pre, this.url)
      /*
      this.$axios.get('https://www.moedict.tw/' + this.url + '/' + this.w + '.json')
        .then((response) => {
          this.err = false
          this.data = response.data
          // console.log(this.data)
          this.bs = this.data.h.map((o) => { return o.b || '' })
          this.playing = false
        }).catch(err => {
          this.err = true
          console.log(err)
        })
      this.$forceUpdate() */
      // console.log(this.w)
      // console.log(this.bucketOf(this.w))
      this.fillBucket(this.w2, this.bucketOf(this.w2))
      var vm = this
      console.log(this.w2)
      var list = vm.w2.split('')
      this.progress = list.map(() => { return 0 })
      this.idx = 0
      this.moes = []
    },
    remember (w) {
      console.log('remember:' + w)
      var arr = this.$q.localStorage.getItem('res')
      if (!arr) { arr = [] }
      arr = arr.filter((x) => { return x !== w })
      arr.unshift(w)
      this.$q.localStorage.set('res', arr)
      this.$emit('updateRes')
    },
    star (w) {
      var arr = this.$q.localStorage.getItem('words')
      if (!arr) { arr = [] }
      arr = arr.filter((x) => { return x !== w })
      arr.push(w)
      this.$q.localStorage.set('words', arr)
      this.$emit('updateStars')
    },
    unstar (w) {
      var arr = this.$q.localStorage.getItem('words')
      if (!arr) { arr = [] }
      arr = arr.filter((x) => { return x !== w })
      this.$q.localStorage.set('words', arr)
      this.$emit('updateStars')
    },
    yindiao (w, b, p, T) {
      var word = w
      var arr
      var ts = []
      var ps = []
      var ws
      if (b) {
        ws = ('' + w).split('')
        arr = ('' + b).split('　')
        ps = p.split(' ')
        if (T) {
          ts = T.split(' ')
        }
        if (ws.indexOf('，') > -1) {
          arr.splice(ws.indexOf('，'), 0, '')
          ps.splice(ws.indexOf('，'), 0, '&nbsp;&nbsp;&nbsp;&nbsp;')
          if (T) { ts.splice(ws.indexOf('，'), 0, '&nbsp;&nbsp;&nbsp;&nbsp;') }
        }
        // console.log(ps)
        return arr.map((k, idx) => {
          k = k.replace(/（.+）/g, '').replace('ㄧ', '─')
          var obj = {
            w: word[idx],
            yin: k.substr(0, k.length - 1),
            diao: k.substr(k.length - 1, k.length),
            pin: ps[idx],
            T: ts[idx]
          }
          if (obj.diao !== 'ˋ' && obj.diao !== 'ˊ' && obj.diao !== 'ˇ' && obj.diao !== 'ˊ') {
            obj.yin = obj.yin + obj.diao
            obj.diao = ''
          }
          return obj
        })
      } else {
        ws = ('' + w).split('')
        arr = ('' + b).split('　')
        if (T) {
          ts = T.split(' ')
        }
        if (p) {
          ps = p.replace('四⃞', '四')
            .replace('海⃞', '海')
            .replace('海⃞', '海')
            .replace('大⃞', '大')
            .replace('平⃞', '平')
            .replace('安⃞', '安')
            .replace('南⃞', '南').split(' ')
        }
        if (ws.indexOf('，') > -1) {
          arr.splice(ws.indexOf('，'), 0, '')
          ps.splice(ws.indexOf('，'), 0, '&nbsp;&nbsp;&nbsp;&nbsp;')
          if (T) { ts.splice(ws.indexOf('，'), 0, '&nbsp;&nbsp;') }
        }
        return w.split('').map((k, idx) => {
          k = k.replace(/（.+）/g, '').replace('ㄧ', '─')
          var obj = {
            w: word[idx],
            pin: (idx === 0 ? ps.join('') : ''),
            T: ts[idx]
          }
          return obj
        })
      }
    },
    dis (w) {
      return w.match(/(\s|⚋|⚊|☰|☱|☲|☳|☴|☵|☶|☷|灾|从|0|1|2|3|4|5|6|7|8|9|：|《|》|〈|〉|!|-|"￹|É|é|Ɨ|ɨ|Ṟ|ṟ|Ʉ|ʉ|’O͘|Ò͘|Ô͘|Ǒ͘|Ō͘|O̍͘|Ő͘|Ŏ͘|Á|Í|Ú|É|À|Ì|Ù|È|Â|Î|Û|Ê|Ǎ|Ǐ|Ǔ|Ě|Ā|Ī|Ū|Ē|A̍|I̍|U̍|E̍|A̋|I̋|Ű|Ă|Ĭ|Ŭ|Ĕ|Ḿ|Ń|M̀|Ǹ|M̂|N̂|M̌|Ň|M̄|N̄|M̍|N̍|M̋|N̋|M̆|N̆|á|í|ú|é|ó|ó͘|ḿ|ń|à|ì|ù|è|ò|ò͘|m̀|ǹ|â|î|û|ê|ô|ô͘|m̂|n̂|ǎ|ǐ|ǔ|ě|ǒ|ǒ͘|m̌|ň|ā|ī|ū|ē|ō|ō͘|m̄|n̄|a̍|i̍|u̍|e̍|o̍|o̍͘|m̍|n̍|a̋|i̋|ű|e̋|ő|ő͘|m̋|n̋|ă|ĭ|ŭ|ĕ|ŏ|ŏ͘|m̆|n̆|ⁿ|ˆ|ˇ|ˊ|ˋ|⁺|[a-z]|[A-Z]|．|、|。|；|「|」|『|』|（|）|\(|\)|，|,|`(.+?)~)/)
    },
    p (s) {
      var a = s
        .replace(/{\[8ebc\]}/g, '⚋')
        .replace(/{\[8ebd\]}/g, '⚊')
        .replace(/{\[8e79\]}/g, '☰')
        .replace(/{\[8e7b\]}/g, '☱')
        .replace(/{\[8e7c\]}/g, '☲')
        .replace(/{\[8e7e\]}/g, '☳')
        .replace(/{\[8e7d\]}/g, '☴')
        .replace(/{\[8ea1\]}/g, '☵')
        .replace(/{\[8ea2\]}/g, '☶')
        .replace(/{\[8e7a\]}/g, '☷')
        .replace(/{\[9264\]}/g, '灾')
        .replace(/{\[9064\]}/g, '从')
        .replace(/\s/g, '')
      var arr = [...a.matchAll(/(\s|⚋|⚊|☰|☱|☲|☳|☴|☵|☶|☷|灾|从|0|1|2|3|4|5|6|7|8|9|：|《|》|〈|〉|!|-|"￹|É|é|Ɨ|ɨ|Ṟ|ṟ|Ʉ|ʉ|’O͘|Ò͘|Ô͘|Ǒ͘|Ō͘|O̍͘|Ő͘|Ŏ͘|Á|Í|Ú|É|À|Ì|Ù|È|Â|Î|Û|Ê|Ǎ|Ǐ|Ǔ|Ě|Ā|Ī|Ū|Ē|A̍|I̍|U̍|E̍|A̋|I̋|Ű|Ă|Ĭ|Ŭ|Ĕ|Ḿ|Ń|M̀|Ǹ|M̂|N̂|M̌|Ň|M̄|N̄|M̍|N̍|M̋|N̋|M̆|N̆|á|í|ú|é|ó|ó͘|ḿ|ń|à|ì|ù|è|ò|ò͘|m̀|ǹ|â|î|û|ê|ô|ô͘|m̂|n̂|ǎ|ǐ|ǔ|ě|ǒ|ǒ͘|m̌|ň|ā|ī|ū|ē|ō|ō͘|m̄|n̄|a̍|i̍|u̍|e̍|o̍|o̍͘|m̍|n̍|a̋|i̋|ű|e̋|ő|ő͘|m̋|n̋|ă|ĭ|ŭ|ĕ|ŏ|ŏ͘|m̆|n̆|ⁿ|ˆ|ˇ|ˊ|ˋ|⁺|[a-z]|[A-Z]|．|、|。|；|「|」|『|』|（|）|\(|\)|，|,|`(.+?)~)/g)].map((o) => {
        const w = o.filter((k) => { return k })
        // console.log(w)
        return w[w.length - 1]
      })
      return arr
    }
  },
  watch: {
    w (to, from) {
      this.set()
    }
  }
}
</script>

<style type="text/css" scoped="">
  .box {
    z-index: 999999;
    width: 300px;
    height: 300px !important;
    position: fixed;
    background-color: #ddd;
    overflow: hidden !important;
    padding: 0 1em;
    border: 3px solid gray;
    border-radius: 5px;
    box-shadow: #d4d4d4 0 3px 3px;
  }

  .topper {
    margin-top: -1.5em;
  }

  #word {
    position: absolute;
    transform-origin: top left;
  }

  #word div {
    display: inline-block;
  }

  @media screen and (max-width: 600px) {
    #word {
      display: block;
    }
  }

  .word {
    padding: 0 1em;
  }

  h1 {
    font-size: 22px;
    display: inline;
    margin-right: .3em;
  }

  #b {
    position: relative;
    right: .5em;
    top: .9em;
    display: inline-block;
    font-size: 14px;
    width: 1em;
    height: 1em;
    overflow: visible;
  }

  .diao {
    position: relative;
  }

  a {
    cursor: pointer;
    text-decoration: none;
  }

  .r {
    text-decoration: none;
  }

  .r::after {
  }

  .yindiao {
    display: inline-flex;
    align-items: center;
    position: relative;
    top: -2.2em;
    color: gray;
  }

  .yin {
    line-height: 1em;
  }

  .red {
    margin-left: 1em;
  }

  .p {
    position: absolute;
    bottom: 2.2em;
    left: -2.5em;
    color: gray;
    width: 70vw;
    overflow: visible;
    height: 1em;
  }

  .p.hakka {
    font-size: .5em;
  }

  @media screen and (max-width: 600px) {
    .p {
       /* font-size: .5em; */
    }
  }

  .print {
    margin-left: 1em;
  }

  .antonyms {
    border-bottom: 6px solid #ccc;
  }

  .soc {
    width: 100%;
    text-align: right;
  }

  .soc .q-btn {
    margin: 0 1em;
  }

  .soc .q-icon {
    color: white;
  }

  .small {
  }

  .radical {
    color: black;
  }

  a, span {
    font-size: 14px;
  }
</style>
