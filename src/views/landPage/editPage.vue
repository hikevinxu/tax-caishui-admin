<template>
	<div class="create_page">
		<div class="form">
			<el-form label-width="200px" :model="formData" :rules="rules" ref="createPage">
				<div  style="margin-bottom: 12px;"><span style="font-size: 16px; padding: 15px; border-radius: 5px;">投放目标</span></div>
				<el-form-item label="投放应用：" prop="packageName">
          <el-select v-model="formData.packageName" placeholder="请选择">
            <el-option v-for="item in app" :label="item" :value="item" :key="item"></el-option>
          </el-select>
        </el-form-item>
				<el-form-item label="投放渠道：" prop="advertisingChannel">
          <el-input type="text" placeholder="请输入投放渠道" v-model="formData.advertisingChannel"></el-input>
          </el-form-item>
          <el-form-item label="渠道备注：" prop="channelRemark">
            <el-input type="text" placeholder="请输入渠道备注" v-model="formData.channelRemark"></el-input>
          </el-form-item>
				<div  style="margin-bottom: 12px;"><span style="font-size: 16px; padding: 15px; border-radius: 5px;">落地页配置</span></div>
				<el-form-item label="落地页url：" prop="landpageUrl">
          <el-input type="text" placeholder="" v-model="formData.landpageUrl" readonly></el-input>
        </el-form-item>
        <el-form-item label="客户端类型：" prop="clientType">
          <el-radio-group disabled v-model="formData.clientType">
            <el-radio label="h5">移动端</el-radio>
            <el-radio label="pc">PC端</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="落地页标题：" prop="title">
          <el-input type="text" placeholder="请输入落地页标题" v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item
          label="头图：" prop="headImg" >
          <el-upload
            action=""
            :show-file-list="false"
            :http-request="uploadHeadImg">
            <img v-if="headImgUrl" :src="headImgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button icon="el-icon-delete" size="small" type="danger" v-show="headImgUrl" @click="deleteHeadImg">删除</el-button>
        </el-form-item>
        <!-- <el-form-item label="头部浮层：" prop="topImg"  >
          <el-upload
            action=""
            :show-file-list="false"
            :http-request="uploadTopImg">
            <img v-if="topImgUrl" :src="topImgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button icon="el-icon-delete" size="small" type="danger" v-show="topImgUrl" @click="deleteTopImg">删除</el-button>
        </el-form-item> -->
        <!-- <el-form-item label="浮层距顶部高度：" prop="topSpace" >
          <el-input type="number" placeholder="请输入浮层距顶部高度：" v-model="formData.topSpace"></el-input>
        </el-form-item> -->
        <el-form-item label="页面背景颜色：" prop="pageBgColor" >
          <el-color-picker v-model="formData.pageBgColor" size="medium"></el-color-picker>
        </el-form-item>
        <el-form-item label="页面类型：" prop="pageType">
          <el-radio-group v-model="formData.pageType">
            <el-radio :label="1">预注册</el-radio>
            <el-radio :label="2">直接下载</el-radio>
            <el-radio :label="3">意向收集</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否显示节税计算器：">
          <el-switch v-model="formData.showCounter"></el-switch>
        </el-form-item>
        <el-form-item label="意向收集表单类型：" prop="formType" v-if="formData.pageType == 3">
          <el-select style="width: 300px;" v-model="formData.formType" placeholder="请选择" @change="formTypeChange">
            <el-option v-for="item in formTypeList" :label="item.name" :value="item.id" :key="item.id" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表单标题：" prop="formTitle">
          <el-input type="text" placeholder="请输入表单标题" v-model="formData.formTitle"></el-input>
		    </el-form-item>
        <el-form-item label="表单区域背景颜色：" prop="pageBgColor">
            <el-color-picker v-model="formData.preRegisterBgColor" size="medium"></el-color-picker>
        </el-form-item>
        <el-form-item label="按钮背景颜色：" prop="buttonBgColor">
          <el-color-picker v-model="formData.buttonBgColor" size="medium"></el-color-picker>
        </el-form-item>
        <el-form-item label="按钮文案：" prop="buttonRemark" >
          <el-input type="text" placeholder="请输入按钮文案" v-model="formData.buttonRemark"></el-input>
        </el-form-item>
        <el-form-item label="按钮文案颜色：" prop="buttonRemarkColor" >
          <el-color-picker v-model="formData.buttonRemarkColor" size="medium"></el-color-picker>
        </el-form-item>
        <el-form-item label="下载地址：" prop="dowloadUrl" >
          <el-input type="text" placeholder="请输入下载地址" v-model="formData.dowloadUrl"></el-input>
        </el-form-item>
        <el-form-item label="按钮下方文案颜色：" prop="buttonRemarkColor" >
          <el-color-picker v-model="formData.buttonUnderColor" size="medium"></el-color-picker>
        </el-form-item>
        <el-form-item label="按钮下方文案：" prop="buttonUnder" >
          <el-input type="textarea" :rows="3" placeholder="请输入按钮下方文案" v-model="formData.buttonUnder"></el-input>
        </el-form-item>
        <el-form-item label="二维码下方文案颜色：" prop="dimensionalColor" v-if="formData.clientType == 'pc'">
          <el-color-picker v-model="formData.dimensionalColor" size="medium"></el-color-picker>
		    </el-form-item>
        <el-form-item label="二维码下方文案：" prop="dimensionalText" v-if="formData.clientType == 'pc'">
          <el-input type="textarea" :rows="3" placeholder="请输入按钮下方文案" v-model="formData.dimensionalText"></el-input>
		    </el-form-item>
        <el-form-item label="底图：" prop="tailImg">
          <el-upload
            action=""
            :show-file-list="false"
            :http-request="uploadTailImg">
            <img v-if="tailImgUrl" :src="tailImgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button icon="el-icon-delete" size="small" type="danger" v-show="tailImgUrl" @click="deleteTailImg">删除</el-button>
        </el-form-item>
        <el-form-item label="风险说明文案颜色：" prop="buttonRemarkColor" >
          <el-color-picker v-model="formData.riskInfoColor" size="medium"></el-color-picker>
        </el-form-item>
        <el-form-item label="风险说明：" prop="riskInfo" >
          <el-input type="textarea" :rows="3" placeholder="请输入风险说明" v-model="formData.riskInfo"></el-input>
        </el-form-item>
        <el-form-item label="公司名称、备案号文案颜色：" prop="buttonRemarkColor">
          <el-color-picker v-model="formData.companyInfoColor" size="medium"></el-color-picker>
        </el-form-item>
        <el-form-item label="公司名称、备案号：" prop="companyInfo">
          <el-input type="textarea" :rows="3" placeholder="请输入公司名称、备案号" v-model="formData.companyInfo"></el-input>
        </el-form-item>
        <el-form-item label="js基础代码：" prop="jsBase">
          <el-input type="textarea" :rows="3" placeholder="请输入js基础代码" v-model="formData.jsBase"></el-input>
        </el-form-item>
        <el-form-item label="js转化代码：" prop="jsReport">
          <el-input type="textarea" :rows="3" placeholder="请输入js转化代码" v-model="formData.jsReport"></el-input>
        </el-form-item>
			</el-form>
      <div class="handle_btn">
        <el-button type="primary" style="margin-top: 12px;" @click="$router.back()">返回</el-button>
        <el-button type="primary" style="margin-top: 12px;" @click="handleSubmit">保存</el-button>
      </div>
		</div>
		<div class="preview" v-if="formData.clientType == 'h5'">
			<div class="preview_box" :style="{'background-color': formData.pageBgColor}">
				<div class="page_title">{{formData.title}}</div>
				<div class="container1">
				  <img class="banner" :src="headImgUrl" ref="banner">
					<img class="topImg" :src="topImgUrl" :style="{top: formData.topSpace + 'px'}">
          <div class="taxCalculator" v-if="formData.showCounter" :style="{'background-color': formData.preRegisterBgColor}">
            <div class="tax-top">
              <div class="tab">
                <div style="color: #FF7F4A;" class="tab-item">企业节税计算器</div>
                <div style="background: #fafafa" class="tab-item">个人节税计算器</div>
              </div>
              <div class="tax-Content">
                <div class="tax_form_item">
                  <label>企业增值税率</label>
                  <input style="text-align: right;" type="text" readonly placeholder="请选择">
                </div>
                <div class="tax_form_item">
                  <label>企业开票金额</label>
                  <input style="text-align: right;" type="tel" readonly placeholder="请输入整数">
                  <span>万元</span>
                </div>
                <div class="tax_form_item">
                  <label>企业年利润</label>
                  <input style="text-align: right;" type="tel" readonly  placeholder="请输入整数">
                  <span>万元</span>
                </div>
              </div>
              <div class="tax-Content_bottom">
                <p><span>应缴纳税</span><span>--万元</span></p>
                <p><span>预计节税</span><span>--万元</span></p>
              </div>
            </div>
            <span :style="{'background': formData.preRegisterBgColor}" class="yuan"></span>
            <span :style="{'background': formData.preRegisterBgColor}" class="yuan"></span>
          </div>
					<div :style="{'background-color': formData.preRegisterBgColor, 'padding': '16px 0', position: 'relative'}">
						<div class="registered-icon" v-if="formData.pageType == 1">
              <form class="registered-form" method="post">
                <div class="registered-form-item">
                  <input type="number" pattern="\d*" class="registered-form-phone" placeholder="请输入正确的手机号" readonly>
                </div>
              </form>
            </div>
            <div class="intentionCollect" v-if="formData.pageType == 3">
              <div class="intentionCollect_form" v-if="formData.formType == 1">
                <div class="title">{{formData.formTitle}}</div>
                <div class="form_item">
                  <label>国家/地区<span>*</span></label>
                  <div class="select"><input :style="{'background-color': formData.preRegisterBgColor}" type="text" readonly placeholder="请选择"></div>
                </div>
                <div class="form_item">
                  <label>注册意向<span>*</span></label>
                  <div class="select"><input :style="{'background-color': formData.preRegisterBgColor}" type="text" readonly placeholder="请选择"></div>
                </div>
                <div class="form_item">
                  <label>联系电话<span>*</span></label>
                  <div class="select"><input :style="{'background-color': formData.preRegisterBgColor}" type="tel" readonly placeholder="请输入"></div>
                </div>
                <div class="form_item">
                  <label>如何称呼<span>*</span></label>
                  <div class="select"><input :style="{'background-color': formData.preRegisterBgColor}" type="text" readonly placeholder="请输入"></div>
                </div>
              </div>
              <div class="intentionCollect_form" v-if="formData.formType == 2">
                <div class="title">{{formData.formTitle}}</div>
                <div class="form_item">
                  <label>城市/地区<span>*</span></label>
                  <div class="select"><input :style="{'background-color': formData.preRegisterBgColor}" type="text" readonly placeholder="如：杭州-西湖区"></div>
                </div>
                <div class="form_item">
                  <label>联系电话<span>*</span></label>
                  <div class="select"><input :style="{'background-color': formData.preRegisterBgColor}" type="tel" readonly placeholder="请输入"></div>
                </div>
                <div class="form_item">
                  <label>如何称呼<span>*</span></label>
                  <div class="select"><input :style="{'background-color': formData.preRegisterBgColor}" type="text" readonly placeholder="请输入"></div>
                </div>
              </div>
            </div>
            <div class="download_btn" :style="{'background-color': formData.buttonBgColor, color: formData.buttonRemarkColor}">{{formData.buttonRemark}}</div>
            <div class="tip form_tip" v-if="formData.buttonUnder" v-html="handleText(formData.buttonUnder)" :style="{color: formData.buttonUnderColor}"></div>	
					</div>
          <img class="intro" v-if="tailImgUrl" :src="tailImgUrl">
          <div class="bottom_text2 riskInfo" v-if="formData.riskInfo" v-html="handleText(formData.riskInfo)" :style="{color: formData.riskInfoColor}"></div>	
          <div class="bottom">
            <div class="line1"></div>
            <div class="bottom_text2" v-html="handleText(formData.companyInfo)" :style="{color: formData.companyInfoColor}"></div>
          </div>	
				</div>
			</div>
		</div>
    <div class="pc-preview" v-if="formData.clientType == 'pc'">
      <el-button type="primary" @click="pc_preview_dialog = true">在线预览</el-button>
      <el-dialog title="pc端预览" :modal-append-to-body='false' :visible.sync="pc_preview_dialog" width="1280px">
        <div class="landPage_pc"  :style="'background: ' + formData.pageBgColor">
          <div class="landPagePC">
            <div class="landPagePC-center">
              <div class="headImgContent">
                <img class="headImg" v-if="headImgUrl" :src="headImgUrl" alt="">
                <div class="headContent">
                  <div class="form" :style="{'background': formData.preRegisterBgColor}">
                    <div class="taxCalculator-pc" v-if="formData.showCounter">
                      <div class="taxCalculator-header">
                        <div class="title">节税计算器</div>
                        <ul class="tab">
                          <li :class="activeTab == 1 ? 'active' : ''" @click="activeTab = 1">企业</li>
                          <li :class="activeTab == 2 ? 'active' : ''" @click="activeTab = 2">个人</li>
                        </ul>
                      </div>
                      <div v-if="activeTab == 1" class="taxCalculator-content">
                        <div class="tax-form">
                          <div class="tax-formItem">
                            <label>企业增值税率</label>
                            <input type="tel" readonly placeholder="请选择">
                          </div>
                          <div class="tax-formItem">
                            <label>企业开票金额</label>
                            <input type="tel" readonly placeholder="请输入整数">
                            <span>万元</span>
                          </div>
                          <div class="tax-formItem">
                            <label>企业年利润</label>
                            <input type="tel"  readonly placeholder="请输入整数">
                            <span>万元</span>
                          </div>
                        </div>
                        <div class="tax-bottom">
                          <p><span>应缴纳税</span><span>--万元</span></p>
                          <p><span>预计节税</span><span>--万元</span></p>
                        </div>
                      </div>
                      <div v-if="activeTab == 2" class="taxCalculator-content">
                        <div class="tax-form">
                          <div class="tax-formItem">
                            <label>工资薪金（月）</label>
                            <input type="tel" readonly placeholder="如：8000">
                            <span>元</span>
                          </div>
                          <div class="tax-formItem">
                            <label>劳务报酬（月）</label>
                            <input type="tel" readonly placeholder="如：8000">
                            <span>元</span>
                          </div>
                          <div class="tax-formItem">
                            <label>年终奖（年）</label>
                            <input type="tel" readonly placeholder="如：8000">
                            <span>元</span>
                          </div>
                        </div>
                        <div class="tax-bottom">
                          <p><span>应缴纳税</span><span>--元</span></p>
                          <p><span>预计节税</span><span>--元</span></p>
                        </div>
                      </div>
                    </div>
                    <div class="register" v-if="formData.pageType == 1">
                      <div class="formTitle"  v-if="formData.formTitle && formData.showCounter == false">{{formData.formTitle}}</div>
                      <div class="form_item">
                        <input type="text" maxlength="11" readonly placeholder="您的手机号" />
                      </div>
                      <div id="captcha"></div>
                      <div :style="{'background': formData.buttonBgColor, 'color': formData.buttonRemarkColor}" class="submitForm">{{formData.buttonRemark}}</div>
                      <div v-if="formData.buttonUnder" :style="{'color': formData.buttonUnderColor}" class="buttonUnder" v-html="handleText(formData.buttonUnder)"></div>
                    </div>
                    <div class="download"  v-if="formData.pageType == 2 && formData.showCounter == false">
                      <div class="qrcode"></div>
                      <div class="buttonUnder" :style="{'color': formData.dimensionalColor}" v-if="formData.dimensionalText" v-html="handleText(formData.dimensionalText)"></div>
                      <div id="captcha"></div>
                    </div>
                    <div class="download"  v-if="formData.pageType == 2 && formData.showCounter == true">
                      <div :style="{'background': formData.buttonBgColor, color: formData.buttonRemarkColor}" class="submitForm">{{formData.buttonRemark}}</div>
                      <div v-if="formData.buttonUnder" :style="{'color': formData.buttonUnderColor}" class="buttonUnder" v-html="handleText(formData.buttonUnder)"></div>
                      <div id="captcha"></div>
                    </div>
                    <div class="intention" v-if="formData.pageType == 3">
                      <div class="formTitle"  v-if="formData.formTitle">{{formData.formTitle}}</div>
                      <div class="form_item" v-if="formData.formType == 1">
                        <input type="text" readonly  placeholder="请选择国家和地区" />
                      </div>
                      <div class="form_item" v-if="formData.formType == 1">
                        <input type="text" readonly  placeholder="请选择注册意向" />
                      </div>
                      <div class="form_item" v-if="formData.formType == 2">
                        <input type="text" readonly  placeholder="城市/地区 如：杭州-西湖区" />
                      </div>
                      <div class="form_item">
                        <input type="text" readonly placeholder="您的称呼" />
                      </div>
                      <div class="form_item">
                        <input type="text" maxlength="11" readonly placeholder="您的手机号" />
                      </div>
                      <div :style="{'background': formData.buttonBgColor, color: formData.buttonRemarkColor}" class="submitForm">{{formData.buttonRemark}}</div>
                      <div v-if="formData.buttonUnder" :style="{'color': formData.buttonUnderColor}" class="buttonUnder" v-html="handleText(formData.buttonUnder)"></div>
                      <div id="captcha"></div>
                    </div>
                  </div>
                </div>
              </div>
              <img class="footerImg" v-if="tailImgUrl" :src="tailImgUrl" alt="">
              <div class="footContent">
                <div class="topText" v-if="formData.riskInfo"><span :style="{'color': formData.riskInfoColor}" v-html="handleText(formData.riskInfo)"></span></div>
                <div class="bottomText" v-if="formData.companyInfo">
                  <span :style="{'color': formData.companyInfoColor}" v-html="handleText(formData.companyInfo)"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
	</div>
</template>

<script>
	import mixins from './mixins'
  import { channelPageObtainDetail } from '@/api/landPage'
  import { upLoadPicFromWeApp } from '@/api/qiniu'
  import { channelPageModify } from '@/api/landPage'
  import global from '@/utils/global'
	export default {
		data() {
			return {
        url: '',
        formTypeList: global.formTypeList,
				formData: {
					packageName: '小白贷款',
					advertisingChannel: '',
					channelRemark: '',
          landpageUrl: '',
          clientType: '',
          headImg: '',
          topImg: '',
					title: '',
					pageType: '',
					pageBgColor: '#FFFFFF',
					buttonBgColor: '#1574FF',
					buttonRemarkColor: '#FFFFFF',
					buttonRemark: '',
					dowloadUrl: '',
					buttonUnder: '',
          tailImg: '',
					riskInfo: '',
					companyInfo: '',
					jsBase: '',
					jsReport: '',
					status: '',
					preRegisterBgColor: '#FFFFFF',
					buttonUnderColor: '#555555',
					riskInfoColor: '#555555',
          companyInfoColor: '#999999',
          formType: '1',
          formTitle: '',
          dimensionalColor: '#555555',
          dimensionalText: '',
          showCounter: false
        },
        headImgUrl: '',
        topImgUrl: '',
        tailImgUrl: '',
        pc_preview_dialog: false,
        rules: {},
        activeTab: 1
			}
		},
		mixins: [mixins],
		watch: {
			'formData.pageBgColor': function(newValue) {
				if(!newValue) {
					this.formData.pageBgColor = '#FFFFFF'
				}
			},
			'formData.buttonBgColor': function(newValue) {
				if(!newValue) {
					this.formData.buttonBgColor = '#1574FF'
				}
			},
			'formData.buttonRemarkColor': function(newValue) {
				if(!newValue) {
					this.formData.buttonRemarkColor = '#FFFFFF'
				}
			}
		},
		methods: {
			getDetail() {
        let params = {
          id: this.$route.query.id
        }
        channelPageObtainDetail(params).then(res => {
          if(res.code == 0) {
            if (res.data.formJson) {
              res.data.formType = JSON.parse(res.data.formJson).formType
              res.data.formTypeName = JSON.parse(res.data.formJson).formTypeName
              res.data.formTitle = JSON.parse(res.data.formJson).formTitle
            }
            res.data.id = this.$route.query.id
            if (res.data.headImg) {
              this.headImgUrl = res.data.headImg
            }
            if (res.data.topImg) {
              this.topImgUrl = res.data.topImg
            }
            if (res.data.tailImg) {
              this.tailImgUrl = res.data.tailImg
            }
            this.formData = res.data
          }
        })
			},
			handleSubmit() {
        let params = this.formData
        if (this.formData.pageType == 3) {
          if (!this.formData.formType || this.formData.formType == '') {
            this.$message({
              type: 'error',
              message: '请先选择意向收集表单类型'
            })
            return
          }
          params.formJson = JSON.stringify({
            formType: this.formData.formType,
            formTypeName: this.formData.formTypeName,
            formTitle: this.formData.formTitle
          })
        }else if(this.formData.pageType == 1) {
          params.formJson = JSON.stringify({
            formType: '',
            formTypeName: '',
            formTitle: this.formData.formTitle
          })
        }
        
        channelPageModify(params).then(res => {
          if(res.code == 0){
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$router.push('/landPage')
          }
        })
			},
      handleText(text) {
        text = text.replace(/\n/g,"<br/>");
        return text
      },
      uploadHeadImg(item) {
        if(item.file.type.indexOf('image') == -1) {
					this.$message.error('只能上传图片文件')
					return
				}
        let formData = new FormData()
        formData.append('files', item.file)
        upLoadPicFromWeApp(formData).then(res => {
          if (res.code == 0) {
            let oFileReader = new FileReader()
            oFileReader.readAsDataURL(item.file)
            oFileReader.onloadend = (e) => {
              this.formData.headImg = res.data[0].fileId
              this.headImgUrl = e.target.result
              this.$forceUpdate()
            }
          }
        }).catch(err => {
          this.$message.error('上传失败，请重新上传')
        })
      },
      deleteHeadImg() {
        this.$forceUpdate()
        this.formData.headImg = ''
        this.headImgUrl = ''
      },
      uploadTopImg (item) {
        if(item.file.type.indexOf('image') == -1) {
					this.$message.error('只能上传图片文件')
					return
				}
        let formData = new FormData()
        formData.append('files', item.file)
        upLoadPicFromWeApp(formData).then(res => {
          if (res.code == 0) {
            let oFileReader = new FileReader()
            oFileReader.readAsDataURL(item.file)
            oFileReader.onloadend = (e) => {
              this.topImgUrl = e.target.result
              this.formData.topImg = res.data[0].fileId
              this.$forceUpdate()
            }
          }
        }).catch(err => {
          this.$message.error('上传失败，请重新上传')
        })
      },
      deleteTopImg() {
        this.$forceUpdate()
        this.formData.topImg = ''
        this.topImgUrl = ''
      },
      uploadTailImg(item) {
        if(item.file.type.indexOf('image') == -1) {
					this.$message.error('只能上传图片文件')
					return
				}
        let formData = new FormData()
        formData.append('files', item.file)
        upLoadPicFromWeApp(formData).then(res => {
          if (res.code == 0) {
            let oFileReader = new FileReader()
            oFileReader.readAsDataURL(item.file)
            oFileReader.onloadend = (e) => {
              this.$forceUpdate()
              this.tailImgUrl = e.target.result
              this.formData.tailImg = res.data[0].fileId
              this.$forceUpdate()
            }
          }
        }).catch(err => {
          this.$message.error('上传失败，请重新上传')
        })
      },
      deleteTailImg() {
        this.$forceUpdate()
        this.formData.tailImg = ''
        this.tailImgUrl = ''
      },
      formTypeChange(val) {
        for (let i=0;i<this.formTypeList.length;i++) {
          if (this.formTypeList[i].id == val) {
            this.formData.formTypeName = this.formTypeList[i].name
          }
        }
      }
		},
		created() {
			this.getDetail();
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.create_page {
		padding: 20px 0; 
		width: 100%; 
		min-width: 910px;
		height: auto; 
		background: #ffffff; 
		// display: flex;
		// justify-content: center;
		overflow-y: auto;
		.form {
			width: 750px;
			/deep/ .el-form {
				margin: 0 auto;
				width: 550px;
				flex-shrink: 0;
				.el-upload {
				    border: 1px dashed #d9d9d9;
				    border-radius: 6px;
				    cursor: pointer;
				    position: relative;
				    overflow: hidden;
				    width: 320px;
				    height: 140px;
				    .avatar {
				    	width: 320px;
				    	height: 140px;
				    }
				}
				.avatar-uploader-icon {
				    font-size: 28px;
				    color: #8c939d;
				    width: 320px;
				    height: 140px;
				    line-height: 140px;
				    text-align: center;
				}
			}
			.handle_btn {
				text-align: center;
			}
		}
		.preview {
			position: fixed;
			top: 100px;
			right: 100px;
			width: 360px;
			height: 680px;
			flex-shrink: 0;
			.preview_title {
				width: 100%;
				line-height: 40px;
				font-size: 28px;
			}
			.preview_box {
				margin: 0 auto;
				border: 1px solid #ebedf0;
				box-sizing: border-box;
				width: 360px;
				height: 640px;
				overflow: scroll;
        box-shadow: 0 4px 12px #ebedf0;
        border-radius: 2px;
        &::-webkit-scrollbar {
          display: none;
        }
				.page_title {
					width: 100%;
					line-height: 40px;
					font-size: 20px;
					color: rgba(0, 0, 0, 0.78);
					text-align: center;
				}
			}
		}
	}
	.container1 {
		position: relative;
	}
	.banner {
		width: 100%;
    display: block;
	}
	.topImg {
		position: absolute;
		top: 0;
		width: 100%;
	}
	.head {
		position: relative;
		padding-top: 164;
		width: 100%;
		box-sizing: border-box;
		background: #fff top no-repeat;
		background-size: 100%;
	}
	.logo {
		position: absolute;
		top: 20px;
		left: 32px;
		width: 100px;
		height: 24px;
	}
	.money {
		margin: 0 auto;
		font-family: PingFangSC-Semibold;
		font-size: 50px;
		color: #ECFF53;
		letter-spacing: 4px;
		text-align: center;
		font-weight: bold;
		line-height: 56px;
	}
	.intro {
		width: 100%;
    margin-top: 20px;
	}
	.download_btn {
		margin: 0 auto;
    width: 300px;
    height: 40px;
    margin: 16px auto;
    margin-bottom: 0;
		background: #1574FF;
		border-radius: 3px;
		font-family: PingFangSC-Medium;
		font-size: 15px;
		color: #FFFFFF;
		line-height: 40px;
		text-align: center;
	}
	.tip {
		margin-top: 24px;
		width: 300px;
    margin: 0 auto;
		box-sizing: border-box;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: rgba(0,0,0,0.60);
		text-align: center;
		line-height: 18px;
	}
	.form_tip {
		margin-top: 10px;
		line-height: 16px;
	}
	.bottom {
		padding: 0 24px 19px;
		padding-bottom: 19px;
		box-sizing: border-box;
		width: 100%;
	}
	.bottom_text1 {
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: rgba(0,0,0,0.38);
		text-align: left;
		line-height: 18px;
	}
	.line1 {
		margin-top: 15px;	
		width: 100%;
		height: 0;
		border-top: 1px solid rgba(0,0,0,0.12);
	}
	.bottom_text2 {
		margin-top: 10px;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: rgba(0,0,0,0.38);
		text-align: center;
		line-height: 18px;
	}
  .riskInfo {
    padding: 0 24px;
  }
	.registered-icon {
		margin: 0 auto;
    border-radius: 3px;
    width: 300px;
    text-align: center;
    overflow: hidden;
	}
	.registered-form {
		margin: 0 auto;
    border-radius: 3px;
    width: 100%;
	}
	.registered-form-item {
		width: 100%;
	}
	.registered-form-item input {
		padding-left: 35px;
    height: 40px;
    box-sizing: border-box;
    border: 1px solid rgba(0,0,0,0.12);
    border-radius: 4px;
    color: rgba(0,0,0,0.87);
    background-size: 14px 20px;
    font-size: 15px;
	}
	.registered-form-item input:focus {
		outline: none;
	}
	.registered-form-item input::-webkit-input-placeholder {
		font-family: PingFangSC-Regular;
    font-size: 15px;
    color: rgba(0,0,0,0.26);
    line-height: 23px;
	}
	.registered-form-phone {
		width: 300px;
    box-sizing: border-box;
    background: #fff url('../../assets/img/phone.png') 12px center no-repeat;
	}
  .intentionCollect {
      width: 100%;
      .title {
        margin-bottom: 20px;
        line-height: 20px;
      }
      .intentionCollect_form {
        width: 300px;
        margin: 0 auto;
        .form_item {
          margin-bottom: 10px;
          label {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            font-weight: 400;
            span {
              color: red;
            }
          }
          .select {
            height: 40px;
            border-bottom: 1px solid #ccc;
            line-height: 40px;
            font-size: 14px;
            color: #666666;
            input {
              width: 100%;
              outline: none;
              border: 0;
            }
          }
        }
      }
    }
  ::-webkit-input-placeholder { /* WebKit browsers */
    font-family: PingFangSC-Light, sans-serif;
    color:rgba(153,153,153,1);
    font-size: 14px;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    font-family: PingFangSC-Light, sans-serif;
    color:rgba(153,153,153,1);
    font-size: 14px;
  }

  :-ms-input-placeholder { /* Internet Explorer 10+ */
    font-family: PingFangSC-Light, sans-serif;
    color:rgba(153,153,153,1);
    font-size: 14px;
  }
  .taxCalculator {
    width: 100%;
    background-color: #FF7F4A;
    position: relative;
    .yuan {
      width: 10px;
      height: 10px;
      background-color: #FF7F4A;
      border-radius: 5px;
      position: absolute;
      bottom: 64px;
      right: 24px;
      &:last-child{
        left: 24px;
      }
    }
    .tax-top {
      width: 300px;
      margin: 0 auto;
      background: transparent;
      .tab {
        width: 100%;
        height: 40px;
        .tab-item {
          width: 50%;
          float: left;
          height: 40px;
          text-align: center;
          border-radius: 5px 5px 0 0;
          background-color: #ffffff;
          line-height: 40px;
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: rgba(0,0,0,0.60);
        }
      }
    }
    .tax-Content {
      width: 300px;
      background-color: #fff;
      padding: 16px;
      padding-top: 8px;
      .tax_form_item {
        height: 36px;
        background: #FAFAFA;
        box-sizing: border-box;
        border: 1px solid rgba(0,0,0,0.04);
        border-radius: 2px;
        padding: 8px;
        overflow: hidden;
        margin-bottom: 8px;
        position: relative;
        label {
          float: left;
          width: 100px;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: rgba(0,0,0,0.60);
          text-align: left;
          line-height: 20px;
        }
        input {
          float: right;
          width: 120px;
          height: 20px;
          background-color: #FAFAFA;
          font-family: PingFangSC-Regular;
          text-align: right;
          line-height: 20px;
          padding-right: 38px;
          font-size: 13px;
          color: rgba(0,0,0,0.60);
          outline: none;
          border: 0;
        }
        span {
          position: absolute;
          top: 8px;
          right: 12px;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: rgba(0,0,0,0.60);
          text-align: right;
          line-height: 20px;
        }
        &:last-child {
          margin-bottom: 0px;
        }
        ::-webkit-input-placeholder { /* WebKit browsers */
          font-family: PingFangSC-Light, sans-serif;
          color: rgba(0,0,0,0.26);
          font-size: 13px;
        }

        ::-moz-placeholder { /* Mozilla Firefox 19+ */
          font-family: PingFangSC-Light, sans-serif;
          color: rgba(0,0,0,0.26);
          font-size: 13px;
        }

        :-ms-input-placeholder { /* Internet Explorer 10+ */
          font-family: PingFangSC-Light, sans-serif;
          color: rgba(0,0,0,0.26);
          font-size: 13px;
        }
      }
    }
    .tax-Content_bottom {
      margin-top: 2px;
      background: #FFEADA;
      padding: 4px 0;
      border-radius: 2px;
      p {
        margin: 0;
        line-height: 30px;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: rgba(0,0,0,0.38);
        text-align: left;
        padding: 0 28px 0 24px;
        overflow: hidden;
        span {
          display: block;
          width: 50%;
          float: left;
          &:nth-last-child(1) {
            text-align: right;
          }
        }
        &:nth-last-child(1) {
          color: #FF7F4A;
        }
      }
    }
  }
  .create_page {
    .pc-preview {
      position: fixed;
      top: 100px;
			right: 100px;
    } 
  }
</style>
<style lang="scss" >
.el-dialog__body {
  width: 1280px;
  height: 600px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .landPage_pc {
    .landPagePC {
      width: 100%;
      margin: 0 auto;
      position: relative;
      .landPagePC-center {
        width: 100%;
        position: relative;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
      }
      .headImgContent {
        position: relative;
      }
      .footerImg,
      .headImg {
        display: block;
        width: 100%;
      }
      .headContent {
        width: 1000Px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -500Px;
        .form {
          width: 400Px;
          background-color: #fff;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translate(0, -50%);
          margin-top: -30Px;
          border-radius: 4Px;
          box-sizing: border-box;
          padding: 24PX 36Px;
          .taxCalculator-pc {
            width: 100%;
            padding: 24Px 0;
            .taxCalculator-header {
              width: 100%;
              height: 36Px;
              .title {
                float: left;
                font-family: PingFangSC-Medium;
                font-size: 20Px;
                color: rgba(0,0,0,0.87);
                line-height: 36Px;
              }
              .tab {
                padding: 0;
                margin: 0;
                float: right;
                font-family: PingFangSC-Medium;
                font-size: 14Px;
                color: #FF7F4A;
                text-align: left;
                line-height: 32Px;
                border: 2Px solid #FF7F4A;
                background-color: #FF7F4A;
                border-radius: 18Px;
                li {
                  padding: 0;
                  margin: 0;
                  float: left;
                  width: 96Px;
                  height: 32Px;
                  border-radius: 16Px;
                  text-align: center;
                  color: #fff;
                  cursor: pointer;
                  list-style: none;
                }
                li.active {
                  background-color: #fff;
                  color: #FF7F4A;
                }
              }
            }
            .taxCalculator-content {
              width: 100%;
              .tax-form {
                padding: 16Px 0;
                .tax-formItem {
                  margin-top: 8Px;
                  position: relative;
                  display: flex;
                  label {
                    display: block;
                    width: 100Px;
                    font-family: PingFangSC-Regular;
                    font-size: 13Px;
                    color: rgba(0,0,0,0.60);
                    text-align: left;
                    line-height: 36Px;
                  }
                  input {
                    flex: 1;
                    height: 36Px;
                    padding: 8Px 40Px 8Px 12Px;
                    box-sizing: border-box;
                    border: 1px solid rgba(0,0,0,0.12);
                    border-radius: 2Px;
                    outline: none;
                    font-size: 13Px;
                    color: rgba(0,0,0,0.60);
                    line-height: 20Px;
                  }
                  span {
                    position: absolute;
                    right: 12Px;
                    top: 0;
                    font-family: PingFangSC-Regular;
                    font-size: 13Px;
                    color: rgba(0,0,0,0.60);
                    text-align: right;
                    line-height: 36Px;
                  }
                }
              }
              .tax-bottom {
                width: 100%;
                height: 88Px;
                background: #FFEADA;
                border-radius: 2Px;
                font-family: PingFangSC-Medium;
                font-size: 14Px;
                color: rgba(0,0,0,0.38);
                text-align: left;
                line-height: 20Px;
                box-sizing: border-box;
                padding: 8Px 0;
                p {
                  padding: 0;
                  margin: 0;
                  display: block;
                  width: 100%;
                  line-height: 36Px;
                  overflow: hidden;
                  span {
                    float: left;
                    margin-left: 24Px;
                    &:last-child {
                      float: right;
                      margin-right: 24Px;
                    }
                  }
                  &:last-child{
                    color: #FF7F4A;
                  }
                }
              }
            }
          }
          .register,
          .download,
          .intention {
            .formTitle {
              font-size: 16Px;
              margin-bottom: 20Px;
              font-family: Alibaba PuHuiTi;
              font-weight: 400;
              color: rgba(252,96,57,1);
              line-height: 30Px;
              text-align: center;
            }
            .form_item {
              width: 100%;
              height: 40Px;
              box-sizing: border-box;
              background-color: #fff;
              margin-bottom: 12Px;
              cursor: pointer;
              input {
                display: block;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                padding: 14Px;
                line-height: 18Px;
                font-size: 14Px;
                font-family:PingFang SC;
                font-weight: 400;
                color:rgba(51,51,51,1);
                border: 1Px solid rgba(211,211,211,1);
                border-radius: 3Px;
                outline: none;
              }
            }
            .qrcode {
              width: 300Px;
              height: 300Px;
              margin: 0 auto;
              background-image: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
              #canvas {
                width: 100%!important;
                height: 100%!important;
              }
            }
            .submitForm {
              margin-top: 24Px;
              width: 100%;
              height: 40Px;
              background: linear-gradient(0deg,rgba(251,87,52,1) 0%,rgba(255,124,72,1) 100%);
              border-radius: 3Px;
              cursor: pointer;
              font-size: 14Px;
              line-height: 40Px;
              color: #fff;
              text-align: center;
            }
            .buttonUnder {
              text-align: center;
              font-family: PingFang SC;
              font-weight: 400;
              font-size: 12Px;
              margin-top: 8Px;
            }
          }
        }
      }
      .footContent {
        text-align: center;
        font-family: PingFang SC;
        font-weight: 400;
        font-size: 12Px;
        line-height: 30Px;
        padding: 10Px 0 20Px 0;
        .topText {
          line-height: 30Px;
        }
      }
    }
  }
}
</style>
