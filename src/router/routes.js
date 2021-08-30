const routes = [
  {
    path:'/',
    component: () => import('layouts/BaseMainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Dashboard.vue')},
      {path: '/master/location', component: () => import('pages/master/MasterLocation.vue')},
    ]
  },
  {
    path: '/template',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Dashboard.vue')},
      {path: '/Dashboard2', component: () => import('pages/Dashboard2.vue')},
      {path: '/Profile', component: () => import('pages/UserProfile.vue')},
      {path: '/MapLeaflet', component: () => import('pages/MapLeaflet.vue')},
      {path: '/Map', component: () => import('pages/Map.vue')},
      {path: '/MapMarker', component: () => import('pages/MapMarker.vue')},
      {path: '/StreetView', component: () => import('pages/StreetView.vue')},
      {path: '/TreeTable', component: () => import('pages/TreeTable.vue')},
      {path: '/Charts', component: () => import('pages/Charts.vue')},
      {path: '/Cards', component: () => import('pages/Cards.vue')},
      {path: '/Tables', component: () => import('pages/Tables.vue')},
      {path: '/Contact', component: () => import('pages/Contact.vue')},
      {path: '/Checkout', component: () => import('pages/Checkout.vue')},
      {path: '/Calendar', component: () => import('pages/Calendar.vue')},
      {path: '/Pagination', component: () => import('pages/Pagination.vue')},
      {path: '/Taskboard', component: () => import('pages/TaskBoard.vue')},
      {path: '/Ecommerce', component: () => import('pages/ProductCatalogues.vue')},
    ]
  },
  {
    path: '/login',
    component: () => import('pages/standalone/Login.vue')
  },
  {
    path: '/template-lock',
    component: () => import('pages/LockScreen.vue')
  },
  {
    path: '/template-maintenance',
    component: () => import('pages/Maintenance.vue')
  },
  {
    path: '/template-pricing',
    component: () => import('pages/Pricing.vue')
  },
  {
    path: '/template-login-1',
    component: () => import('pages/Login-1.vue')
  },
  {
    path: '/template-mail',
    component: () => import('layouts/Mail.vue')
  },
  {
    path: '/template-lock-2',
    component: () => import('pages/LockScreen-2.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
