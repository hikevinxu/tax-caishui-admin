<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" @click="handleCreate">添加</el-button>
      <el-button v-waves class="filter-item" type="danger" @click="dialogOperationVisible = true">操作记录</el-button>
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

      <el-table-column label="标题" width="450px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="icon(高亮)" align="center" width="150px">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="" srcset="" style="width: 80px;">
        </template>
      </el-table-column>

      <el-table-column label="icon(灰色)" align="center" width="150px">
        <template slot-scope="scope">
          <img :src="scope.row.iconGrey" alt="" srcset="" style="width: 80px;">
        </template>
      </el-table-column>

      <el-table-column label="状态" width="120px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.shelf == true">{{ scope.row.shelf | releaseStatusFilters }}</el-tag>
          <el-tag type="danger" v-else>{{ scope.row.shelf | releaseStatusFilters }}</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column :label="$t('table.actions')" align="center" min-width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button style="margin-left: 12px;" type="primary" size="small" @click="handleIncr(scope.row)">排序上升</el-button>
          <el-button style="margin-left: 12px;" type="success" size="small" @click="handleDecr(scope.row)">排序下降</el-button>
          <el-button style="margin-left: 12px;" type="primary" size="small" @click="handleEdit(scope.row)" >编辑</el-button>
          <el-button style="margin-left: 12px;" type="success" size="small" @click="handleUp(scope.row)" v-if="scope.row.shelf == 2 || scope.row.shelf == 0">上架</el-button>
          <el-button style="margin-left: 12px;" type="warning" size="small" @click="handleDown(scope.row)" v-if="scope.row.shelf == 1">下架</el-button>
          <el-button style="margin-left: 12px;" type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog width="620px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="120px" style="margin-left:50px;">

        <el-form-item label="ICON图(高亮)：" prop="icon">
          <Upload v-model="uploadImg"/>
        </el-form-item>

        <el-form-item label="ICON图(灰色)：" prop="iconGrey">
          <Upload v-model="uploadImg1"/>
        </el-form-item>

        <el-form-item label="标题：" prop="title">
          <el-input style="width: 300px" maxlength="4" v-model="temp.title" placeholder="请输入标题" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog title="操作记录" :visible.sync="dialogOperationVisible">
      <el-table
      :data="listOperation"
      border
      fit
      highlight-current-row
      style="width: 100%;">
        <el-table-column label="ID" prop="id" align="center" width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="用户" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.operate }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作Id" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.operateId }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作条目" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作时间" min-width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>

      </el-table>
      <pagination v-show="operaTotal>0" :total="operaTotal" :page.sync="listOperaQuery.pageNum" :limit.sync="listOperaQuery.pageSize" @pagination="getOperaList" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogOperationVisible = false">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { qualificateList, qualificateDown, qualificateUp, qualificateSave, qualificateDetail, qualificateDelete,qualificateEdit,qualificateDecr,qualificateIncr,operateList } from '@/api/security'
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
      listOperation: null,
      total: 0,
      operaTotal: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        status: '',
        pageSize: 10
      },
      listOperaQuery: {
        pageNum: 1,
        type: 2,
        pageSize: 10
      },
      id: '',
      temp: {
        title: '',
        icon: '',
        iconGrey: ''
      },
      uploadImg: {
        imgUrl: '',
        fileId: ''
      },
      uploadImg1:{
        imgUrl: '',
        fileId: ''
      },
      dialogFormVisible: false,
      dialogOperationVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        title: [{ required: true, message: '标题必填', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
    
  },
  methods: {
    getList() {
      this.listLoading = true
      qualificateList(this.listQuery).then(response => {
        // console.log(response)
        if(response.code == 0){
          console.log(response)
          this.list = response.data
          // this.total = response.data.total
          this.getOperaList()
        }
        this.listLoading = false
      })
    },
    getOperaList() {
      operateList(this.listOperaQuery).then(response => {
        // console.log(response)
        if(response.code == 0){
          console.log(response)
          this.listOperation = response.data.items
          this.operaTotal = response.data.total
        }
      })
    },
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
    //上升
    handleIncr(row) {
      const id = row.id
      // this.$confirm('确认下架?', '提示', {}).then(() => {
        let query = {
          id: id,
        }
        qualificateIncr(query).then(response => {
          if (response.code == 0) {
            this.$notify({
              title: '成功',
              message: '排序成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              message: '排序失败',
              type: 'error',
              showClose: true,
              duration: 1000
            })
          }
          this.getList()
        })
      // })
    },
    //下降
    handleDecr(row) {
      const id = row.id
      // this.$confirm('确认下架?', '提示', {}).then(() => {
        let query = {
          id: id,
        }
        qualificateDecr(query).then(response => {
          if (response.code == 0) {
            this.$notify({
              title: '成功',
              message: '排序成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              message: '排序失败',
              type: 'error',
              showClose: true,
              duration: 1000
            })
          }
          this.getList()
        })
      // })
    },
    //重置表单
    resetTemp() {
      this.temp = {
        title: '',
        icon: '',
        iconGrey: ''
      }
      this.uploadImg.imgUrl = ''
      this.uploadImg.fileId = ''
      this.uploadImg1.imgUrl = ''
      this.uploadImg1.fileId = ''
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
    handleEdit(row){
      this.dialogStatus = 'Edit'
      this.id = row.id
      let data = {
        id: row.id
      }
      qualificateDetail(data).then(response => {
        console.log(response)
        if(response.code == 0){
          this.uploadImg.imgUrl = response.data.icon
          this.uploadImg.fileId = response.data.icon
          this.uploadImg1.imgUrl = response.data.iconGrey
          this.uploadImg1.fileId = response.data.iconGrey
          this.temp.title = response.data.title
          this.dialogFormVisible = true
        }
      })
    },
    // 词条删除
    handleDelete(row) {
      const id = row.id
      this.$confirm('确认删除？', '提示', {}).then(() => {
        let query = {
          id: id
        }
        qualificateDelete(query).then(response => {
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
    // 新建词条
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if(this.uploadImg.fileId != '' && this.uploadImg.fileId != undefined ){
            this.temp.icon = this.uploadImg.fileId
          }else {
            this.temp.icon = ''
          }

          if(this.uploadImg1.fileId != '' && this.uploadImg1.fileId != undefined ){
            this.temp.iconGrey = this.uploadImg1.fileId
          }else {
            this.temp.iconGrey = ''
          }
          console.log(this.temp)
          qualificateSave(this.temp).then((response) => {
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
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = this.id
          if(this.uploadImg.fileId != '' && this.uploadImg.fileId != undefined ){
            this.temp.icon = this.uploadImg.fileId
          }else {
            this.temp.icon = ''
          }

          if(this.uploadImg1.fileId != '' && this.uploadImg1.fileId != undefined ){
            this.temp.iconGrey = this.uploadImg1.fileId
          }else {
            this.temp.iconGrey = ''
          }
          console.log(this.temp)
          qualificateEdit(this.temp).then((response) => {
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
    }
  }
}
</script>
