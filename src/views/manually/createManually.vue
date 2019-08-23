<template>
  <div class="bannerSetting-container">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right">

      <el-form-item label="机构名称：" >
        <el-input :disabled="disabled"  @input="nameInput" style="width: 598px;" v-model.trim="temp.name" placeholder="请输入机构名称" />
        <el-button type="primary" v-show="!isEdit" @click="check">鉴定</el-button>
      </el-form-item>

     <div v-show="showForm">
        <el-form-item label="机构类型：">
        <el-select v-model="temp.type" placeholder="机构类型" style="width: 598px" class="filter-item">
          <el-option v-for="(item,index) in types" :key="item+index" :label="item.name" :value="item.value"/>
        </el-select>
      </el-form-item>

      <el-form-item label="所在地区：" >
        <el-select v-model="temp.provinceCode" @change="provinceCodeChange" placeholder="请选择">
          <el-option
            v-for="item in provinceList"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>

        <el-select v-model="temp.cityCode" @change="cityCodeChange" placeholder="请选择">
          <el-option
            v-for="item in cityList"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>

        <el-select v-model="temp.areaCode" @change="areaCodeChange" placeholder="请选择">
          <el-option
            v-for="item in areaList"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="地图定位：">
        <el-select style="width: 598px;" class="selectAddress" v-model="searchInput" :loading="loading" :remote-method="selectAddressInput" @change="selectAddressChange" reserve-keyword filterable remote placeholder="请选择">
          <el-option
            v-for="item in searchResult"
            :key="item.id"
            :label="item.name"
            :value="item.lnglat">
          </el-option>
        </el-select>
      </el-form-item>
      <div class="mapContainer">
        <el-amap vid="amap" ref="map" :center="center" :zoom="zoom" :plugin="plugin" :events="events"></el-amap>
        <i class="el-icon-location"></i>
      </div>

      <el-form-item label="详细地址：">
        <el-input style="width: 598px;" v-model="temp.address" placeholder="请输入详细地址" />
      </el-form-item>

      <el-form-item label="服务电话：">
        <el-input style="width: 598px;" v-model="temp.phone" placeholder="请输入服务电话" />
      </el-form-item>

      <el-form-item label="详细介绍：">
        <el-input type="textarea" autosize :rows="4" style="width: 598px;" v-model="temp.introduce" placeholder="请输入详细介绍" />
      </el-form-item>

      <el-form-item label="主营业务：" style="display: flex;">
        <div v-for="(item,index) in serviceCodes" :key="index" style="margin-bottom: 10px;">
          <el-select  style="width: 196px" v-model="item.serviceType.firstCode" @change="firstCodeChange(item,$event)" @clear="clearFirst(item,$event)" clearable placeholder="请选择一级服务">
            <el-option v-for="(detail,index) in item.firstCodeList" :key="detail.code+index" :label="detail.name" :value="detail.code"> </el-option>
          </el-select>
          <el-select v-show="item.showSend" style="width: 196px" v-model="item.serviceType.secondCode" @change="secondCodeChange(item,$event)"  @clear="clearSend(item,$event)" clearable placeholder="请选择二级服务">
            <el-option v-for="(detail,index) in item.secondCodeList" :key="detail.code+index" :label="detail.name" :value="detail.code"> </el-option>
          </el-select>
            <el-select  v-show="item.showThird" style="width: 196px" v-model="item.serviceType.thirdCode" @change="thirdCodeChange(item,$event)" clearable placeholder="请选择三级服务">
            <el-option v-for="(detail,index) in item.thirdCodeList" :key="detail.code+index" :label="detail.name" :value="detail.code"> </el-option>
          </el-select>
          <el-button type="primary" @click="deleteService(item,index)">删除该业务</el-button>
        </div>
        <el-button type="primary" @click="add">添加业务</el-button>
      </el-form-item>
     </div>

    </el-form>

    <span v-show="showForm" slot="footer" class="dialog-footer" style="display: flex;justify-content: flex-end;width:678px;">
      <!-- <el-button @click="dialogRefuseVisible = false">返回</el-button> -->
      <el-button type="primary" @click="refuse">保存</el-button>
    </span>
  </div>
</template>

<script>
import Vue from 'vue'
import VueAMap from 'vue-amap'
import { claimList, claimInfo, claimCheck, claimSave, claimUpdate } from '@/api/claim'
import { merchantApplyTypes } from '@/api/merchants'
import { addressProvinces,addressCitys,addressAreas } from '@/api/cityList'
import {  businessTypeList } from '@/api/homePageSetting'
import { config } from '@/utils/config'
import waves from '@/directive/waves' // Waves directive
// import Upload from '@/components/Upload/uploadImgTemp'
import qs from 'qs'
Vue.use(VueAMap)

// 初始化高德地图的 key 和插件
VueAMap.initAMapApiLoader({
  key: config.amapKey,
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geocoder', 'AMap.Geolocation'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
export default {
  name: 'createManually',
  directives: { waves },
  filters: {
    
  },
  data() {
    return {
      casList: [],
      oneList: [],
      showForm: false,
      disabled: false,
      companyInfo: {},
      uploadImg: {
        fileId: '',
        imgUrl: ''
      },
      isEdit: false,
      firstCodeList: [],
      serviceCodes: [],
      rules: {},
      temp: {
        name: '',
        companyId: '',
        provinceCode: '',
        cityCode: '',
        areaCode: '',
        location: '',
        phone: '',
        address: '',
        phone: '',
        type: '',
        introduce: ''
      },
      provinceName: '',
      cityName: '',
      areaName: '',
      types: [],
      checkList: [],
      searchResult: [],
      provinceCode: '',
      provinceList: [],
      cityCode: '',
      cityList: [],
      areaCode: '',
      areaList: [],
      searchInput: '',
      loading: '',
      editMark: true,
      address: '',
      center: [116.397477,39.908692],
      zoom: 16,
      events: {
        init: (o) => {
          console.log(o)
        },
        'dragend': (e) => {
          var centerPoint = this.$refs.map.$$getCenter()
          this.center = centerPoint
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress(centerPoint, (status, result) => {
            if (status == 'complete') {
              console.log(result.regeocode)
              this.location = result.regeocode.formattedAddress
              this.searchInput = result.regeocode.formattedAddress
            }
          })
        }
      },
      plugin: [
        'ToolBar',
        {
          pName: 'Scale',
          events: {
            init(o) {
              // console.log(o);
            }
          }
        },
        {
          pName: 'Geolocation',
          events: {
            init: (o) => {
              // o 是高德地图定位插件实例
            }
          }
        }
      ],
    }
  },
  created() {
    // this.getList()
    this.getTypes()
    this.getProvinceList()
    this.getBusinessTypeList()
    if(this.$route.query.id){
      this.isEdit = true
      this.disabled = true
      let data = {
        id: this.$route.query.id
      }
      this.getCompanyInfo(data)
    }else {
      this.disabled = false
    }
  },
  methods: {
    getTypes(){
      merchantApplyTypes().then(res => {
        console.log(res)
        if(res.code == 0){
          this.types = res.data
        }
      })
    },
    getBusinessTypeList () {
      let data = {
        parentCode: ''
      }
      businessTypeList(data).then(res => {
        if(res.code == 0) {
          this.firstCodeList = res.data
          for (let i = 0; i < this.serviceCodes.length; i++) {
            this.serviceCodes[i].firstCodeList = res.data;
          }
        }
      })
    },
    getCompanyInfo(data){
      data = qs.stringify(data)
      claimInfo(data).then(res => {
        console.log(res)
        if(res.code == 0){
          this.companyInfo = res.data
          console.log(this.companyInfo)
          this.setData()
        }
      })
    },
    nameInput(){
      console.log(1)
      this.resetForm()
      this.showForm = false
    },
    check(){
      let data = {
        name: this.temp.name
      }
      console.log(data)
      data = qs.stringify(data)
      claimCheck(data).then(res => {
        console.log(res)
        if(res.code == 0){
          if(res.data.status == 0){
            this.companyInfo = res.data.info
            this.setData()
          }else if(res.data.status == -1){
            this.$message({
              message: res.data.message,
              type: 'error',
              showClose: true,
              duration: 1000
            })
          }
        }
      })
    },
    setData(){
      console.log(this.companyInfo.name)
      this.resetForm()
      if(this.companyInfo.name){
        this.showForm = true
        this.temp.name = this.companyInfo.name
        this.temp.companyId = this.companyInfo.id
        this.temp.address = this.companyInfo.address
        this.temp.type = this.companyInfo.type
        this.provinceCodeChange(this.companyInfo.provinceCode)
        this.temp.provinceCode = this.companyInfo.provinceCode
        this.cityCodeChange(this.companyInfo.cityCode)
        this.temp.cityCode = this.companyInfo.cityCode
        this.temp.areaCode = this.companyInfo.areaCode
        this.temp.introduce = this.companyInfo.introduce
        if(this.companyInfo.location){
          this.center[0] = this.companyInfo.location.split(',')[1]
          this.center[1] = this.companyInfo.location.split(',')[0]
          try {
            this.selectAddressChange(this.center)
          } catch (err) {
            this.searchInput = this.companyInfo.address
          }
        } else {
          this.getCurrentPositionLaglng()
        }
        if(this.companyInfo.phones.length > 0){
          this.temp.phone = this.companyInfo.phones[0]
        }
        let params = {
          provinceCode: this.temp.provinceCode
        }
        //地区赋值
        addressProvinces().then(res => {
          if(res.code == 0){
            this.provinceList = res.data
            for(let i=0;i<res.data.length;i++){
              if (res.data[i].code == this.temp.provinceCode){
                this.provinceName = res.data[i].name
                let params = {
                  provinceCode: this.temp.provinceCode
                }
                addressCitys(params).then(res => {
                  if(res.code == 0){
                    for(let i=0;i<res.data.length;i++){
                      this.cityList = res.data
                      if (res.data[i].code == this.temp.cityCode){
                        this.cityName = res.data[i].name
                        let data = {
                          provinceCode: this.temp.provinceCode,
                          cityCode: this.temp.cityCode
                        }
                        addressAreas(data).then(res => {
                          this.areaList = res.data
                          if(res.code == 0){
                            for(let i=0;i<res.data.length;i++){
                              if (res.data[i].code == this.temp.areaCode){
                                this.areaName = res.data[i].name
                              }
                            }
                          }
                        })
                      }
                    }
                  }
                })
              }
            }
          }
        })

        //主营业务赋值
        for (let i = 0; i < this.companyInfo.codeArray.length; i++) {
          if(this.companyInfo.codeArray[i].length == 2){
            let json = {
              serviceType: {
                firstCode: '',
                secondCode: '',
                thirdCode: ''
              },
              showSend: false,
              showThird: false,
              firstCodeList: this.firstCodeList
            }
            let data1 = {
              parentCode: this.companyInfo.codeArray[i][1]
            }
            businessTypeList(data1).then(res => {
              if(res.code == 0) {
                json.secondCodeList = res.data
                json.serviceType.secondCode = this.companyInfo.codeArray[i][0]
                if(res.data.length == 0){
                  json.showSend = false
                }else{
                  json.showSend = true
                }
              }
            })
            json.serviceType.firstCode = this.companyInfo.codeArray[i][1]
            
            this.serviceCodes.push(json)
          }else if(this.companyInfo.codeArray[i].length == 3){
            let json = {
              serviceType: {
                firstCode: '',
                secondCode: '',
                thirdCode: ''
              },
              showSend: false,
              showThird: false,
              firstCodeList: this.firstCodeList
            }
            let data1 = {
              parentCode: this.companyInfo.codeArray[i][2]
            }
            businessTypeList(data1).then(res => {
              if(res.code == 0) {
                json.secondCodeList = res.data
                json.serviceType.secondCode = this.companyInfo.codeArray[i][1]
                if(res.data.length == 0){
                  json.showSend = false
                }else{
                  json.showSend = true
                }
                let data2 = {
                  parentCode: this.companyInfo.codeArray[i][1]
                }
                businessTypeList(data2).then(res => {
                  if(res.code == 0) {
                    json.thirdCodeList = res.data
                    json.serviceType.thirdCode = this.companyInfo.codeArray[i][0]
                    if(res.data.length == 0){
                      json.showThird = false
                    }else{
                      json.showThird = true
                    }
                  }
                })
              }
            })
            json.serviceType.firstCode = this.companyInfo.codeArray[i][2]
            this.serviceCodes.push(json)
          }
        }
        console.log(this.serviceCodes)
      }else {
        this.showForm = true
      }
    },
    resetForm(){
      // this.temp.name = ''
      this.temp.companyId = ''
      this.temp.address = ''
      this.temp.type = ''
      this.temp.provinceCode = ''
      this.temp.cityCode = ''
      this.temp.areaCode = ''
      this.temp.location = ''
      this.temp.phone = ''
      this.provinceName = ''
      this.cityName = ''
      this.areaName = ''
      this.searchResult = ''
      this.center = [116.397477,39.908692]
    },
    refuse(){
      if(this.temp.name == '') {
        this.$message({
          message: '机构名称不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      if(this.temp.type == ''){
        this.$message({
          message: '机构类型不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      if (!this.temp.provinceCode || this.temp.provinceCode == '' || !this.temp.cityCode || this.temp.cityCode == '' || !this.temp.areaCode || this.temp.areaCode == '') {
        this.$message({
          message: '所选地区不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return 
      }
      if(this.temp.address == ''){
        this.$message({
          message: '详细地址不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return 
      }
      if(this.temp.phone == ''){
        this.$message({
          message: '联系电话不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return 
      }
      if(!this.temp.phone.match(/(0\d{2,3}(-)?)?\d{7,8}/) && !this.temp.phone.match(/^(0|86|17951)?1[0-9]{10}$/)){
        this.$message({
          message: '联系电话格式不正确',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return 
      }

      let data = {
        name: this.temp.name,
        type: this.temp.type,
        id: this.temp.companyId,
        cityCode:this.temp.cityCode,
        areaCode: this.temp.areaCode,
        provinceCode: this.temp.provinceCode,
        // contactName: this.temp.contact,
        address: this.provinceName + this.cityName + this.areaName + this.temp.address,
        location: this.center[1].toString() + ',' + this.center[0].toString(),
        phones: [this.temp.phone],
        introduce: this.temp.introduce,
        serviceCodes: []
      }

      if(this.isEdit == true){
        data.address = this.temp.address
      }

      for (let i = 0; i < this.serviceCodes.length; i++) {
        if(this.serviceCodes[i].showSend == false && this.serviceCodes[i].showThird == false){
          if(this.serviceCodes[i].serviceType.firstCode == ''){
            this.$message({
              message: '请选择完子级在提交',
              type: 'error',
              showClose: true,
              duration: 1000
            })
            return
          }else{
            data.serviceCodes.push(this.serviceCodes[i].serviceType.firstCode)
          }
        }else{
          if(this.serviceCodes[i].showThird == true){
            if(this.serviceCodes[i].serviceType.thirdCode == ''){
              this.$message({
                message: '请选择完子级在提交',
                type: 'error',
                showClose: true,
                duration: 1000
              })
              return
            }else{
              data.serviceCodes.push(this.serviceCodes[i].serviceType.thirdCode)
            }
            
          }else{
            if(this.serviceCodes[i].serviceType.secondCode == ''){
              this.$message({
                message: '请选择完子级在提交',
                type: 'error',
                showClose: true,
                duration: 1000
              })
              return
            }else{
              data.serviceCodes.push(this.serviceCodes[i].serviceType.secondCode)
            }
          }
        }
      }
      console.log(data)
      data = qs.stringify(data)
      claimSave(data).then(res => {
        console.log(res)
        if(res.code == 0){
          this.$message({
            message: '保存成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          this.resetForm()
          this.showForm = false
        }else{
          this.$message({
            message: res.data.message,
            type: 'error',
            showClose: true,
            duration: 1000
          })
          this.resetForm()
          this.showForm = false
        }
      })
    },
    getCurrentPositionLaglng(){
      this.getLocationLoading = true
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,     
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: 'RB'
      })

      geolocation.getCurrentPosition()
      AMap.event.addListener(geolocation, 'complete', (data) => {
        this.center = [data.position.lng, data.position.lat];
        this.location = data.formattedAddress
        this.getLocationLoading = false
      })
      AMap.event.addListener(geolocation, 'error', (data) => {
        this.$message({
          message: '获取位置信息超时',
          type: 'error',
          showClose: true,
          duration: 1000
        })
      })
    },
    selectAddressChange (val) {
      this.center = [val[0], val[1]]
      var geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: 'all'
      })
      geocoder.getAddress(val, (status, result) => {
        if (status == 'complete') {
          this.searchInput = result.regeocode.formattedAddress
        }
      })
    },
    selectAddressInput(query){
      if (query !== '') {
        this.loading = true
        let autoOptions = {
          city: '全国'
        }
        var placeSearch = new AMap.PlaceSearch(autoOptions);
        placeSearch.search(query, (status, result) => {
          // 搜索成功时，result即是对应的匹配数据
          console.log(result)
          if(result.info == "OK") {
            this.loading = false
            this.searchResult = result.poiList.pois
            for(let i=0;i<this.searchResult.length;i++){
              this.searchResult[i].lnglat = [this.searchResult[i].location.lng, this.searchResult[i].location.lat]
            }
          } else {
            this.searchResult = []
          }
        })
      } else {
        this.searchResult = []
      }
    },
    getProvinceList() {
      addressProvinces().then(res => {
        if(res.code == 0){
          this.provinceList = res.data
        }
      })
    },
    provinceCodeChange(val){
      this.temp.cityCode = ''
      this.temp.areaCode = ''
      this.cityList = []
      this.areaList = []
      let params = {
        provinceCode: val
      }
      addressCitys(params).then(res => {
        if(res.code == 0){
          this.cityList = res.data
        }
      })
      for(let i=0;i<this.provinceList.length;i++){
        if(this.provinceList[i].code == val){
          this.provinceName = this.provinceList[i].name
        }
      }
    },
    cityCodeChange(val){
      this.temp.areaCode = ''
      this.areaList = []
      let data = {
        provinceCode: this.temp.provinceCode,
        cityCode: val
      }
      addressAreas(data).then(res => {
        if(res.code == 0){
          this.areaList = res.data
        }
      })
      for(let i=0;i<this.cityList.length;i++){
        if(this.cityList[i].code == val){
          this.cityName = this.cityList[i].name
        }
      }
    },
    areaCodeChange(val) {
      for(let i=0;i<this.areaList.length;i++){
        if(this.areaList[i].code == val){
          this.areaName = this.areaList[i].name
        }
      }
    },
    clearFirst(item,e){
      item.secondCode = ''
      item.thirdCode = ''
      item.secondCodeList = []
      item.thirdCodeList = []
      item.showSend = false
      item.showThird = false
    },
    clearSend(item,e){
      item.showThird = false
      item.thirdCode = ''
      item.thirdCodeList = []
    },
    firstCodeChange(item,e){
      item.secondCode = ''
      item.thirdCode = ''
      item.secondCodeList = []
      item.thirdCodeList = []
      item.showSend = false
      item.showThird = false
      item.firstCode = e
      if(item.firstCode != ''){
        let data = {
          parentCode: item.firstCode
        }
        console.log(data)
        businessTypeList(data).then(res => {
          if(res.code == 0) {
            console.log(res)
            item.secondCodeList = res.data
            if(res.data.length == 0){
              item.showSend = false
            }else{
              item.showSend = true
            }
          }
        })
      }else {

      }
    },
    secondCodeChange(item,e){
      item.showThird = false
      item.thirdCode = ''
      item.thirdCodeList = []
      item.secondCode = e
      if(item.secondCode != ''){
        let data = {
          parentCode: item.secondCode
        }
        businessTypeList(data).then(res => {
          if(res.code == 0) {
            console.log(res)
            item.thirdCodeList = res.data
            if(res.data.length == 0){
              item.showThird = false
            }else{
              item.showThird = true
            }
          }
        })
      }else {

      }
    },
    thirdCodeChange(item,e){
      item.thirdCode = e
      console.log(this.serviceCodes)
    },
    add(){
      let json = {
        serviceType: {
          firstCode: '',
          secondCode: '',
          thirdCode: ''
        },
        showSend: false,
        showThird: false,
        firstCodeList: [],
        secondCodeList: [],
        thirdCodeList: []
      }
      this.serviceCodes.push(json)
      this.getBusinessTypeList()
    },
    deleteService(item,index){
      console.log(index)
      if(this.serviceCodes.length > 1){
        this.serviceCodes.splice(index,1)
      }else{
        this.$message({
          message: '至少添加一个主营业务',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mapContainer {
  width: 678px;
  height: 300px;
  margin-top: 16Px;
  margin-bottom: 16px;
  position: relative;
  .el-icon-location {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
  }
  .location {
    width: 38Px;
    height: 38Px;
    background-color: #fff;
    position: absolute;
    bottom: 50Px;
    left: 10Px;
    border-radius: 5Px;
    border: 1Px solid #ccc;
    cursor: pointer;
    img {
      display: block;
      width: 24Px;
      height: 24Px;
      position: absolute;
      top: 7Px;
      left: 7Px;
    }
  }
  .amap-controls {
    .amap-toolbar {
      display: none;
    }
    .amap-scalecontrol {
      display: none;
    }
    .amap-geolocation-con {
      display: none;
    }
  }
}
.filter-container .filter-item{
  vertical-align: inherit;
  margin-bottom: 0;
  
}
.el-checkbox-group{
  display: flex;
  // align-items: center;
  flex-flow: column;
  .el-checkbox+.el-checkbox{
    margin-left: 0;
  }
}
.bannerSetting-container {
  padding: 20px;
  .el-vue-amap-container{
    width: 678px;
    height: 300px;
  }
}
</style>
