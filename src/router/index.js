import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
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
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
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
  {
    path: '/adManager',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/Admanager/AdManager'),
        name: 'adManager',
        meta: { title: '广告位配置', icon: 'table', noCache: true, roles: ['admin'] }
      }
    ]
  },
  {
    path: '/merchants',
    component: Layout,
    redirect: '/merchants/merchantsAudit',
    name: 'merchants',
    meta: {
      title: '商户入驻管理',
      icon: 'table'
    },
    children: [
      {
        path: 'merchantsAudit',
        component: () => import('@/views/merchants/merchantsAudit.vue'),
        name: 'merchantsAudit',
        meta: { title: '审核', icon: '', noCache: true, roles: ['admin']  }
      },
      {
        path: 'merchantsAmg',
        component: () => import('@/views/merchants/merchants.vue'),
        name: 'merchantsAmg',
        meta: { title: '管理', icon: '', noCache: true, roles: ['admin']  }
      }
    ]
  },
  {
    path: '/merchantsService',
    component: Layout,
    redirect: '/merchantsService/serviceList',
    name: 'merchantsService',
    meta: {
      title: '商户服务列表',
      icon: 'table'
    },
    children: [
      {
        path: 'serviceList',
        component: () => import('@/views/merchants/serviceList.vue'),
        name: 'serviceList',
        meta: { title: '商户服务列表', icon: '', noCache: true, roles: ['admin']  }
      },
    ]
  },
  {
    path: '/homePageSetting',
    component: Layout,
    redirect: '/homePageSetting/bannerSetting',
    name: 'homePageSetting',
    meta: {
      title: '首页功能配置',
      icon: 'table'
    },
    children: [
      {
        path: 'tagSetting',
        component: () => import('@/views/homePageSetting/tagSetting'),
        name: 'tagSetting',
        meta: { title: '系统标签功能配置', icon: '', noCache: true, roles: ['admin']  }
      },
      // {
      //   path: 'citySetting',
      //   component: () => import('@/views/homePageSetting/hotCitySetting'),
      //   name: 'citySetting',
      //   meta: { title: '热门城市功能配置', icon: '', noCache: true, roles: ['admin']  }
      // }
    ]
  },
  {
    path: '/landPage',
    component: Layout,
    redirect: '/landPage/landPageSetting',
    name: 'landPage',
    meta: {
      title: '推广落地页',
      icon: 'table'
    },
    children: [
      {
        path: 'landPageSetting',
        component: () => import('@/views/landPage/pageList'),
        name: 'landPageSetting',
        meta: { title: '落地页配置', icon: '', noCache: true, roles: ['admin']  }
      },
      {
        path: 'createLandPage',
        component: () => import('@/views/landPage/createPage'),
        name: 'createLandPage',
        meta: { title: '新增落地页', icon: '', noCache: true, roles: ['admin'], path: '/landPage/landPageSetting'  },
        hidden: true
      },
      {
        path: 'editLandPage',
        component: () => import('@/views/landPage/editPage'),
        name: 'editLandPage',
        meta: { title: '编辑落地页', icon: '',  hidden: true, noCache: true, roles: ['admin'], path: '/landPage/landPageSetting'  },
        hidden: true
      }
    ]
  },
  {
    path: '/intentionList',
    component: Layout,
    redirect: '/intentionList/index',
    name: 'intentionList',
    meta: {
      title: '意向收集管理',
      icon: 'table'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/landPage/intentionList'),
        name: 'intentionIndex',
        meta: { title: '意向收集列表', icon: '', noCache: true, roles: ['admin']  }
      }
    ]
  },
  // {
  //   path: '/hotWords',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/hotWordsSetting/hotWordsSetting'),
  //       name: 'hotWords',
  //       meta: { title: '热门词条管理', icon: 'table', noCache: true, roles: ['admin'] }
  //     }
  //   ]
  // },
  // {
  //   path: '/BusinessInforMt',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/BusinessInforMt/BusinessInforMt'),
  //       name: 'BusinessInforMt',
  //       meta: { title: '企业信息维护', icon: 'table', noCache: true, roles: ['admin'] }
  //     }
  //   ]
  // },
  {
    path: '/levelOne',
    component: Layout,
    redirect: '/serviceCategory/levelOne',
    name: 'levelOne',
    meta: {
      title: '业务管理',
      icon: 'table'
    },
    children: [
      {
        path: 'levelOne',
        component: () => import('@/views/serviceCategory/levelOne'),
        name: 'levelOne',
        meta: { title: '一级业务管理', icon: '', noCache: true, roles: ['admin']  }
      },
      {
        path: 'levelTwo',
        component: () => import('@/views/serviceCategory/levelTwo'),
        name: 'levelTwo',
        meta: { title: '二级业务管理', icon: '', noCache: true, roles: ['admin']  }
      },
      {
        path: 'levelThree',
        component: () => import('@/views/serviceCategory/levelThree'),
        name: 'levelThree',
        meta: { title: '三级业务管理', icon: '', noCache: true, roles: ['admin']  }
      }
    ]
  },
  {
    path: '/newBusiness',
    component: Layout,
    redirect: '/newBusiness/newBusiness',
    name: 'newBusiness',
    meta: {
      title: '新业务申请',
      icon: 'table'
    },
    children: [
      {
        path: 'newBusiness',
        component: () => import('@/views/newBusiness/newBusiness'),
        name: 'newBusiness',
        meta: { title: '新业务申请', icon: '', noCache: true, roles: ['admin']  }
      }
    ]
  },
  {
    path: '/mainBusiness',
    component: Layout,
    redirect: '/mainBusiness/mainBusiness',
    name: 'mainBusiness',
    hidden: true,
    meta: {
      title: '商户主营业务管理',
      icon: 'table'
    },
    children: [
      {
        path: 'mainBusiness',
        component: () => import('@/views/mainBusiness/mainBusiness'),
        name: 'mainBusiness',
        meta: { title: '商户主营业务管理', icon: '', noCache: true, roles: ['admin']  }
      }
    ]
  },
  {
    path: '/manually',
    component: Layout,
    redirect: '/manually/manually',
    name: 'manually',
    meta: {
      title: '人工录入企业',
      icon: 'table'
    },
    children: [
      {
        path: 'manually',
        component: () => import('@/views/manually/manually'),
        name: 'manually',
        meta: { title: '已收录列表', icon: '', noCache: true, roles: ['admin']  }
      },
      {
        path: 'createManually',
        component: () => import('@/views/manually/createManually'),
        name: 'createManually',
        meta: { title: '添加(编辑)入录企业', icon: '', noCache: true, roles: ['admin']  }
      }
    ]
  },
  {
    path: '/salesManager',
    component: Layout,
    redirect: '/salesManager/index',
    name: 'salesManager',
    meta: { title: '销售推广邀请链接管理', icon: 'table' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/salesManager/index'),
        name: 'index',
        meta: { title: '销售推广邀请管理', icon: '', noCache: true, roles: ['admin']  }
      }
    ]
  },
  {
    path: '/appUpdate',
    component: Layout,
    redirect: '/appUpdate/iosUpdate',
    name: 'appUpdate',
    meta: {
      title: 'App升级配置',
      icon: 'table'
    },
    children: [
      {
        path: 'iosUpdate',
        component: () => import('@/views/appUpdate/iosUpdate'),
        name: 'ios',
        meta: { title: 'ios升级配置', icon: '', noCache: true, roles: ['admin']  }
      },
      {
        path: 'andriodUpdate',
        component: () => import('@/views/appUpdate/andriodUpdate'),
        name: 'android',
        meta: { title: 'android升级配置', icon: '', noCache: true, roles: ['admin']  }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
