(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6817"],{MSNs:function(t,e,a){"use strict";a.d(e,"a",function(){return i});var n=a("DG18");function i(t){return Object(n.b)("/fileupload/upload",t)}},NQED:function(t,e,a){"use strict";a.r(e);var n=a("DG18");var i=a("ZySA"),o=a("Mz3J"),l=a("GV7n"),s={name:"hotWordsSetting",components:{Pagination:o.a,Upload:l.a},directives:{waves:i.a},filters:{releaseStatusFilters:function(t){return 1==t?"已上架":2==t?"已下架":0==t?"待上架":void 0}},data:function(){return{list:null,listOperation:null,total:0,operaTotal:0,listLoading:!0,listQuery:{pageNum:1,pageSize:10,companyName:"",contactPhone:""},listOperaQuery:{accountId:"",pageNum:1,pageSize:10},temp:{accountId:"",amount:null},name:"",dialogFormVisible:!1,dialogGiving:!1,dialogOperationVisible:!1,dialogStatus:"",rules:{amount:[{required:!0,message:"赠送金币不能为空"}]}}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,function(t){return Object(n.b)("/bonusItem/obtainAccountPage",t)}(this.listQuery).then(function(e){0==e.code&&(console.log(e),t.list=e.data.items,t.total=e.data.total),t.listLoading=!1})},getOperaList:function(){var t=this;(function(t){return Object(n.b)("/bonusItem/obtainBonusItemPage",t)})(this.listOperaQuery).then(function(e){0==e.code&&(console.log(e),t.listOperation=e.data.items,t.operaTotal=e.data.total)})},handleGiving:function(t){this.resetTemp(),this.temp.accountId=t.id,this.temp.amount=null,this.name=t.name,this.dialogGiving=!0},handleOperation:function(t){this.listOperaQuery.accountId=t.id,this.dialogOperationVisible=!0,this.getOperaList()},resetTemp:function(){this.temp={accountId:"",amount:null}},createData:function(){var t=this;this.temp.amount>1e3?this.$message({message:"赠币不能超过1000",type:"error",showClose:!0,duration:1e3}):this.temp.amount<0?this.$message({message:"赠币不能低于0",type:"error",showClose:!0,duration:1e3}):function(t){return Object(n.b)("/bonusItem/presentBonus",t)}(this.temp).then(function(e){0==e.code?(t.$notify({title:"成功",message:"赠送成功",type:"success",duration:2e3}),t.dialogGiving=!1):t.$message({message:e.msg,type:"error",showClose:!0,duration:1e3}),t.getList()})}}},r=a("KHd+"),u=Object(r.a)(s,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"250px"},attrs:{placeholder:"请输入机构名称"},model:{value:t.listQuery.companyName,callback:function(e){t.$set(t.listQuery,"companyName",e)},expression:"listQuery.companyName"}}),t._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"250px"},attrs:{placeholder:"请输入联系电话"},model:{value:t.listQuery.contactPhone,callback:function(e){t.$set(t.listQuery,"contactPhone",e)},expression:"listQuery.contactPhone"}}),t._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary"},on:{click:t.getList}},[t._v("筛选")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"ID",prop:"id",align:"center",width:"80px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.id))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"机构名称",width:"250px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"联系人",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.contactName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"联系电话",align:"center",width:"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.contactPhone))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"账户金币",align:"center",width:"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.balance))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"账户赠币",align:"center",width:"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.bonusBalance))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("table.actions"),align:"center","min-width":"200","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticStyle:{"margin-left":"12px"},attrs:{type:"warning",size:"small"},on:{click:function(a){t.handleGiving(e.row)}}},[t._v("赠送金币")]),t._v(" "),a("el-button",{staticStyle:{"margin-left":"12px"},attrs:{type:"danger",size:"small"},on:{click:function(a){t.handleOperation(e.row)}}},[t._v("赠送记录")])]}}])})],1),t._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.pageNum,limit:t.listQuery.pageSize},on:{"update:page":function(e){t.$set(t.listQuery,"pageNum",e)},"update:limit":function(e){t.$set(t.listQuery,"pageSize",e)},pagination:t.getList}}),t._v(" "),a("el-dialog",{attrs:{title:"赠送金币",visible:t.dialogGiving},on:{"update:visible":function(e){t.dialogGiving=e}}},[a("el-form",{ref:"dataForm",staticStyle:{"margin-left":"50px"},attrs:{rules:t.rules,model:t.temp,"label-position":"right"}},[a("span",{staticStyle:{display:"block","margin-bottom":"20px"}},[t._v("提醒：你正在对「商户："),a("span",{staticStyle:{color:"red"}},[t._v(t._s(t.name))]),t._v("」进行赠币操作")]),t._v(" "),a("el-form-item",{attrs:{label:"",prop:"amount"}},[a("el-input",{attrs:{type:"number",placeholder:"请输入要赠送的金币数量"},model:{value:t.temp.amount,callback:function(e){t.$set(t.temp,"amount",e)},expression:"temp.amount"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogGiving=!1}}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.createData}},[t._v("确定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"操作记录",visible:t.dialogOperationVisible},on:{"update:visible":function(e){t.dialogOperationVisible=e}}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.listOperation,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"用户",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.adminUserName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"赠送金额",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.amount))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作时间","min-width":"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.createTime))])]}}])})],1),t._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.operaTotal>0,expression:"operaTotal>0"}],attrs:{total:t.operaTotal,page:t.listOperaQuery.pageNum,limit:t.listOperaQuery.pageSize},on:{"update:page":function(e){t.$set(t.listOperaQuery,"pageNum",e)},"update:limit":function(e){t.$set(t.listOperaQuery,"pageSize",e)},pagination:t.getOperaList}}),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogOperationVisible=!1}}},[t._v("确认")])],1)],1)],1)},[],!1,null,null,null);u.options.__file="giving.vue";e.default=u.exports},Y5bG:function(t,e,a){"use strict";a.d(e,"a",function(){return i}),Math.easeInOutQuad=function(t,e,a,n){return(t/=n/2)<1?a/2*t*t+e:-a/2*(--t*(t-2)-1)+e};var n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function i(t,e,a){var i=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,o=t-i,l=0;e=void 0===e?500:e;!function t(){l+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(l,i,o,e)),l<e?n(t):a&&"function"==typeof a&&a()}()}},ZySA:function(t,e,a){"use strict";var n=a("P2sY"),i=a.n(n),o=(a("jUE0"),{bind:function(t,e){t.addEventListener("click",function(a){var n=i()({},e.value),o=i()({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),l=o.ele;if(l){l.style.position="relative",l.style.overflow="hidden";var s=l.getBoundingClientRect(),r=l.querySelector(".waves-ripple");switch(r?r.className="waves-ripple":((r=document.createElement("span")).className="waves-ripple",r.style.height=r.style.width=Math.max(s.width,s.height)+"px",l.appendChild(r)),o.type){case"center":r.style.top=s.height/2-r.offsetHeight/2+"px",r.style.left=s.width/2-r.offsetWidth/2+"px";break;default:r.style.top=(a.pageY-s.top-r.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",r.style.left=(a.pageX-s.left-r.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return r.style.backgroundColor=o.color,r.className="waves-ripple z-active",!1}},!1)}}),l=function(t){t.directive("waves",o)};window.Vue&&(window.waves=o,Vue.use(l)),o.install=l;e.a=o},jUE0:function(t,e,a){}}]);