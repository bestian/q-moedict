<template>
  <q-page class="word" padding flex flex-center>
    
  </q-page>
</template>

<script>
import { sify } from 'chinese-conv'

export default {
  name: 'About',
  data () {
    return {
      title: '萌典',
      si: false
    }
  },
  props: ['stars'],
  meta () {
    return {
      title: '關於本站 - ' + this.title
    }
  },
  mounted () {
  },
  methods: {
    s (t) {
      if (this.si) {
        return sify(t)
      } else {
        return t
      }
    }
  }
}
</script>

<style type="text/css" scoped="">

a {
  text-decoration: none;
}
</style>
