const landPage = {
  state: {
    landPageQuery: {
      pageSize: 10,
      pageNum: 1,
      packageName: '',
      clientType: '',
      advertisingChannel: '',
      channelRemark: '',
    }
  },
  mutations: {
    SAVE_LANDPAGE_QUERY_INFO: (state, queryInfo) => {
      state.landPageQuery = queryInfo
    }
  },
  actions: {
    saveLandPageQueryInfo({ commit }, queryInfo) {
      commit('SAVE_LANDPAGE_QUERY_INFO', queryInfo)
    }
  }
}

export default landPage
