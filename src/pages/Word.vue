<template>
  <q-page class="word" v-if="data">
    <div v-for = "(b, idx) in bs" :key = "idx">
      <span v-for = "y in yindiao(w, b)" :key="y.yin">
        <h1>{{ y.w }}</h1>
        <span id ="b">
          <span class="yindiao">
            <span class = "yin"> {{y.yin}} </span>
            <span class = "diao"> {{y.diao}} </span>
          </span>
        </span>
      </span>
      <span v-if = "data.radical">
        <span class="radical">{{ data.radical }}</span> + {{ data.non_radical_stroke_count }} = {{ data.stroke_count }}
      </span>
      <a class ="star" v-if = "stars.indexOf(w) == -1" @click = "star(w)">
        <q-icon name="star_outline" />
      </a>
      <a class ="star"  v-else @click="unstar(w)">
        <q-icon name="star" />
      </a>
      <div v-if = "data">
        <ol>
          <li v-for = "d in data.heteronyms[idx].definitions" :key = "d.def">
            <span v-if = "d.type">
              <span class="type">{{ d.type }}</span>：
            </span>
            <span class="def" v-if = "d.def">
              <router-link v-for = "(r, idx) in p(d.def).split('')" :to = "'/w/' + r" :key = "r+idx">{{ r }}</router-link>
            </span>
            <div v-if = "d.example">
              <div v-for = "e in d.example" :key="e">
                <router-link v-for = "(r, idx) in p(e).split('')" :to = "'/w/' + r" :key = "r+idx">{{ r }}</router-link>
              </div>
            </div>
            <br/>
            <ol>
              <li v-for = "q in d.quote" :key="q">
                <router-link v-for = "(r, idx) in p(q).split('')" :to = "'/w/' + r" :key = "r+idx">{{ r }}</router-link>
              </li>
            </ol>
            <span class="antonyms" v-if = "d.antonyms">
              <span class="type">反</span>
                <router-link v-for = "(r, idx) in d.antonyms.split('')" :to = "'/w/' + r" :key = "r+idx">{{ r }}</router-link>
            </span>
            <br/>
          </li>
        </ol>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      w: '',
      bs: [],
      data: null
    }
  },
  props: ['stars'],
  mounted () {
    this.w = this.$route.params.id
    this.$axios.get('https://www.moedict.tw/raw/' + this.w + '.json')
      .then((response) => {
        this.data = response.data
        console.log(this.data)
        this.bs = this.data.heteronyms.map((o) => { return o.bopomofo })
      })
  },
  methods: {
    star (w) {
      var arr = this.$q.localStorage.getItem('words')
      if (!arr) { arr = [] }
      arr = arr.filter((x) => { return x !== this.w })
      arr.push(w)
      this.$q.localStorage.set('words', arr)
      this.$emit('updateStars')
    },
    unstar (w) {
      var arr = this.$q.localStorage.getItem('words')
      if (!arr) { arr = [] }
      arr = arr.filter((x) => { return x !== this.w })
      this.$q.localStorage.set('words', arr)
      this.$emit('updateStars')
    },
    yindiao (w, b) {
      var word = w.split('')
      var arr = ('' + b).split(' ')
      return arr.map((k, idx) => {
        k = k.replace(/（.+）/g, '')
        var obj = {
          w: word[idx],
          yin: k.substr(0, k.length - 1),
          diao: k.substr(k.length - 1, k.length)
        }

        if (obj.diao !== 'ˋ' && obj.diao !== 'ˊ' && obj.diao !== 'ˇ' && obj.diao !== 'ˊ') {
          obj.yin = obj.yin + obj.diao
          obj.diao = ''
        }

        return obj
      })
    },
    p (s) {
      return s
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
    }
  },
  watch: {
    $route (to, from) {
      this.w = this.$route.params.id
      this.$axios.get('https://www.moedict.tw/raw/' + this.w + '.json')
        .then((response) => {
          this.data = response.data
          console.log(this.data)
          this.bs = this.data.heteronyms.map((o) => { return o.bopomofo })
        })
      this.$forceUpdate()
    }
  }
}
</script>

<style type="text/css" scoped="">

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
    line-height: 100%;
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

  .star {
    font-size: 24px;
    color: gold;
  }

  .yindiao {
    display: inline-flex;
    align-items: center;
    position: relative;
    top: -2.5em;
  }

  .yin {
    line-height: 1em;
  }

</style>
