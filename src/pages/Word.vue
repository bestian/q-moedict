<template>
  <q-page class="flex flex-center">
    <h1>{{w}}</h1>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      w: null
    }
  },
  mounted () {
    this.w = this.$route.params.id
    this.$axios.get('https://www.moedict.tw/c/' + this.w + '.json')
      .then((response) => {
        this.data = response.data
      })
  }
}
</script>
