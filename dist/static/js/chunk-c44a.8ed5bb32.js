(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-c44a"],{"0hRK":function(t,e,s){"use strict";var n=s("b6PW");s.n(n).a},JLD6:function(t,e,s){},Y5bG:function(t,e,s){"use strict";s.d(e,"a",function(){return i}),Math.easeInOutQuad=function(t,e,s,n){return(t/=n/2)<1?s/2*t*t+e:-s/2*(--t*(t-2)-1)+e};var n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function i(t,e,s){var i=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,a=t-i,r=0;e=void 0===e?500:e;!function t(){r+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(r,i,a,e)),r<e?n(t):s&&"function"==typeof s&&s()}()}},b6PW:function(t,e,s){},iETj:function(t,e,s){"use strict";s.r(e);var n=s("Mz3J"),i=s("lFhg"),a={components:{Pagination:n.a},filters:{statusFilters:function(t){switch(t){case 1:return"已上架";case 2:return"已下架";case 3:return"平台下架";default:return""}}},data:function(){return{listLoading:!1,listQuery:{companyId:this.$route.query.id,pageNum:1,pageSize:10,shelf:!1},total:0,list:[]}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,i.a.serviceList(this.listQuery).then(function(e){0==e.code&&(t.total=e.data.total,t.list=e.data.items,t.listLoading=!1)})},serviceShelfUp:function(t){var e=this,s={companyId:this.$route.query.id,id:t.id};i.a.serviceShelfUp(s).then(function(t){0==t.code&&(e.$message({message:"上架成功",type:"success",showClose:!0,duration:1e3}),e.getList())})},serviceShelfDown:function(t){var e=this,s={companyId:this.$route.query.id,id:t.id};i.a.serviceShelfDown(s).then(function(t){0==t.code&&(e.$message({message:"下架成功",type:"success",showClose:!0,duration:1e3}),e.getList())})},toAddService:function(){this.$router.push("/merchants/serviceEdit?companyId="+this.$route.query.id)},editService:function(t){this.$router.push("/merchants/serviceEdit?id="+t.id+"&companyId="+this.$route.query.id)}}},r=(s("0hRK"),s("qPOv"),s("KHd+")),c=Object(r.a)(a,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"serviceManager"},[s("div",{staticClass:"serviceManagerInfo"},[s("div",{staticClass:"serviceManager_title"},[s("h4",[t._v("服务管理")]),t._v(" "),s("span",{staticClass:"addService",on:{click:t.toAddService}},[t._v("+添加服务")])]),t._v(" "),s("div",{staticClass:"serviceManager_table"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticClass:"tableClass",staticStyle:{width:"100%"},attrs:{data:t.list,border:""}},[s("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"80"}}),t._v(" "),s("el-table-column",{attrs:{label:"关联类目",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.serviceName))])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"服务标题",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.title))])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"上架时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.upShelfTime))])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?s("el-tag",{attrs:{type:"success"}},[t._v(t._s(t._f("statusFilters")(e.row.status)))]):t._e(),t._v(" "),2==e.row.status?s("el-tag",{attrs:{type:"warning"}},[t._v(t._s(t._f("statusFilters")(e.row.status)))]):t._e(),t._v(" "),3==e.row.status?s("el-tag",{attrs:{type:"danger"}},[t._v(t._s(t._f("statusFilters")(e.row.status)))]):t._e()]}}])}),t._v(" "),s("el-table-column",{attrs:{fixed:"right",label:"操作",width:"200",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[2==e.row.status?s("el-button",{staticStyle:{color:"#FF7F4A"},attrs:{type:"text",size:"small"},on:{click:function(s){t.serviceShelfUp(e.row)}}},[t._v("上架")]):t._e(),t._v(" "),1==e.row.status?s("el-button",{staticStyle:{color:"#5AB3A4"},attrs:{type:"text",size:"small"},on:{click:function(s){t.serviceShelfDown(e.row)}}},[t._v("下架")]):t._e(),t._v(" "),1!=e.row.status?s("el-button",{staticStyle:{color:"#5AB3A4"},attrs:{type:"text",size:"small"},on:{click:function(s){t.editService(e.row)}}},[t._v("编辑")]):t._e()]}}])})],1),t._v(" "),s("pagination",{attrs:{total:t.total,page:t.listQuery.pageNum,limit:t.listQuery.pageSize},on:{"update:page":function(e){t.$set(t.listQuery,"pageNum",e)},"update:limit":function(e){t.$set(t.listQuery,"pageSize",e)},pagination:t.getList}})],1)])])},[],!1,null,"2cc37a50",null);c.options.__file="serviceManager.vue";e.default=c.exports},lFhg:function(t,e,s){"use strict";var n=s("DG18"),i=s("Qyje"),a=s.n(i);e.a={serviceList:function(t){var e=a.a.stringify(t);return Object(n.b)("/merchant/service/list",e)},serviceAdd:function(t){return Object(n.b)("/merchant/service/add",t)},serviceUpdate:function(t){return Object(n.b)("/merchant/service/update",t)},serviceShelfDown:function(t){var e=a.a.stringify(t);return Object(n.b)("/merchant/service/shelf/down",e)},serviceShelfUp:function(t){var e=a.a.stringify(t);return Object(n.b)("/merchant/service/shelf/up",e)},serviceItemTrees:function(t){return Object(n.a)("/merchant/service/service_items",t)},serviceEdit:function(t){return Object(n.a)("/merchant/service/edit",t)},serviceTemplate:function(t){return Object(n.a)("/merchant/service/template",t)}}},qPOv:function(t,e,s){"use strict";var n=s("JLD6");s.n(n).a}}]);