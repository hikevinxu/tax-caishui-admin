<template>
  <div class="bannerSetting-container">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right">

      <el-form-item label="机构名称：">
        <el-input style="width: 398px;" v-model="temp.name" placeholder="请输入机构名称" />
        <el-button type="primary" @click="dialogFormVisible = false">鉴定</el-button>
      </el-form-item>

      <el-form-item label="机构类型：">
        <el-select v-model="temp.type" placeholder="机构类型" style="width: 398px" class="filter-item">
          <el-option v-for="(item,index) in types" :key="item+index" :label="item.name" :value="item.value"/>
        </el-select>
      </el-form-item>

      <el-form-item label="所在地区：">
        <el-select v-model="provinceCode" @change="provinceCodeChange" placeholder="请选择">
          <el-option
            v-for="item in provinceList"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>

        <el-select v-model="cityCode" @change="cityCodeChange" placeholder="请选择">
          <el-option
            v-for="item in cityList"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>

        <el-select v-model="areaCode" @change="areaCodeChange" placeholder="请选择">
          <el-option
            v-for="item in areaList"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="地图定位：">
        <el-select style="width: 398px;" class="selectAddress" v-model="searchInput" :loading="loading" :remote-method="selectAddressInput" @change="selectAddressChange" reserve-keyword filterable remote placeholder="请选择">
          <el-option
            v-for="item in searchResult"
            :key="item.id"
            :label="item.name"
            :value="item.lnglat">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-cascader-panel v-model="casList" :options="options" :props="{ multiple: true, checkStrictly: false }" @change="casa"></el-cascader-panel> -->
      <div class="mapContainer">
        <el-amap vid="amap" ref="map" :center="center" :zoom="zoom" :plugin="plugin" :events="events"></el-amap>
        <i class="el-icon-location"></i>
      </div>

      <el-form-item label="详细地址：">
        <el-input style="width: 398px;" v-model="temp.adress" placeholder="请输入详细地址" />
      </el-form-item>

      <el-form-item label="服务电话：">
        <el-input style="width: 398px;" v-model="temp.phone" placeholder="请输入服务电话" />
      </el-form-item>

      <el-form-item label="详细介绍：">
        <el-input type="textarea" autosize :rows="4" style="width: 398px;" v-model="temp.context" placeholder="请输入详细介绍" />
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer" style="display: flex;justify-content: flex-end;width:480px;">
      <!-- <el-button @click="dialogRefuseVisible = false">返回</el-button> -->
      <el-button type="primary" @click="refuse">保存</el-button>
    </span>
  </div>
</template>

<script>
import Vue from 'vue'
import VueAMap from 'vue-amap'
import { merchantList, merchantUp, merchantDetail, merchantDown, merchantApplyTypes } from '@/api/merchants'
import { addressProvinces,addressCitys,addressAreas } from '@/api/cityList'
import { businessTypeList } from '@/api/homePageSetting'
import { config } from '@/utils/config'
import waves from '@/directive/waves' // Waves directive
// import Upload from '@/components/Upload/uploadImgTemp'
Vue.use(VueAMap)

// 初始化高德地图的 key 和插件
VueAMap.initAMapApiLoader({
  key: config.amapKey,
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geocoder', 'AMap.Geolocation'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
export default {
  name: 'participles',
  directives: { waves },
  filters: {
    
  },
  data() {
    return {
      casList: [],
      oneList: [],
      options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        },{
          value: 'zhinan11',
          label: '指南11',
        }],
      uploadImg: {
        fileId: '',
        imgUrl: ''
      },
      rules: {},
      temp: {
        name: '',
        type: '',
      },
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
    refuse(){

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
          // this.address = result.regeocode.formattedAddress
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
      this.cityCode = ''
      this.areaCode = ''
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
      this.areaCode = ''
      this.areaList = []
      let data = {
        provinceCode: this.provinceCode,
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
    casa(e){
      // console.log(e)
      console.log(e)
      let oneList = []
      for (let i = 0; i < this.casList.length; i++) {
        if(oneList.indexOf(this.casList[i][0]) == -1){
          oneList.push(this.casList[i][0])
          this.oneList = oneList
          console.log(this.oneList)
        }
      }
      if(this.oneList.length > 3){
        this.$message({
          message: '最多三个',
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
  width: 480px;
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
    width: 480px;
    height: 300px;
  }
}
</style>
