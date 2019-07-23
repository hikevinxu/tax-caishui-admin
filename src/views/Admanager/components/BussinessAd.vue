<template>
  <div class="bussinessAd">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" @click="handleCreate">添加</el-button>
      <el-input class="filter-item" style="width: 250px" v-model="listQuery.name" placeholder="请输入公司名称" />
      <el-select v-model="listQuery.status" placeholder="是否上架" @change="getList" style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in statusList" :key="item+index" :label="item.name" :value="item.id"/>
      </el-select>
      <!-- <el-select v-model="listQuery.status" placeholder="请选择关联服务" @change="getList" style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in statusList" :key="item+index" :label="item.name" :value="item.id"/>
      </el-select> -->
      <el-button v-waves class="filter-item" type="success" icon="el-icon-search" @click="getList">筛选</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      ref="multipleTable"
      tooltip-effect="dark"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="ID" prop="id" align="center" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="主题" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.adTitle }}</span>
        </template>
      </el-table-column>

      <el-table-column label="banner缩略图" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.elementValue" style="width: 100px;" alt="" srcset="">
        </template>
      </el-table-column>

      <el-table-column label="状态" width="120px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1">{{ scope.row.status | statusFilters }}</el-tag>
          <el-tag type="danger" v-else>{{ scope.row.status | statusFilters }}</el-tag>
        </template>
      </el-table-column>

      <!-- <el-table-column label="跳转类型" width="120px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.jumpType == 1">{{ scope.row.jumpType | jumpTypeFilters }}</el-tag>
          <el-tag v-if="scope.row.jumpType == 2" type="success">{{ scope.row.jumpType | jumpTypeFilters }}</el-tag>
          <el-tag v-if="scope.row.jumpType == 3" type="warning">{{ scope.row.jumpType | jumpTypeFilters }}</el-tag>
          <el-tag v-if="scope.row.jumpType == 4" type="danger">{{ scope.row.jumpType | jumpTypeFilters }}</el-tag>
        </template>
      </el-table-column> -->

      <!-- <el-table-column label="跳转目标" width="250px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.jumpType == 1">{{ scope.row.pageUrl | pageUrlFilters }}</el-tag>
          <el-tag v-if="scope.row.jumpType == 2">{{ scope.row.jumpUrl }}</el-tag>
          <span v-if="scope.row.jumpType == 3">
            <el-tag v-if="scope.row.serviceType.firstName">{{ scope.row.serviceType.firstName }}</el-tag>
            <el-tag type="danger" v-if="scope.row.serviceType.secondName">{{ scope.row.serviceType.secondName }}</el-tag>
          </span>
          <el-tag v-if="scope.row.jumpType == 4">{{ scope.row.firm.firmName }}</el-tag>
        </template>
      </el-table-column> -->
      
      <el-table-column :label="$t('table.actions')" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button style="margin-left: 10px;" type="success" size="small" @click="handleUp(scope.row)" v-if="scope.row.status !== 1">上架</el-button>
          <el-button style="margin-left: 10px;" type="warning" size="small" @click="handleDown(scope.row)" v-if="scope.row.status == 1">下架</el-button>
          <el-button style="margin-left: 10px;" type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog width="800px" :title="dialogStatus == 'edit' ? '编辑' : '新增'" :visible.sync="dialogFormVisible">
        <el-radio-group v-model="tabTitle" @change="tabChange" style="margin-bottom: 30px;" size="small">
          <el-radio-button label="baseSet">基本参数配置</el-radio-button>
          <el-radio-button label="addCity">新增城市</el-radio-button>
          <el-radio-button label="list">投放列表</el-radio-button>
        </el-radio-group>
        <div v-if="tabTitle == 'baseSet'">
          <div v-if="typeId == '001' || typeId == '002'">
            <el-form ref="dataForm" :model="form" label-position="right" label-width="150px" style="margin-left:50px;">
              <el-form-item label="主题：" prop="adTitle">
                <el-input style="width: 350px" v-model="form.adTitle" placeholder="请输入主题（15字以内）" />
              </el-form-item>
              <el-form-item label="Banner图：" prop="elementValue">
                <Upload type="banner" v-model="form.elementValue"/>
              </el-form-item>
              <el-form-item label="跳转类型：" prop="goType">
                <el-select v-model="form.goType" placeholder="跳转类型" clearable style="width: 250px" class="filter-item">
                  <el-option v-for="(item,index) in goTypeList" :key="'goType1' + item.id+index" :label="item.name" :value="item.id"/>
                </el-select>
              </el-form-item>
              <el-form-item v-if="form.goType == 2" label="跳转页面：" prop="adValue">
                <el-select v-model="form.nativeUrl" placeholder="跳转页面" @change="pageUrlChange" clearable style="width: 250px" class="filter-item">
                  <el-option v-for="(item,index) in pageUrlList" :key="item.id+index" :label="item.name" :value="item.id"/>
                </el-select>
              </el-form-item>
              <el-form-item v-if="form.goType == 1" label="跳转地址：" prop="adValue">
                <el-input style="width: 300px" v-model="form.h5Url" placeholder="请输入跳转地址" />
              </el-form-item>
              <el-form-item v-if="form.nativeUrl !== '' && form.goType == 2" label="选择公司：" prop="">
                <el-select v-model="form.adParam.firmId" filterable remote reserve-keyword placeholder="请输入关键词" style="width: 350px" :remote-method="searchFirmList" :loading="loading">
                  <el-option
                    v-for="item in firmList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item  v-if="form.nativeUrl == '2' && form.goType == 2" label="服务详情图：" prop="elementValue">
                <Upload type="banner" v-model="form.adParam.firmImg"/>
              </el-form-item>
            </el-form>
          </div>
          <div v-if="typeId == '003'">
            <el-form ref="dataForm" :model="form" label-position="right" label-width="150px" style="margin-left:50px;">
              <el-form-item label="选择公司：" prop="">
                <el-select v-model="form.adParam.firmId" filterable remote reserve-keyword placeholder="请输入关键词" style="width: 350px" :remote-method="searchFirmList" :loading="loading">
                  <el-option
                    v-for="item in firmList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div v-if="typeId == '004'">
            <el-form ref="dataForm" :model="form" label-position="right" label-width="150px" style="margin-left:50px;">
              <el-form-item label="主题：" prop="adTitle">
                <el-input style="width: 350px" v-model="form.adTitle" placeholder="请输入主题（15字以内）" />
              </el-form-item>
              <el-form-item label="投放服务类型：" prop="goType">
                <el-select v-model="form.serviceType.firstCode" placeholder="服务类型" clearable style="width: 250px" class="filter-item">
                  <el-option v-for="(item,index) in serviceTypeList" :key="'firstCode' + item.id+index" :label="item.name" :value="item.id"/>
                </el-select>
              </el-form-item>
              <el-form-item label="Banner图：" prop="elementValue">
                <Upload type="banner" v-model="form.elementValue"/>
              </el-form-item>
              <el-form-item label="跳转类型：" prop="goType">
                <el-select v-model="form.goType" placeholder="跳转类型" clearable style="width: 250px" class="filter-item">
                  <el-option v-for="(item,index) in goTypeList" :key="'goType1' + item.id+index" :label="item.name" :value="item.id"/>
                </el-select>
              </el-form-item>
              <el-form-item v-if="form.goType == 2" label="跳转页面：" prop="adValue">
                <el-select v-model="form.nativeUrl" placeholder="跳转页面" @change="pageUrlChange" clearable style="width: 250px" class="filter-item">
                  <el-option v-for="(item,index) in pageUrlList" :key="item.id+index" :label="item.name" :value="item.id"/>
                </el-select>
              </el-form-item>
              <el-form-item v-if="form.goType == 1" label="跳转地址：" prop="adValue">
                <el-input style="width: 300px" v-model="form.h5Url" placeholder="请输入跳转地址" />
              </el-form-item>
              <el-form-item v-if="form.nativeUrl !== '' && form.goType == 2" label="选择公司：" prop="">
                <el-select v-model="form.adParam.firmId" filterable remote reserve-keyword placeholder="请输入关键词" style="width: 350px" :remote-method="searchFirmList" :loading="loading">
                  <el-option
                    v-for="item in firmList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item  v-if="form.nativeUrl == '2' && form.goType == 2" label="服务详情图：" prop="elementValue">
                <Upload type="banner" v-model="form.adParam.firmImg"/>
              </el-form-item>
            </el-form>
          </div>
          <div v-if="typeId == '005'">
            <el-form ref="dataForm" :model="form" label-position="right" label-width="150px" style="margin-left:50px;">
              <el-form-item label="选择公司：" prop="">
                <el-select v-model="form.adParam.firmId" filterable remote reserve-keyword placeholder="请输入关键词" style="width: 350px" :remote-method="searchFirmList" :loading="loading">
                  <el-option
                    v-for="item in firmList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择服务类型：">
                <el-select style="width: 150px" v-model="form.serviceType.firstCode" @change="firstCodeChange" clearable placeholder="请选择一级服务">
                  <el-option v-for="(item,index) in firstCodeList" :key="item.name+index" :label="item.name" :value="item.code"> </el-option>
                </el-select>
                <el-select style="width: 150px" v-model="form.serviceType.secondCode" clearable placeholder="请选择二级服务">
                  <el-option v-for="(item,index) in secondCodeList" :key="item.name+index" :label="item.name" :value="item.code"> </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer" style="text-align: right;">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogStatus == 'create' ? createData() : editData()">保存</el-button>
          </div>
        </div>
        <div v-if="tabTitle == 'addCity'">
          <el-form ref="addCityForm" :model="addCityForm" label-position="right" label-width="150px" style="margin-left:50px;">
            <el-form-item label="选择投放城市：" prop="putCity">
              <el-select v-model="addCityForm.putCity" placeholder="选择投放城市" clearable style="width: 250px" class="filter-item">
                <el-option v-for="(item,index) in cityList" :key="item.id+index" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="选择投放时间：" prop="putTime">
              <el-date-picker
                v-model="addCityForm.putTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="可用广告位：" prop="">
              <div class="canUse">
                <span v-for="(item, index) in canUsePosition" :key="'canUsePosition' + index" @click="selectThisAd(index)" :class="item.active ? item.disabled ? 'active disabled': 'active' : item.disabled ? 'disabled' : ''">{{item.adNum}}</span>
              </div>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align: right;">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogStatus == 'create' ? createData() : editData()">保存</el-button>
          </div>
        </div>
        <div v-if="tabTitle == 'list'">
          <el-table
            v-loading="putListLoading"
            tooltip-effect="dark"
            :data="putList"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column label="ID" prop="id" align="center" width="80px">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>

            <el-table-column label="投放城市" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.sensorsTitle }}</span>
              </template>
            </el-table-column>

            <el-table-column label="广告位顺序" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.sensorsTitle }}</span>
              </template>
            </el-table-column>

            <el-table-column label="投放时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.sensorsTitle }}</span>
              </template>
            </el-table-column>

            <el-table-column label="是否生效" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.sensorsTitle }}</span>
              </template>
            </el-table-column>

            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.sensorsTitle }}</span>
              </template>
            </el-table-column>
            
            <el-table-column :label="$t('table.actions')" align="center" width="250" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <!-- <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button> -->
                <el-button style="margin-left: 10px;" type="success" size="small" @click="handleUp(scope.row)" v-if="scope.row.status !== 1">上架</el-button>
                <el-button style="margin-left: 10px;" type="warning" size="small" @click="handleDown(scope.row)" v-if="scope.row.status == 1">下架</el-button>
                <el-button style="margin-left: 10px;" type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="listTab">
            <el-button type="warning">全部上架</el-button>
            <el-button type="danger">全部下架</el-button>
          </div>
        </div>
    </el-dialog>

  </div>
</template>
<script>
import { advertPositionInfoList, advertPublish, advertUnpublish, advertDelete, advertInfoSave } from '@/api/adManager'
import {} from '@/api/adManager'
import global from '@/utils/global'
import waves from '@/directive/waves' // Waves directive
import Upload from '@/components/Upload/uploadImg'
export default {
  name: 'BussinessAd',
  components: {
    Upload
  },
  directives: { waves },
  props: {
    type: {
      type: String,
      default: 'baseSet'
    },
    typeId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      listQuery: {
        positionNo: this.typeId,
        status: '',
        name: '',
        pageNum: 1,
        pageSize: 10
      },
      statusList: global.statusList,
      listLoading: false,
      list: [],
      dialogFormVisible: false,
      dialogStatus: '',
      pageUrlList: global.pageUrlList,
      firmList: [],
      loading: false,
      serviceTypeList: [],
      firstCodeList: [],
      secondCodeList: [],
      form: {
        adTitle: '',
        elementValue: '',
        goType: '',
        pageUrl: '',
        nativeUrl: '',
        h5Url: '',
        adValue: '',
        remark: '',
        serviceType: {
          firstCode: '',
          secondCode: ''
        },
        adParam: {
          firmId: ''
        }
      },
      putListLoading: false,
      putList: [],
      addCityForm: {
        putCity: '',
        putTime: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        jumpType: ''
      },
      cityList: [],
      canUsePosition: [
        {adNum: 1, active: false, disabled: true},
        {adNum: 2, active: false, disabled: false},
        {adNum: 3, active: false, disabled: true},
        {adNum: 4, active: false, disabled: false},
        {adNum: 5, active: false, disabled: true}
      ],
      goTypeList: [
        { name: '无跳转', id: 0},
        { name: '原生', id: 2},
        { name: '其他URL', id: 1}
      ],
      tabTitle: 'baseSet'
    }
  },
  created(){
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      advertPositionInfoList(this.listQuery).then(res => {
        if(res.code == 0){
          this.list = res.data.items
          this.total = res.data.total
          this.listLoading = false
        }
      })
    },
    handleUp (row) {
      this.$confirm('确认上架?', '提示', {}).then(() => {
        let params = {
          adId: row.id
        }
        advertPublish(params).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: '成功',
              message: '上架成功',
              type: 'success',
              duration: 2000
            })
          }
          this.getList()
        })
      })
    },
    handleDown(row) {
      this.$confirm('确认下架?', '提示', {}).then(() => {
        let params = {
          adId: row.id
        }
        advertUnpublish(params).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: '成功',
              message: '下架成功',
              type: 'success',
              duration: 2000
            })
          }
          this.getList()
        })
      })
    },
    handleDelete() {
      this.$confirm('确认删除?', '提示', {}).then(() => {
        let params = {
          adId: row.id
        }
        advertUnpublish(params).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          }
          this.getList()
        })
      })
    },
    tabChange(val){
      if (val == 'list') {

      }
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
    },
    createData() {
      console.log(123)
      let params = {
        positionNo: this.typeId,
        adType: 2,
        adTitle: this.form.adTitle,
        elementValue: this.form.elementValue,
        goType: this.form.goType,
        adValue: this.form.goType == 1 ? this.form.h5Url : this.form.nativeUrl,
        goParam: this.form.goParam,
        remark: this.form.remark
      }
      advertInfoSave(params).then(res => {
        if(res.code == 0){
          console.log(res)
        }
      })
    },
    handleEdit() {
      this.dialogFormVisible = true
      this.dialogStatus = 'edit'
    },
    editData() {

    },
    selectType(val){
      console.log(val)
    },
    pageUrlChange(){
      this.$forceUpdate()
      console.log(this.form.nativeUrl)
    },
    searchFirmList(query){
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    firstCodeChange(value) {
      this.temp.serviceType.secondCode = ''
      for(let i=0;i<this.firstCodeList.length;i++){
        if(this.firstCodeList[i].code == value) {
          this.secondCodeList = this.firstCodeList[i].children
        }
      }
    },
    getPutList() {
      this.putListLoading = true

    },
    selectThisAd(index) {
      if (this.canUsePosition[index].disabled) {
        return
      }
      for(let i=0;i<this.canUsePosition.length;i++){
        this.canUsePosition[i].active = false
      }
      this.canUsePosition[index].active = true
    }
  }
}
</script> 
<style lang="scss" scoped>
.bussinessAd {
  padding: 20px;
  .listTab {
    text-align: right;
    margin-top: 30px;
  }
  .canUse {
    overflow: hidden;
    width: 460px;
    span {
      float: left;
      width: 80px;
      height: 80px;
      box-sizing: border-box;
      margin-right: 10px;
      margin-bottom: 10px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 36px;
      text-align: center;
      line-height: 80px;
      border: 1px solid #ccc;
      &:hover {
        border: 1px solid #409EFF;
        color: #409EFF;
      }
      &.active {
        border: 1px solid #409EFF;
        background-color: #409EFF;
        color: #fff;
      }
      &.disabled {
        border: 1px solid #dfdfdf;
        background-color: #dfdfdf;
        color: #fff;
      }
    }
  }
}
</style>
