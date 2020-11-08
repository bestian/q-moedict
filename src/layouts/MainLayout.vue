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
          萌典
          <input type="search" name="s" v-model="myKey" />
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
        <q-item clickable v-for = "k in has(data, myKey).slice(0, n)" :to = "'/w/' + k" :key="k">
          {{k}}
        </q-item>
      </q-list>
    </q-infinite-scroll>
    </q-drawer>

    <q-page-container>
      <router-view />
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
      leftDrawerOpen: false,
      n: 50
    }
  },
  methods: {
    onLoad () {
      this.n += 50
    },
    has (data, k) {
      return data.filter((x) => { return x.indexOf(k) > -1 })
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
