(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2e28"],{"20hT":function(e,t,a){"use strict";a.d(t,"a",function(){return s}),a.d(t,"b",function(){return l}),a.d(t,"c",function(){return r}),a.d(t,"d",function(){return c}),a.d(t,"e",function(){return p});var n=a("DG18"),i=a("Qyje"),o=a.n(i);function s(e){return Object(n.b)("/app/release/android_list",e)}function l(e){return Object(n.b)("/app/release/ios_list",e)}function r(e){var t=o.a.stringify(e);return Object(n.b)("/app/release/recall",t)}function c(e){var t=o.a.stringify(e);return Object(n.b)("/app/release/release",t)}function p(e){return Object(n.b)("/app/release/save",e)}},B2RK:function(e,t,a){"use strict";a.r(t);var n=a("20hT"),i=a("ZySA"),o={name:"ComplexTable",components:{Pagination:a("Mz3J").a},directives:{waves:i.a},filters:{releaseStatusFilters:function(e){switch(e){case 0:return"待发布";case 1:return"已发布";default:return""}}},data:function(){return{list:null,total:0,listLoading:!0,listQuery:{pageNum:1,pageSize:10},temp:{action:"",deviceType:"ios",downloadUrl:"",forceUpdateVersion:"",remark:"",updateContent:"",appVersion:"",channels:[]},dialogFormVisible:!1,phoneTypeList:[{phoneType:"appStore"}]}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.listLoading=!0,Object(n.b)(this.listQuery).then(function(t){0===t.code&&(e.list=t.data.items,e.total=t.data.total,e.listLoading=!1)})},resetTemp:function(){this.temp={action:"",deviceType:"ios",downloadUrl:"",forceUpdateVersion:"",remark:"",updateContent:"",appVersion:"",channels:[]}},handleCreate:function(){var e=this;this.resetTemp(),this.temp.action="create",this.dialogFormVisible=!0,this.$nextTick(function(){e.$refs.dataForm.clearValidate()})},createData:function(){var e=this;this.$refs.dataForm.validate(function(t){t&&Object(n.e)(e.temp).then(function(t){0==t.code?(e.$notify({title:"成功",message:"添加成功",type:"success",duration:2e3}),e.dialogFormVisible=!1):e.$message({message:t.msg,type:"error",showClose:!0,duration:1e3}),e.getList()})})},handleLookDetail:function(e){this.resetTemp(),this.temp.action="look",this.temp.appVersion=e.appVersion,this.temp.downloadUrl=e.downloadUrl,this.temp.forceUpdateVersion=e.forceUpdateVersion,this.temp.remark=e.remark,this.temp.channels=e.channels,this.temp.updateContent=e.updateContent,this.temp.id=e.id,this.dialogFormVisible=!0},handleEdit:function(e){this.resetTemp(),this.temp.action="edit",this.temp.appVersion=e.appVersion,this.temp.downloadUrl=e.downloadUrl,this.temp.forceUpdateVersion=e.forceUpdateVersion,this.temp.remark=e.remark,this.temp.channels=e.channels,this.temp.updateContent=e.updateContent,this.temp.id=e.id,this.dialogFormVisible=!0},updateData:function(){var e=this;Object(n.e)(this.temp).then(function(t){0===t.code?(e.$notify({title:"成功",message:"修改成功",type:"success",duration:2e3}),e.dialogFormVisible=!1):e.$message({message:response.msg,type:"error",showClose:!0,duration:1e3}),e.getList()})},handleRelease:function(e){var t=this;this.$confirm("确认发布?","提示",{}).then(function(){var a={id:e.id};Object(n.d)(a).then(function(e){0==e.code?t.$notify({title:"成功",message:"发布成功",type:"success",duration:2e3}):t.$message({message:"发布失败",type:"error",showClose:!0,duration:1e3}),t.getList()})})},handleRecall:function(e){var t=this;this.$confirm("确认撤回?","提示",{}).then(function(){var a={id:e.id};Object(n.c)(a).then(function(e){0==e.code?t.$notify({title:"成功",message:"撤回成功",type:"success",duration:2e3}):t.$message({message:"撤回失败",type:"error",showClose:!0,duration:1e3}),t.getList()})})}}},s=(a("m6dq"),a("KHd+")),l=Object(s.a)(o,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary"},on:{click:e.handleCreate}},[e._v("添加")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"ID",prop:"id",align:"center",width:"80px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.id))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"版本号",width:"100px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.appVersion))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"更新内容",align:"center",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"textHidden"},[e._v(e._s(t.row.updateContent))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"更新时间",width:"200px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.releaseTime))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"发布状态",width:"120px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.releaseStatus?a("el-tag",[e._v(e._s(e._f("releaseStatusFilters")(t.row.releaseStatus)))]):a("el-tag",{attrs:{type:"danger"}},[e._v(e._s(e._f("releaseStatusFilters")(t.row.releaseStatus)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"最低强制更新版本",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.forceUpdateVersion))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"备注",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.remark))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"300px","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticStyle:{"margin-left":"12px"},attrs:{type:"primary",size:"small"},on:{click:function(a){e.handleLookDetail(t.row)}}},[e._v("查看")]),e._v(" "),1!==t.row.releaseStatus?a("el-button",{staticStyle:{"margin-left":"12px"},attrs:{type:"success",size:"small"},on:{click:function(a){e.handleRelease(t.row)}}},[e._v("发布")]):e._e(),e._v(" "),0!==t.row.releaseStatus?a("el-button",{staticStyle:{"margin-left":"12px"},attrs:{type:"danger",size:"small"},on:{click:function(a){e.handleRecall(t.row)}}},[e._v("撤回")]):e._e()]}}])})],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.pageIndex,limit:e.listQuery.pageSize},on:{"update:page":function(t){e.$set(e.listQuery,"pageIndex",t)},"update:limit":function(t){e.$set(e.listQuery,"pageSize",t)},pagination:e.getList}}),e._v(" "),a("el-dialog",{attrs:{title:"create"===e.temp.action?"添加":"look"===e.temp.action?"详情":"编辑",width:"800px",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"dataForm",staticClass:"update",staticStyle:{width:"650px","margin-left":"50px"},attrs:{model:e.temp,"label-position":"right","label-width":"120px"}},[a("el-form-item",{attrs:{label:"终端：",prop:"type"}},[a("span",[e._v("ios")])]),e._v(" "),a("el-form-item",{attrs:{label:"新版本号：",prop:"appVersion"}},[a("el-input",{attrs:{disabled:"look"===e.temp.action},model:{value:e.temp.appVersion,callback:function(t){e.$set(e.temp,"appVersion",t)},expression:"temp.appVersion"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"更新内容："}},[a("el-input",{attrs:{disabled:"look"===e.temp.action,autosize:{minRows:3,maxRows:5},type:"textarea",placeholder:"请输入更新内容"},model:{value:e.temp.updateContent,callback:function(t){e.$set(e.temp,"updateContent",t)},expression:"temp.updateContent"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"下载地址：",prop:"downloadUrl"}},[a("el-input",{attrs:{disabled:"look"===e.temp.action},model:{value:e.temp.downloadUrl,callback:function(t){e.$set(e.temp,"downloadUrl",t)},expression:"temp.downloadUrl"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"最低强更版本：",prop:"forceUpdateVersion"}},[a("el-input",{attrs:{disabled:"look"===e.temp.action},model:{value:e.temp.forceUpdateVersion,callback:function(t){e.$set(e.temp,"forceUpdateVersion",t)},expression:"temp.forceUpdateVersion"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注："}},[a("el-input",{attrs:{disabled:"look"===e.temp.action},model:{value:e.temp.remark,callback:function(t){e.$set(e.temp,"remark",t)},expression:"temp.remark"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"更新渠道："}},[a("el-checkbox-group",{attrs:{disabled:"look"===e.temp.action},model:{value:e.temp.channels,callback:function(t){e.$set(e.temp,"channels",t)},expression:"temp.channels"}},e._l(e.phoneTypeList,function(e,t){return a("el-checkbox",{key:t,attrs:{label:e.phoneType,name:"type"}})}))],1)],1),e._v(" "),"look"!==e.temp.action?a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){"create"===e.temp.action?e.createData():e.updateData()}}},[e._v("提交")])],1):e._e()],1)],1)},[],!1,null,null,null);l.options.__file="iosUpdate.vue";t.default=l.exports},Mz3J:function(e,t,a){"use strict";Math.easeInOutQuad=function(e,t,a,n){return(e/=n/2)<1?a/2*e*e+t:-a/2*(--e*(e-2)-1)+t};var n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function i(e,t,a){var i=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,o=e-i,s=0;t=void 0===t?500:t;!function e(){s+=20,function(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}(Math.easeInOutQuad(s,i,o,t)),s<t?n(e):a&&"function"==typeof a&&a()}()}var o={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&i(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&i(0,800)}}},s=(a("PelQ"),a("KHd+")),l=Object(s.a)(o,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},[],!1,null,"7d9f0a7c",null);l.options.__file="index.vue";t.a=l.exports},PelQ:function(e,t,a){"use strict";var n=a("X9ZH");a.n(n).a},X9ZH:function(e,t,a){},ZySA:function(e,t,a){"use strict";var n=a("P2sY"),i=a.n(n),o=(a("jUE0"),{bind:function(e,t){e.addEventListener("click",function(a){var n=i()({},t.value),o=i()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),s=o.ele;if(s){s.style.position="relative",s.style.overflow="hidden";var l=s.getBoundingClientRect(),r=s.querySelector(".waves-ripple");switch(r?r.className="waves-ripple":((r=document.createElement("span")).className="waves-ripple",r.style.height=r.style.width=Math.max(l.width,l.height)+"px",s.appendChild(r)),o.type){case"center":r.style.top=l.height/2-r.offsetHeight/2+"px",r.style.left=l.width/2-r.offsetWidth/2+"px";break;default:r.style.top=(a.pageY-l.top-r.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",r.style.left=(a.pageX-l.left-r.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return r.style.backgroundColor=o.color,r.className="waves-ripple z-active",!1}},!1)}}),s=function(e){e.directive("waves",o)};window.Vue&&(window.waves=o,Vue.use(s)),o.install=s;t.a=o},jUE0:function(e,t,a){},m6dq:function(e,t,a){"use strict";var n=a("tpGS");a.n(n).a},tpGS:function(e,t,a){}}]);