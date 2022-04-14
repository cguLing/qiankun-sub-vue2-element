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
          hideInMenu: true,
          layout: true,
          title: '首页'
        },
        component: '/home/index.vue'
      },
      {
        path: '/dept',
        name: 'dept',
        meta: {
          hideInMenu: false,
          icon: 'tree-table',
          title: '部门管理'
        },
        component: '/dept/index.vue'
      }
    ]
  },
  {
    path: '/project',
    meta: {
      layout: true,
    },
    component: 'Main',
    children: [
      {
        path: '/project',
        name: 'project',
        meta: {
          icon: 'tree-table',
          title: '项目组'
        },
        component: '/project/index.vue'
      }
    ]
  },
  {
    path: '/myConnect',
    name: 'myConnect',
    meta: {
      icon: 'tree-table',
      title: '我的服务'
    },
    component: 'Main',
    children: [
      {
        path: '/myConnect/IDC',
        name: 'myConnect_IDC',
        meta: {
          icon: 'tree-table',
          title: '服务1'
        },
        component: '/service/index.vue'
      },
      {
        path: '/myConnect/IT',
        name: 'myConnect_IT',
        meta: {
          icon: 'tree-table',
          title: '服务2'
        },
        component: '/service/index.vue'
      }
    ]
  },
  {
    path: 'https://www.baidu.com/',
    name: 'doc',
    meta: {
      icon: 'tree-table',
      title: '操作文档',
      target: 'link'
    }
  },
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