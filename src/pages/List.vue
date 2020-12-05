<template>
  <q-page class="word" padding>
    <div>
      <input type="search" name="myKey" v-model="myKey" placeholder="關鍵字篩選" />
    </div>
    <ul>
      <li v-for = "(item, idx) in has(list, myKey)" :key = "idx">
        <router-link :to = "'/w/'+ item">{{ item }}</router-link>
      </li>
    </ul>
     <div class="print-only">
      <img :src = "'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://bestian.github.io/q-moedict/#/list/' + w + '&choe=UTF-8'" />
    </div>
  </q-page>
</template>

<script>
import { sify } from 'chinese-conv'

export default {
  name: 'List',
  data () {
    return {
      myKey: '',
      title: '萌典',
      si: false,
      list: [],
      w: ''
    }
  },
  props: ['stars'],
  meta () {
    return {
      // this accesses the "title" property in your Vue "data";
      // whenever "title" prop changes, your meta will automatically update
      title: this.w + ' - ' + this.title
    }
  },
  mounted () {
    this.set()
  },
  methods: {
    set () {
      this.w = this.$route.params.id || '成語'
      console.log(this.w)
      this.$axios.get('=' + this.w + '.json')
        .then((response) => {
          this.err = false
          this.list = response.data
        }).catch(err => {
          this.err = true
          console.log(err)
        })
    },
    s (t) {
      if (this.si) {
        return sify(t)
      } else {
        return t
      }
    },
    has (data, k) {
      // console.log(data)
      // if (!k) {
      //   return []
      // }
      return data.filter((x) => { return x.indexOf(k) > -1 })
    }
  },
  watch: {
    $route (to, from) {
      this.set()
    }
  }
}
</script>

<style type="text/css" scoped="">

input {
  margin: 0 3em;
}

a {
  text-decoration: none;
}
</style>
