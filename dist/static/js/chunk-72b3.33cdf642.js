(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-72b3"],{"2//M":function(e,t,i){"use strict";i.r(t);var s=i("lFhg"),r=i("kaoP"),a=i("MSNs"),o={data:function(){return{serviceCode:"",firstServiceCode:"",firstServiceCodeList:[],secondServiceCode:"",secondServiceCodeList:[],thirdServiceCode:"",thirdServiceCodeList:[],companyTypes:"",title:"",serviceLogo:"",serviceLogoId:"",fileList:[],fileIntroList:[],imgTotal:0,cityCodes:[],content:"",props:{multiple:!0,emitPath:!0,checkStrictly:!1,children:"childs",label:"name",value:"code"},serviceArea:[],cityTree:[],servicePrice:[{name:"",price:""}],submitLoading:!1,editMark:!1,deliveryDuration:"",deliveryMaterial:"",handleMaterial:"",handleProcessDuration:""}},created:function(){console.log(this.$route.query.id),this.$route.query.id?(this.editMark=!0,this.init()):(this.getCityTree(),this.getServiceType())},methods:{init:function(){var e=this,t=this.$loading({lock:!0,text:"正在获取数据，请稍后...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),i={id:this.$route.query.id};s.a.serviceEdit(i).then(function(i){if(0==i.code){e.serviceCode=i.data.serviceCode;var a=i.data.parentCodes,o=i.data.serviceDistrictList;s.a.serviceItemTrees({companyId:e.$route.query.companyId}).then(function(t){if(0==t.code&&(e.firstServiceCodeList=t.data,1==a.length&&(e.firstServiceCode=a[0],e.firstServiceCode&&""!=e.firstServiceCode)))for(var i=0;i<e.firstServiceCodeList.length;i++)e.firstServiceCodeList[i].code==e.firstServiceCode&&e.firstServiceCodeList[i].childs&&(e.secondServiceCodeList=e.firstServiceCodeList[i].childs,e.secondServiceCode=e.serviceCode)}).catch(function(e){t.close()}),Object(r.d)().then(function(i){if(0==i.code){e.cityTree=i.data;var s=[];if(o&&o.length>0)for(var r=0;r<o.length;r++)o[r].districtCode&&null!=o[r].districtCode?s.push([o[r].countryCode,o[r].provinceCode,o[r].cityCode,o[r].districtCode]):o[r].cityCode&&null!=o[r].cityCode?s.push([o[r].countryCode,o[r].provinceCode,o[r].cityCode]):o[r].provinceCode&&null!=o[r].provinceCode?s.push([o[r].countryCode,o[r].provinceCode]):o[r].countryCode&&null!=o[r].countryCode&&s.push([o[r].countryCode]);console.log(s),e.serviceArea=s,t.close()}}).catch(function(e){t.close()}),e.title=i.data.title,e.deliveryDuration=i.data.deliveryDuration,e.deliveryMaterial=i.data.deliveryMaterial,e.handleMaterial=i.data.handleMaterial,e.handleProcessDuration=i.data.handleProcessDuration,e.servicePrice=i.data.items.length>0?i.data.items:[{name:"",price:""}],e.serviceLogo=i.data.logo,e.serviceLogoId=i.data.logo;var c=[],n=[];i.data.imgs.length>=0&&(e.imgTotal=i.data.imgs.length);for(var l=0;l<i.data.imgs.length;l++){var d=i.data.imgs[l].img,v={uid:i.data.imgs[l].id,url:d};c.push(v),n.push(d)}e.fileList=c,e.fileIntroList=n,t.close()}}).catch(function(e){t.close()})},getServiceType:function(){var e=this,t={companyId:this.$route.query.companyId};s.a.serviceItemTrees(t).then(function(t){0==t.code&&(e.firstServiceCodeList=t.data)})},firstServiceCodeChange:function(){if(this.serviceCode="",this.secondServiceCode="",this.thirdServiceCode="",this.secondServiceCodeList=[],this.thirdServiceCodeList=[],this.firstServiceCode&&""!=this.firstServiceCode)for(var e=0;e<this.firstServiceCodeList.length;e++)this.firstServiceCodeList[e].code==this.firstServiceCode&&(this.firstServiceCodeList[e].childs&&0!=this.firstServiceCodeList[e].childs.length?this.secondServiceCodeList=this.firstServiceCodeList[e].childs:this.serviceCode=this.firstServiceCode)},secondServiceCodeChange:function(){var e=this;if(this.serviceCode="",this.thirdServiceCode="",this.thirdServiceCodeList=[],this.secondServiceCode&&""!=this.secondServiceCode&&(this.serviceCode=this.secondServiceCode,!this.$route.query.id)){var t={serviceCode:this.serviceCode};s.a.serviceTemplate(t).then(function(t){0==t.code&&(e.handleProcessDuration=t.data.handleProcessDuration,e.handleMaterial=t.data.handleMaterial,e.deliveryMaterial=t.data.deliveryMaterial,e.deliveryDuration=t.data.deliveryDuration,e.title=t.data.title)})}},thirdServiceCodeChange:function(){this.serviceCode="",this.thirdServiceCode&&""!=this.secondServiceCode&&(this.serviceCode=this.thirdServiceCode)},getCityTree:function(){var e=this;Object(r.d)().then(function(t){0==t.code&&(e.cityTree=t.data)})},logoUpload:function(e){var t=this,i=this.$loading({lock:!0,text:"正在上传图片，请稍后...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),s=new FormData;s.append("files",e.file),Object(a.a)(s).then(function(s){if(0==s.code){t.serviceLogoId=s.data[0].fileId;var r=new FileReader;r.readAsDataURL(e.file),r.onloadend=function(e){t.serviceLogo=e.target.result},i.close()}}).catch(function(e){i.close(),t.$message.error("上传失败，请重新上传")})},deleteServiceLogo:function(){this.serviceLogo="",this.serviceLogoId=""},handleRemoveBefore:function(e,t){for(var i=this.$loading({lock:!0,text:"正在删除图片，请稍后...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),s=0;s<t.length;s++)e.uid==t[s].uid&&this.fileIntroList.splice(s,1);this.imgTotal=this.fileIntroList.length,i.close()},handleRemove:function(e,t){},uploadList:function(e){var t=this,i=this.$loading({lock:!0,text:"正在上传图片，请稍后...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),s=new FormData;s.append("files",e.file),Object(a.a)(s).then(function(e){if(0==e.code){var s=e.data[0].fileId;t.fileIntroList.push(s),t.imgTotal=t.fileIntroList.length,i.close()}}).catch(function(e){i.close(),t.$message.error("上传失败，请重新上传")})},selectAreaChange:function(e){},checkSelectAreaInCity:function(e){for(var t=0,i=0;i<this.serviceArea.length;i++)this.serviceArea[i].length>2&&this.serviceArea[i][2]==e&&t++;return t},checkTotalAreaInCity:function(e){var t=[];if(e.length>0)for(var i=0;i<this.cityTree.length;i++)if(e[0]&&""!=e[0]&&e[0]==this.cityTree[i].code)for(var s=0;s<this.cityTree[i].childs.length;s++)if(e[1]&&""!=e[1]&&e[1]==this.cityTree[i].childs[s].code)for(var r=0;r<this.cityTree[i].childs[s].childs.length;r++)if(e[2]&&""!=e[2]&&e[2]==this.cityTree[i].childs[s].childs[r].code)for(var a=0;a<this.cityTree[i].childs[s].childs[r].childs.length;a++)t.push(this.cityTree[i].childs[s].childs[r].childs[a].code);return t},addServicePrice:function(){this.servicePrice.push({name:"",price:""})},deleteServicePrice:function(e){this.servicePrice.splice(e,1)},submit:function(){var e=this;this.submitLoading=!0;var t=[];if(this.serviceArea&&this.serviceArea.length>0)for(var i=0;i<this.serviceArea.length;i++)this.serviceArea[i].length,t.push({countryCode:this.serviceArea[i][0]||null,provinceCode:this.serviceArea[i][1]||null,cityCode:this.serviceArea[i][2]||null,districtCode:this.serviceArea[i][3]||null});if(this.cityCodes=t,!this.serviceCode||""==this.serviceCode)return this.$message({message:"请先选择关联业务",type:"error",showClose:!0,duration:1e3}),void(this.submitLoading=!1);if(!this.title||""==this.title)return this.$message({message:"请先填写标题",type:"error",showClose:!0,duration:1e3}),void(this.submitLoading=!1);if(!this.cityCodes||0==this.cityCodes.length)return this.$message({message:"请先选择服务区域",type:"error",showClose:!0,duration:1e3}),void(this.submitLoading=!1);if(!this.handleProcessDuration||""==this.handleProcessDuration)return this.$message({message:"办理步骤及所需时间不能为空",type:"error",showClose:!0,duration:1e3}),void(this.submitLoading=!1);if(!this.handleMaterial||""==this.handleMaterial)return this.$message({message:"办理所需材料不能为空",type:"error",showClose:!0,duration:1e3}),void(this.submitLoading=!1);if(!this.deliveryMaterial||""==this.deliveryMaterial)return this.$message({message:"交付材料不能为空",type:"error",showClose:!0,duration:1e3}),void(this.submitLoading=!1);if(!this.deliveryDuration||""==this.deliveryDuration)return this.$message({message:"交付时长不能为空",type:"error",showClose:!0,duration:1e3}),void(this.submitLoading=!1);var r=[];if(this.servicePrice.length>0)for(var a=0;a<this.servicePrice.length;a++)""==this.servicePrice[a].price&&""==this.servicePrice[a].name||r.push(this.servicePrice[a]);if(this.$route.query.id){var o={id:this.$route.query.id,companyId:this.$route.query.companyId,imgs:this.fileIntroList,introduce:this.content,logo:this.serviceLogoId,serviceCode:this.serviceCode,title:this.title,items:r,deliveryDuration:this.deliveryDuration,deliveryMaterial:this.deliveryMaterial,handleMaterial:this.handleMaterial,handleProcessDuration:this.handleProcessDuration,serviceDistrictVos:this.cityCodes};s.a.serviceUpdate(o).then(function(t){0==t.code&&(e.$message({message:"修改成功",type:"success",showClose:!0,duration:1e3}),e.submitLoading=!1,e.$router.push("/merchants/serviceManager?id="+e.$route.query.companyId))}).catch(function(t){e.submitLoading=!1})}else{var c={companyId:this.$route.query.companyId,imgs:this.fileIntroList,introduce:this.content,logo:this.serviceLogoId,serviceCode:this.serviceCode,title:this.title,items:this.servicePrice,deliveryDuration:this.deliveryDuration,deliveryMaterial:this.deliveryMaterial,handleMaterial:this.handleMaterial,handleProcessDuration:this.handleProcessDuration,serviceDistrictVos:this.cityCodes};s.a.serviceAdd(c).then(function(t){0==t.code&&(e.$message({message:"添加成功",type:"success",showClose:!0,duration:1e3}),e.submitLoading=!1,e.$router.push("/merchants/serviceManager?id="+e.$route.query.companyId))}).catch(function(t){e.submitLoading=!1})}},cancel:function(){this.$router.push("/merchants/serviceManager?id="+this.$route.query.companyId)}}},c=(i("7zX2"),i("XRV3"),i("KHd+")),n=Object(c.a)(o,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"serviceEdit"},[s("div",{staticClass:"serviceEdit_info"},[e._m(0),e._v(" "),s("div",{staticClass:"serviceManager_form"},[s("div",{staticClass:"form"},[s("div",{staticClass:"formItem"},[e._m(1),e._v(" "),s("div",{staticClass:"input",staticStyle:{overflow:"hidden"}},[s("el-select",{staticStyle:{width:"213Px",float:"left"},attrs:{disabled:e.editMark,placeholder:"请选择关联业务"},on:{change:e.firstServiceCodeChange},model:{value:e.firstServiceCode,callback:function(t){e.firstServiceCode=t},expression:"firstServiceCode"}},e._l(e.firstServiceCodeList,function(e){return s("el-option",{key:e.code,attrs:{label:e.name,value:e.code}})})),e._v(" "),e.secondServiceCodeList.length>0?s("el-select",{staticStyle:{width:"213Px",float:"left","margin-left":"30Px"},attrs:{disabled:e.editMark,placeholder:"请选择关联业务"},on:{change:e.secondServiceCodeChange},model:{value:e.secondServiceCode,callback:function(t){e.secondServiceCode=t},expression:"secondServiceCode"}},e._l(e.secondServiceCodeList,function(e){return s("el-option",{key:e.code,attrs:{label:e.name,value:e.code}})})):e._e()],1)]),e._v(" "),s("div",{staticClass:"formItem logoImg"},[s("label",{attrs:{for:"name"}},[e._v("服务LOGO")]),e._v(" "),s("div",{staticClass:"input"},[s("div",{staticClass:"imgUpload"},[s("el-upload",{attrs:{action:"","list-type":"picture-card",multiple:!1,"show-file-list":!1,"http-request":e.logoUpload}},[e.serviceLogo?s("img",{attrs:{src:e.serviceLogo,alt:""}}):e._e(),e._v(" "),s("i",{staticClass:"el-icon-plus"})])],1),e._v(" "),s("div",{staticClass:"deleteLogo"},[s("el-button",{directives:[{name:"show",rawName:"v-show",value:e.serviceLogo,expression:"serviceLogo"}],attrs:{icon:"el-icon-delete",size:"small",type:"danger"},on:{click:e.deleteServiceLogo}},[e._v("删除")])],1),e._v(" "),e._m(2)])]),e._v(" "),s("div",{staticClass:"formItem title"},[e._m(3),e._v(" "),s("div",{staticClass:"input"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.title,expression:"title"}],staticStyle:{width:"700Px"},attrs:{maxlength:"30",type:"text",placeholder:"请输入服务标题"},domProps:{value:e.title},on:{input:function(t){t.target.composing||(e.title=t.target.value)}}}),e._v(" "),s("span",{staticClass:"wordNum"},[e._v(e._s(e.title.length)+"/30")])])]),e._v(" "),s("div",{staticClass:"formItem uploadImg"},[s("label",{attrs:{for:"name"}},[e._v("宣传图片")]),e._v(" "),s("div",{staticClass:"input"},[s("div",{staticClass:"introImgList"},[s("div",{staticClass:"uploadImgList"},[s("el-upload",{class:e.imgTotal>=8?"disabled":"",attrs:{action:"","list-type":"picture-card",multiple:!0,limit:8,"file-list":e.fileList,"before-remove":e.handleRemoveBefore,"on-remove":e.handleRemove,"http-request":e.uploadList}},[s("i",{staticClass:"el-icon-plus"})])],1)]),e._v(" "),e._m(4)])]),e._v(" "),s("div",{staticClass:"formItem serviceArea"},[e._m(5),e._v(" "),s("div",{staticClass:"input"},[s("el-cascader-panel",{attrs:{props:e.props,options:e.cityTree},on:{change:e.selectAreaChange},model:{value:e.serviceArea,callback:function(t){e.serviceArea=t},expression:"serviceArea"}})],1)]),e._v(" "),s("div",{staticClass:"formItem textArea"},[e._m(6),e._v(" "),s("div",{staticClass:"input"},[s("div",{staticClass:"inputItem"},[s("span",[e._v("办理步骤及所需时间")]),e._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.handleProcessDuration,expression:"handleProcessDuration"}],staticStyle:{width:"325Px"},attrs:{maxlength:"400",rows:"5",type:"text",placeholder:"请输入办理步骤及所需时间"},domProps:{value:e.handleProcessDuration},on:{input:function(t){t.target.composing||(e.handleProcessDuration=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"inputItem"},[s("span",[e._v("办理所需材料")]),e._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.handleMaterial,expression:"handleMaterial"}],staticStyle:{width:"325Px"},attrs:{maxlength:"400",rows:"5",type:"text",placeholder:"请输入办理所需材料"},domProps:{value:e.handleMaterial},on:{input:function(t){t.target.composing||(e.handleMaterial=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"inputItem"},[s("span",[e._v("交付材料")]),e._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.deliveryMaterial,expression:"deliveryMaterial"}],staticStyle:{width:"325Px"},attrs:{maxlength:"400",rows:"5",type:"text",placeholder:"请输入交付材料"},domProps:{value:e.deliveryMaterial},on:{input:function(t){t.target.composing||(e.deliveryMaterial=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"inputItem"},[s("span",[e._v("交付时长")]),e._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.deliveryDuration,expression:"deliveryDuration"}],staticStyle:{width:"325Px"},attrs:{maxlength:"400",rows:"5",type:"text",placeholder:"请输入交付时长"},domProps:{value:e.deliveryDuration},on:{input:function(t){t.target.composing||(e.deliveryDuration=t.target.value)}}})])])]),e._v(" "),s("div",{staticClass:"formItem quote"},[s("label",{attrs:{for:"items"}},[e._v("服务报价")]),e._v(" "),s("div",{staticClass:"input"},[s("ul",e._l(e.servicePrice,function(t,r){return s("li",{key:"quote"+r},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.name,expression:"item.name",modifiers:{trim:!0}}],staticClass:"serviceTitle",attrs:{type:"text",placeholder:"服务项"},domProps:{value:t.name},on:{input:function(i){i.target.composing||e.$set(t,"name",i.target.value.trim())},blur:function(t){e.$forceUpdate()}}}),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.price,expression:"item.price",modifiers:{trim:!0}}],staticClass:"servicePrice",attrs:{type:"text",placeholder:"报价"},domProps:{value:t.price},on:{input:function(i){i.target.composing||e.$set(t,"price",i.target.value.trim())},blur:function(t){e.$forceUpdate()}}}),e._v(" "),s("div",{staticClass:"serviceDelete",on:{click:function(t){e.deleteServicePrice(r)}}},[s("img",{attrs:{src:i("LXNJ"),alt:""}})])])})),e._v(" "),s("div",{staticClass:"addService"},[s("el-button",{on:{click:e.addServicePrice}},[e._v("添加")])],1)])])]),e._v(" "),s("div",{staticClass:"submit"},[s("el-button",{on:{click:e.cancel}},[e._v("取消")]),e._v(" "),s("el-button",{attrs:{loading:e.submitLoading,type:"primary"},on:{click:e.submit}},[e._v("保存")])],1)])])])},[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"serviceManager_title"},[t("h4",[this._v("添加服务")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",{attrs:{for:"firstServiceCode"}},[this._v("关联业务 "),t("span",[this._v("*")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"logoWarning"},[t("p",[this._v("建议图片尺寸")]),this._v(" "),t("p",[this._v("150*150")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",{attrs:{for:"name"}},[this._v("服务标题 "),t("span",[this._v("*")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"warning"},[t("p",[this._v("添加几张图片，让您的服务更受欢迎")]),this._v(" "),t("p",[this._v("建议尺寸: 400*400px，最多8张")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",{attrs:{for:"serviceArea"}},[this._v("服务区域"),t("span",[this._v("*")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",{attrs:{for:"name"}},[this._v("服务信息 "),t("span",[this._v("*")])])}],!1,null,"328e8ff1",null);n.options.__file="serviceEdit.vue";t.default=n.exports},"2VRi":function(e,t,i){},"7zX2":function(e,t,i){"use strict";var s=i("2VRi");i.n(s).a},LXNJ:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAXVBMVEUAAAD/gEr/gEv/qlX/gEr/gEz/hlb/gEv/g1D/gEr/gEr/gEv/gEz/hEv/gEv/gEv/gEv/gEr/gEv/gEr/gEv/gEr/gUv/gEv/gEv/gEr/gEv/gkr/gFH/hEz/f0p5zqkzAAAAHnRSTlMA9Z0D0lwIlg7r5qM+INuP4cu3r4R8d3BmYE43Jhuq09x7AAABnUlEQVRIx4SQ23aCMBQF95FAAwWU+7Xz/5/ZLlstGtB5nlnJ2QpI5nNdpmZpWZ/nRG/wU2NssGbyOibpjADrjp6JxgwA18b56v2ax60DIBsj7fBVXe2h0IZiuDbVlwKWDLjEUfBufAGyRU/EBtbv/jbpDSx+8oE01wF5CjwUi4ErdEjhwJbNvRk4rxd4B9n98qiCtNBLihSq2yIjWK435Abj3woZ9HpLD9nvih1cEh0R3de9QKcfvG0nO52e/M+PzfTmJU3gorsPp0cfbkXkYJLUwKBNwOnB/w80QCMlBoXCIvRVgCWawUlhEfqSg1lnaBUUu75aOKuGWGGx5yuGWiXk2il2fOVQKoVVO0UZ+lohlYHXXhH68mDflZYxDsAwDAKHVvLW/KD/f2alDD3rnIUdpJhg8JlwPS/iiaAnoeeefD6JoYW/N2MOLVnRXy5BVn8c+sPoH4c1hIcha2A+42F082Fv4cXA3izQwMNggbyi9eNhrL6iIwSq7JKlEMhiJg2yOCrTME7jPi2UvLLyUsxrNy/2/HTIj5P4/PkA8vQ8J/Nu9mgAAAAASUVORK5CYII="},MSNs:function(e,t,i){"use strict";i.d(t,"a",function(){return r});var s=i("DG18");function r(e){return Object(s.b)("/fileupload/upload",e)}},XRV3:function(e,t,i){"use strict";var s=i("pd+/");i.n(s).a},kaoP:function(e,t,i){"use strict";i.d(t,"c",function(){return r}),i.d(t,"b",function(){return a}),i.d(t,"a",function(){return o}),i.d(t,"d",function(){return c});var s=i("DG18");function r(){return Object(s.a)("/address/provinces")}function a(e){return Object(s.a)("/address/citys",e)}function o(e){return Object(s.a)("/address/areas",e)}function c(e){return Object(s.a)("/address/globalTrees",e)}},lFhg:function(e,t,i){"use strict";var s=i("DG18"),r=i("Qyje"),a=i.n(r);t.a={serviceList:function(e){var t=a.a.stringify(e);return Object(s.b)("/merchant/service/list",t)},serviceAdd:function(e){return Object(s.b)("/merchant/service/add",e)},serviceUpdate:function(e){return Object(s.b)("/merchant/service/update",e)},serviceShelfDown:function(e){var t=a.a.stringify(e);return Object(s.b)("/merchant/service/shelf/down",t)},serviceShelfUp:function(e){var t=a.a.stringify(e);return Object(s.b)("/merchant/service/shelf/up",t)},serviceItemTrees:function(e){return Object(s.a)("/merchant/service/service_items",e)},serviceEdit:function(e){return Object(s.a)("/merchant/service/edit",e)},serviceTemplate:function(e){return Object(s.a)("/merchant/service/template",e)}}},"pd+/":function(e,t,i){}}]);