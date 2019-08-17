<template>
	<div class="create_page">
		<div class="form">
			<el-form label-width="130px" :model="formData" :rules="rules" ref="createPage">
				<div  style="margin-bottom: 12px;">投放目标</div>
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
				<div  style="margin-bottom: 12px;">落地页配置</div>
				<el-form-item label="落地页url：" prop="landpageUrl">
          <el-input type="text" placeholder="" v-model="formData.landpageUrl" readonly></el-input>
        </el-form-item>
        <el-form-item label="落地页标题：" prop="title">
          <el-input type="text" placeholder="请输入落地页标题" v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item
          label="头图：" prop="headImg" v-if="formData.packageName != '风险检测h5'">
          <el-upload
            action=""
            :show-file-list="false"
            :http-request="uploadHeadImg">
            <img v-if="formData.headImgUrl" :src="formData.headImgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button icon="el-icon-delete" size="small" type="danger" v-show="formData.headImgUrl" @click="deleteHeadImg">删除</el-button>
        </el-form-item>
        <el-form-item label="头部浮层：" prop="topImg" v-if="formData.packageName != '风险检测h5'" >
          <el-upload
            action=""
            :show-file-list="false"
            :http-request="uploadTopImg">
            <img v-if="formData.topImgUrl" :src="formData.topImgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button icon="el-icon-delete" size="small" type="danger" v-show="formData.topImgUrl" @click="deleteTopImg">删除</el-button>
        </el-form-item>
        <el-form-item label="浮层距顶部高度：" prop="topSpace" v-if="formData.packageName != '风险检测h5'">
          <el-input type="number" placeholder="请输入浮层距顶部高度：" v-model="formData.topSpace"></el-input>
        </el-form-item>
          <el-form-item label="表单区域背景颜色：" prop="pageBgColor" v-if="formData.packageName != '风险检测h5'">
            <el-color-picker v-model="formData.preRegisterBgColor" size="medium"></el-color-picker>
        </el-form-item>
        <el-form-item label="页面类型：" prop="pageType" v-if="formData.packageName != '风险检测h5'">
          <el-radio-group v-model="formData.pageType">
            <el-radio :label="1">预注册</el-radio>
            <el-radio :label="2">直接下载</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="页面背景颜色：" prop="pageBgColor" v-if="formData.packageName != '风险检测h5'">
          <el-color-picker v-model="formData.pageBgColor" size="medium"></el-color-picker>
        </el-form-item>
        <el-form-item label="按钮背景颜色：" prop="buttonBgColor" v-if="formData.packageName != '风险检测h5'">
          <el-color-picker v-model="formData.buttonBgColor" size="medium"></el-color-picker>
        </el-form-item>
        <el-form-item label="按钮文案颜色：" prop="buttonRemarkColor" v-if="formData.packageName != '风险检测h5'">
          <el-color-picker v-model="formData.buttonRemarkColor" size="medium"></el-color-picker>
        </el-form-item>
        <el-form-item label="按钮文案：" prop="buttonRemark" v-if="formData.packageName != '风险检测h5'">
          <el-input type="text" placeholder="请输入按钮文案" v-model="formData.buttonRemark"></el-input>
        </el-form-item>
        <el-form-item label="下载地址：" prop="dowloadUrl" v-if="formData.packageName != '风险检测h5'">
          <el-input type="text" placeholder="请输入下载地址" v-model="formData.dowloadUrl"></el-input>
        </el-form-item>
        <el-form-item label="按钮下方文案颜色：" prop="buttonRemarkColor" v-if="formData.packageName != '风险检测h5'">
          <el-color-picker v-model="formData.buttonUnderColor" size="medium"></el-color-picker>
        </el-form-item>
        <el-form-item label="按钮下方文案：" prop="buttonUnder" v-if="formData.packageName != '风险检测h5'">
          <el-input type="textarea" :rows="3" placeholder="请输入按钮下方文案" v-model="formData.buttonUnder"></el-input>
        </el-form-item>
        <el-form-item label="底图：" prop="tailImg" v-if="formData.packageName != '风险检测h5'" >
          <el-upload
            action=""
            :show-file-list="false"
            :http-request="uploadTailImg">
            <img v-if="formData.tailImgUrl" :src="formData.tailImgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button icon="el-icon-delete" size="small" type="danger" v-show="formData.tailImgUrl" @click="deleteTailImg">删除</el-button>
        </el-form-item>
        <el-form-item label="风险说明文案颜色：" prop="buttonRemarkColor" v-if="formData.packageName != '风险检测h5'">
          <el-color-picker v-model="formData.riskInfoColor" size="medium"></el-color-picker>
        </el-form-item>
        <el-form-item label="风险说明：" prop="riskInfo" v-if="formData.packageName != '风险检测h5'">
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
		<div class="preview" v-if="formData.packageName != '风险检测h5'">
			<div class="preview_box" :style="{'background-color': formData.pageBgColor}">
				<div class="page_title">{{formData.title}}</div>
				<div class="container1">
				  <img class="banner" :src="formData.headImgUrl" ref="banner">
					<img class="topImg" :src="formData.topImgUrl" :style="{top: formData.topSpace + 'px'}">
					<div :style="{'background-color': formData.preRegisterBgColor, 'margin-top': '30px', position: 'relative'}">
						<div class="registered-icon" v-if="formData.pageType == 1">
              <form class="registered-form" method="post">
                <div class="registered-form-item">
                  <input type="number" pattern="\d*" class="registered-form-phone" placeholder="请输入正确的手机号" readonly>
                </div>
              </form>
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
	</div>
</template>

<script>
	import mixins from './mixins'
  import { channelPageObtainDetail } from '@/api/landPage'
  import { upLoadPicFromWeApp } from '@/api/qiniu'
  import { channelPageModify } from '@/api/landPage'
	export default {
		data() {
			return {
				url: '',
				formData: {
					packageName: '小白贷款',
					advertisingChannel: '',
					channelRemark: '',
					landpageUrl: '',
          headImg: '',
          headImgUrl: '',
          topImg: '',
          topImgUrl: '',
					title: '',
					pageType: '',
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
					preRegisterBgColor: '#FFFFFF',
					buttonUnderColor: '#555555',
					riskInfoColor: '#555555',
					companyInfoColor: '#999999'
				},
				rules: {}
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
            this.formData = res.data
            this.formData.id = this.$route.query.id
            this.formData.headImgUrl = res.data.headImg
            this.formData.topImgUrl = res.data.topImg
            this.formData.tailImgUrl = res.data.tailImg
          }
        })
			},
			handleSubmit() {
        channelPageModify(this.formData).then(res => {
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
              this.formData.headImgUrl = e.target.result
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
			width: 550px;
			/deep/ .el-form {
				margin: 0 auto;
				width: 450px;
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
			top: 140px;
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
    width: 268px;
    height: 40px;
    margin: 30px auto;
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
		width: 268px;
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
    width: 268px;
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
		width: 268px;
    box-sizing: border-box;
    background: #fff url('../../assets/img/phone.png') 12px center no-repeat;
	}
</style>