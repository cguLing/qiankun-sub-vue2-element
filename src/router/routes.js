const routes =  [
  {
    path: '/',
    name: '/',
    redirect: '/home',
    meta: {
      layout: true,
    },
    component: 'Main',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          // hideInMenu: true,
          // layout: true,
          icon: 'example',
          title: '域名注册'
        },
        component: '/home/index.vue'
      },
    ]
  },
  {
    path: '/my_dns',
    meta: {
      layout: true,
    },
    component: 'Main',
    children: [{
      path: '/my_dns',
      name: 'my_dns',
      meta: {
        icon: 'dict',
        title: '我的域名'
      },
      component: '/my_dns/index.vue'
    }]
  },
  {
    path: '/root_domain',
    meta: {
      layout: true,
    },
    component: 'Main',
    children: [
      {
        path: '/root_domain',
        name: 'root_domain',
        meta: {
          icon: 'tree-table',
          title: '根域名管理'
        },
        component: '/root_domain/index.vue'
      }
    ]
  },
  {
    path: '/tool',
    name: 'tool',
    meta: {
      icon: 'chart',
      title: '常用工具'
    },
    component: 'Main',
    children: [
      {
        path: '/tool/search_record',
        name: 'search_record',
        meta: {
          icon: 'cmdb-search',
          title: '记录查询'
        },
        component: '/tool/search_record/index.vue'
      },
      // {
      //   path: '/myConnect/IT',
      //   name: 'myConnect_IT',
      //   meta: {
      //     icon: 'tree-table',
      //     title: '服务2'
      //   },
      //   component: '/service/index.vue'
      // }
    ]
  },
  // {
  //   path: 'https://www.baidu.com/',
  //   name: 'doc',
  //   meta: {
  //     icon: 'tree-table',
  //     title: '操作文档',
  //     target: 'link'
  //   }
  // },
  {
    path: '/404',
    meta: {
      layout: true,
      hideInMenu: true,
    },
    component: '/error/404/index.vue'
  },
  {
    path: '*',
    name: '*',
    redirect: '/404',
    meta: {
      layout: true,
      hideInMenu: true,
    }
  }
]
export default routes