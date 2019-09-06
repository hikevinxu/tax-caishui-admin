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
      <el-table-column label="ID" prop="id" align="center" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="邀请码" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.inviteCode }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="URL" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.promoteUrl }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="300px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.releaseStatus !== 0" style="margin-left: 12px;" type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog title="添加" width="500px" :visible.sync="dialogFormVisible">
      <el-form class="update" ref="dataForm" :model="temp" label-position="right" label-width="80px" style="width: 350px; margin-left:50px;">

        <el-form-item label="姓名：" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createData()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { salesInviteList, salesInviteAdd, salesInviteDelete } from '@/api/salesManager'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    releaseStatusFilters (status) {
      switch (status) {
        case 0:
          return '待发布'
          break;
        case 1:
          return '已发布'
          break;
        default: 
          return ''
          break;
      }
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      temp: {
        name: ''
      },
      dialogFormVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true
      salesInviteList().then(response => {
        if (response.code === 0) {
          this.list = response.data
          this.listLoading = false
        }
      })
    },
    //重置表单
    resetTemp() {
      this.temp = {
        name: ''
      }
    },
    //唤起新建
    handleCreate() {
      this.resetTemp()
      this.temp.action = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    //新建
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          salesInviteAdd(this.temp).then((response) => {
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
                message: response.msg,
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
    // 撤回
    handleDelete (row) {
      this.$confirm('确认删除?', '提示', {}).then(() => {
        let params = {
          id: row.id
        }
        salesInviteDelete(params).then(response => {
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
    }
  }
}
</script>
<style lang="scss">
.update .el-checkbox {
  width: 175px;
}
.update .el-checkbox+.el-checkbox {
  margin-left: 0;
}
.textHidden {
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2; 
}
</style>
