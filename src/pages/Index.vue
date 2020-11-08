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
          {{d.f}}
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
    this.w = '萌'
    this.$axios.get('https://www.moedict.tw/c/' + this.w + '.json')
      .then((response) => {
        this.data = response.data
        this.yin = this.data.h[0].b.substr(0, this.data.h[0].b.length - 1)
        this.diao = this.data.h[0].b.substr(this.data.h[0].b.length - 1, this.data.h[0].b.length)
      })
  },
  methods: {
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

</style>
