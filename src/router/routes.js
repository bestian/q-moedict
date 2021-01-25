
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'w/', redirect: '/' },
      { path: 'w/:id', component: () => import('pages/Word.vue') },
      { path: 'about', component: () => import('pages/About.vue') },
      { path: 'list', redirect: 'list/成語' },
      { path: 'list/:id', component: () => import('pages/List.vue') },
      { path: 'head', redirect: 'head/@' },
      { path: 'head/:id', component: () => import('pages/Head.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
