<template>
  <div class="serviceEdit">
    <div class="serviceEdit_info">
      <div class="serviceManager_title">
        <h4>添加服务</h4>
      </div>
      <div class="serviceManager_form">
        <div class="form">
          <div class="formItem">
            <label for="firstServiceCode">关联业务 <span>*</span></label>
            <div class="input" style="overflow: hidden;">
              <el-select style="width: 213Px; float: left;" v-model="firstServiceCode" :disabled="editMark" @change="firstServiceCodeChange" placeholder="请选择关联业务">
                <el-option
                  v-for="item in firstServiceCodeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
              <el-select v-if="secondServiceCodeList.length > 0" style="width: 213Px; float: left; margin-left: 30Px;" :disabled="editMark" v-model="secondServiceCode" @change="secondServiceCodeChange" placeholder="请选择关联业务">
                <el-option
                  v-for="item in secondServiceCodeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
              <!-- <el-select v-if="thirdServiceCodeList.length > 0" style="width: 213Px; float: left; margin-left: 30Px;" :disabled="editMark" v-model="thirdServiceCode" @change="thirdServiceCodeChange" placeholder="请选择关联业务">
                <el-option
                  v-for="item in thirdServiceCodeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select> -->
            </div>
          </div>
          <div class="formItem logoImg">
            <label for="name">服务LOGO</label>
            <div class="input">
              <div class="imgUpload">
                <el-upload
                  action=""
                  list-type="picture-card"
                  :multiple="false"
                  :show-file-list="false"
                  :http-request="logoUpload">
                  <img v-if="serviceLogo" :src="serviceLogo" alt="">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
              <div  class="deleteLogo">
                <el-button icon="el-icon-delete" size="small" type="danger" v-show="serviceLogo" @click="deleteServiceLogo">删除</el-button>
              </div>
              <div class="logoWarning">
                <p>建议图片尺寸</p>
                <p>150*150</p>
              </div>
            </div>
          </div>
          <div class="formItem title">
            <label for="name">服务标题 <span>*</span></label>
            <div class="input">
              <input style="width: 700Px;" maxlength="30" type="text" v-model="title" placeholder="请输入服务标题" />
              <span class="wordNum">{{title.length}}/30</span>
            </div>
          </div>
          <div class="formItem uploadImg">
            <label for="name">宣传图片</label>
            <div class="input">
              <div class="introImgList">
                <div class="uploadImgList">
                  <el-upload
                    :class="imgTotal >= 8 ? 'disabled' : ''"
                    action=""
                    list-type="picture-card"
                    :multiple="true"
                    :limit="8"
                    :file-list="fileList"
                    :before-remove="handleRemoveBefore"
                    :on-remove="handleRemove"
                    :http-request="uploadList">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </div>
              </div>
              <div class="warning">
                <p>添加几张图片，让您的服务更受欢迎</p>
                <p>建议尺寸: 400*400px，最多8张</p>
              </div>
            </div>
          </div>
          <div class="formItem serviceArea">
            <label for="serviceArea">服务区域<span>*</span></label>
            <div class="input">
              <el-cascader-panel v-model="serviceArea" :props="props" :options="cityTree" @change="selectAreaChange"></el-cascader-panel>
            </div>
          </div>
          <!-- <div class="formItem tinymce">
            <label for="content">服务介绍<span>*</span></label>
            <div class="input">
              <Tinymce ref="editor" :height="400" v-model="content" />
            </div>
          </div> -->
          <div class="formItem textArea">
            <label for="name">服务信息 <span>*</span></label>
            <div class="input">
              <div class="inputItem">
                <span>办理步骤及所需时间</span>
                <textarea style="width: 325Px;" maxlength="400" rows="5" type="text" v-model="handleProcessDuration" placeholder="请输入办理步骤及所需时间"></textarea>
              </div>
              <div class="inputItem">
                <span>办理所需材料</span>
                <textarea style="width: 325Px;" maxlength="400" rows="5" type="text" v-model="handleMaterial" placeholder="请输入办理所需材料"></textarea>
              </div>
              <div class="inputItem">
                <span>交付材料</span>
                <textarea style="width: 325Px;" maxlength="400" rows="5" type="text" v-model="deliveryMaterial" placeholder="请输入交付材料"></textarea>
              </div>
              <div class="inputItem">
                <span>交付时长</span>
                <textarea style="width: 325Px;" maxlength="400" rows="5" type="text" v-model="deliveryDuration" placeholder="请输入交付时长"></textarea>
              </div>
            </div>
          </div>
          <div class="formItem quote">
            <label for="items">服务报价</label>
            <div class="input">
              <ul>
                <li v-for="(item, index) in servicePrice" :key="'quote' + index">
                  <input class="serviceTitle" v-model.trim="item.name"  type="text" placeholder="服务项">
                  <input class="servicePrice" v-model.trim="item.price" type="text" placeholder="报价">
                  <div class="serviceDelete" @click="deleteServicePrice(index)"><img src="@/assets/img/ic_b_deletelist.png" alt=""></div>
                </li>
              </ul>
              <div class="addService">
                <el-button @click="addServicePrice">添加</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="submit">
          <el-button @click="cancel">取消</el-button>
          <el-button @click="submit" :loading="submitLoading" type="primary">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import serviceManager from '@/api/serviceManager'
import { getGlobalTrees } from '@/api/cityList'
import { upLoadPicFromWeApp } from '@/api/qiniu'
export default {
  data() {
    return {
      serviceCode: '',
      firstServiceCode: '',
      firstServiceCodeList: [],
      secondServiceCode: '',
      secondServiceCodeList: [],
      thirdServiceCode: '',
      thirdServiceCodeList: [],
      companyTypes: '',
      title: '',
      serviceLogo: '',
      serviceLogoId: '',
      fileList: [],
      fileIntroList: [],
      imgTotal: 0,
      cityCodes: [],
      content: '',
      //批量上架数据
      props: {
        multiple: true,
        emitPath: true,
        checkStrictly: false,
        children: 'childs',
        label: 'name',
        value: 'code'
      },
      serviceArea: [],
      cityTree: [],
      servicePrice: [{
        name: '',
        price: ''
      }],
      submitLoading: false,
      editMark: false,
      deliveryDuration: '',
      deliveryMaterial: '',
      handleMaterial: '',
      handleProcessDuration: ''
    }
  },
  created() {
    console.log(this.$route.query.id)
    if (this.$route.query.id) {
      this.editMark = true
      this.init()
    } else {
      this.getCityTree()
      this.getServiceType()
    }
  },
  methods: {
    init() {
      const loading = this.$loading({
        lock: true,
        text: '正在获取数据，请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let params = {
        id: this.$route.query.id
      }
      serviceManager.serviceEdit(params).then(res => {
        if(res.code == 0) {
          this.serviceCode = res.data.serviceCode
          let parentCodes = res.data.parentCodes
          let serviceDistrictList = res.data.serviceDistrictList
          serviceManager.serviceItemTrees({companyId: this.$route.query.companyId}).then(res => {
            if(res.code == 0){
              this.firstServiceCodeList = res.data
              if (parentCodes.length == 1) {
                this.firstServiceCode = parentCodes[0]
                if(this.firstServiceCode && this.firstServiceCode != '') {
                  for(let i=0;i<this.firstServiceCodeList.length;i++){
                    if(this.firstServiceCodeList[i].code == this.firstServiceCode && this.firstServiceCodeList[i].childs) {
                      this.secondServiceCodeList = this.firstServiceCodeList[i].childs
                      this.secondServiceCode = this.serviceCode
                    }
                  }
                }
              }
            }
          }).catch(err => {
            loading.close()
          })
          getGlobalTrees().then(res => {
            if(res.code == 0) {
              this.cityTree = res.data
              let cityArr = []
              if (serviceDistrictList && serviceDistrictList.length > 0) {
                for(let i=0;i<serviceDistrictList.length;i++){
                  if(serviceDistrictList[i].districtCode && serviceDistrictList[i].districtCode != null) {
                    cityArr.push([serviceDistrictList[i].countryCode, serviceDistrictList[i].provinceCode, serviceDistrictList[i].cityCode, serviceDistrictList[i].districtCode])
                  }else if (serviceDistrictList[i].cityCode && serviceDistrictList[i].cityCode != null) {
                    cityArr.push([serviceDistrictList[i].countryCode, serviceDistrictList[i].provinceCode, serviceDistrictList[i].cityCode])
                  }else if (serviceDistrictList[i].provinceCode && serviceDistrictList[i].provinceCode != null) {
                    cityArr.push([serviceDistrictList[i].countryCode, serviceDistrictList[i].provinceCode])
                  }else if(serviceDistrictList[i].countryCode && serviceDistrictList[i].countryCode != null) {
                    cityArr.push([serviceDistrictList[i].countryCode])
                  }
                }
              }
              
              console.log(cityArr)
              this.serviceArea = cityArr
              loading.close()
            }
          }).catch(err => {
            loading.close()
          })
          // this.content = res.data.introduce
          this.title = res.data.title
          this.deliveryDuration = res.data.deliveryDuration
          this.deliveryMaterial = res.data.deliveryMaterial
          this.handleMaterial = res.data.handleMaterial
          this.handleProcessDuration = res.data.handleProcessDuration
          this.servicePrice = res.data.items.length > 0 ? res.data.items : [{name: '', price: ''}]
          this.serviceLogo = res.data.logo
          this.serviceLogoId = res.data.logo
          let fileList = []
          let fileIntroList = []
          if(res.data.imgs.length >= 0){
            this.imgTotal = res.data.imgs.length
          }
          for (let i = 0; i < res.data.imgs.length; i++) {
            let img = res.data.imgs[i].img
            let uid = res.data.imgs[i].id
            let item = {
              uid: uid,
              url: img
            }
            fileList.push(item)
            fileIntroList.push(img)
          }
          this.fileList = fileList
          this.fileIntroList = fileIntroList
          loading.close()
        }
      }).catch(err => {
        loading.close()
      })
    },
    getServiceType(){
      let params = {
        companyId: this.$route.query.companyId
      }
      serviceManager.serviceItemTrees(params).then(res => {
        if(res.code == 0){
          this.firstServiceCodeList = res.data
        }
      })
    },
    firstServiceCodeChange() {
      this.serviceCode = ''
      this.secondServiceCode = ''
      this.thirdServiceCode = ''
      this.secondServiceCodeList = []
      this.thirdServiceCodeList = []
      if (this.firstServiceCode && this.firstServiceCode != '') {
        for(let i=0;i<this.firstServiceCodeList.length;i++){
          if(this.firstServiceCodeList[i].code == this.firstServiceCode ) {
            if (this.firstServiceCodeList[i].childs && this.firstServiceCodeList[i].childs.length != 0) {
              this.secondServiceCodeList = this.firstServiceCodeList[i].childs
            } else {
              this.serviceCode = this.firstServiceCode
            }
          }
        }
      }
    },
    secondServiceCodeChange() {
      this.serviceCode = ''
      this.thirdServiceCode = ''
      this.thirdServiceCodeList = []
      if (this.secondServiceCode && this.secondServiceCode != '') {
        this.serviceCode = this.secondServiceCode
        if(!this.$route.query.id) {
          let params = {
            serviceCode: this.serviceCode
          }
          serviceManager.serviceTemplate(params).then(res => {
            if(res.code == 0){
              if (res.data) {
                if (res.data.handleProcessDuration) {
                  this.handleProcessDuration = res.data.handleProcessDuration
                }
                if (res.data.handleMaterial) {
                  this.handleMaterial = res.data.handleMaterial
                }
                if (res.data.deliveryMaterial) {
                  this.deliveryMaterial = res.data.deliveryMaterial
                }
                if (res.data.deliveryDuration) {
                  this.deliveryDuration = res.data.deliveryDuration
                }
                if (res.data.title) {
                  this.title = res.data.title
                }
              }
            }
          })
        }
        // for(let i=0;i<this.secondServiceCodeList.length;i++){
        //   if(this.secondServiceCodeList[i].code == this.secondServiceCode) {
        //     if (this.secondServiceCodeList[i].childs && this.secondServiceCodeList[i].childs.length != 0) {
        //       this.thirdServiceCodeList = this.secondServiceCodeList[i].childs
        //     } else {
        //       this.serviceCode = this.secondServiceCode
        //     }
        //   }
        // }
      }
    },
    thirdServiceCodeChange() {
      this.serviceCode = ''
      if (this.thirdServiceCode && this.secondServiceCode != '') {
        this.serviceCode = this.thirdServiceCode
      }
    },
    getCityTree() {
      getGlobalTrees().then(res => {
        if(res.code == 0) {
          this.cityTree = res.data
        }
      })
    },
    logoUpload(files) {
      const loading = this.$loading({
        lock: true,
        text: '正在上传图片，请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let formData = new FormData()
      formData.append('files', files.file)
      upLoadPicFromWeApp(formData).then(res => {
        if (res.code == 0) {
          this.serviceLogoId =  res.data[0].fileId
          let oFileReader = new FileReader()
          oFileReader.readAsDataURL(files.file)
          oFileReader.onloadend = (e) => {
            this.serviceLogo = e.target.result
          }
          loading.close()
        }
      }).catch(err => {
        loading.close()
        this.$message.error('上传失败，请重新上传')
      })
    },
    deleteServiceLogo() {
      this.serviceLogo = ''
      this.serviceLogoId = ''
    },
    handleRemoveBefore(file,fileList) {
      const loading = this.$loading({
        lock: true,
        text: '正在删除图片，请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      for(let i=0;i<fileList.length;i++){
        if(file.uid == fileList[i].uid){
          this.fileIntroList.splice(i, 1)
        }
      }
      this.imgTotal = this.fileIntroList.length
      loading.close()
    },
    handleRemove(file,fileList){
      // console.log(file)
      // console.log(this.fileList)
      // console.log(fileList)
      // console.log(this.fileIntroList)
    },
    uploadList(files){
      const loading = this.$loading({
        lock: true,
        text: '正在上传图片，请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let formData = new FormData()
      formData.append('files', files.file)
      upLoadPicFromWeApp(formData).then(res => {
        if (res.code == 0) {
          let img =  res.data[0].fileId
          this.fileIntroList.push(img)
          this.imgTotal = this.fileIntroList.length
          loading.close()
        }
      }).catch(err => {
        loading.close()
        this.$message.error('上传失败，请重新上传')
      })
    },
    selectAreaChange(val) {
      // console.log(val)
      // let arr = []
      // for(let i=0;i<val.length;i++) {
      //   arr.push({
      //     countryCode: val[i][0] || '',
      //     provinceCode: val[i][1] || '',
      //     cityCode: val[i][2] || '',
      //     areaCode: val[i][3] || ''
      //   })
      // }
      // this.cityCodes = arr
      // console.log(arr)
    },
    checkSelectAreaInCity(code) {
      let num = 0
      for(let i=0;i<this.serviceArea.length;i++) {
        if(this.serviceArea[i].length > 2 && this.serviceArea[i][2] == code) {
          num++
        }
      }
      return num
    },
    checkTotalAreaInCity(selectArr) {
      let arr = []
      if(selectArr.length > 0) {
        for(let i=0;i<this.cityTree.length;i++) {
          if(selectArr[0] && selectArr[0] != '') {
            if(selectArr[0] == this.cityTree[i].code) {
              for(let j=0;j<this.cityTree[i].childs.length;j++) {
                if(selectArr[1] && selectArr[1] != '') {
                  if(selectArr[1] == this.cityTree[i].childs[j].code) {
                    for(let k=0;k<this.cityTree[i].childs[j].childs.length;k++) {
                      if(selectArr[2] && selectArr[2] != '') {
                        if(selectArr[2] == this.cityTree[i].childs[j].childs[k].code) {
                          for(let l=0;l<this.cityTree[i].childs[j].childs[k].childs.length;l++) {
                            arr.push(this.cityTree[i].childs[j].childs[k].childs[l].code)
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return arr
    },
    addServicePrice() {
      this.servicePrice.push({
        name: '',
        price: ''
      })
    },
    deleteServicePrice(index) {
      this.servicePrice.splice(index, 1)
    },
    submit() {
      this.submitLoading = true
      let arr = []
      if(this.serviceArea && this.serviceArea.length > 0) {
        for (let i=0;i<this.serviceArea.length;i++) {
          if (this.serviceArea[i].length > 2) {
            arr.push({
              countryCode: this.serviceArea[i][0] || null,
              provinceCode: this.serviceArea[i][1] || null,
              cityCode: this.serviceArea[i][2] || null,
              districtCode: this.serviceArea[i][3] || null
            })
          } else {
            arr.push({
              countryCode: this.serviceArea[i][0] || null,
              provinceCode: this.serviceArea[i][1] || null,
              cityCode: this.serviceArea[i][2] || null,
              districtCode: this.serviceArea[i][3] || null
            })
          }
        }
      }

      this.cityCodes = arr
      if(!this.serviceCode || this.serviceCode == '') {
        this.$message({
          message: '请先选择关联业务',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        this.submitLoading = false
        return
      }
      if(!this.title || this.title == '') {
        this.$message({
          message: '请先填写标题',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        this.submitLoading = false
        return
      }

      if(!this.cityCodes || this.cityCodes.length == 0) {
        this.$message({
          message: '请先选择服务区域',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        this.submitLoading = false
        return
      }

      if(!this.handleProcessDuration || this.handleProcessDuration == '') {
        this.$message({
          message: '办理步骤及所需时间不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        this.submitLoading = false
        return
      }

      if(!this.handleMaterial || this.handleMaterial == '') {
        this.$message({
          message: '办理所需材料不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        this.submitLoading = false
        return
      }

      if(!this.deliveryMaterial || this.deliveryMaterial == '') {
        this.$message({
          message: '交付材料不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        this.submitLoading = false
        return
      }

      if(!this.deliveryDuration || this.deliveryDuration == '') {
        this.$message({
          message: '交付时长不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        this.submitLoading = false
        return
      }

      let items = []
      if (this.servicePrice.length > 0) {
        for(let i=0;i<this.servicePrice.length;i++){
          if (this.servicePrice[i].price != '' || this.servicePrice[i].name != '') {
            items.push(this.servicePrice[i])
          }
        }
      }

      if (this.$route.query.id) {
        let params = {
          id: this.$route.query.id,
          companyId: this.$route.query.companyId,
          imgs: this.fileIntroList,
          introduce: this.content,
          logo: this.serviceLogoId,
          serviceCode: this.serviceCode,
          title: this.title,
          items: items,
          deliveryDuration: this.deliveryDuration,
          deliveryMaterial: this.deliveryMaterial,
          handleMaterial: this.handleMaterial,
          handleProcessDuration: this.handleProcessDuration,
          serviceDistrictVos: this.cityCodes
        }
        serviceManager.serviceUpdate(params).then(res => {
          if(res.code == 0){
            this.$message({
              message: '修改成功',
              type: 'success',
              showClose: true,
              duration: 1000
            })
            this.submitLoading = false
            this.$router.push('/merchants/serviceManager?id=' + this.$route.query.companyId)
          }
        }).catch(err => {
          this.submitLoading = false
        })
      } else {
        let params = {
          companyId: this.$route.query.companyId,
          imgs: this.fileIntroList,
          introduce: this.content,
          logo: this.serviceLogoId,
          serviceCode: this.serviceCode,
          title: this.title,
          items: items,
          deliveryDuration: this.deliveryDuration,
          deliveryMaterial: this.deliveryMaterial,
          handleMaterial: this.handleMaterial,
          handleProcessDuration: this.handleProcessDuration,
          serviceDistrictVos: this.cityCodes
        }
        serviceManager.serviceAdd(params).then(res => {
          if(res.code == 0){
            this.$message({
              message: '添加成功',
              type: 'success',
              showClose: true,
              duration: 1000
            })
            this.submitLoading = false
            this.$router.push('/merchants/serviceManager?id=' + this.$route.query.companyId)
          }
        }).catch(err => {
          this.submitLoading = false
        })
      }
    },
    cancel() {
      this.$router.push('/merchants/serviceManager?id=' + this.$route.query.companyId)
    }
  }
}
</script>
<style lang="scss" scoped>
.serviceEdit {
  min-width: 1200Px;
  padding-bottom: 20PX;
  .serviceEdit_info {
    width: 100%;
    box-sizing: border-box;
    padding: 24Px 32Px;
    background-color: #fff;
    .serviceManager_title {
      width: 100%;
      overflow: hidden;
      h4 {
        float: left;
        font-family: PingFangSC-Medium;
        font-size: 16Px;
        color: rgba(0,0,0,0.87);
        line-height: 22Px;
      }
    }
    .serviceManager_form {
      width: 100%;
      height: auto;
      .form{
        margin-left: auto;
        margin-right: auto;
        margin-top: 24PX;
        .formItem {
          display: flex;
          margin-top: 16Px;
          height: 40PX;
          label{
            width: 100Px;
            height: 100%;
            font-family: PingFangSC-Regular;
            font-size: 14Px;
            color: rgba(0,0,0,0.60);
            text-align: left;
            line-height: 40Px;
            span {
              color: #FF7F4A;
            }
          }
          .input {
            flex: 1;
            height: 100%;
            textarea,
            input {
              display: block;
              outline: none;
              border: none;
              width: 100%;
              box-sizing: border-box;
              background: #FAFAFA;
              height: 100%;
              line-height: 20PX;
              font-size: 14PX;
              color: rgba(0,0,0,0.60);
              padding: 10Px 16Px;
              position: relative;
            }
            
          }
        }
        .formItem.title {
          .input {
            flex: 0;
            width: 700Px;
            position: relative;
            .wordNum {
              position: absolute;
              top: 0;
              right: 10Px;
              font-family: PingFangSC-Regular;
              font-size: 14PX;
              color: rgba(0,0,0,0.60);
              line-height: 40Px;
            }
          }
        }
        .formItem.uploadImg {
          height: auto;
          .imgList {
            width: 72Px;
            height: 72Px;
            background-color: #fafafa;
            position: relative;
            .el-upload {
              width: 100%;
              height: 100%;
            }
          }
          .warning {
            font-family: PingFangSC-Regular;
            font-size: 12Px;
            color: rgba(0,0,0,0.26);
            text-align: left;
            line-height: 18Px;
            margin-top: 16Px;
            p {
              margin: 0;
              padding: 0;
            }
          }
        }
        .formItem.quote {
          height: auto;
          .input {
            height: auto;
            ul {
              margin: 0;
              padding: 0;
            }
            ul li {
              margin: 0;
              padding: 0;
              overflow: hidden;
              margin-bottom: 10Px;
              input {
                float: left;
                outline: none;
                border: none;
                width: 328Px;
                box-sizing: border-box;
                background: #FAFAFA;
                height: 40Px;
                line-height: 20PX;
                font-size: 14PX;
                color: rgba(0,0,0,0.60);
                padding: 10Px 16Px;
              }
              .servicePrice {
                margin-left: 20Px;
              }
              .serviceDelete {
                float: left;
                width: 16Px;
                height: 16Px;
                margin-left: 7Px;
                margin-top: 12Px;
                cursor: pointer;
                img {
                  display: block;
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .addService {
              width: 48Px;
              height: 24Px;
              margin-top: 8Px;
              .el-button {
                display: block;
                width: 48Px;
                height: 24Px;
                border: 1px solid #5AB3A4;
                border-radius: 2px;
                font-family: PingFangSC-Regular;
                font-size: 12Px;
                color: #5AB3A4;
                text-align: center;
                line-height: 18Px;
                padding: 0;
              }
              .el-button:hover, .el-button:focus {
                background-color: #fff;
              }
            }
          }
        }
        .formItem.textArea {
          height: auto;
          width: 800Px;
          .input {
            height: auto;
            overflow: hidden;
            .inputItem {
              width: 350Px;
              float: left;
              span {
                display: block;
                font-family: PingFangSC-Regular;
                font-size: 14Px;
                line-height: 40Px;
              }
              textarea {
                resize: none;
              }
            }
          }
        }
      }
    }
    .submit {
      width: 220Px;
      margin: 0 auto;
      margin-top: 40Px;
      overflow: hidden;
      .el-button {
        float: left;
        width: 96Px;
        height: 36Px;
        border-radius: 2px;
        font-family: PingFangSC-Regular;
        font-size: 12Px;
        text-align: center;
        line-height: 18Px;
        padding: 0;
      }
    }
  }
}
</style>
<style lang="scss">
.serviceEdit {
  .serviceEdit_info {
    .serviceManager_form {
      .form {
        .formItem {
          .input {
            .el-select {
              display: block;
            }
          }
        }
        .el-select{
          .el-input__inner {
            background-color: #fafafa;
            border: 0;
          }
        }
        .formItem.logoImg {
          height: auto;
          .imgUpload {
            float: left;
            width: 72Px;
            height: 72Px;
            background-color: #fafafa;
            .el-upload {
              width: 72Px;
              height: 72Px;
              position: relative;
              .el-icon-plus {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
              img {
                width: 100%;
                height: 100%;
              }
            }
            .el-upload--picture-card {
              line-height: 72Px;
            }
          }
          .deleteLogo {
            float: left;
            .el-button--small {
              display: block;
              margin-top: 39px;
              margin-left: 10px;
            }
          }
          .logoWarning {
            display: block;
            float: left;
            font-family: PingFangSC-Regular;
            font-size: 12Px;
            color: rgba(0,0,0,0.26);
            text-align: left;
            line-height: 18Px;
            margin-top: 18Px;
            margin-left: 16Px;
            p {
              margin: 0;
              padding: 0;
            }
          }
        }
        .formItem.uploadImg {
          .imgList {
            .el-upload {
              width: 100%;
              height: 100%;
            }
          }
          .introImgList{
            height: auto;
            box-sizing: border-box;
            background: #FFFFFF;
            overflow: hidden;
            .uploadImgList {
              .el-upload-list__item,
              .el-upload-list__item-actions,
              .el-upload {
                width: 72Px;
                height: 72Px;
              }
              .el-upload-list--picture-card .el-upload-list__item {
                margin: 0 4Px 4Px 0;
              }
              .el-upload {
                position: relative;
                .el-icon-plus {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
              }
              .disabled .el-upload--picture-card {
                display: none;
              }
              .imgTotal {
                font-family: PingFangSC-Regular;
                font-size: 12Px;
                color: rgba(0,0,0,0.60);
                text-align: left;
                line-height: 18Px;
              }
            }
          }
        }
        .formItem.serviceArea {
          width: 900Px;
          height: 200Px;
          .el-cascader-panel.is-bordered {
            display: flex;
            .el-cascader-menu {
              width: auto;
              width: 200Px;
            }
          }
        }
        .formItem.tinymce {
          width: 800Px;
          height: auto;
          .mce-menubar {
            display: none;
          }
        }
      }
    }
  }
  .merchantPc .merchantPc_container .merchantContent .register_form .form .formItem.uploadImg .uploadImgList {
    width: auto;
    height: auto;
  }
  .map {
    .amap-geolocation-con {
      display: none;
    }
  }
}
</style>
