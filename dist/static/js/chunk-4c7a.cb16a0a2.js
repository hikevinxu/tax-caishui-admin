(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4c7a"],{"+jcw":function(e,t,a){"use strict";t.a={data:function(){return{app:["财税鱼"]}}}},"5D+j":function(e,t,a){"use strict";var n=a("XZJt");a.n(n).a},C26a:function(e,t,a){"use strict";a.r(t);var n=a("+jcw"),i=a("cYbK"),r=a("ZySA"),o={components:{Pagination:a("Mz3J").a},directives:{waves:r.a},data:function(){return{listLoading:!1,searchData:{packageName:"",advertisingChannel:"",channelRemark:"",clientType:"",pageNum:1,pageSize:10},formLabelWidth:"120px",tableListData:[],currentPage:1,page:1,totalCount:0,totalPage:0,recordsSearch:{pageNum:1,pageSize:10,pageId:""},recordDataCount:0,dialogTableVisible:!1,recordData:[]}},mixins:[n.a],watch:{"searchData.packageName":function(e){e||(this.searchData.packageName=null)},"searchData.advertisingChannel":function(e){e||(this.searchData.advertisingChannel=null)},"searchData.channelRemark":function(e){e||(this.searchData.channelRemark=null)}},methods:{getList:function(){var e=this;this.listLoading=!0,this.$store.dispatch("saveLandPageQueryInfo",this.searchData),Object(i.g)(this.searchData).then(function(t){0==t.code&&(e.listLoading=!1,e.tableListData=t.data.items,e.totalCount=t.data.total)}).catch(function(t){e.listLoading=!1})},search:function(){this.searchData.pageNum=1,this.searchData.pageSize=10},editItem:function(e){this.$router.push({path:"/landPage/editLandPage",query:{id:e.id}})},openUrl:function(e){window.open(e.landpageUrl)},copyItem:function(e){var t=this,a={id:e.id};Object(i.b)(a).then(function(e){0==e.code?t.$message({type:"success",message:"复制成功!"}):t.$message({type:"success",message:"复制失败!"}),t.getList()})},deleteItem:function(e){var t=this;this.$confirm("确认删掉该条数据么?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a={id:e.id};Object(i.c)(a).then(function(e){0==e.code&&t.$message({type:"success",message:"删除成功!"}),t.getList()})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleCommand:function(e){console.log(e),this[e.type](e.item)},lookRecords:function(e){console.log(e),this.recordsSearch.pageNum=1,this.recordsSearch.pageSize=10,this.recordsSearch.pageId=e.id,this.getRecordList()},getRecordList:function(){var e=this;Object(i.h)(this.recordsSearch).then(function(t){0==t.code&&(e.dialogTableVisible=!0,e.recordData=t.data.items,e.recordDataCount=t.data.total)})},searchDataChange:function(){this.searchData.pageNum=1,this.searchData.pageSize=10,this.getList()}},created:function(){this.searchData=this.$store.getters.landPageQuery,this.getList()},mounted:function(){}},l=(a("5D+j"),a("KHd+")),c=Object(l.a)(o,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"land_page"},[a("div",{staticClass:"btn_Box filter-container"},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{icon:"el-icon-plus",type:"primary"},on:{click:function(t){e.$router.push("/landPage/createLandPage")}}},[e._v("新建")]),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"250px","margin-left":"10px"},attrs:{placeholder:"请选择投放应用"},on:{change:e.searchDataChange},model:{value:e.searchData.packageName,callback:function(t){e.$set(e.searchData,"packageName",t)},expression:"searchData.packageName"}},[a("el-option",{attrs:{value:"",label:"全部"}}),e._v(" "),e._l(e.app,function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})})],2),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"250px","margin-left":"10px"},attrs:{placeholder:"请选择投放应用"},on:{change:e.searchDataChange},model:{value:e.searchData.clientType,callback:function(t){e.$set(e.searchData,"clientType",t)},expression:"searchData.clientType"}},[a("el-option",{attrs:{value:"",label:"全部"}}),e._v(" "),a("el-option",{attrs:{label:"pc",value:"pc"}}),e._v(" "),a("el-option",{attrs:{label:"h5",value:"h5"}})],1),e._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"250px","margin-left":"10px"},attrs:{type:"text",placeholder:"请输入投放渠道",clearable:""},on:{clear:e.searchDataChange},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.searchDataChange(t):null}},model:{value:e.searchData.advertisingChannel,callback:function(t){e.$set(e.searchData,"advertisingChannel",t)},expression:"searchData.advertisingChannel"}}),e._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"250px","margin-left":"10px"},attrs:{type:"text",placeholder:"请输入渠道备注",clearable:""},on:{clear:e.searchDataChange},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.searchDataChange(t):null}},model:{value:e.searchData.channelRemark,callback:function(t){e.$set(e.searchData,"channelRemark",t)},expression:"searchData.channelRemark"}}),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.searchDataChange}},[e._v("搜索")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.tableListData,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"序号",type:"index",index:1,width:"80px",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"产品名称",align:"center",width:"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.packageName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"客户端类型",align:"center",width:"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.clientType))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"渠道channel",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.advertisingChannel))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"渠道备注",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.channelRemark))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"落地页url",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{color:"#409eff"},on:{click:function(a){e.openUrl(t.row)}}},[e._v(e._s(t.row.landpageUrl))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"预览",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("img",{staticStyle:{width:"40px",height:"40px"},attrs:{src:e.row.headImg,alt:""}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"落地页标题",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.title))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"创建人",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.createUser?t.row.createUser:"——"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"创建时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.createTime))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-dropdown",{on:{command:e.handleCommand}},[a("el-button",{attrs:{type:"primary",size:"small"}},[e._v("\n\t\t              操作\n\t\t            ")]),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:{type:"editItem",item:t.row}}},[e._v("编辑")]),e._v(" "),a("el-dropdown-item",{attrs:{command:{type:"copyItem",item:t.row}}},[e._v("复制")]),e._v(" "),a("el-dropdown-item",{attrs:{command:{type:"deleteItem",item:t.row}}},[e._v("删除")])],1)],1),e._v(" "),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"danger",size:"small"},on:{click:function(a){e.lookRecords(t.row)}}},[e._v("操作记录")])]}}])})],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.totalCount>0,expression:"totalCount>0"}],attrs:{total:e.totalCount,page:e.searchData.pageNum,limit:e.searchData.pageSize},on:{"update:page":function(t){e.$set(e.searchData,"pageNum",t)},"update:limit":function(t){e.$set(e.searchData,"pageSize",t)},pagination:e.getList}}),e._v(" "),a("el-dialog",{attrs:{title:"操作记录",visible:e.dialogTableVisible,width:"800px"},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[a("el-table",{attrs:{data:e.recordData,border:""}},[a("el-table-column",{attrs:{label:"序号",type:"index",width:"80",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"200",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.operate))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"姓名",width:"200",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.userName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.createTime))])]}}])})],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.recordDataCount>0,expression:"recordDataCount>0"}],attrs:{total:e.recordDataCount,page:e.recordsSearch.pageNum,limit:e.recordsSearch.pageSize},on:{"update:page":function(t){e.$set(e.recordsSearch,"pageNum",t)},"update:limit":function(t){e.$set(e.recordsSearch,"pageSize",t)},pagination:e.getRecordList}})],1)],1)},[],!1,null,"b2545ba8",null);c.options.__file="pageList.vue";t.default=c.exports},Mz3J:function(e,t,a){"use strict";Math.easeInOutQuad=function(e,t,a,n){return(e/=n/2)<1?a/2*e*e+t:-a/2*(--e*(e-2)-1)+t};var n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function i(e,t,a){var i=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,r=e-i,o=0;t=void 0===t?500:t;!function e(){o+=20,function(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}(Math.easeInOutQuad(o,i,r,t)),o<t?n(e):a&&"function"==typeof a&&a()}()}var r={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&i(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&i(0,800)}}},o=(a("PelQ"),a("KHd+")),l=Object(o.a)(r,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},[],!1,null,"7d9f0a7c",null);l.options.__file="index.vue";t.a=l.exports},PelQ:function(e,t,a){"use strict";var n=a("X9ZH");a.n(n).a},X9ZH:function(e,t,a){},XZJt:function(e,t,a){},ZySA:function(e,t,a){"use strict";var n=a("P2sY"),i=a.n(n),r=(a("jUE0"),{bind:function(e,t){e.addEventListener("click",function(a){var n=i()({},t.value),r=i()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),o=r.ele;if(o){o.style.position="relative",o.style.overflow="hidden";var l=o.getBoundingClientRect(),c=o.querySelector(".waves-ripple");switch(c?c.className="waves-ripple":((c=document.createElement("span")).className="waves-ripple",c.style.height=c.style.width=Math.max(l.width,l.height)+"px",o.appendChild(c)),r.type){case"center":c.style.top=l.height/2-c.offsetHeight/2+"px",c.style.left=l.width/2-c.offsetWidth/2+"px";break;default:c.style.top=(a.pageY-l.top-c.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",c.style.left=(a.pageX-l.left-c.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return c.style.backgroundColor=r.color,c.className="waves-ripple z-active",!1}},!1)}}),o=function(e){e.directive("waves",r)};window.Vue&&(window.waves=r,Vue.use(o)),r.install=o;t.a=r},cYbK:function(e,t,a){"use strict";a.d(t,"g",function(){return o}),a.d(t,"a",function(){return l}),a.d(t,"b",function(){return c}),a.d(t,"f",function(){return s}),a.d(t,"c",function(){return u}),a.d(t,"e",function(){return d}),a.d(t,"h",function(){return p}),a.d(t,"d",function(){return h});var n=a("DG18"),i=a("Qyje"),r=a.n(i);function o(e){return Object(n.a)("/api/channelPage/obtainPaging",e)}function l(e){var t=r.a.stringify(e);return Object(n.b)("/api/channelPage/addition",t)}function c(e){var t=r.a.stringify(e);return Object(n.b)("/api/channelPage/copy",t)}function s(e){return Object(n.a)("/api/channelPage/obtainDetail",e)}function u(e){var t=r.a.stringify(e);return Object(n.b)("/api/channelPage/delete",t)}function d(e){var t=r.a.stringify(e);return Object(n.b)("/api/channelPage/modify",t)}function p(e){return Object(n.a)("/api/channelPage/record",e)}function h(e){return Object(n.a)("/api/channelPage/intention/list",e)}},jUE0:function(e,t,a){}}]);