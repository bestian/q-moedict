<template>
  <q-page class="flex flex-center">
    <h1>{{w}}</h1>
    <div>{{ data }}</div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      w: null,
      data: {}
    }
  },
  mounted () {
    this.w = '萌'
    this.$axios.get('https://www.moedict.tw/c/' + this.w + '.json')
      .then((response) => {
        this.data = response.data
      })
  }
}
</script>
