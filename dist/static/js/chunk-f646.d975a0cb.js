(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-f646"],{IGhB:function(t,e,i){"use strict";var o=i("YpCo");i.n(o).a},LRLM:function(t,e,i){"use strict";i.r(e);var o=i("ZySA"),n=i("Mz3J"),a=i("Q2AE"),s={inserted:function(t,e,i){var o=e.value,n=a.a.getters&&a.a.getters.roles;if(!(o&&o instanceof Array&&o.length>0))throw new Error("need roles! Like v-permission=\"['admin','editor']\"");var s=o;n.some(function(t){return s.includes(t)})||t.parentNode&&t.parentNode.removeChild(t)}},r=function(t){t.directive("permission",s)};window.Vue&&(window.permission=s,Vue.use(r)),s.install=r;var l=s,d=i("U01L"),c={components:{Pagination:n.a},directives:{waves:o.a,permission:l},data:function(){return{data:[],listLoading:!1,listData:[],total:0,listQuery:{pageNum:1,pageSize:10},addForm:{roleName:"",roleCode:"",permissionIds:[]},addDialog:!1,addDialogTitle:""}},created:function(){this.getList(),this.getPermissionsList()},methods:{getList:function(){var t=this;this.listLoading=!0,Object(d.h)().then(function(e){0==e.code&&(t.listData=e.data,t.listLoading=!1)}).catch(function(e){t.listLoading=!1})},getPermissionsList:function(){var t=this;Object(d.e)().then(function(e){0==e.code&&(t.data=e.data)})},resetForm:function(){this.addForm={roleName:"",roleCode:"",permissionIds:[]}},openAddDataDialog:function(){this.resetForm(),this.addDialog=!0,this.addDialogTitle="create"},openEditDataDialog:function(t){var e=this;this.resetForm(),this.addDialog=!0,this.addDialogTitle="edit",this.addForm.roleId=t.id,this.addForm.roleName=t.roleName;var i={roleId:t.id};Object(d.f)(i).then(function(t){if(0==t.code)for(var i=0;i<t.data.length;i++)e.addForm.permissionIds.push(t.data[i].id)})},addData:function(){var t=this;Object(d.i)(this.addForm).then(function(e){0==e.code&&(t.$notify({title:"成功",message:"角色添加成功",type:"success",duration:1e3}),t.addDialog=!1,t.getList())})},editData:function(){var t=this,e={permissionIds:this.addForm.permissionIds,roleId:this.addForm.roleId};Object(d.g)(e).then(function(e){0==e.code&&(t.$notify({title:"成功",message:"保存成功",type:"success",duration:1e3}),t.addDialog=!1,t.getList())})},handleModifyStatus:function(t,e){var i=this;if("up"==e){var o={id:t.id,status:1};Object(d.k)(o).then(function(t){0==t.code&&(i.$notify({title:"成功",message:"启用成功",type:"success",duration:1e3}),i.getList())})}if("down"==e){var n={id:t.id,status:0};Object(d.k)(n).then(function(t){0==t.code&&(i.$notify({title:"成功",message:"停用成功",type:"success",duration:1e3}),i.getList())})}}}},u=(i("rAlh"),i("IGhB"),i("KHd+")),m=Object(u.a)(c,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"roleManager"},[i("div",{staticClass:"filter-container"},[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{icon:"el-icon-circle-plus",type:"warning"},on:{click:t.openAddDataDialog}},[t._v("添加")])],1),t._v(" "),i("div",{staticClass:"table"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.listData,border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{label:"序号",type:"index",index:1,width:"80px",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{label:"角色名称",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.roleName))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"角色Code",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.roleCode))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"使用状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?i("el-tag",[t._v(t._s(t._f("statusFilters")(e.row.status)))]):i("el-tag",{attrs:{type:"danger"}},[t._v(t._s(t._f("statusFilters")(e.row.status)))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:function(i){t.openEditDataDialog(e.row)}}},[t._v("编辑")]),t._v(" "),1!=e.row.status?i("el-button",{attrs:{size:"mini",type:"warning"},on:{click:function(i){t.handleModifyStatus(e.row,"up")}}},[t._v("启用")]):t._e(),t._v(" "),1==e.row.status?i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){t.handleModifyStatus(e.row,"down")}}},[t._v("停用")]):t._e()]}}])})],1),t._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.pageNum,limit:t.listQuery.pageSize},on:{"update:page":function(e){t.$set(t.listQuery,"pageNum",e)},"update:limit":function(e){t.$set(t.listQuery,"pageSize",e)},pagination:t.getList}})],1),t._v(" "),i("div",{staticClass:"dialog"},[i("el-dialog",{attrs:{title:"create"==t.addDialogTitle?"添加":"编辑",width:"700px",visible:t.addDialog},on:{"update:visible":function(e){t.addDialog=e}}},[i("el-form",{ref:"addForm",attrs:{model:t.addForm,"label-width":"120px"}},["create"==t.addDialogTitle?i("el-form-item",{attrs:{label:"角色名称：",prop:"roleName"}},[i("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入角色名称"},model:{value:t.addForm.roleName,callback:function(e){t.$set(t.addForm,"roleName",e)},expression:"addForm.roleName"}})],1):t._e(),t._v(" "),"create"==t.addDialogTitle?i("el-form-item",{attrs:{label:"角色Code：",prop:"roleName"}},[i("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入角色Code"},model:{value:t.addForm.roleCode,callback:function(e){t.$set(t.addForm,"roleCode",e)},expression:"addForm.roleCode"}})],1):t._e(),t._v(" "),i("el-form-item",{attrs:{label:"选择权限：",prop:"permissionIds"}},[i("el-transfer",{attrs:{props:{key:"id",label:"permissionName"},data:t.data,titles:["全部权限",t.addForm.roleName?t.addForm.roleName:"角色"]},model:{value:t.addForm.permissionIds,callback:function(e){t.$set(t.addForm,"permissionIds",e)},expression:"addForm.permissionIds"}})],1)],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.addDialog=!1}}},[t._v("取 消")]),t._v(" "),"create"==t.addDialogTitle?i("el-button",{attrs:{type:"primary"},on:{click:t.addData}},[t._v("确 定")]):i("el-button",{attrs:{type:"primary"},on:{click:t.editData}},[t._v("确 定")])],1)],1)],1)])},[],!1,null,"2f40319c",null);m.options.__file="roleManager.vue";e.default=m.exports},U01L:function(t,e,i){"use strict";i.d(e,"b",function(){return n}),i.d(e,"c",function(){return a}),i.d(e,"d",function(){return s}),i.d(e,"a",function(){return r}),i.d(e,"j",function(){return l}),i.d(e,"h",function(){return d}),i.d(e,"i",function(){return c}),i.d(e,"k",function(){return u}),i.d(e,"e",function(){return m}),i.d(e,"f",function(){return f}),i.d(e,"g",function(){return p});var o=i("DG18");i("Qyje");function n(t){return Object(o.b)("/adminUser/index",t)}function a(t){return Object(o.b)("/adminUser/save",t)}function s(t){return Object(o.b)("/adminUser/status",t)}function r(t){return Object(o.a)("/adminUser/allLdapUsers",t)}function l(t){return Object(o.b)("/role/saveUserRoles",t)}function d(t){return Object(o.a)("/role/allRoles",t)}function c(t){return Object(o.b)("/role/save",t)}function u(t){return Object(o.b)("/role/updateStatus",t)}function m(t){return Object(o.a)("/permission/allPermissions",t)}function f(t){return Object(o.a)("/permission/obtainPermissions",t)}function p(t){return Object(o.b)("/permission/saveRolePermissions",t)}},Y5bG:function(t,e,i){"use strict";i.d(e,"a",function(){return n}),Math.easeInOutQuad=function(t,e,i,o){return(t/=o/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e};var o=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function n(t,e,i){var n=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,a=t-n,s=0;e=void 0===e?500:e;!function t(){s+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(s,n,a,e)),s<e?o(t):i&&"function"==typeof i&&i()}()}},YpCo:function(t,e,i){},ZySA:function(t,e,i){"use strict";var o=i("P2sY"),n=i.n(o),a=(i("jUE0"),{bind:function(t,e){t.addEventListener("click",function(i){var o=n()({},e.value),a=n()({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},o),s=a.ele;if(s){s.style.position="relative",s.style.overflow="hidden";var r=s.getBoundingClientRect(),l=s.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":((l=document.createElement("span")).className="waves-ripple",l.style.height=l.style.width=Math.max(r.width,r.height)+"px",s.appendChild(l)),a.type){case"center":l.style.top=r.height/2-l.offsetHeight/2+"px",l.style.left=r.width/2-l.offsetWidth/2+"px";break;default:l.style.top=(i.pageY-r.top-l.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",l.style.left=(i.pageX-r.left-l.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return l.style.backgroundColor=a.color,l.className="waves-ripple z-active",!1}},!1)}}),s=function(t){t.directive("waves",a)};window.Vue&&(window.waves=a,Vue.use(s)),a.install=s;e.a=a},jUE0:function(t,e,i){},rAlh:function(t,e,i){"use strict";var o=i("tVr6");i.n(o).a},tVr6:function(t,e,i){}}]);