<template>
  <q-page class="flex flex-center">
    <input type="search" v-model = "myKey" list = "words"/>
    <!-- <datalist id="words">
      <option v-for="d in data" :key="d" :value="d"/>
    </datalist> -->
    <div>
        {{ myKey }}
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      myKey: '',
      data: []
    }
  },
  mounted () {
    this.$axios.get('https://www.moedict.tw/c/index.json')
      .then((response) => {
        this.data = response.data
      })
  }
}
</script>
