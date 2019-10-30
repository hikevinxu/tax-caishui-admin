const global = {
  jumpTypeList: [
    {name: '原生普通页面', id: 1},
    {name: 'h5链接', id: 2},
    {name: '服务搜索页', id: 3},
    {name: '公司详情页', id: 4}
  ],
  statusList: [
    {name: '待上架',id: 0},
    {name: '已上架',id: 1},
    {name: '已下架',id: 2}
  ],
  pageUrlList: [
    {name: '公司详情页', id: "main/home/queryService/company"},
    {name: '服务详情页', id: "main/home/queryService/servicer"}
  ],
  // 落地页表单类型
  formTypeList: [
    {name: '海外公司注册', id: 1},
    {name: '公司注册', id: 2},
    {name: '印度公司注册', id: 3}
  ]
}
export default global
