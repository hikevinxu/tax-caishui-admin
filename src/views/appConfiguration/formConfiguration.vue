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
      <el-table-column type="index" width="50" align="center">
      </el-table-column>

      <el-table-column label="类目" width="450px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.serviceName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="关联配置项" width="450px" align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.extendNames }}</span> -->
          <span v-for="(item,index) in scope.row.extendList" :key="index">{{ item.name }}、</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="icon" align="center" width="150px">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="" srcset="" style="width: 80px;">
        </template>
      </el-table-column>

      <el-table-column label="状态" width="120px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.shelf == true">{{ scope.row.shelf | releaseStatusFilters }}</el-tag>
          <el-tag type="danger" v-else>{{ scope.row.shelf | releaseStatusFilters }}</el-tag>
        </template>
      </el-table-column> -->
      
      <el-table-column :label="$t('table.actions')" align="center" min-width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button style="margin-left: 12px;" type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button style="margin-left: 12px;" type="success" size="small" @click="handleUp(scope.row)" v-if="scope.row.shelf == 2 || scope.row.shelf == 0">上架</el-button>
          <el-button style="margin-left: 12px;" type="warning" size="small" @click="handleDown(scope.row)" v-if="scope.row.shelf == 1">下架</el-button>
          <el-button style="margin-left: 12px;" type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="120px" style="margin-left:50px;">

        <el-form-item label="一级业务：" prop="firstCode" v-show="dialogStatus == 'create'">
          <el-select  style="width: 300px" v-model="temp.firstCode" @change="createCodeChange" clearable placeholder="请选择一级业务">
          <el-option v-for="(item,index) in firstCodeList" :key="item.code+index" :label="item.name" :value="item.code"> </el-option>
        </el-select>
        </el-form-item>

        <el-form-item  label="二级业务：" prop="serviceCode" v-show="dialogStatus == 'create'">
          <el-select style="width: 300px" v-model="temp.serviceCode" @change="serviceCodeChange" clearable placeholder="请选择二级业务">
            <el-option v-for="(item,index) in secondCodeList" :key="item.code+index" :label="item.name" :value="item.code"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="配置项：" >
          <div style="display:flex;">
            
            <div class="inputList" >
              <div v-for="(item,index) in extendCodes" :key="index" style="display: flex;">
                <el-select style="width: 300px;margin-bottom: 10px;" v-model="item.code" clearable placeholder="请选择配置项">
                <el-option v-for="(item,index) in extendList" :key="item.code+index" :label="item.name" :value="item.code"> </el-option>
              </el-select>
              <el-button type="danger" style="height: 36px;margin-left:10px;" @click="deleteExtend(item,index)">删除</el-button>
              </div>
            </div>

            <el-button type="primary" style="height: 36px;margin-left:10px;" @click="addExtend">添加</el-button>
          </div>
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
import { extendList,extendRelatedSave,extendTypeList,extendRelatedDetail,extendRelatedDelete } from '@/api/extend'
import { serviceTypeList } from '@/api/service'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Upload from '@/components/Upload/uploadImgTemp'
export default {
  name: 'hotWordsSetting',
  components: { Pagination,Upload },
  directives: { waves },
  filters: {
    releaseStatusFilters (val) {
      if(val  == 1){
        return val = '已上架'
      }else if(val == 2){
        return val = '已下架'
      }else if(val == 0){
        return val = '待上架'
      }
    },
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        status: '',
        pageSize: 10
      },
      temp: {
        firstCode: '',
        serviceCode: '',
        extendCodes: []
      },
      extendCodes: [
        {
          code: ''
        }
      ],
      uploadImg: {
        imgUrl: '',
        fileId: ''
      },
      extendList: [],
      firstCodeList: [],
      secondCodeList: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        serviceCode: [{ required: true, message: '服务类目必选' }]
      }
    }
  },
  created() {
    this.getList()
    this.getBusinessTypeList()
    this.getExtendList()
    console.log(this.temp.extendCodes)
  },
  methods: {
    /**
     * 获取热门词条列表
     * @function getList
     */
    getList() {
      this.listLoading = true
      extendTypeList(this.listQuery).then(response => {
        // console.log(response)
        if(response.code == 0){
          console.log(response)
          this.list = response.data.items
          this.total = response.data.total
        }
        this.listLoading = false
      })
    },
    getExtendList(){
      extendList().then(response => {
        console.log(response)
        if(response.code == 0){
          this.extendList = response.data
        }
      })
    },
    /**
     * 词条上架
     * @function handleUp
     */
    handleUp(row) {
      const id = row.id
      this.$confirm('确认上架?', '提示', {}).then(() => {
        let query = {
          id: id,
        }
        qualificateUp(query).then(response => {
          console.log(response)
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
    /**
     * 词条下架
     * @function handleDown
     */
    handleDown(row) {
      const id = row.id
      this.$confirm('确认下架?', '提示', {}).then(() => {
        let query = {
          id: id,
        }
        qualificateDown(query).then(response => {
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
    //重置表单
    resetTemp() {
      this.extendCodes = [
        {
          code: ''
        }
      ]
      this.temp = {
        serviceCode: '',
        extendCodes: []
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
    handleEdit(row) {
      this.resetTemp()
      this.dialogStatus = 'Edit'
      this.dialogFormVisible = true
      this.temp.serviceCode = row.serviceCode
      let data = {
        serviceCode: row.serviceCode
      }
      extendRelatedDetail(data).then(response => {
        console.log(response)
        if(response.code == 0){
          this.extendCodes = response.data.extendList
        }
      })
    },
    // 词条删除
    handleDelete(row) {
      const serviceCode = row.serviceCode
      this.$confirm('确认删除？', '提示', {}).then(() => {
        let query = {
          serviceCode: serviceCode
        }
        extendRelatedDelete(query).then(response => {
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
    addExtend(){
      let json = {
        value: '',
        name: ''
      }
      this.extendCodes.push(json)
    },
    deleteExtend(item,index){
      if(this.extendCodes.length > 1){
        this.extendCodes.splice(index,1)
      }else{
        this.$message({
          message: '至少添加一个配置项',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
    },
    // 新建词条
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let extendCodes = []
          console.log(this.extendCodes)
          for (let i = 0; i < this.extendCodes.length; i++) {
            if(this.extendCodes[i].code == ''){
              this.$message({
                message: '配置项必选',
                type: 'error',
                showClose: true,
                duration: 1000
              })
              return
            }
            extendCodes.push(this.extendCodes[i].code)
          }
          let data = {
            serviceCode: this.temp.serviceCode,
            extendCodes: extendCodes
          }
          console.log(data)
          extendRelatedSave(data).then((response) => {
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
    updateData() {
      // this.$refs['dataForm'].validate((valid) => {
      //   if (valid) {
          let extendCodes = []
          console.log(this.extendCodes)
          for (let i = 0; i < this.extendCodes.length; i++) {
            if(this.extendCodes[i].code == ''){
              this.$message({
                message: '配置项必选',
                type: 'error',
                showClose: true,
                duration: 1000
              })
              return
            }
            extendCodes.push(this.extendCodes[i].code)
          }
          let data = {
            serviceCode: this.temp.serviceCode,
            extendCodes: extendCodes
          }
          console.log(data)
          extendRelatedSave(data).then((response) => {
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
      //   }
      // })
    },
    getBusinessTypeList () {
      let data = {
        parentCode: ''
      }
      serviceTypeList().then(res => {
        if(res.code == 0) {
          this.firstCodeList = res.data
          console.log(res)
        }
      })
    },
    createCodeChange(value) {
      this.temp.serviceCode = ''
      this.secondCodeList = []
      let data = {
        parentCode: this.temp.firstCode
      }
      console.log(data)
      serviceTypeList(data).then(res => {
        if(res.code == 0) {
          this.showCreateSend = true
          this.secondCodeList = res.data
          console.log(res)
        }
      })
    },
    serviceCodeChange(value){
      console.log(value)
      this.temp.serviceCode = value
      console.log(this.temp)
    }
  }
}
</script>
