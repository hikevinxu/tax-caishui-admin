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
      <el-cascader-panel :options="options" :props="{ multiple: true, checkStrictly: true }" @change="casa"></el-cascader-panel>
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
    casa(e){
      // console.log(e)
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
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
    width: 500px;
    height: 300px;
  }
}
</style>
