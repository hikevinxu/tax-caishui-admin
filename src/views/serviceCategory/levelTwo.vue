<template>
  <div class="bannerSetting-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" @click="handleCreate">添加</el-button>
      <el-select  style="width: 200px" v-model="listQuery.parentCode" @change="firstCodeChange" clearable placeholder="请选择一级服务">
        <el-option v-for="(item,index) in firstCodeList" :key="item.code+index" :label="item.name" :value="item.code"> </el-option>
      </el-select>
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
      <el-table-column label="序号" prop="id" align="center" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.sortIndex }}</span>
        </template>
      </el-table-column>

      <el-table-column label="二级级类目名称" prop="id" align="center" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="icon" align="center" width="150px">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="" srcset="">
        </template>
      </el-table-column>

      <el-table-column label="三级类目数量" align="center" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.levelThreeCount }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="120px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.shelf == true">{{ scope.row.shelf | shelfFilters }}</el-tag>
          <el-tag type="danger" v-else>{{ scope.row.shelf | shelfFilters }}</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column :label="$t('table.actions')" align="center" min-width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button style="margin-left: 10px;" type="success" size="small" @click="handleUp(scope.row)" v-if="scope.row.shelf == false">上架</el-button>
          <el-button style="margin-left: 10px;" type="warning" size="small" @click="handleDown(scope.row)" v-if="scope.row.shelf == true">下架</el-button>
          <el-button style="margin-left: 10px;" type="primary" size="small" @click="handleIncr(scope.row)">排序上升</el-button>
          <el-button style="margin-left: 10px;" type="success" size="small" @click="handleDecr(scope.row)">排序下降</el-button>
          <!-- <el-button style="margin-left: 10px;" type="danger" size="small" @click="handleDelete(scope.row)" v-if="scope.row.shelf == false">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog width="800px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="120px" style="margin-left:50px;">
        <el-form-item label="一级类目：" prop="parentCode" v-show="textMap[dialogStatus] == '新建'">
          <el-select  style="width: 200px" v-model="temp.parentCode" @change="createCodeChange" clearable placeholder="请选择一级服务">
          <el-option v-for="(item,index) in firstCodeList" :key="item.code+index" :label="item.name" :value="item.code"> </el-option>
        </el-select>
        </el-form-item>

        <el-form-item label="服务名称：" prop="name">
          <el-input v-model="temp.name" placeholder="请输入服务类目名称" type="text" />
        </el-form-item>

        <el-form-item label="ICON图：" prop="icon">
          <Upload v-model="uploadImg"/>
        </el-form-item>

        <el-form-item label="服务介绍：">
          <el-input v-model="temp.descr" placeholder="请输入服务介绍" type="textarea" autosize/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus == 'create' ? createData() : editData()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { serviceTypeList,serviceTypeInfo,serviceTypeSave,serviceTypeDown,serviceTypeUp,serviceTypeDecr,serviceTypeIncr,serviceTypeUpdate } from '@/api/service'
import { businessTypeList } from '@/api/homePageSetting'
import { jumpTypeFilters, shelfFilters, pageUrlFilters } from '@/filters/index'
import global from '@/utils/global'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Upload from '@/components/Upload/uploadImgTemp'
import qs from 'qs'
export default {
  name: 'participles',
  components: { Pagination, Upload },
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        pageNum: 1,
        parentCode:'',
        pageSize: 10
      },
      statusList: [
        {name:'已上架',id: true},
        {name:'已下架',id: false}
      ],
      firstCodeList: [],
      serviceType: {
        firstCode: '',
      },
      jumpTypeList: global.jumpTypeList,
      uploadImg: {
        imgUrl: '',
        fileId: ''
      },
      secondName: '',
      thirdName: '',
      temp: {
        id: '',
        icon: '',
        serviceCode: '',
        name: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
      },
      rules: {
        parentCode: [{ required: true, message: '一级类目必填' }],
        name: [{ required: true, message: '服务类目名称不为空' }]
      }
    }
  },
  created() {
    // this.getList()
    this.getBusinessTypeList()
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true
      serviceTypeList(this.listQuery).then(response => {
        if(response.code == 0){
          console.log(response)
          this.list = response.data
          // this.total = response.data.total
        }
        this.listLoading = false
      })
    },
    // 上架
    handleUp(row) {
      const id = row.id
      this.$confirm('确认上架?', '提示', {}).then(() => {
        let query = {
          id: id
        }
        query = qs.stringify(query)
        serviceTypeUp(query).then(response => {
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
        query = qs.stringify(query)
        serviceTypeDown(query).then(response => {
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
    // 上升
    handleIncr(row) {
      const id = row.id
      // this.$confirm('确认排序上升?', '提示', {}).then(() => {
        let query = {
          id: id
        }
        query = qs.stringify(query)
        serviceTypeIncr(query).then(response => {
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
    // 下降
    handleDecr(row) {
      const id = row.id
      // this.$confirm('确认排序下降?', '提示', {}).then(() => {
        let query = {
          id: id
        }
        query = qs.stringify(query)
        serviceTypeDecr(query).then(response => {
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
        id: '',
        icon: '',
        parentCode: '',
        name: '',
        level: 2,
        descr: ''
      }
      this.uploadImg.imgUrl = ''
      this.uploadImg.fileId = ''
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
    //新建
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let params = {
            // id: '',
            icon: this.uploadImg.fileId,
            parentCode: this.temp.parentCode,
            name: this.temp.name,
            descr: this.temp.descr,
            level: 2
          }
          // console.log(params)
          params = qs.stringify(params)
          serviceTypeSave(params).then((response) => {
            if (response.code == 0) {
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success',
                duration: 2000
              })
              this.dialogFormVisible = false
            } else {
              this.$message({
                message: response.data.msg,
                type: 'error',
                showClose: true,
                duration: 1000
              })
            }
            this.getList()
          })
        }
      })
    },
    // 编辑
    handleEdit(row) {
      this.resetTemp()
      this.temp.id = row.id
      this.temp.icon = row.icon
      this.temp.parentCode = row.parentCode
      this.temp.name = row.name
      this.temp.descr = row.descr
      this.uploadImg.imgUrl = row.icon
      this.uploadImg.fileId = row.icon
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    editData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let params = {
            id: this.temp.id,
            parentCode: this.temp.parentCode,
            name: this.temp.name,
            icon: this.uploadImg.fileId,
            level: 2,
            descr: this.temp.descr
          }
          params = qs.stringify(params)
          serviceTypeUpdate(params).then((response) => {
            if (response.code == 0) {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
              this.dialogFormVisible = false
            } else {
              this.$message({
                message: "修改失败",
                type: 'error',
                showClose: true,
                duration: 1000
              })
            }
            this.getList()
          })
        }
      })
    },
    // 删除
    handleDelete(row) {
      const id = row.id
      this.$confirm('确认删除?', '提示', {}).then(() => {
        let query = {
          id: id
        }
        serviceTagDelete(query).then(response => {
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
    firstCodeChange(value) {
      let data = {
        parentCode: this.listQuery.parentCode
      }
      console.log(data)
      serviceTypeList(data).then(res => {
        if(res.code == 0) {
          this.list = res.data
          console.log(res)
        }
      })
    },
    createCodeChange(value){
      console.log(this.serviceType)
    }
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
}
</style>
