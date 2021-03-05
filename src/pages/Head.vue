<template>
  <q-page class="word" padding>
    <h3> {{w}}部<span v-if="!w || w == '@'">首表</span></h3>
    <div class="no-print">
      <input type="search" name="myKey" v-model="myKey" placeholder="關鍵字篩選" />
    </div>
    <q-list class="no-print">
      <q-item class="l" v-for = "(l, idx) in has(list, myKey)" :key = "idx" v-show = "l && l.length > 0">
        <b v-if = "!myKey">{{idx}}畫：</b>
        <span class="inner" v-if="!w || w == '@'">
          <router-link v-for = "item in l" :key="item" :to = "'/head/'+item">{{ item }} </router-link>
        </span>
        <span v-else class="inner">
          <router-link v-for = "item in l" :key="item" :to = "'/w/'+ item">{{ item }}</router-link>
        </span>
      </q-item>
    </q-list>
     <div class="print-only">
      <img :src = "'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://bestian.github.io/q-moedict/%23/head/' + w + '&choe=UTF-8'" />
    </div>
  </q-page>
</template>

<script>
import { sify } from 'chinese-conv'

export default {
  name: 'Head',
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
      this.w = this.$route.params.id || ''
      if (this.w === '@') { this.w = '' }
      // console.log(this.w)
      this.$axios.get('@' + this.w + '.json')
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
      // console.log(JSON.stringify(data))
      if (!k) {
        return data
      }
      return data.filter((o) => { return JSON.stringify(o).indexOf(k) > -1 })
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

h3 {
  margin: .1em;
}

input {
  margin: 0 3em;
}

a {
  text-decoration: none;
  margin: 0 .1em;
}

b {
  position: absolute;
  width: 5em;
  float: left;
}

.inner {
  margin-left: 5em;
}

.l {
  width: 70vw;
  overflow-x: scroll;
}
</style>
