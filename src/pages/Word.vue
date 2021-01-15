<template>
  <q-page class="word">
    <div v-if="!err">
      <div v-for = "(b, idx) in bs" :key = "idx">
        <span v-for = "(y, i) in yindiao(w, bs[idx], data.h[idx].p, data.h[idx].T)" :key="i">
          <h1>{{ y.w }}</h1>
          <span id ="b">
            <span class="yindiao">
              <span class = "yin"> {{y.yin}} </span>
              <span class = "diao"> {{y.diao}} </span>
            </span>
            <span class = "p" v-show = "idx == 0 || pre !== ':'" :class="{ hakka: pre == ':'}" v-html = "y.pin"></span>
            <span class = "p" :class="{ hakka: pre == ':'}" v-show = "idx == 0 || pre !== ':'" > {{y.T}}</span>
          </span>
        </span>

        <audio id="au" v-if = "data.h[idx]['=']">
          <source :src="'https://203146b5091e8f0aafda-15d41c68795720c6e932125f5ace0c70.ssl.cf1.rackcdn.com/' + data.h[idx]['='] + '.mp3'" type="audio/mp3"/>
          <source :src="'https://203146b5091e8f0aafda-15d41c68795720c6e932125f5ace0c70.ssl.cf1.rackcdn.com/' + data.h[idx]['='] + '.ogg'" type="audio/mp3"/>
        </audio>

        <a name ="play" class = "no-print" id = "play" @click = "play()" v-if = "data.h[idx]['=']">
          <q-icon name="play_arrow" v-if="!playing"/>
          <q-icon name="pause" v-else/>
        </a>
        <span v-if = "data.r">
          <span class="radical">{{ p(data.r)[0] }}</span> + {{ data.n }} = {{ data.c }}
        </span>
        <a name = "star" class ="star" v-if = "stars.indexOf(pre + w) == -1" @click = "star(pre + w)">
          <q-icon name="star_outline" />
        </a>
        <a name = "unstar"  class ="star"  v-else @click="unstar(pre + w)">
          <q-icon name="star" />
        </a>
        <a name = "print" class="print no-print" @click = "closeD()" onclick="setTimeout(() => {window.print()}, 500)">
          <q-icon name="print" />
        </a>
        <a name = "showDraw" class="red no-print" @click = "showDraw = !showDraw; idx=0; progress=progress.map(()=> { return 0})" :title="s('筆順')">
          <q-icon name="edit" />
        </a>
        <span id="word" v-show="showDraw" :style="{width: w.split('').length * 100 + 'vmax', transform: 'scale(' + 0.8 / w.split('').length + ')'}">
          <word v-for = "(m,idx) in moes" :key="idx" :data="m" :progress="progress[idx]" ></word>
        </span>
        <!--
        <a class="si no-print" v-if = "!si" @click="s1(true)">
          簡
        </a>
        <a class="ti no-print" v-else @click="s1(false)">
          正
        </a> -->
        <div class="thin-only divider" v-show="showDraw" :style="{margin: 20 / w.split('').length + 'em'} "></div>
        <div v-if = "data">
          <ol>
            <li v-for = "d in data.h[idx].d" :key = "d.f">
              <span v-if = "d.type">
                <span class="type">{{ s(p(d.type)[0]) }}</span>：
              </span>
              <span class="def" v-if = "d.f">
                <router-link v-for = "(r, idx) in p(d.f)" :to = "'/w/' + pre + r" :key = "r+idx" :disabled="dis(r)" :event="!dis(r) ? 'click' : ''">{{ s(r) }}</router-link>
              </span>
              <div v-if = "d.e">
                <div v-for = "e in d.e" :key="e">
                  <router-link v-for = "(r, idx) in p(e)" :to = "'/w/' + pre + r" :key = "r+idx" :disabled="dis(r)"  :event="!dis(r) ? 'click' : ''">{{ s(r) }}</router-link>
                </div>
              </div>
              <br/>
              <ol>
                <li v-for = "q in d.q" :key="q">
                  <router-link v-for = "(r, idx) in p(q)" :to = "'/w/' + pre + r" :key = "r+idx" :disabled="dis(r)"  :event="!dis(r) ? 'click' : ''">{{ s(r) }}</router-link>
                </li>
              </ol>
              <span class="antonyms" v-if = "d.a">
                <span class="type">反</span>
                  <router-link v-for = "(r, idx) in p(d.a)" :to = "'/w/' + pre + r" :key = "r+idx" :disabled="dis(r)"  :event="!dis(r) ? 'click' : ''">{{ s(r) }}</router-link>
              </span>
              <br/>
            </li>
          </ol>
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
    <br/>
    <div class = "soc no-print">
      <q-btn size="xs" color = "primary" class="facebook"  aria-label="facebook">
        <a name = "facebook" :href="'https://www.facebook.com/sharer/sharer.php?u=https://bestian.github.io/q-moedict/#/w/' + pre + w" target="_blank" rel="noreferrer noopener">
          <q-icon name = "fas fa-share-square" />
          <q-icon name = "fab fa-facebook-f" />
          Facebook
        </a>
      </q-btn>
      <q-btn size="xs" color = "secondary" class="twitter"  aria-label="twitter">
        <a name = "twitter" :href="'https://twitter.com/share?text=' + w + '&url=https://bestian.github.io/q-moedict/#/w/' + pre + w" target="_blank" rel="noreferrer noopener">
          <q-icon name = "fas fa-share-square" />
          <q-icon name = "fab fa-twitter" />
          Twitter
        </a>
      </q-btn>
    </div>
  </q-page>
</template>

<script>
import { sify } from 'chinese-conv'
// eslint-disable-next-line
import { data, Word } from 'react-zh-stroker'

// console.log(data)
// console.log(Word)

export default {
  name: 'PageIndex',
  // components: { Word },
  components: { Word },
  data () {
    return {
      moes: [],
      w: '',
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
  props: ['stars', 'si'],
  meta () {
    return {
      // this accesses the "title" property in your Vue "data";
      // whenever "title" prop changes, your meta will automatically update
      title: this.w + ' - ' + this.title
    }
  },
  mounted () {
    this.set()
    this.s1()
    this.storeAll()
    setTimeout(this.startDraw, 1000)
  },
  methods: {
    startDraw () {
      setInterval(this.draw, 1)
    },
    draw () {
      console.log(this.progress)
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
      console.log(it)
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
    storeAll: function () {
      var vm = this
      this.$getItem('p' + this.url + 'ck/' + vm.num).then((d) => {
        console.log(d)
        if (!d) {
          vm.$axios.get('p' + vm.url + 'ck/' + vm.num + '.txt').then((response) => {
            vm.$setItem('p' + vm.url + 'ck/' + vm.num, response.data, function (d) {
              console.log(response.data)
              vm.num += 1
              vm.storeAll()
            })
          })
        } else {
          vm.num += 1
          vm.storeAll()
        }
      })
    },
    fillBucket: function (id, bucket, cb) {
      var vm = this
      this.$getItem('p' + this.url + 'ck/' + bucket).then((d) => {
        console.log(d)
        if (d) {
          var key = escape(id)
          var part = d[key]
          console.log(part)
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
            console.log(part)
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
      })
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
      this.w = k || this.$route.params.id
      this.pre = ''
      this.url = 'a'
      this.title = '萌典'
      if (this.w.match(/^(~)/)) {
        this.pre = '~'
        this.url = 'c'
        this.title = '兩岸萌典'
        this.w = this.w.replace('~', '')
      }
      if (this.w.match(/^(')/)) {
        this.pre = '\''
        this.url = 't'
        this.title = '台灣閩南語'
        this.w = this.w.replace('\'', '')
      }
      if (this.w.match(/^(:)/)) {
        this.pre = ':'
        this.url = 'h'
        this.title = '台灣閩南語'
        this.w = this.w.replace(':', '')
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
      this.fillBucket(this.w, this.bucketOf(this.w))
      var vm = this
      console.log(this.w)
      var list = vm.w.split('')
      this.progress = list.map(() => { return 0 })
      this.idx = 0
      this.moes = []
      for (var i = 0; i < list.length; i++) {
        var code = list[i].charCodeAt(0).toString(16)
        this.$axios.get('./json/' + code + '.json').then((response) => {
          console.log(response.data)
          this.moes.push(data.computeLength(response.data))
        })
      }
    },
    play () {
      if (!this.playing) {
        document.getElementById('au').load()
        document.getElementById('au').play()
        this.playing = true
      } else {
        document.getElementById('au').pause()
        this.playing = false
      }
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
        console.log(ps)
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
          if (T) { ts.splice(ws.indexOf('，'), 0, '&nbsp;&nbsp;&nbsp;&nbsp;') }
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
    $route (to, from) {
      console.log('w')
      this.set()
    }
  }
}
</script>

<style type="text/css" scoped="">

  .divider {
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
    font-size: 64px;
    display: inline;
    margin-right: .3em;
  }

  #b {
    position: relative;
    right: .5em;
    top: .9em;
    display: inline-block;
    font-size: 24px;
    width: 1em;
    height: 4em;
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

  .type, .radical {
    background-color: rgb(225,100,100);
    border-radius: 2px;
    margin-right: .2em;
    padding: 0 .1em;
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

  #play {
    color: #c33;
    margin-right: 1em;
    font-size: 40px;
  }

  .red {
    color: #c33;
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
</style>
