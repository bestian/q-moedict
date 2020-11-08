<template>
  <q-page class="flex flex-center">
    <h1>
      <span v-for = "y in yindiao(w, b)" :key="y">
        {{ y.w }}
        <span id ="b">
          <span>
            <span class = "yin"> {{y.yin}} </span>
            <span class = "diao"> {{y.diao}} </span>
          </span>
        </span>
      </span>
    </h1>
    <div v-if = "data">
      <ol>
        <li v-for="(d, idx) in data.h[0].d" :key="idx">
          <router-link tag="a" class = "r" v-for="r in g(d.f)" :key="r.p" :to ="r.p">{{ r.t }}</router-link>

          <br/>
          例如：
          <br/>
          <span v-if="d.e">
            <span v-for = "k in parse(d.e[0])" :key="k">
              <router-link tag="a" class = "r" v-for="r in g(k)" :key="r.p" :to ="r.p">{{ r.t }}</router-link>
              <br/>
            </span>
          </span>
        </li>
      </ol>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      w: null,
      b: null,
      data: null
    }
  },
  mounted () {
    this.w = this.$route.params.id
    this.$axios.get('https://www.moedict.tw/c/' + this.w + '.json')
      .then((response) => {
        this.data = response.data
        this.b = this.data.h[0].b
      })
  },
  methods: {
    yindiao (w, b) {
      var word = w.split('')
      var arr = ('' + b).split('　')
      return arr.map((k, idx) => {
        return {
          w: word[idx],
          yin: k.substr(0, k.length - 1),
          diao: k.substr(k.length - 1, k.length)
        }
      })
    },
    g (f) {
      console.log(f)
      const regexp = /`(.+?)~/g
      const array = [...f.matchAll(regexp)]
      console.log(array)
      return array.map((t) => {
        return {
          p: '/w/' + t[1].replace(/`(.+?)~/g, '$1'),
          t: t[1].replace(/`(.+?)~/g, '$1')
        }
      })
    },
    parse (f) {
      console.log(f)
      const regexp = /「(.+?)」/g
      const array = [...f.matchAll(regexp)]
      console.log(array)
      return array.map((t) => {
        return t[1].replace(/「(.+?)」/g, '$1')
      })
    }
  },
  watch: {
    $route (to, from) {
      this.w = this.$route.params.id
      this.$axios.get('https://www.moedict.tw/c/' + this.w + '.json')
        .then((response) => {
          this.data = response.data
          this.b = this.data.h[0].b
        })
      this.$forceUpdate()
    }
  }
}
</script>

<style type="text/css" scoped="">
  h1 {
    font-size: 64px;
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
    left: .8em;
    top: -1.5em;
  }

  a {
    cursor: pointer;
  }

  .r {
    text-decoration: none;
  }

  .r::after {
  }

</style>
