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

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
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
      leftDrawerOpen: false
    }
  },
  mounted () {
    this.$axios.get('https://www.moedict.tw/c/' + this.w + '.json')
      .then((response) => {
        this.data = response.data
      })
  }
}
</script>
