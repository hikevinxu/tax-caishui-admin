(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-07ac"],{"+jcw":function(t,e,a){"use strict";e.a={data:function(){return{app:["财税鱼"]}}}},"2j/+":function(t,e,a){},"3h/8":function(t,e,a){"use strict";var o=a("W4wz");a.n(o).a},MSNs:function(t,e,a){"use strict";a.d(e,"a",function(){return r});var o=a("DG18");function r(t){return Object(o.b)("/fileupload/upload",t)}},QDog:function(t,e,a){"use strict";e.a={jumpTypeList:[{name:"原生普通页面",id:1},{name:"h5链接",id:2},{name:"服务搜索页",id:3},{name:"公司详情页",id:4}],statusList:[{name:"待上架",id:0},{name:"已上架",id:1},{name:"已下架",id:2}],pageUrlList:[{name:"公司详情页",id:"main/home/queryService/company"},{name:"服务详情页",id:"main/home/queryService/servicer"}],formTypeList:[{name:"海外公司注册",id:1},{name:"公司注册",id:2}]}},VTUa:function(t,e,a){"use strict";a.r(e);var o=a("gDS+"),r=a.n(o),l=a("+jcw"),i=a("cYbK"),s=a("MSNs"),n=a("QDog"),m={data:function(){return{url:"",formTypeList:n.a.formTypeList,formData:{packageName:"小白贷款",advertisingChannel:"",channelRemark:"",landpageUrl:"",clientType:"",headImg:"",topImg:"",title:"",pageType:"",pageBgColor:"#FFFFFF",buttonBgColor:"#1574FF",buttonRemarkColor:"#FFFFFF",buttonRemark:"",dowloadUrl:"",buttonUnder:"",tailImg:"",riskInfo:"",companyInfo:"",jsBase:"",jsReport:"",status:"",preRegisterBgColor:"#FFFFFF",buttonUnderColor:"#555555",riskInfoColor:"#555555",companyInfoColor:"#999999",formType:"1",formTitle:"",dimensionalColor:"#555555",dimensionalText:""},headImgUrl:"",topImgUrl:"",tailImgUrl:"",pc_preview_dialog:!1,rules:{}}},mixins:[l.a],watch:{"formData.pageBgColor":function(t){t||(this.formData.pageBgColor="#FFFFFF")},"formData.buttonBgColor":function(t){t||(this.formData.buttonBgColor="#1574FF")},"formData.buttonRemarkColor":function(t){t||(this.formData.buttonRemarkColor="#FFFFFF")}},methods:{getDetail:function(){var t=this,e={id:this.$route.query.id};Object(i.f)(e).then(function(e){0==e.code&&(e.data.formJson&&(e.data.formType=JSON.parse(e.data.formJson).formType,e.data.formTypeName=JSON.parse(e.data.formJson).formTypeName,e.data.formTitle=JSON.parse(e.data.formJson).formTitle),e.data.id=t.$route.query.id,e.data.headImg&&(t.headImgUrl=e.data.headImg),e.data.topImg&&(t.topImgUrl=e.data.topImg),e.data.tailImg&&(t.tailImgUrl=e.data.tailImg),t.formData=e.data)})},handleSubmit:function(){var t=this,e=this.formData;if(3==this.formData.pageType){if(!this.formData.formType||""==this.formData.formType)return void this.$message({type:"error",message:"请先选择意向收集表单类型"});e.formJson=r()({formType:this.formData.formType,formTypeName:this.formData.formTypeName,formTitle:this.formData.formTitle})}else 1==this.formData.pageType&&(e.formJson=r()({formType:"",formTypeName:"",formTitle:this.formData.formTitle}));Object(i.e)(e).then(function(e){0==e.code&&(t.$message({type:"success",message:"修改成功"}),t.$router.push("/landPage"))})},handleText:function(t){return t=t.replace(/\n/g,"<br/>")},uploadHeadImg:function(t){var e=this;if(-1!=t.file.type.indexOf("image")){var a=new FormData;a.append("files",t.file),Object(s.a)(a).then(function(a){if(0==a.code){var o=new FileReader;o.readAsDataURL(t.file),o.onloadend=function(t){e.formData.headImg=a.data[0].fileId,e.headImgUrl=t.target.result,e.$forceUpdate()}}}).catch(function(t){e.$message.error("上传失败，请重新上传")})}else this.$message.error("只能上传图片文件")},deleteHeadImg:function(){this.$forceUpdate(),this.formData.headImg="",this.headImgUrl=""},uploadTopImg:function(t){var e=this;if(-1!=t.file.type.indexOf("image")){var a=new FormData;a.append("files",t.file),Object(s.a)(a).then(function(a){if(0==a.code){var o=new FileReader;o.readAsDataURL(t.file),o.onloadend=function(t){e.topImgUrl=t.target.result,e.formData.topImg=a.data[0].fileId,e.$forceUpdate()}}}).catch(function(t){e.$message.error("上传失败，请重新上传")})}else this.$message.error("只能上传图片文件")},deleteTopImg:function(){this.$forceUpdate(),this.formData.topImg="",this.topImgUrl=""},uploadTailImg:function(t){var e=this;if(-1!=t.file.type.indexOf("image")){var a=new FormData;a.append("files",t.file),Object(s.a)(a).then(function(a){if(0==a.code){var o=new FileReader;o.readAsDataURL(t.file),o.onloadend=function(t){e.$forceUpdate(),e.tailImgUrl=t.target.result,e.formData.tailImg=a.data[0].fileId,e.$forceUpdate()}}}).catch(function(t){e.$message.error("上传失败，请重新上传")})}else this.$message.error("只能上传图片文件")},deleteTailImg:function(){this.$forceUpdate(),this.formData.tailImg="",this.tailImgUrl=""},formTypeChange:function(t){for(var e=0;e<this.formTypeList.length;e++)this.formTypeList[e].id==t&&(this.formData.formTypeName=this.formTypeList[e].name)}},created:function(){this.getDetail()},mounted:function(){}},c=(a("jCDG"),a("3h/8"),a("KHd+")),p=Object(c.a)(m,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"create_page"},[a("div",{staticClass:"form"},[a("el-form",{ref:"createPage",attrs:{"label-width":"200px",model:t.formData,rules:t.rules}},[a("div",{staticStyle:{"margin-bottom":"12px"}},[a("span",{staticStyle:{"font-size":"16px",padding:"15px","border-radius":"5px"}},[t._v("投放目标")])]),t._v(" "),a("el-form-item",{attrs:{label:"投放应用：",prop:"packageName"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.formData.packageName,callback:function(e){t.$set(t.formData,"packageName",e)},expression:"formData.packageName"}},t._l(t.app,function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"投放渠道：",prop:"advertisingChannel"}},[a("el-input",{attrs:{type:"text",placeholder:"请输入投放渠道"},model:{value:t.formData.advertisingChannel,callback:function(e){t.$set(t.formData,"advertisingChannel",e)},expression:"formData.advertisingChannel"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"渠道备注：",prop:"channelRemark"}},[a("el-input",{attrs:{type:"text",placeholder:"请输入渠道备注"},model:{value:t.formData.channelRemark,callback:function(e){t.$set(t.formData,"channelRemark",e)},expression:"formData.channelRemark"}})],1),t._v(" "),a("div",{staticStyle:{"margin-bottom":"12px"}},[a("span",{staticStyle:{"font-size":"16px",padding:"15px","border-radius":"5px"}},[t._v("落地页配置")])]),t._v(" "),a("el-form-item",{attrs:{label:"落地页url：",prop:"landpageUrl"}},[a("el-input",{attrs:{type:"text",placeholder:"",readonly:""},model:{value:t.formData.landpageUrl,callback:function(e){t.$set(t.formData,"landpageUrl",e)},expression:"formData.landpageUrl"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"客户端类型：",prop:"clientType"}},[a("el-radio-group",{attrs:{disabled:""},model:{value:t.formData.clientType,callback:function(e){t.$set(t.formData,"clientType",e)},expression:"formData.clientType"}},[a("el-radio",{attrs:{label:"h5"}},[t._v("移动端")]),t._v(" "),a("el-radio",{attrs:{label:"pc"}},[t._v("PC端")])],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"落地页标题：",prop:"title"}},[a("el-input",{attrs:{type:"text",placeholder:"请输入落地页标题"},model:{value:t.formData.title,callback:function(e){t.$set(t.formData,"title",e)},expression:"formData.title"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"头图：",prop:"headImg"}},[a("el-upload",{attrs:{action:"","show-file-list":!1,"http-request":t.uploadHeadImg}},[t.headImgUrl?a("img",{staticClass:"avatar",attrs:{src:t.headImgUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),t._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:t.headImgUrl,expression:"headImgUrl"}],attrs:{icon:"el-icon-delete",size:"small",type:"danger"},on:{click:t.deleteHeadImg}},[t._v("删除")])],1),t._v(" "),a("el-form-item",{attrs:{label:"头部浮层：",prop:"topImg"}},[a("el-upload",{attrs:{action:"","show-file-list":!1,"http-request":t.uploadTopImg}},[t.topImgUrl?a("img",{staticClass:"avatar",attrs:{src:t.topImgUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),t._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:t.topImgUrl,expression:"topImgUrl"}],attrs:{icon:"el-icon-delete",size:"small",type:"danger"},on:{click:t.deleteTopImg}},[t._v("删除")])],1),t._v(" "),a("el-form-item",{attrs:{label:"浮层距顶部高度：",prop:"topSpace"}},[a("el-input",{attrs:{type:"number",placeholder:"请输入浮层距顶部高度："},model:{value:t.formData.topSpace,callback:function(e){t.$set(t.formData,"topSpace",e)},expression:"formData.topSpace"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"页面背景颜色：",prop:"pageBgColor"}},[a("el-color-picker",{attrs:{size:"medium"},model:{value:t.formData.pageBgColor,callback:function(e){t.$set(t.formData,"pageBgColor",e)},expression:"formData.pageBgColor"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"页面类型：",prop:"pageType"}},[a("el-radio-group",{model:{value:t.formData.pageType,callback:function(e){t.$set(t.formData,"pageType",e)},expression:"formData.pageType"}},[a("el-radio",{attrs:{label:1}},[t._v("预注册")]),t._v(" "),a("el-radio",{attrs:{label:2}},[t._v("直接下载")]),t._v(" "),a("el-radio",{attrs:{label:3}},[t._v("意向收集")])],1)],1),t._v(" "),3==t.formData.pageType?a("el-form-item",{attrs:{label:"意向收集表单类型：",prop:"formType"}},[a("el-select",{staticStyle:{width:"300px"},attrs:{placeholder:"请选择"},on:{change:t.formTypeChange},model:{value:t.formData.formType,callback:function(e){t.$set(t.formData,"formType",e)},expression:"formData.formType"}},t._l(t.formTypeList,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1):t._e(),t._v(" "),a("el-form-item",{attrs:{label:"表单标题：",prop:"formTitle"}},[a("el-input",{attrs:{type:"text",placeholder:"请输入表单标题"},model:{value:t.formData.formTitle,callback:function(e){t.$set(t.formData,"formTitle",e)},expression:"formData.formTitle"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"表单区域背景颜色：",prop:"pageBgColor"}},[a("el-color-picker",{attrs:{size:"medium"},model:{value:t.formData.preRegisterBgColor,callback:function(e){t.$set(t.formData,"preRegisterBgColor",e)},expression:"formData.preRegisterBgColor"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"按钮背景颜色：",prop:"buttonBgColor"}},[a("el-color-picker",{attrs:{size:"medium"},model:{value:t.formData.buttonBgColor,callback:function(e){t.$set(t.formData,"buttonBgColor",e)},expression:"formData.buttonBgColor"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"按钮文案：",prop:"buttonRemark"}},[a("el-input",{attrs:{type:"text",placeholder:"请输入按钮文案"},model:{value:t.formData.buttonRemark,callback:function(e){t.$set(t.formData,"buttonRemark",e)},expression:"formData.buttonRemark"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"按钮文案颜色：",prop:"buttonRemarkColor"}},[a("el-color-picker",{attrs:{size:"medium"},model:{value:t.formData.buttonRemarkColor,callback:function(e){t.$set(t.formData,"buttonRemarkColor",e)},expression:"formData.buttonRemarkColor"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"下载地址：",prop:"dowloadUrl"}},[a("el-input",{attrs:{type:"text",placeholder:"请输入下载地址"},model:{value:t.formData.dowloadUrl,callback:function(e){t.$set(t.formData,"dowloadUrl",e)},expression:"formData.dowloadUrl"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"按钮下方文案颜色：",prop:"buttonRemarkColor"}},[a("el-color-picker",{attrs:{size:"medium"},model:{value:t.formData.buttonUnderColor,callback:function(e){t.$set(t.formData,"buttonUnderColor",e)},expression:"formData.buttonUnderColor"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"按钮下方文案：",prop:"buttonUnder"}},[a("el-input",{attrs:{type:"textarea",rows:3,placeholder:"请输入按钮下方文案"},model:{value:t.formData.buttonUnder,callback:function(e){t.$set(t.formData,"buttonUnder",e)},expression:"formData.buttonUnder"}})],1),t._v(" "),"pc"==t.formData.clientType?a("el-form-item",{attrs:{label:"二维码下方文案颜色：",prop:"dimensionalColor"}},[a("el-color-picker",{attrs:{size:"medium"},model:{value:t.formData.dimensionalColor,callback:function(e){t.$set(t.formData,"dimensionalColor",e)},expression:"formData.dimensionalColor"}})],1):t._e(),t._v(" "),"pc"==t.formData.clientType?a("el-form-item",{attrs:{label:"二维码下方文案：",prop:"dimensionalText"}},[a("el-input",{attrs:{type:"textarea",rows:3,placeholder:"请输入按钮下方文案"},model:{value:t.formData.dimensionalText,callback:function(e){t.$set(t.formData,"dimensionalText",e)},expression:"formData.dimensionalText"}})],1):t._e(),t._v(" "),a("el-form-item",{attrs:{label:"底图：",prop:"tailImg"}},[a("el-upload",{attrs:{action:"","show-file-list":!1,"http-request":t.uploadTailImg}},[t.tailImgUrl?a("img",{staticClass:"avatar",attrs:{src:t.tailImgUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),t._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:t.tailImgUrl,expression:"tailImgUrl"}],attrs:{icon:"el-icon-delete",size:"small",type:"danger"},on:{click:t.deleteTailImg}},[t._v("删除")])],1),t._v(" "),a("el-form-item",{attrs:{label:"风险说明文案颜色：",prop:"buttonRemarkColor"}},[a("el-color-picker",{attrs:{size:"medium"},model:{value:t.formData.riskInfoColor,callback:function(e){t.$set(t.formData,"riskInfoColor",e)},expression:"formData.riskInfoColor"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"风险说明：",prop:"riskInfo"}},[a("el-input",{attrs:{type:"textarea",rows:3,placeholder:"请输入风险说明"},model:{value:t.formData.riskInfo,callback:function(e){t.$set(t.formData,"riskInfo",e)},expression:"formData.riskInfo"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"公司名称、备案号文案颜色：",prop:"buttonRemarkColor"}},[a("el-color-picker",{attrs:{size:"medium"},model:{value:t.formData.companyInfoColor,callback:function(e){t.$set(t.formData,"companyInfoColor",e)},expression:"formData.companyInfoColor"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"公司名称、备案号：",prop:"companyInfo"}},[a("el-input",{attrs:{type:"textarea",rows:3,placeholder:"请输入公司名称、备案号"},model:{value:t.formData.companyInfo,callback:function(e){t.$set(t.formData,"companyInfo",e)},expression:"formData.companyInfo"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"js基础代码：",prop:"jsBase"}},[a("el-input",{attrs:{type:"textarea",rows:3,placeholder:"请输入js基础代码"},model:{value:t.formData.jsBase,callback:function(e){t.$set(t.formData,"jsBase",e)},expression:"formData.jsBase"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"js转化代码：",prop:"jsReport"}},[a("el-input",{attrs:{type:"textarea",rows:3,placeholder:"请输入js转化代码"},model:{value:t.formData.jsReport,callback:function(e){t.$set(t.formData,"jsReport",e)},expression:"formData.jsReport"}})],1)],1),t._v(" "),a("div",{staticClass:"handle_btn"},[a("el-button",{staticStyle:{"margin-top":"12px"},attrs:{type:"primary"},on:{click:function(e){t.$router.back()}}},[t._v("返回")]),t._v(" "),a("el-button",{staticStyle:{"margin-top":"12px"},attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("保存")])],1)],1),t._v(" "),1==t.formData.clientType?a("div",{staticClass:"preview"},[a("div",{staticClass:"preview_box",style:{"background-color":t.formData.pageBgColor}},[a("div",{staticClass:"page_title"},[t._v(t._s(t.formData.title))]),t._v(" "),a("div",{staticClass:"container1"},[a("img",{ref:"banner",staticClass:"banner",attrs:{src:t.headImgUrl}}),t._v(" "),a("img",{staticClass:"topImg",style:{top:t.formData.topSpace+"px"},attrs:{src:t.topImgUrl}}),t._v(" "),a("div",{style:{"background-color":t.formData.preRegisterBgColor,"margin-top":"16px",position:"relative"}},[1==t.formData.pageType?a("div",{staticClass:"registered-icon"},[t._m(0)]):t._e(),t._v(" "),3==t.formData.pageType?a("div",{staticClass:"intentionCollect"},[1==t.formData.formType?a("div",{staticClass:"intentionCollect_form"},[a("div",{staticClass:"title"},[t._v(t._s(t.formData.formTitle))]),t._v(" "),a("div",{staticClass:"form_item"},[t._m(1),t._v(" "),a("div",{staticClass:"select"},[a("input",{style:{"background-color":t.formData.preRegisterBgColor},attrs:{type:"text",readonly:"",placeholder:"请选择"}})])]),t._v(" "),a("div",{staticClass:"form_item"},[t._m(2),t._v(" "),a("div",{staticClass:"select"},[a("input",{style:{"background-color":t.formData.preRegisterBgColor},attrs:{type:"text",readonly:"",placeholder:"请选择"}})])]),t._v(" "),a("div",{staticClass:"form_item"},[t._m(3),t._v(" "),a("div",{staticClass:"select"},[a("input",{style:{"background-color":t.formData.preRegisterBgColor},attrs:{type:"tel",readonly:"",placeholder:"请输入"}})])]),t._v(" "),a("div",{staticClass:"form_item"},[t._m(4),t._v(" "),a("div",{staticClass:"select"},[a("input",{style:{"background-color":t.formData.preRegisterBgColor},attrs:{type:"text",readonly:"",placeholder:"请输入"}})])])]):t._e(),t._v(" "),2==t.formData.formType?a("div",{staticClass:"intentionCollect_form"},[a("div",{staticClass:"title"},[t._v(t._s(t.formData.formTitle))]),t._v(" "),a("div",{staticClass:"form_item"},[t._m(5),t._v(" "),a("div",{staticClass:"select"},[a("input",{style:{"background-color":t.formData.preRegisterBgColor},attrs:{type:"text",readonly:"",placeholder:"如：杭州-西湖区"}})])]),t._v(" "),a("div",{staticClass:"form_item"},[t._m(6),t._v(" "),a("div",{staticClass:"select"},[a("input",{style:{"background-color":t.formData.preRegisterBgColor},attrs:{type:"tel",readonly:"",placeholder:"请输入"}})])]),t._v(" "),a("div",{staticClass:"form_item"},[t._m(7),t._v(" "),a("div",{staticClass:"select"},[a("input",{style:{"background-color":t.formData.preRegisterBgColor},attrs:{type:"text",readonly:"",placeholder:"请输入"}})])])]):t._e()]):t._e(),t._v(" "),a("div",{staticClass:"download_btn",style:{"background-color":t.formData.buttonBgColor,color:t.formData.buttonRemarkColor}},[t._v(t._s(t.formData.buttonRemark))]),t._v(" "),t.formData.buttonUnder?a("div",{staticClass:"tip form_tip",style:{color:t.formData.buttonUnderColor},domProps:{innerHTML:t._s(t.handleText(t.formData.buttonUnder))}}):t._e()]),t._v(" "),t.tailImgUrl?a("img",{staticClass:"intro",attrs:{src:t.tailImgUrl}}):t._e(),t._v(" "),t.formData.riskInfo?a("div",{staticClass:"bottom_text2 riskInfo",style:{color:t.formData.riskInfoColor},domProps:{innerHTML:t._s(t.handleText(t.formData.riskInfo))}}):t._e(),t._v(" "),a("div",{staticClass:"bottom"},[a("div",{staticClass:"line1"}),t._v(" "),a("div",{staticClass:"bottom_text2",style:{color:t.formData.companyInfoColor},domProps:{innerHTML:t._s(t.handleText(t.formData.companyInfo))}})])])])]):t._e(),t._v(" "),"pc"==t.formData.clientType?a("div",{staticClass:"pc-preview"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.pc_preview_dialog=!0}}},[t._v("在线预览")]),t._v(" "),a("el-dialog",{attrs:{title:"pc端预览","modal-append-to-body":!1,visible:t.pc_preview_dialog,width:"1080px"},on:{"update:visible":function(e){t.pc_preview_dialog=e}}},[a("div",{staticClass:"landPage_pc",style:"background: "+t.formData.pageBgColor},[a("div",{staticClass:"landPage_pc_header"},[t.headImgUrl?a("img",{attrs:{src:t.headImgUrl,alt:""}}):t._e(),t._v(" "),a("div",{class:3==t.formData.pageType?"form":"form otherForm",style:{background:t.formData.preRegisterBgColor}},[1==t.formData.pageType?a("div",{staticClass:"register"},[t.formData.formTitle?a("div",{staticClass:"formTitle"},[t._v(t._s(t.formData.formTitle))]):t._e(),t._v(" "),a("div",{staticClass:"form_item"},[a("input",{attrs:{type:"text",maxlength:"11",readonly:"",placeholder:"您的手机号"}})]),t._v(" "),a("div",{staticClass:"submitForm",style:{background:t.formData.buttonBgColor,color:t.formData.buttonRemarkColor}},[t._v(t._s(t.formData.buttonRemark))]),t._v(" "),t.formData.buttonUnder?a("div",{staticClass:"buttonUnder",style:{color:t.formData.buttonUnderColor},domProps:{innerHTML:t._s(t.handleText(t.formData.buttonUnder))}}):t._e()]):t._e(),t._v(" "),2==t.formData.pageType?a("div",{staticClass:"download"},[t.formData.formTitle?a("div",{staticClass:"formTitle"},[t._v(t._s(t.formData.formTitle))]):t._e(),t._v(" "),a("div",{staticClass:"qrcode"}),t._v(" "),t.formData.dimensionalText?a("div",{staticClass:"buttonUnder",style:{color:t.formData.dimensionalColor},domProps:{innerHTML:t._s(t.handleText(t.formData.dimensionalText))}}):t._e()]):t._e(),t._v(" "),3==t.formData.pageType?a("div",{staticClass:"intention"},[t.formData.formTitle?a("div",{staticClass:"formTitle"},[t._v(t._s(t.formData.formTitle))]):t._e(),t._v(" "),1==t.formData.formType?a("div",{staticClass:"form_item"},[a("div",{staticClass:"select"},[a("label",[t._v("请选择国家和地区"),a("span",{staticClass:"selectIcon"})])])]):t._e(),t._v(" "),1==t.formData.formType?a("div",{staticClass:"form_item"},[a("div",{staticClass:"select"},[a("label",[t._v("注册意向"),a("span",{staticClass:"selectIcon"})])])]):t._e(),t._v(" "),2==t.formData.formType?a("div",{staticClass:"form_item"},[a("input",{attrs:{type:"text",readonly:"",placeholder:"城市/地区 如：杭州-西湖区"}})]):t._e(),t._v(" "),a("div",{staticClass:"form_item"},[a("input",{attrs:{type:"text",readonly:"",placeholder:"您的称呼"}})]),t._v(" "),a("div",{staticClass:"form_item"},[a("input",{attrs:{type:"text",maxlength:"11",readonly:"",placeholder:"您的手机号"}})]),t._v(" "),a("div",{staticClass:"submitForm",style:{background:t.formData.buttonBgColor,color:t.formData.buttonRemarkColor}},[t._v(t._s(t.formData.buttonRemark))]),t._v(" "),t.formData.buttonUnder?a("div",{staticClass:"buttonUnder",style:{color:t.formData.buttonUnderColor},domProps:{innerHTML:t._s(t.handleText(t.formData.buttonUnder))}}):t._e()]):t._e()])]),t._v(" "),a("div",{staticClass:"landPage_pc_footer"},[t.tailImgUrl?a("img",{attrs:{src:t.tailImgUrl,alt:""}}):t._e()]),t._v(" "),a("div",{staticClass:"bottomCopyRight"},[t.formData.riskInfo?a("div",{staticClass:"topText"},[a("span",{style:{color:t.formData.riskInfoColor},domProps:{innerHTML:t._s(t.handleText(t.formData.riskInfo))}})]):t._e(),t._v(" "),t.formData.companyInfo?a("div",{staticClass:"bottomText"},[a("span",{style:{color:t.formData.companyInfoColor},domProps:{innerHTML:t._s(t.handleText(t.formData.companyInfo))}})]):t._e()])])])],1):t._e()])},[function(){var t=this.$createElement,e=this._self._c||t;return e("form",{staticClass:"registered-form",attrs:{method:"post"}},[e("div",{staticClass:"registered-form-item"},[e("input",{staticClass:"registered-form-phone",attrs:{type:"number",pattern:"\\d*",placeholder:"请输入正确的手机号",readonly:""}})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",[this._v("国家/地区"),e("span",[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",[this._v("注册意向"),e("span",[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",[this._v("联系电话"),e("span",[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",[this._v("如何称呼"),e("span",[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",[this._v("城市/地区"),e("span",[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",[this._v("联系电话"),e("span",[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",[this._v("如何称呼"),e("span",[this._v("*")])])}],!1,null,"3ad959b6",null);p.options.__file="editPage.vue";e.default=p.exports},W4wz:function(t,e,a){},cYbK:function(t,e,a){"use strict";a.d(e,"g",function(){return i}),a.d(e,"a",function(){return s}),a.d(e,"b",function(){return n}),a.d(e,"f",function(){return m}),a.d(e,"c",function(){return c}),a.d(e,"e",function(){return p}),a.d(e,"h",function(){return f}),a.d(e,"d",function(){return d});var o=a("DG18"),r=a("Qyje"),l=a.n(r);function i(t){return Object(o.a)("/api/channelPage/obtainPaging",t)}function s(t){var e=l.a.stringify(t);return Object(o.b)("/api/channelPage/addition",e)}function n(t){var e=l.a.stringify(t);return Object(o.b)("/api/channelPage/copy",e)}function m(t){return Object(o.a)("/api/channelPage/obtainDetail",t)}function c(t){var e=l.a.stringify(t);return Object(o.b)("/api/channelPage/delete",e)}function p(t){var e=l.a.stringify(t);return Object(o.b)("/api/channelPage/modify",e)}function f(t){return Object(o.a)("/api/channelPage/record",t)}function d(t){return Object(o.a)("/api/channelPage/intention/list",t)}},"gDS+":function(t,e,a){t.exports={default:a("oh+g"),__esModule:!0}},jCDG:function(t,e,a){"use strict";var o=a("2j/+");a.n(o).a},"oh+g":function(t,e,a){var o=a("WEpk"),r=o.JSON||(o.JSON={stringify:JSON.stringify});t.exports=function(t){return r.stringify.apply(r,arguments)}}}]);