<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <input id="s" type="search" name="s" v-model="myKey" list="words" placeholder="輸入字詞" @keydown.enter="$router.push('/w/' + myKey)"/>
          <datalist id ="words">
            <option v-for = "d in has(data, myKey).slice(0,n)" :key="d" :value="d"></option>
            }
          </datalist>
          <button @click="$router.push('/w/' + myKey)">查詢</button>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
    <q-infinite-scroll @load="onLoad" :offset="250"
      :scroll-target="$refs.scrollTargetRef">
      <q-list bordered>
        <q-item>
          <b>已加星號</b>
        </q-item>
        <q-item clickable v-for = "k in stars" :to = "'/w/' + k" :key="k">
          {{k}}
        </q-item>
      </q-list>
    </q-infinite-scroll>
    </q-drawer>

    <q-page-container>
      <router-view @updateStars = "updateStars()" :stars="stars"/>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      myKey: '',
      data: [],
      stars: [],
      leftDrawerOpen: false,
      n: 100
    }
  },
  methods: {
    onLoad () {
      this.n += 50
    },
    has (data, k) {
      // console.log(data)
      return data.filter((x) => { return x.indexOf(k) > -1 })
    },
    updateStars () {
      this.stars = this.$q.localStorage.getItem('words') || []
    }
  },
  mounted () {
    this.$axios.get('https://www.moedict.tw/a/index.json')
      .then((response) => {
        this.data = response.data
      })
    this.stars = this.$q.localStorage.getItem('words') || []
  }
}
</script>

<style type="text/css">
  #s {
    width: 140px !important;
  }
</style>
