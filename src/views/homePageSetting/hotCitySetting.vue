<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" @click="handleCreate">添加</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="城市编码" align="center">
        <template slot-scope="scope">
          <span style="color: #337ab7;">{{ scope.row.code }}</span>
        </template>
      </el-table-column>

      <el-table-column label="城市名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="序号" align="center">
        <template slot-scope="scope">
          <span style="color: #337ab7;">{{ scope.row.sortIndex }}</span>
        </template>
      </el-table-column>
      
      <el-table-column :label="$t('table.actions')" align="center" min-width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button style="margin-left: 12px;" type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog width="620px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="120px" style="margin-left:50px;">

        <el-form-item label="热门城市：">
          <el-select style="width: 150px" @change="provinceChange" v-model="temp.provinceCode" clearable placeholder="请选择所属省">
            <el-option v-for="item in provinceList" :key="item.code" :label="item.name" :value="item.code"> </el-option>
          </el-select>
          <el-select v-if="cityList.length > 0" style="width: 150px" @change="cityChange" v-model="temp.cityCode" clearable placeholder="请选择所属市">
            <el-option v-for="item in cityList" :key="item.code" :label="item.name" :value="item.code"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="排序：" prop="sortIndex">
          <el-input-number v-model="temp.sortIndex" :min="1" label="描述文字"></el-input-number>
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
import { hotCityList, hotCitySave, hotCityDelete } from '@/api/homePageSetting'
import provinceList from '@/utils/province_local'
import waves from '@/directive/waves' // Waves directive
export default {
  name: 'hotWordsSetting',
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      temp: {
        provinceCode: '',
        provinceName: '',
        cityCode: '',
        cityName: '',
        sortIndex: 1
      },
      provinceList: [],
      cityList: [],
      areaList: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        word: [{ required: true, message: '词条名称必填', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
    this.provinceList = provinceList
  },
  methods: {
    /**
     * 获取热门城市列表
     * @function getList
     */
    getList() {
      this.listLoading = true
      hotCityList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    //重置表单
    resetTemp() {
      this.temp = {
        provinceCode: '',
        provinceName: '',
        cityCode: '',
        cityName: '',
        sortIndex: 1
      }
    },
    //唤起新建
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 热门城市删除
    handleDelete(row) {
      const code = row.code
      this.$confirm('确认删除？', '提示', {}).then(() => {
        let query = {
          code: code
        }
        hotCityDelete(query).then(response => {
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
    // 新建热门城市
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let params = {
            code: this.temp.cityCode,
            name: this.temp.cityName,
            sortIndex: this.temp.sortIndex
          }
          hotCitySave(params).then((response) => {
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
    provinceChange(val){
      this.cityList = []
      this.temp.cityName = ''
      this.temp.cityCode = ''
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
    }
  }
}
</script>
