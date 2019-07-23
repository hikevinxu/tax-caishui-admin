<template>
  <div class="BusinessInforMt-container">
    <!-- <el-row :gutter="40" class="panel-group">
      <el-col :xs="8" :sm="8" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <div class="card-panel-text">已上架</div>
          </div>
          <div class="card-panel-description">
            <count-to :start-val="0" :end-val="102400" :duration="2000" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <div class="card-panel-text">未上架</div>
          </div>
          <div class="card-panel-description">
            <count-to :start-val="0" :end-val="81212" :duration="2000" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <div class="card-panel-text">待补充</div>
          </div>
          <div class="card-panel-description">
            <count-to :start-val="0" :end-val="9280" :duration="2000" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
    </el-row> -->
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" @click="handleCreate">添加</el-button>
      <el-input class="filter-item" style="width: 250px" v-model="listQuery.likeName" placeholder="请输入公司名称" />
      <el-select v-model="listQuery.status" placeholder="状态"  @change="getList" clearable style="width: 150px" class="filter-item">
          <el-option v-for="(item,index) in statusList" :key="item+index" :label="item.name" :value="item.id"/>
      </el-select>
      <el-button v-waves class="filter-item" type="success" icon="el-icon-search" @click="getList">筛选</el-button>
    </div>
    <el-table
      v-loading="listLoading"
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

      <el-table-column label="公司名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.firmName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所在地址" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.firmAddress }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系电话" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.firmContactTell }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="120px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1">{{ scope.row.status | statusFilters }}</el-tag>
          <el-tag type="danger" v-else>{{ scope.row.status | statusFilters }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="浏览量" width="120px" align="center">
        <template slot-scope="scope">
          <span style="color: #337ab7;">{{ scope.row.viewCount }}</span>
        </template>
      </el-table-column>
      
      <el-table-column :label="$t('table.actions')" align="center" width="240px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button style="margin-left: 10px;" type="success" size="small" @click="handleUp(scope.row)" v-if="scope.row.status !== 1">上架</el-button>
          <el-button style="margin-left: 10px;" type="warning" size="small" @click="handleDown(scope.row)" v-if="scope.row.status == 1">下架</el-button>
          <el-button style="margin-left: 10px;" type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog width="800px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" @close="getBusinessTypeList">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="150px" style="margin-left:50px;">

        <el-form-item label="公司名称：">
          <el-input style="width: 300px" v-model="temp.firmName" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item label="公司地址：">
          <el-input style="width: 350px" v-model="temp.firmAddress" placeholder="请输入公司地址" />
        </el-form-item>
        <el-form-item label="所属地区：">
          <el-select style="width: 150px" @change="provinceChange" v-model="temp.provinceCode" clearable placeholder="请选择所属省">
            <el-option v-for="item in provinceList" :key="item.code" :label="item.name" :value="item.code"> </el-option>
          </el-select>
          <el-select v-if="cityList.length > 0" style="width: 150px" @change="cityChange" v-model="temp.cityCode" clearable placeholder="请选择所属市">
            <el-option v-for="item in cityList" :key="item.code" :label="item.name" :value="item.code"> </el-option>
          </el-select>
          <el-select v-if="areaList.length > 0" style="width: 150px" @change="areaChange" v-model="temp.areaCode" clearable placeholder="请选择所属区">
            <el-option v-for="item in areaList" :key="item.code" :label="item.name" :value="item.code"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话：" >
          <el-input style="width: 300px" v-model="temp.firmContactTell" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="公司简介：" >
          <el-input type="textarea" style="width: 500px" rows="3" v-model="temp.firmDesc" placeholder="请输入公司简介" />
        </el-form-item>
        <el-form-item label="主营业务：">
          <el-table
            :data="firstCodeList"
            border
            style="width: 100%">
            <el-table-column label="一级类目" align="center" width="200">
              <template slot-scope="scope">
                <!-- <el-checkbox disabled v-model="scope.row.checked" :label="scope.row.name" border size="mini"></el-checkbox> -->
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="二级类目">
              <template slot-scope="scope">
                <el-checkbox style="margin-top: 5px;" v-for="(item,index) in scope.row.children" :key="item.name+index" v-model="item.checked" @change="firstCodeChange(item.checked, scope.row.code)" :label="item.name" border size="mini"></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item label="是否保存并上线：">
          <el-switch v-model="temp.saveAndUp"></el-switch>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { firmList, firmUp, firmDown, firmSave, firmDelete, firmTop, firmCancelTop, firmDetail, businessTypeList } from '@/api/BusinessInforMt'
import provinceList from '@/utils/province_local'
import { statusFilters } from '@/filters/index'
import global from '@/utils/global'
import CountTo from 'vue-count-to'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'BusinessInforMt',
  components: { CountTo, Pagination },
  directives: { waves },
  data(){
    return {
      listLoading: false,
      list: [],
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        likeName: '',
        status: ''
      },
      statusList: global.statusList,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      temp: {
        id: '',
        firmName: '',
        firmAddress: '',
        provinceCode: '',
        cityCode: '',
        areaCode: '',
        firmContactTell: '',
        firmDesc: '',
        codes: [],
        saveAndUp: false
      },
      rules: {
        // word: [{ required: true, message: '词条名称必填', trigger: 'blur' }]
      },
      options: [],
      firstCodeList: [],
      provinceList: [],
      cityList: [],
      areaList: []
    }
  },
  created(){
    this.getList()
    this.getBusinessTypeList()
    this.provinceList = provinceList
  },
  methods: {
    // 获取列表
    getList(){
      this.listLoading = true
      firmList(this.listQuery).then(response => {
        if(response.code == 0){
          this.list = response.data.items
          this.total = response.data.total
        }
        this.listLoading = false
      })
    },
    // 获取主营业务列表
    getBusinessTypeList () {
      businessTypeList().then(res => {
        if(res.code == 0) {
          this.firstCodeList = res.data
        }
      })
    },
    // 重置表单
    resetTemp(){
      this.temp = {
        id: '',
        firmName: '',
        firmAddress: '',
        provinceCode: '',
        cityCode: '',
        areaCode: '',
        firmContactTell: '',
        firmDesc: '',
        codes: [],
        saveAndUp: false
      }
    },
    // 唤起新建
    handleCreate(){
      this.getBusinessTypeList()
      this.resetTemp()
      this.cityList = []
      this.areaList = []
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 新建
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let arr = []
          for(let i=0;i<this.firstCodeList.length;i++){
            if(this.firstCodeList[i].checked == true){
              // arr.push(this.firstCodeList[i].code)
              for(let j=0;j<this.firstCodeList[i].children.length;j++){
                if(this.firstCodeList[i].children[j].checked == true) {
                  arr.push(this.firstCodeList[i].children[j].code)
                }
              }
            }
          }
          this.temp.codes = arr
          if (this.temp.codes.length == 0 && this.temp.saveAndUp == true) {
            this.$message({
              message: '主营业务为空时，不允许上架！',
              type: 'error',
              showClose: true,
              duration: 1000
            })
          }
          firmSave(this.temp).then((response) => {
            if (response.code == 0) {
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success',
                duration: 2000
              })
              this.dialogFormVisible = false
            }
            this.getList()
          })
        }
      })
    },
    handleEdit(row) {
      this.resetTemp()
      this.cityList = []
      this.areaList = []
      let params = {
        id: row.id
      }
      firmDetail(params).then(res => {
        if(res.code == 0) {
          this.temp.id = row.id
          this.temp.firmName = res.data.firmName
          this.temp.firmAddress = res.data.firmAddress
          this.temp.firmContactTell = res.data.firmContactTell
          this.temp.firmDesc = res.data.firmDesc
          this.temp.provinceCode = res.data.provinceCode || ''
          this.temp.provinceName = res.data.provinceName || ''
          this.temp.cityCode = res.data.cityCode || ''
          this.temp.cityName = res.data.cityName || ''
          var city = {}
          if (this.temp.provinceCode != '') {
            city = this.provinceList.find(function(item){
              return item.code === res.data.provinceCode 
            })
            if (city.cityList) {
              this.cityList = city.cityList
            }
          }
          this.temp.areaCode = res.data.areaCode || ''
          this.temp.areaName = res.data.areaName || ''
          var area = {}
          if (this.temp.cityCode != '' && this.cityList) {
            area = this.cityList.find(function(item){
              return item.code === res.data.cityCode
            })
            if (area.cityList) {
              this.areaList = area.cityList
            }
          }
          this.firstCodeList = res.data.businessTypes
          this.dialogStatus = 'update'
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        }
      })
    },
    updateData(){
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let arr = []
          for(let i=0;i<this.firstCodeList.length;i++){
            if(this.firstCodeList[i].checked == true){
              // arr.push(this.firstCodeList[i].code)
              for(let j=0;j<this.firstCodeList[i].children.length;j++){
                if(this.firstCodeList[i].children[j].checked == true) {
                  arr.push(this.firstCodeList[i].children[j].code)
                }
              }
            }
          }
          this.temp.codes = arr
          if (this.temp.codes.length == 0 && this.temp.saveAndUp == true) {
            this.$message({
              message: '该公司未配置业务类型，不能上架！',
              type: 'error',
              showClose: true,
              duration: 1000
            })
          }
          firmSave(this.temp).then((response) => {
            if (response.code == 0) {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
              this.dialogFormVisible = false
            }
            this.getList()
          })
        }
      })
    },
    // 上架
    handleUp(row) {
      const id = row.id
      this.$confirm('确认上架?', '提示', {}).then(() => {
        let query = {
          id: id
        }
        firmUp(query).then(response => {
          if (response.code == 0) {
            this.$notify({
              title: '成功',
              message: '上架成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              message: '上架失败',
              type: 'error',
              showClose: true,
              duration: 1000
            })
          }
          this.getList()
        })
      })
    },
    // 下架
    handleDown(row) {
      const id = row.id
      this.$confirm('确认下架?', '提示', {}).then(() => {
        let query = {
          id: id
        }
        firmDown(query).then(response => {
          if (response.code == 0) {
            this.$notify({
              title: '成功',
              message: '下架成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              message: '下架失败',
              type: 'error',
              showClose: true,
              duration: 1000
            })
          }
          this.getList()
        })
      })
    },
    // 删除
    handleDelete(row) {
      const id = row.id
      this.$confirm('确认删除?', '提示', {}).then(() => {
        let query = {
          id: id
        }
        firmDelete(query).then(response => {
          if (response.code == 0) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              message: '删除失败',
              type: 'error',
              showClose: true,
              duration: 1000
            })
          }
          this.getList()
        })
      })
    },
    firstCodeChange(value, code){
      for(let i=0;i<this.firstCodeList.length;i++){
        if(this.firstCodeList[i].code == code){
          this.firstCodeList[i].checked = false
          for(let j=0;j<this.firstCodeList[i].children.length;j++){
            if(this.firstCodeList[i].children[j].checked == true){
              this.firstCodeList[i].checked = true
            }
          }
        }
      }
    },
    provinceChange(val){
      this.cityList = []
      this.areaList = []
      this.temp.cityName = ''
      this.temp.cityCode = ''
      this.temp.areaName = ''
      this.temp.areaCode = ''
      if (val == '') {
        this.temp.provinceName = ''
        this.temp.provinceCode = ''
        return
      }
      var obj = {};
      obj = this.provinceList.find(function(item){
        return item.code === val
      })
      this.temp.provinceName = obj.name
      this.cityList = obj.cityList
    },
    cityChange(val){
      this.areaList = []
      this.temp.areaName = ''
      this.temp.areaCode = ''
      if (val == '') {
        this.temp.cityName = ''
        this.temp.cityCode = ''
        return
      }
      var obj = {};
      obj = this.cityList.find(function(item){
        return item.code === val 
      })
      this.temp.cityName = obj.name
      this.areaList = obj.cityList
    },
    areaChange(val){
      if (val == '') {
        this.temp.areaName = ''
        this.temp.areaCode = ''
        return
      }
      var obj = {};
      obj = this.areaList.find(function(item){
        return item.code === val 
      })
      this.temp.areaName = obj.name
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.BusinessInforMt-container {
  padding: 20px;
  .panel-group {
    .card-panel-col{
      margin-bottom: 20px;
    }
    .card-panel {
      height: 72px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: hsl(179, 56%, 52%);
        }
        .icon-message {
          background: #36a3f7;
        }
        .icon-money {
          background: #f4516c;
        }
        .icon-shopping {
          background: #34bfa3
        }
      }
      .icon-people {
        color: #36a3f7;
      }
      .icon-message {
        color: #40c9c6;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shopping {
        color: #34bfa3;
      }
      .card-panel-icon-wrapper {
        float: left;
        height: 52px;
        margin: 10px;
        padding: 10px 20px;
        box-sizing: border-box;
        line-height: 32px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
        .card-panel-text {
          font-size: 16px;
          font-weight: 700;
        }
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
