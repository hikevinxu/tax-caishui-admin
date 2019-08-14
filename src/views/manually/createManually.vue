<template>
  <div class="bannerSetting-container">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right">
      <el-form-item label="机构名称：">
        <el-input style="width: 250px;" v-model="temp.name" placeholder="请输入机构名称" />
        <el-button type="primary" @click="dialogFormVisible = false">鉴定</el-button>
      </el-form-item>
      <el-form-item label="机构类型：">
        <el-select v-model="temp.type" placeholder="机构类型" style="width: 250px" class="filter-item">
          <el-option v-for="(item,index) in types" :key="item+index" :label="item.name" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-amap vid="amap" ref="map" :center="center" :zoom="zoom" :plugin="plugin" :events="events"></el-amap>

    </el-form>
  </div>
</template>

<script>
import Vue from 'vue'
import VueAMap from 'vue-amap'
import { merchantList, merchantUp, merchantDetail, merchantDown, merchantApplyTypes } from '@/api/merchants'
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
      searchResult: [],
      provinceCode: '',
      provinceList: [],
      cityCode: '',
      cityList: [],
      areaCode: '',
      areaList: [],
      searchInput: '',
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
              // this.address = result.regeocode.formattedAddress
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
  }
}
</script>

<style lang="scss" scoped>
.filter-container .filter-item{
  vertical-align: inherit;
  margin-bottom: 0;
}
.bannerSetting-container {
  padding: 20px;
  .el-vue-amap-container{
    width: 500px;
    height: 300px;
  }
}
</style>
