<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input class="filter-item" style="width: 250px;" v-model="listQuery.companyName" placeholder="请输入机构名称" />
      <el-input class="filter-item" style="width: 250px;" v-model="listQuery.contactPhone" placeholder="请输入联系电话" />
      <el-button v-waves class="filter-item" type="primary" @click="getList">筛选</el-button>
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

      <el-table-column label="机构名称" width="250px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系人" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.contactName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系电话" align="center" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.contactPhone }}</span>
        </template>
      </el-table-column>
        
        <el-table-column label="账户金币" align="center" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.balance }}</span>
          </template>
        </el-table-column>

        <el-table-column label="账户赠币" align="center" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.bonusBalance }}</span>
          </template>
        </el-table-column>
      
      <el-table-column :label="$t('table.actions')" align="center" min-width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button style="margin-left: 12px;" type="warning" size="small" @click="handleGiving(scope.row)">赠送金币</el-button>
          <el-button style="margin-left: 12px;" type="danger" size="small" @click="handleOperation(scope.row)">赠送记录</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog title="赠送金币" :visible.sync="dialogGiving">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right"  style="margin-left:50px;">
        
        <span style="display: block;margin-bottom: 20px;">提醒：你正在对「商户：<span style="color: red;">{{name}}</span>」进行赠币操作</span>

        <el-form-item label="" prop="amount">
          <el-input v-model="temp.amount" type="number" placeholder="请输入要赠送的金币数量" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogGiving = false">取消</el-button>
        <el-button type="primary" @click="createData">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="操作记录" :visible.sync="dialogOperationVisible">
      <el-table
      :data="listOperation"
      border
      fit
      highlight-current-row
      style="width: 100%;">
        <el-table-column label="用户" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.adminUserName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="赠送金额" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.amount }}</span>
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
import { obtainAccountPagen, obtainBonusItemPage, presentBonus } from '@/api/giving'
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
        pageSize: 10,
        companyName: '',
        contactPhone: '',
      },
      listOperaQuery: {
        accountId: '',
        pageNum: 1,
        pageSize: 10,
      },
      temp: {
        accountId: '',
        amount: null
      },
      name: '',
      dialogFormVisible: false,
      dialogGiving: false,
      dialogOperationVisible: false,
      dialogStatus: '',
      rules: {
        amount: [{ required: true, message: '赠送金币不能为空' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      obtainAccountPagen(this.listQuery).then(response => {
        // console.log(response)
        if(response.code == 0){
          console.log(response)
          this.list = response.data.items
          this.total = response.data.total
        }
        this.listLoading = false
      })
    },
    getOperaList() {
      obtainBonusItemPage(this.listOperaQuery).then(response => {
        // console.log(response)
        if(response.code == 0){
          console.log(response)
          this.listOperation = response.data.items
          this.operaTotal = response.data.total
        }
      })
    },
    handleGiving(row) {
      this.resetTemp()
      this.temp.accountId = row.id
      this.temp.amount = null
      this.name = row.name
      this.dialogGiving = true
    },
    handleOperation(row){
      this.listOperaQuery.accountId = row.id
      this.dialogOperationVisible = true
      this.getOperaList()
    },
    //重置表单
    resetTemp() {
      this.temp = {
        accountId: '',
        amount: null
      }
    },
    // 新建词条
    createData() {
      // this.$refs['dataForm'].validate((valid) => {
      //   if (valid) {
          if(this.temp.amount > 1000){
            this.$message({
              message: '赠币不能超过1000',
              type: 'error',
              showClose: true,
              duration: 1000
            })
            return
          }

          if(this.temp.amount <  0){
            this.$message({
              message: '赠币不能低于0',
              type: 'error',
              showClose: true,
              duration: 1000
            })
            return
          }
          presentBonus(this.temp).then((response) => {
            if (response.code == 0) {
              this.$notify({
                title: '成功',
                message: '赠送成功',
                type: 'success',
                duration: 2000
              })
              this.dialogGiving = false
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
        // }
      // })
    }
  }
}
</script>
