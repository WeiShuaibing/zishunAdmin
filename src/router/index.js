import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  /* {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },*/

  /** When your routing table is too long, you can split it into small modules**/
  // componentsRouter,
  // chartsRouter,
  // tableRouter,

  {
    path: '/case',
    component: Layout,
    redirect: '/case/Caselist',
    name: 'case',
    meta: {
      title: '案例展示',
      icon: 'example'
    },
    children: [
      {
        path: 'caselist',
        component: () => import('@/views/case/caselist'), // Parent router-view
        name: 'caselist',
        meta: { title: '案例列表' }
      },
      {
        path: 'addcase',
        component: () => import('@/views/case/addcase'),
        meta: { title: '添加案例' }
      }
    ]
  },
  {
    path: '/realscene',
    component: Layout,
    redirect: '/realscene/scenelist',
    name: 'realscene',
    meta: {
      title: '实景展示',
      icon: 'international'
    },
    children: [
      {
        path: 'scenelist',
        component: () => import('@/views/realscene/scenelist'), // Parent router-view
        name: 'scenelist',
        meta: { title: '实景列表' }
      },
      {
        path: 'addscene',
        component: () => import('@/views/realscene/addscene'),
        meta: { title: '添加实景' }
      }
    ]
  },
  {
    path: '/customize',
    component: Layout,
    redirect: '/customize/Customizelist',
    name: 'customize',
    meta: {
      title: '全屋定制',
      icon: 'drag'
    },
    children: [
      {
        path: 'Customizelist',
        component: () => import('@/views/customize/Customizelist'), // Parent router-view
        name: 'Customizelist',
        meta: { title: '实景列表' }
      },
      {
        path: 'addcustomize',
        component: () => import('@/views/customize/addcustomize'),
        meta: { title: '添加实景' }
      }
    ]
  },
  // {
  //   path: '/case',
  //   component: Layout,
  //   redirect: '/case/index',
  //   name: 'Case',
  //   meta: {
  //     title: '案例展示',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: 'edit',
  //       component: () => import('@/views/case/edit'),
  //       name: 'EditArticle',
  //       meta: { title: '编辑案例', noCache: true },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/case/list'),
  //       name: 'ArticleList',
  //       meta: { title: '案例列表', icon: 'list' }
  //     }
  //   ]
  // },

  {
    path: '/error',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
