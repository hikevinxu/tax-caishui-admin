const landPage = {
  state: {
    landPageQuery: {
      pageSize: 10,
      pageNum: 1,
      packageName: '',
      clientType: '',
      advertisingChannel: '',
      channelRemark: '',
    },
    companyName: ''
  },
  mutations: {
    SAVE_LANDPAGE_QUERY_INFO: (state, queryInfo) => {
      state.landPageQuery = queryInfo
    },
    SAVE_NAME: (state, companyName) => {
      state.companyName = companyName
    }
  },
  actions: {
    saveLandPageQueryInfo({ commit }, queryInfo) {
      commit('SAVE_LANDPAGE_QUERY_INFO', queryInfo)
    },
    saveName({ commit }, companyName) {
      commit('SAVE_NAME', companyName)
    }
  }
}

export default landPage
