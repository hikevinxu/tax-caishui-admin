<template>
	<div class="create_page">
		<div class="form">
			<el-form label-width="180px" :model="formData" :rules="rules" ref="createPage" width="800px">
				<div  style="margin-bottom: 12px;"><span style="font-size: 16px; padding: 15px; border-radius: 5px;">投放目标</span></div>
				<el-form-item label="投放应用：" prop="packageName">
          <el-select v-model="formData.packageName" placeholder="请选择">
            <el-option v-for="item in app" :label="item" :value="item" :key="item" ></el-option>
          </el-select>
        </el-form-item>
				<el-form-item label="投放渠道：" prop="advertisingChannel">
          <el-input type="text" placeholder="请输入投放渠道" v-model="formData.advertisingChannel"></el-input>
        </el-form-item>
        <el-form-item label="渠道备注：" prop="channelRemark">
          <el-input type="text" placeholder="请输入渠道备注" v-model="formData.channelRemark"></el-input>
        </el-form-item>
				<div  style="margin-bottom: 12px;"><span style="font-size: 16px; border-radius: 5px;">落地页配置</span> </div>
				<!-- <el-form-item label="落地页url：" prop="url">
          <el-input type="text" placeholder="" v-model="formData.url" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="客户端类型：" prop="clientType">
          <el-radio-group v-model="formData.clientType">
            <el-radio label="h5">移动端</el-radio>
            <el-radio label="pc">PC端</el-radio>
          </el-radio-group>
        </el-form-item>
	      <el-form-item label="落地页标题：" prop="title">
		      <el-input type="text" placeholder="请输入落地页标题" v-model="formData.title"></el-input>
		    </el-form-item>
	      <el-form-item label="头图：" prop="headImg">
          <el-upload
            action=""
            :show-file-list="false"
            :http-request="uploadHeadImg">
            <img v-if="formData.headImgUrl" :src="formData.headImgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button icon="el-icon-delete" size="small" type="danger" v-show="formData.headImgUrl" @click="deleteHeadImg">删除</el-button>
        </el-form-item>
	      <el-form-item label="头部浮层：" prop="topImg">
          <el-upload
            action=""
            :show-file-list="false"
            :http-request="uploadTopImg">
            <img v-if="formData.topImgUrl" :src="formData.topImgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button icon="el-icon-delete" size="small" type="danger" v-show="formData.topImgUrl" @click="deleteTopImg">删除</el-button>
        </el-form-item>
        <el-form-item label="浮层距顶部高度：" prop="topSpace">
          <el-input type="number" placeholder="请输入浮层距顶部高度：" v-model="formData.topSpace"></el-input>
        </el-form-item>
        <el-form-item label="页面背景颜色：" prop="pageBgColor">
          <el-color-picker v-model="formData.pageBgColor" size="medium"></el-color-picker>
		    </el-form-item>
        <el-form-item label="页面类型：" prop="pageType">
          <el-radio-group v-model="formData.pageType">
            <el-radio :label="1">预注册</el-radio>
            <el-radio :label="2">直接下载</el-radio>
            <el-radio :label="3">意向收集</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="意向收集表单类型：" prop="pageType" v-if="formData.pageType == 3">
          <el-select style="width: 300px;" v-model="formData.formType" placeholder="请选择" @change="formTypeChange">
            <el-option v-for="item in formTypeList" :label="item.name" :value="item.id" :key="item.id" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表单标题：" prop="formTitle" v-if="formData.pageType == 3">
          <el-input type="text" placeholder="请输入表单标题" v-model="formData.formTitle"></el-input>
		    </el-form-item>
        <el-form-item label="表单区域背景颜色：" prop="pageBgColor">
          <el-color-picker v-model="formData.preRegisterBgColor" size="medium"></el-color-picker>
        </el-form-item>
        <el-form-item label="按钮文案：" prop="buttonRemark">
          <el-input type="text" placeholder="请输入按钮文案" v-model="formData.buttonRemark"></el-input>
		    </el-form-item>
        <el-form-item label="按钮背景颜色：" prop="buttonBgColor" >
          <el-color-picker v-model="formData.buttonBgColor" size="medium"></el-color-picker>
		    </el-form-item>
        <el-form-item label="按钮文案颜色：" prop="buttonRemarkColor" >
          <el-color-picker v-model="formData.buttonRemarkColor" size="medium"></el-color-picker>
		    </el-form-item>
        <el-form-item label="APP下载地址：" prop="dowloadUrl">
          <el-input type="text" placeholder="请输入下载地址" v-model="formData.dowloadUrl"></el-input>
		    </el-form-item>
        <el-form-item label="按钮下方文案颜色：" prop="buttonRemarkColor">
          <el-color-picker v-model="formData.buttonUnderColor" size="medium"></el-color-picker>
		    </el-form-item>
        <el-form-item label="按钮下方文案：" prop="buttonUnder">
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
            <img v-if="formData.tailImgUrl" :src="formData.tailImgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button icon="el-icon-delete" size="small" type="danger" v-show="formData.tailImgUrl" @click="deleteTailImg">删除</el-button>
        </el-form-item>
        <el-form-item label="风险说明文案颜色：" prop="buttonRemarkColor">
          <el-color-picker v-model="formData.riskInfoColor" size="medium"></el-color-picker>
		    </el-form-item>
        <el-form-item label="风险说明：" prop="riskInfo">
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
			<div class="preview" v-if="formData.clientType == 'h5'">
				<div class="preview_box" :style="{'background-color': formData.pageBgColor}">
					<div class="page_title">{{formData.title}}</div>
					<div class="container1">
					  <img class="banner" :src="formData.headImgUrl" ref="banner">
						<img class="topImg" :src="formData.topImgUrl" :style="{top: formData.topSpace + 'px'}">
						<div :style="{'background-color': formData.preRegisterBgColor, 'margin-top': '16px', position: 'relative'}">
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
				    <img class="intro" v-if="formData.tailImgUrl" :src="formData.tailImgUrl">
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
        <el-dialog :title="formData.title" :modal-append-to-body='false' :visible.sync="pc_preview_dialog" width="1080px" height="960px">
          <div class="landPage_pc"  :style="'background: ' + formData.pageBgColor">
            <div class="landPage_pc_header">
              <img v-if="formData.headImgUrl" :src="formData.headImgUrl" alt="">
              <div :style="{'background': formData.preRegisterBgColor}" :class="formData.pageType == 3 ? 'form' : 'form otherForm'">
                <div class="register" v-if="formData.pageType == 1">
                  <div class="formTitle"  v-if="formData.formTitle">{{formData.formTitle}}</div>
                  <div class="form_item">
                    <input type="text" maxlength="11" readonly placeholder="您的手机号" />
                  </div>
                  <div :style="{'background': formData.buttonBgColor, color: formData.buttonRemarkColor}" class="submitForm">{{formData.buttonRemark}}</div>
                  <div v-if="formData.buttonUnder" :style="{'color': formData.buttonUnderColor}" class="buttonUnder" v-html="handleText(formData.buttonUnder)"></div>
                </div>
                <div class="download"  v-if="formData.pageType == 2">
                  <div class="formTitle"  v-if="formData.formTitle">{{formData.formTitle}}</div>
                  <div class="qrcode"></div>
                  <div class="buttonUnder" :style="{'color': formData.dimensionalColor}" v-if="formData.dimensionalText" v-html="handleText(formData.dimensionalText)"></div>
                </div>
                <div class="intention" v-if="formData.pageType == 3">
                  <div class="formTitle"  v-if="formData.formTitle">{{formData.formTitle}}</div>
                  <div class="form_item" v-if="formData.formType == 1">
                    <div class="select">
                      <label>请选择国家和地区<span class="selectIcon"></span></label>
                    </div>
                  </div>
                  <div class="form_item" v-if="formData.formType == 1">
                    <div class="select">
                      <label>注册意向<span class="selectIcon"></span></label>
                    </div>
                  </div>
                  <div class="form_item" v-if="formData.formType == 2">
                    <input type="text" readonly placeholder="城市/地区 如：杭州-西湖区" />
                  </div>
                  <div class="form_item">
                    <input type="text" readonly placeholder="您的称呼" />
                  </div>
                  <div class="form_item">
                    <input type="text" maxlength="11" readonly placeholder="您的手机号" />
                  </div>
                  <div :style="{'background': formData.buttonBgColor, color: formData.buttonRemarkColor}" class="submitForm">{{formData.buttonRemark}}</div>
                  <div v-if="formData.buttonUnder" :style="{'color': formData.buttonUnderColor}" class="buttonUnder" v-html="handleText(formData.buttonUnder)"></div>
                 
                </div>
              </div>
            </div>
            <div class="landPage_pc_footer">
              <img v-if="formData.tailImgUrl" :src="formData.tailImgUrl" alt="">
            </div>
            <div class="bottomCopyRight">
              <div class="topText" v-if="formData.riskInfo"><span :style="{'color': formData.riskInfoColor}" v-html="handleText(formData.riskInfo)"></span></div>
              <div class="bottomText" v-if="formData.companyInfo">
                <span :style="{'color': formData.companyInfoColor}" v-html="handleText(formData.companyInfo)"></span>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
		</div>
	</div>
</template>

<script>
	import mixins from './mixins'
  import { upLoadPicFromWeApp } from '@/api/qiniu'
  import { channelPageAddition } from '@/api/landPage'
  import global from '@/utils/global'
	export default {
		data() {
			return {
        aaa: '',
        url: '',
        formTypeList: global.formTypeList,
				formData: {
					packageName: '财税鱼',
					advertisingChannel: '',
          channelRemark: '',
          clientType: 'h5',
          headImg: '',
          headImgUrl: '',
          topImg: '',
          topImgUrl: '',
					title: '',
					pageType: 1,
					pageBgColor: '#FFFFFF',
					buttonBgColor: '#1574FF',
					buttonRemarkColor: '#FFFFFF',
					buttonRemark: '',
					dowloadUrl: '',
					buttonUnder: '',
          tailImg: '',
          tailImgUrl: '',
					riskInfo: '',
					companyInfo: '',
					jsBase: '',
					jsReport: '',
					status: '',
					topSpace: 0,
					preRegisterBgColor: '#FFFFFF',
					buttonUnderColor: '#555555',
					riskInfoColor: '#555555',
          companyInfoColor: '#999999',
          formType: '',
          formTypeName: '',
          formTitle: '',
          dimensionalText: '',
          dimensionalColor: '#555555'
        },
        pc_preview_dialog: false,
				rules: {}
			}
		},
		watch: {
			'formData.pageBgColor': function(newValue) {
				console.log(newValue);
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
		mixins: [mixins],
		methods: {
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
        channelPageAddition(params).then(res => {
          if(res.code == 0){
            this.$message({
              type: 'success',
              message: '保存成功'
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
              this.formData.headImgUrl = e.target.result
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
        this.formData.headImgUrl = ''
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
              this.formData.topImgUrl = e.target.result
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
        this.formData.topImgUrl = ''
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
              this.formData.tailImgUrl = e.target.result
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
        this.formData.tailImgUrl = ''
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
	.registered-box {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
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
		border-radius: 3px;
    margin: 0 auto;
		width: 100%;
	}
	.registered-form-item input {
		padding-left: 35px;
    height: 40px;
    box-sizing: border-box;
    border: 1px solid rgba(0,0,0,0.12);
    border-radius: 3px;
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
    background: url('../../assets/img/phone.png') 12px center no-repeat;
	}
	.container {
		display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    overflow-x: hidden;
    min-height: 100%;
    width: 100%;
    position: relative;
    padding: 126px 16px 0;
    background: #f5f5f5;
    font-size: 14px;
    font-family: -apple-system,Helvetica Neue,Arial,PingFang SC,Hiragino Sans GB,STHeiti,Microsoft YaHei,Microsoft JhengHei,Source Han Sans SC,Noto Sans CJK SC,Source Han Sans CN,Noto Sans SC,Source Han Sans TC,Noto Sans CJK TC,WenQuanYi Micro Hei,SimSun,sans-serif;
	}
	.costumer-info-box {
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    display: -webkit-flex;
	    width: 100%;
	    flex-direction: column;
	    background-color: #fff;
	    box-shadow: 0 8px 8px 0 rgba(0,0,0,.08);
	    border-radius: 4px;
	}
	.report-item {
		position: relative;
	    width: 92%;
	    margin: 16px 0 12px;
	    background: #f5f5f5;
	    border-radius: 4px;
	    img {
	    	width: 100%;
    		position: relative;
	    }
	}
	.costumer-info-list {
		position: relative;
		width: 100%;
    padding: 0 18px;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
	}
	.head-info {
		position: relative;
	    display: inline-block;
	    width: 100%;
	    font-family: PingFangSC-Medium;
	    font-size: 12px;
	    color: rgba(0,0,0,.6);
	    text-align: left;
	    line-height: 20px;
	    left: 2px;
	    display: flex;
	    justify-content: flex-start;
	    align-items: center;
	    img {
	    	margin-right: 4px;
	    	width: 15px;
		    height: 15px;
	    }
	}
    .costumer-info-item {
    	margin-top: 7px;
	    width: 100%;
	    height: 40px;
	    display: flex;
	    justify-content: flex-start;
	    align-items: center;
	    background: #fff;
	    overflow: hidden;
	    border-radius: 2px;
	    border-bottom: 1px solid rgba(0,0,0,.04);
    }
    .costumer-info-icon {
    	width: 24px;
	    height: 24px;
	    margin-right: 8px;
    }
    .costumer-info-input {
    	width: 70%;
	    font-size: 14px;
	    height: 20px;
	    border: 0;
	    -webkit-appearance: none;
	    border-radius: 0;
	    border: 0;
	    background: transparent;
    }
    .success-tip {
    	position: absolute;
    	top: -22px;
	    left: -10px;
	    height: 22px;
	    line-height: 22px;
	    background: #fde4d6;
	    padding: 0 10px;
	    border-radius: 2px;
	    color: #888;
	    font-size: 12px;
    }
    .success-tri {
	    position: absolute;
	    display: block;
	    left: 30px;
	    bottom: -5px;
	    z-index: 2;
	    width: 10px;
	    height: 10px;
	    background-color: #fde4d6;
	    transform: rotate(45deg);
	}
    .test_btn {
    	position: relative;
	    margin-top: 24px;
	    width: 263px;
	    height: 36px;
	    background: #f37121;
	    border-radius: 18px;
	    text-align: center;
	    line-height: 36px;
	    font-size: 15px;
	    color: #fff;
    }
    .argument-agree {
    	margin: 12px 0 15px;
	    font-family: PingFangSC-Regular;
	    font-size: 11px;
	    color: rgba(0,0,0,.26);
    }
    .report-preview {
		background: #fff;
		position: relative;
		width: 100%;
		font-size: 12px;
		text-align: center;
		padding: 5px 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.report-preview img {
		width: 20px;
		height: 20px;
	}
	.report-preview a {
		color: #61abec;
		line-height: 20px;
		font-size: 11px;
	}
	.report-preview-line {
		position: relative;
		display: inline-block;
		height: 10px;
		top: 1px;
		margin: 0 20px;
	}
	.bottom-con {
		width: 100%;
		position: relative;
		background: transparent;
		text-align: center;
		padding: 20px 12px;
		box-sizing: border-box;
		margin-top: 6px;
	}
	.bottom-body, .bottom-item {
		position: relative;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-direction: normal;
	}
	.bottom-item {
		width: 40%;
		flex-direction: column;
		align-items: center;
		margin-bottom: 10px;
	}
	.item-img {
		position: relative;
		display: inline-block;
		width: 42px;
		height: 42px;
		margin-bottom: 6px;
	}
	.item-title {
		font-size: 14px;
		color: rgba(0,0,0,.6);
		margin-top: 5px;
		margin-bottom: 10px;
		font-family: PingFangSC-Medium;
		font-weight: 700;
	}
	.item-describe, .pay-tip {
		font-family: PingFangSC-Regular;
		color: rgba(0,0,0,.38);
		text-align: center;
		font-size: 12px;
		line-height: 16px;
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
  .create_page {
    .pc-preview {
      position: fixed;
      top: 100px;
			right: 100px;
    } 
  }
.el-dialog__body {
  width: 1080px;
  height: 960px;
}
</style>
<style lang="scss" >
.el-dialog__body {
  width: 1080px;
  height: 600px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .landPage_pc {
    .landPage_pc_header {
      width: 100%;
      position: relative;
      img {
        display: block;
        width: 100%;
      }
      .form {
        position: absolute;
        top: 106Px;
        right: 90Px;
        width: 315Px;
        background:rgba(255,255,255,1);
        border-radius: 3Px;
        box-sizing: border-box;
        padding: 20Px;
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
            .select {
              width: 100%;
              height: 100%;
              line-height: 10Px;
              font-size: 14Px;
              font-family: PingFang SC;
              font-weight: 400;
              color:rgba(51,51,51,1);
              -webkit-user-select:none;
              -moz-user-select:none;
              -ms-user-select:none;
              user-select:none;
              label {
                display: block;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                padding: 14Px;
                font-size: 14Px;
                font-family: PingFang SC;
                font-weight: 400;
                color:rgba(51,51,51,1);
                border: 1Px solid rgba(211,211,211,1);
                border-radius: 3Px;
                position: relative;
                cursor: pointer;
                span {
                  width: 0px;           /*  宽高设置为0，很重要，否则达不到效果 */
                  height: 0px;
                  border: 5Px solid #666;
                  border-bottom-color: transparent;   /* 设置透明背景色 */
                  border-left-color: transparent;
                  border-right-color: transparent;
                  position: absolute;
                  right: 14Px;
                  top: 17Px;
                }
              }
            }
          }
          .qrcode {
            width: 200Px;
            height: 200Px;
            margin: 0 auto;
            background-image: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
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
      .otherForm {
        top: 180Px;
      }
      ::-webkit-input-placeholder { /* WebKit browsers */
        font-size: 14Px;
        font-family: PingFang SC;
        font-weight: 400;
        color:rgba(51,51,51,1);
      }

      ::-moz-placeholder { /* Mozilla Firefox 19+ */
        font-size: 14Px;
        font-family: PingFang SC;
        font-weight: 400;
        color:rgba(51,51,51,1);
      }

      :-ms-input-placeholder { /* Internet Explorer 10+ */
        font-size: 14Px;
        font-family: PingFang SC;
        font-weight: 400;
        color:rgba(51,51,51,1);
      }
      input[type=number] {
          -moz-appearance:textfield;
      }
      input[type=number]::-webkit-inner-spin-button,
      input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
      }
    }
    .landPage_pc_footer {
      width: 100%;
      img {
        display: block;
        width: 100%;
      }
    }
    .bottomCopyRight {
      margin: 0 65Px;
      text-align: center;
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 12Px;
      margin-top: 10Px;
      line-height: 30Px;
      margin-bottom: 20Px;
      .topText {
        line-height: 30Px;
        border-bottom: 1px solid #ccc;
      }
    }
  }
}
</style>
