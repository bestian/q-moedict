<template>
  <q-page class="flex flex-center">
    <h1>{{w}}
      <span id ="b">
        <span id ="yin"> {{yin}} </span>
        <span id ="diao"> {{diao}} </span>
      </span>
    </h1>
    <div v-if = "data">
      <ol>
        <li v-for="(d, idx) in data.h[0].d" :key="idx">
          <router-link class = "r" v-for="r in g(d.f)" :key="r.p" :to ="r.p">{{ r.t }}</router-link>
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
      w: '萌',
      yin: null,
      diao: null,
      data: null
    }
  },
  mounted () {
    this.w = this.$route.params.id
    this.$axios.get('https://www.moedict.tw/c/' + this.$route.params.id + '.json')
      .then((response) => {
        this.data = response.data
        this.yin = this.data.h[0].b.substr(0, this.data.h[0].b.length - 1)
        this.diao = this.data.h[0].b.substr(this.data.h[0].b.length - 1, this.data.h[0].b.length)
      })
  },
  methods: {
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
    }
  }
}
</script>

<style type="text/css" scoped="">
  #b {
    position: relative;
    display: inline-block;
    font-size: 24px;
    line-height: 100%;
    width: 1em;
    height: 3em;
    overflow: visible;
  }

  #diao {
    position: absolute;
    right: 0;
    top: 0.8em;
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
