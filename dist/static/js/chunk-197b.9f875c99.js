(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-197b"],{"20hT":function(e,t,n){"use strict";n.d(t,"a",function(){return s}),n.d(t,"b",function(){return l}),n.d(t,"c",function(){return r}),n.d(t,"d",function(){return p}),n.d(t,"e",function(){return c});var a=n("DG18"),o=n("Qyje"),i=n.n(o);function s(e){return Object(a.a)("/app/release/android_list",e)}function l(e){return Object(a.a)("/app/release/ios_list",e)}function r(e){var t=i.a.stringify(e);return Object(a.a)("/app/release/recall",t)}function p(e){var t=i.a.stringify(e);return Object(a.a)("/app/release/release",t)}function c(e){return Object(a.a)("/app/release/save",e)}},LcAc:function(e,t,n){},Mz3J:function(e,t,n){"use strict";Math.easeInOutQuad=function(e,t,n,a){return(e/=a/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t};var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function o(e,t,n){var o=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,i=e-o,s=0;t=void 0===t?500:t;!function e(){s+=20,function(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}(Math.easeInOutQuad(s,o,i,t)),s<t?a(e):n&&"function"==typeof n&&n()}()}var i={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&o(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&o(0,800)}}},s=(n("PelQ"),n("KHd+")),l=Object(s.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[n("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},[],!1,null,"7d9f0a7c",null);l.options.__file="index.vue";t.a=l.exports},PelQ:function(e,t,n){"use strict";var a=n("X9ZH");n.n(a).a},X9ZH:function(e,t,n){},ZySA:function(e,t,n){"use strict";var a=n("P2sY"),o=n.n(a),i=(n("jUE0"),{bind:function(e,t){e.addEventListener("click",function(n){var a=o()({},t.value),i=o()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),s=i.ele;if(s){s.style.position="relative",s.style.overflow="hidden";var l=s.getBoundingClientRect(),r=s.querySelector(".waves-ripple");switch(r?r.className="waves-ripple":((r=document.createElement("span")).className="waves-ripple",r.style.height=r.style.width=Math.max(l.width,l.height)+"px",s.appendChild(r)),i.type){case"center":r.style.top=l.height/2-r.offsetHeight/2+"px",r.style.left=l.width/2-r.offsetWidth/2+"px";break;default:r.style.top=(n.pageY-l.top-r.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",r.style.left=(n.pageX-l.left-r.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return r.style.backgroundColor=i.color,r.className="waves-ripple z-active",!1}},!1)}}),s=function(e){e.directive("waves",i)};window.Vue&&(window.waves=i,Vue.use(s)),i.install=s;t.a=i},hrRb:function(e,t,n){"use strict";n.r(t);var a=n("20hT"),o=n("ZySA"),i={name:"androidUpdate",components:{Pagination:n("Mz3J").a},directives:{waves:o.a},filters:{releaseStatusFilters:function(e){switch(e){case 0:return"待发布";case 1:return"已发布";default:return""}}},data:function(){return{list:null,total:0,listLoading:!0,listQuery:{pageNum:1,pageSize:10},temp:{action:"",deviceType:"android",downloadUrl:"",forceUpdateVersion:"",remark:"",updateContent:"",appVersion:"",channels:[]},dialogFormVisible:!1,phoneTypeList:[{phoneType:"android_default"},{phoneType:"android_huawei"},{phoneType:"android_vivo"},{phoneType:"android_yyb"},{phoneType:"android_yyb-1"},{phoneType:"android_360"},{phoneType:"android_meizu"},{phoneType:"android_xiaomi"},{phoneType:"android_ali"},{phoneType:"android_oppo"},{phoneType:"android_baidu"},{phoneType:"android_common"},{phoneType:"android_mumayi"},{phoneType:"sbw01"},{phoneType:"sbw02"},{phoneType:"sbw03"},{phoneType:"sbw04"},{phoneType:"sbw05"},{phoneType:"sbw06"},{phoneType:"sbw07"},{phoneType:"sbw08"}]}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.listLoading=!0,Object(a.a)(this.listQuery).then(function(t){0===t.code&&(e.list=t.data.items,e.total=t.data.total,e.listLoading=!1)})},resetTemp:function(){this.temp={action:"",deviceType:"android",downloadUrl:"",forceUpdateVersion:"",remark:"",updateContent:"",appVersion:"",channels:[]}},handleCreate:function(){var e=this;this.resetTemp(),this.temp.action="create",this.dialogFormVisible=!0,this.$nextTick(function(){e.$refs.dataForm.clearValidate()})},createData:function(){var e=this;this.$refs.dataForm.validate(function(t){t&&Object(a.e)(e.temp).then(function(t){0==t.code?(e.$notify({title:"成功",message:"添加成功",type:"success",duration:2e3}),e.dialogFormVisible=!1):e.$message({message:t.msg,type:"error",showClose:!0,duration:1e3}),e.getList()})})},handleLookDetail:function(e){this.resetTemp(),this.temp.action="look",this.temp.appVersion=e.appVersion,this.temp.downloadUrl=e.downloadUrl,this.temp.forceUpdateVersion=e.forceUpdateVersion,this.temp.remark=e.remark,this.temp.channels=e.channels,this.temp.updateContent=e.updateContent,this.temp.id=e.id,this.dialogFormVisible=!0},handleEdit:function(e){this.resetTemp(),this.temp.action="edit",this.temp.appVersion=e.appVersion,this.temp.downloadUrl=e.downloadUrl,this.temp.forceUpdateVersion=e.forceUpdateVersion,this.temp.remark=e.remark,this.temp.channels=e.channels,this.temp.updateContent=e.updateContent,this.temp.id=e.id,this.dialogFormVisible=!0},updateData:function(){var e=this;Object(a.e)(this.temp).then(function(t){0===t.code?(e.$notify({title:"成功",message:"修改成功",type:"success",duration:2e3}),e.dialogFormVisible=!1):e.$message({message:response.msg,type:"error",showClose:!0,duration:1e3}),e.getList()})},handleRelease:function(e){var t=this;console.log(e),this.$confirm("确认发布?","提示",{}).then(function(){var n={id:e.id};Object(a.d)(n).then(function(e){console.log(e),0==e.code?t.$notify({title:"成功",message:"发布成功",type:"success",duration:2e3}):t.$message({message:"发布失败",type:"error",showClose:!0,duration:1e3}),t.getList()})})},handleRecall:function(e){var t=this;console.log(e),this.$confirm("确认撤回?","提示",{}).then(function(){var n={id:e.id};Object(a.c)(n).then(function(e){0==e.code?t.$notify({title:"成功",message:"撤回成功",type:"success",duration:2e3}):t.$message({message:"撤回失败",type:"error",showClose:!0,duration:1e3}),t.getList()})})}}},s=(n("xD2X"),n("KHd+")),l=Object(s.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary"},on:{click:e.handleCreate}},[e._v("添加")])],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{label:"序号",prop:"id",align:"center",width:"80px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.id))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"版本号",width:"100px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.appVersion))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"更新内容",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.updateContent))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"更新时间",width:"200px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.releaseTime))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"发布状态",width:"120px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.releaseStatus?n("el-tag",[e._v(e._s(e._f("releaseStatusFilters")(t.row.releaseStatus)))]):n("el-tag",{attrs:{type:"danger"}},[e._v(e._s(e._f("releaseStatusFilters")(t.row.releaseStatus)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"最低强制更新版本",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.forceUpdateVersion))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"备注",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.remark))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center",width:"300px","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{staticStyle:{"margin-left":"12px"},attrs:{type:"primary",size:"small"},on:{click:function(n){e.handleLookDetail(t.row)}}},[e._v("查看")]),e._v(" "),n("el-button",{staticStyle:{"margin-left":"12px"},attrs:{type:"primary",size:"small"},on:{click:function(n){e.handleEdit(t.row)}}},[e._v("编辑")]),e._v(" "),1!==t.row.releaseStatus?n("el-button",{staticStyle:{"margin-left":"12px"},attrs:{type:"success",size:"small"},on:{click:function(n){e.handleRelease(t.row)}}},[e._v("发布")]):e._e(),e._v(" "),0!==t.row.releaseStatus?n("el-button",{staticStyle:{"margin-left":"12px"},attrs:{type:"danger",size:"small"},on:{click:function(n){e.handleRecall(t.row)}}},[e._v("撤回")]):e._e()]}}])})],1),e._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.pageIndex,limit:e.listQuery.pageSize},on:{"update:page":function(t){e.$set(e.listQuery,"pageIndex",t)},"update:limit":function(t){e.$set(e.listQuery,"pageSize",t)},pagination:e.getList}}),e._v(" "),n("el-dialog",{attrs:{title:"create"===e.temp.action?"添加":"look"===e.temp.action?"详情":"编辑",width:"800px",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[n("el-form",{ref:"dataForm",staticClass:"update",staticStyle:{width:"650px","margin-left":"50px"},attrs:{model:e.temp,"label-position":"right","label-width":"120px"}},[n("el-form-item",{attrs:{label:"终端：",prop:"type"}},[n("span",[e._v("android")])]),e._v(" "),n("el-form-item",{attrs:{label:"新版本号：",prop:"appVersion"}},[n("el-input",{attrs:{disabled:"look"===e.temp.action},model:{value:e.temp.appVersion,callback:function(t){e.$set(e.temp,"appVersion",t)},expression:"temp.appVersion"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"更新内容："}},[n("el-input",{attrs:{disabled:"look"===e.temp.action,autosize:{minRows:3,maxRows:5},type:"textarea",placeholder:"请输入更新内容"},model:{value:e.temp.updateContent,callback:function(t){e.$set(e.temp,"updateContent",t)},expression:"temp.updateContent"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"下载地址：",prop:"downloadUrl"}},[n("el-input",{attrs:{disabled:"look"===e.temp.action},model:{value:e.temp.downloadUrl,callback:function(t){e.$set(e.temp,"downloadUrl",t)},expression:"temp.downloadUrl"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"最低强更版本：",prop:"forceUpdateVersion"}},[n("el-input",{attrs:{disabled:"look"===e.temp.action},model:{value:e.temp.forceUpdateVersion,callback:function(t){e.$set(e.temp,"forceUpdateVersion",t)},expression:"temp.forceUpdateVersion"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"备注："}},[n("el-input",{attrs:{disabled:"look"===e.temp.action},model:{value:e.temp.remark,callback:function(t){e.$set(e.temp,"remark",t)},expression:"temp.remark"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"更新渠道："}},[n("el-checkbox-group",{attrs:{disabled:"look"===e.temp.action},model:{value:e.temp.channels,callback:function(t){e.$set(e.temp,"channels",t)},expression:"temp.channels"}},e._l(e.phoneTypeList,function(e,t){return n("el-checkbox",{key:t,attrs:{label:e.phoneType,name:"type"}})}))],1)],1),e._v(" "),"look"!==e.temp.action?n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(t){"create"===e.temp.action?e.createData():e.updateData()}}},[e._v("提交")])],1):e._e()],1)],1)},[],!1,null,null,null);l.options.__file="andriodUpdate.vue";t.default=l.exports},jUE0:function(e,t,n){},xD2X:function(e,t,n){"use strict";var a=n("LcAc");n.n(a).a}}]);