const searchParams = {
  state: {
    // 落地页页面搜索参数管理
    landPageQuery: {
      pageSize: 10,
      pageNum: 1,
      packageName: '',
      clientType: '',
      advertisingChannel: '',
      channelRemark: '',
    },
    // 商户信息配置页面搜索参数管理
    merchantInfoPageQuery: {
      pageNum: 1,
      pageSize: 10,
      name: '',
      status: '',
      isWeiChat: '',
      isService: '',
      isDecuction: '',
      personId: ''
    }
  },
  mutations: {
    // 落地页页面搜索参数管理
    SAVE_LANDPAGE_QUERY_INFO: (state, queryInfo) => {
      state.landPageQuery = queryInfo
    },
    // 商户信息配置页面搜索参数管理
    SAVE_MERCHANTSINFOPAGE_QUERY_INFO: (state, queryInfo) => {
      state.merchantInfoPageQuery = queryInfo
    }
  },
  actions: {
    // 落地页页面搜索参数管理
    saveLandPageQueryInfo({ commit }, queryInfo) {
      commit('SAVE_LANDPAGE_QUERY_INFO', queryInfo)
    },
    // 商户信息配置页面搜索参数管理
    saveMerchantsInfoPageQueryInfo({ commit }, queryInfo) {
      commit('SAVE_MERCHANTSINFOPAGE_QUERY_INFO', queryInfo)
    }
  }
}

export default searchParams
