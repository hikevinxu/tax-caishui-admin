<template>
  <div class="bannerSetting-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" @click="handleCreate">添加</el-button>
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
      <!-- <el-table-column label="序号" prop="id" align="center" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.sortIndex }}</span>
        </template>
      </el-table-column> -->

      <el-table-column label="一级业务名称" prop="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="二级业务数量" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.childCount }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.shelf == true">{{ scope.row.shelf | shelfFilters }}</el-tag>
          <el-tag type="danger" v-else>{{ scope.row.shelf | shelfFilters }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="排序索引" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sortIndex }}</span>
        </template>
      </el-table-column>
      
      <el-table-column :label="$t('table.actions')" align="center" min-width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button style="margin-left: 10px;" type="success" size="small" @click="handleUp(scope.row)" v-if="scope.row.shelf == false">上架</el-button>
          <el-button style="margin-left: 10px;" type="warning" size="small" @click="handleDown(scope.row)" v-if="scope.row.shelf == true">下架</el-button>
          <el-dropdown style="margin-left: 10px;"  @command="handleCommand">
            <el-button type="primary" size="small">
              排序操作
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{type: 'handleIncr', item: scope.row}">排序上升</el-dropdown-item>
                <el-dropdown-item :command="{type: 'handleDecr', item: scope.row}">排序下降</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <el-button style="margin-left: 10px;" type="primary" size="small" @click="handleIncr(scope.row)">排序上升</el-button>
          <el-button style="margin-left: 10px;" type="success" size="small" @click="handleDecr(scope.row)">排序下降</el-button> -->
          <!-- <el-button style="margin-left: 10px;" type="danger" size="small" @click="handleDelete(scope.row)" v-if="scope.row.shelf == false">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" /> -->

    <el-dialog width="800px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="150px" style="margin-left:50px;">
        <el-form-item label="一级业务名称：" prop="name">
          <el-input v-model="temp.name" placeholder="请输入业务名字" />
        </el-form-item>

        <el-form-item label="业务介绍：">
          <el-input v-model="temp.descr" placeholder="请输入业务介绍" type="textarea" autosize/>
        </el-form-item>
        <!-- <span style="color: red;">（一级业务默认非叶子结点，请尽快添加该业务的子节点，避免数据出错）</span> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus == 'create' ? createData() : editData()" :loading="loading">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { serviceTypeList,serviceTypeInfom,serviceTypeSave,serviceTypeDown,serviceTypeUp,serviceTypeDecr,serviceTypeIncr,serviceTypeUpdate, serviceTypeDelete } from '@/api/service'
import { businessTypeList } from '@/api/homePageSetting'
import { jumpTypeFilters, shelfFilters, pageUrlFilters } from '@/filters/index'
import global from '@/utils/global'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import qs from 'qs'
export default {
  name: 'participles',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: false,
      loading: false,
      listQuery: {
        // pageNum: 1,
        parentCode: '',
        shelf: '',
        // pageSize: 10
      },
      statusList: [
        {name:'已上架',id: true},
        {name:'已下架',id: false}
      ],
      jumpTypeList: global.jumpTypeList,
      secondName: '',
      thirdName: '',
      temp: {
        name: '',
        parentCode: '',
        level: 1,
        descr: '',
        leafNode: false
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
      },
      rules: {
        name: [{ required: true, message: '业务名称必填', trigger: 'blur' }],
        // descr: [{ required: true, message: '类目名称必填', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
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
        name: '',
        parentCode: '',
        level: 1,
        descr: ''
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
    //新建
    createData() { 
      this.loading = true
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // console.log(params)
          this.temp.leafNode = false
          let temp = qs.stringify(this.temp)
          serviceTypeSave(temp).then((response) => {
            if (response.code == 0) {
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success',
                duration: 2000
              })
              this.loading = false
              this.dialogFormVisible = false
            }
            this.getList()
          })
          .catch(err => {
            this.loading = false
          })
        }
      })
    },
    // 编辑
    handleEdit(row) {
      this.resetTemp()
      this.temp.id = row.id
      this.temp.descr = row.descr
      this.temp.name = row.name
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    editData() {
      this.loading = true
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let temp = qs.stringify(this.temp)
          serviceTypeUpdate(temp).then((response) => {
            if (response.code == 0) {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
              this.loading = false
              this.dialogFormVisible = false
            }
            this.getList()
          })
          .catch(err => {
            this.loading = false
          })
        }
      })
    },
    // 删除
    handleDelete(row) {
      const id = row.id
      this.$confirm('该操作会删除所关联的服务和相关广告位，请检查，确认删除？', '提示', {}).then(() => {
        let query = {
          id: id
        }
        query = qs.stringify(query)
        serviceTypeDelete(query).then(response => {
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
    handleCommand(command) {
      console.log(command)
      this[command.type](command.item)
    },
    firstCodeChange(value) {
      this.showThird = false
      if(this.serviceType.firstCode != ''){
        this.showSend = true
      }
      this.serviceType.secondCode = ''
      let data = {
        parentCode: this.serviceType.firstCode
      }
      businessTypeList(data).then(res => {
        if(res.code == 0) {
          this.secondCodeList = res.data
          console.log(res)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bannerSetting-container {
  padding: 20px;
}
</style>
