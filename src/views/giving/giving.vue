<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input class="filter-item" style="width: 250px;" v-model="listQuery.companyName" placeholder="请输入机构名称" />
      <el-input class="filter-item" style="width: 250px;" v-model="listQuery.contactPhone" placeholder="请输入联系电话" />
      <el-select class="filter-item" v-model="listQuery.goldRange" clearable @change="goldRangeChange" placeholder="请选择账户金币范围">
        <el-option v-for="item in range" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select class="filter-item" v-model="listQuery.givingRange" clearable @change="givingRangeChange" placeholder="请选择账户赠币范围">
        <el-option v-for="item in range" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select v-permission="['MERCHANT_FILTER_MA']" class="filter-item" style="width: 300px;" v-model="listQuery.personId" filterable clearable @change="getSearchList" placeholder="请选择负责人">
        <el-option v-for="item in adminUserArr" :key="item.id" :label="item.name" :value="item.id">
          <span style="float: left">{{ item.name }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.email }}</span>
        </el-option>
      </el-select>
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

      <el-table-column label="机构名称" width="350px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系人" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.contactName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系电话" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.contactPhone }}</span>
        </template>
      </el-table-column>
        
        <el-table-column label="账户金币" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.balance }}</span>
          </template>
        </el-table-column>

        <el-table-column label="账户赠币" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.bonusBalance }}</span>
          </template>
        </el-table-column>

        <el-table-column label="负责人" align="center">
          <template slot-scope="scope">
          <span>{{ scope.row.personName ? scope.row.personName : '-' }}</span>
          </template>
        </el-table-column>
      
      <el-table-column :label="$t('table.actions')" align="center" width="400">
        <template slot-scope="scope">
          <el-button v-permission="['RECHARGE_OPE']" type="danger" size="mini" @click="clearBonus(scope.row)">退款清零</el-button>
          <el-button v-permission="['RECHARGE_OPE']" type="primary" size="mini" @click="handleRecharge(scope.row)">充值金币</el-button>
          <el-button v-permission="['BONUS_OPE']" type="warning" size="mini" @click="handleGiving(scope.row)">赠送赠币</el-button>
          <el-button type="info" size="mini" @click="handleOperation(scope.row)">操作记录</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <!-- 赠送赠币 -->
    <el-dialog title="赠送赠币" :visible.sync="dialogGiving" width="500px">
      <el-form ref="givingRef" :rules="rules" :model="temp" label-position="right"  style="margin-left:50px;">
        <span style="display: block;margin-bottom: 20px;">提醒：你正在对「商户：<span style="color: red;">{{name}}</span>」进行赠币操作</span>
        <el-form-item label="" prop="amount">
          <el-input @keyup.native="givingAmountChange" v-model="temp.amount" type="tel" placeholder="请输入要赠送的金币数量" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogGiving = false">取消</el-button>
        <el-button :loading="givingLoading" type="primary" @click="createData">确定</el-button>
      </div>
    </el-dialog>

    <!-- 充值金币 -->
    <el-dialog title="充值金币" :visible.sync="dialogRecharge" width="500px">
      <el-form ref="rechargeRef" :rules="rechargeRules" :model="rechargeForm" label-position="right"  style="margin-left:50px;">
        <span style="display: block;margin-bottom: 20px;">提醒：你正在对「商户：<span style="color: red;">{{name}}</span>」进行充值操作</span>
        <el-form-item label="" prop="amount">
          <el-input @keyup.native="rechargeAmountChange" v-model="rechargeForm.amount" type="tel" placeholder="请输入要充值的金币数量" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRecharge = false">取消</el-button>
        <el-button :loading="rechargeLoading" type="primary" @click="recharge">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="操作记录" :visible.sync="dialogOperationVisible">
      <el-table
      :data="listOperation"
      border
      fit
      highlight-current-row
      style="width: 100%;">
        <el-table-column label="序号" type="index" :index="1" width="80px" align="center" ></el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.amount }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.adminUserName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作时间" align="center">
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
import { obtainAccountPage, obtainBonusItemPage, presentBonus, bonusItemRecharge, bonusItemObtainBonusPage, bonusItemClearBonus } from '@/api/giving'
import { adminUserUserList } from '@/api/userManager'
import waves from '@/directive/waves' // Waves directive
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Upload from '@/components/Upload/uploadImgTemp'
import { isInteger } from '@/utils/validate'
export default {
  name: 'hotWordsSetting',
  components: { Pagination,Upload },
  directives: { waves, permission },
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
        goldRang: '',
        givingRange: '',
        startAmount: '',
        endAmount: '',
        startBonusAmount: '',
        endBonusAmount: '',
        personId: ''
      },
      listOperaQuery: {
        accountId: '',
        pageNum: 1,
        pageSize: 10
      },
      temp: {
        accountId: '',
        amount: null
      },
      name: '',
      dialogFormVisible: false,
      dialogGiving: false,
      givingLoading: false,
      dialogOperationVisible: false,
      dialogStatus: '',
      rules: {
        amount: [
          {required: true, message: '请输入0<x<=100000内的正整数', trigger: 'blur' },
          {validator: isInteger, trigger: 'change'},
          {validator: isInteger, trigger: 'blur'}
        ]
      },
      // 范围筛选
      range: [
        {value: 1, label: '0'},
        {value: 2, label: '0-3000'},
        {value: 3, label: '3000-8000'},
        {value: 4, label: '8000以上'}
      ],
      // 充值金币
      dialogRecharge: false,
      rechargeLoading: false,
      rechargeForm: {
        accountId: '',
        amount: null
      },
      rechargeRules: {
        amount: [
          {required: true, message: '请输入0<x<=100000内的正整数', trigger: 'blur' },
          {validator: isInteger, trigger: 'change'},
          {validator: isInteger, trigger: 'blur'}
        ]
      },
      adminUserArr: []
    }
  },
  created() {
    if (checkPermission(['MERCHANT_FILTER_MA'])) {
      this.getAdminUserList()
    }
    this.getList()
  },
  methods: {
    // 搜索金币范围发生改变
    goldRangeChange(val) {
      console.log(val)
      if(val == 1) {
        this.listQuery.startAmount = 0
        this.listQuery.endAmount = 0
      }else if(val == 2) {
        this.listQuery.startAmount = 0
        this.listQuery.endAmount = 3000
      }else if(val == 3) {
        this.listQuery.startAmount = 3000
        this.listQuery.endAmount = 8000
      }else if(val == 4) {
        this.listQuery.startAmount = 8000
        this.listQuery.endAmount = ''
      }else {
        this.listQuery.startAmount = ''
        this.listQuery.endAmount = ''
      }
      this.getSearchList()
    },
    givingRangeChange(val) {
      console.log(val)
      if(val == 1) {
        this.listQuery.startBonusAmount = 0
        this.listQuery.endBonusAmount = 0
      }else if(val == 2) {
        this.listQuery.startBonusAmount = 0
        this.listQuery.endBonusAmount = 3000
      }else if(val == 3) {
        this.listQuery.startBonusAmount = 3000
        this.listQuery.endBonusAmount = 8000
      }else if(val == 4) {
        this.listQuery.startBonusAmount = 8000
        this.listQuery.endBonusAmount = ''
      } else {
        this.listQuery.startBonusAmount = ''
        this.listQuery.endBonusAmount = ''
      }
      this.getSearchList()
    },
    // 获取列表内容
    getList() {
      this.listLoading = true
      obtainAccountPage(this.listQuery).then(response => {
        if(response.code == 0){
          console.log(response)
          this.list = response.data.items
          this.total = response.data.total
        }
        this.listLoading = false
      })
    },
    getSearchList() {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = 10
      this.getList()
    },
    // 赠送赠币
    // 打开赠送赠币弹框
    handleGiving(row) {
      this.resetTemp()
      this.temp.accountId = row.id
      this.temp.amount = null
      this.name = row.name
      this.dialogGiving = true
    },
    //重置表单
    resetTemp() {
      this.temp = {
        accountId: '',
        amount: null
      }
    },
    // 赠送赠币
    createData() {

      if(Number(this.temp.amount) > 100000){
        this.$message({
          message: '赠币不能超过100000',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }

      if(Number(this.temp.amount) <=  0){
        this.$message({
          message: '赠币必须超过0',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      this.$refs['givingRef'].validate((valid) => {
        if (valid) {
          this.givingLoading = true
          presentBonus(this.temp).then((response) => {
            if (response.code == 0) {
              this.$notify({
                title: '成功',
                message: '赠送成功',
                type: 'success',
                duration: 2000
              })
              this.dialogGiving = false
              this.givingLoading = false
              this.getList()
            }
          }).catch(err => {
            this.givingLoading = false
          })
        } else {
          return false
        }
      })
    },
    // 充值金币
    // 打开充值金币弹框
    handleRecharge(row) {
      this.resetRechargeForm()
      this.rechargeForm.accountId = row.id
      this.rechargeForm.amount = null
      this.name = row.name
      this.dialogRecharge = true
    },
    // 充值金币
    recharge() {

      if(Number(this.rechargeForm.amount) > 100000){
        this.$message({
          message: '充值金币不能超过100000',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }

      if(Number(this.rechargeForm.amount) <=  0){
        this.$message({
          message: '充值金币必须超过0',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }

      this.$refs['rechargeRef'].validate((valid) => {
        if (valid) {
          this.rechargeLoading = true
          bonusItemRecharge(this.rechargeForm).then((response) => {
            if (response.code == 0) {
              this.$notify({
                title: '成功',
                message: '金币充值成功',
                type: 'success',
                duration: 2000
              })
              this.dialogRecharge = false
              this.rechargeLoading = false
            }
            this.getList()
          }).catch(err => {
            this.rechargeLoading = false
          })
        } else {
          return false
        }
      })
    },
    // 重置充值表单
    resetRechargeForm() {
      this.rechargeForm = {
        accountId: '',
        amount: null
      }
    },
    // 退款清零
    clearBonus(row) {
      const id = row.id
      this.$alert('<p>该操作会使<span style="color: red">' + row.name + '</span>的所有金币清零</p>', '退款清零', {
        dangerouslyUseHTMLString: true
      }).then(() => {
        let params = {
          accountId: row.id
        }
        bonusItemClearBonus(params).then(res => {
          if(res.code == 0){
            this.$notify({
              title: '成功',
              message: '清零成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取全部负责人
    getAdminUserList() {
      adminUserUserList().then(res => {
        if(res.code == 0) {
          this.adminUserArr = res.data
        }
      })
    },
    // 打开操作记录弹框
    handleOperation(row){
      this.listOperaQuery.accountId = row.id
      this.dialogOperationVisible = true
      this.getOperaList()
    },
    // 获取操作记录
    getOperaList() {
      bonusItemObtainBonusPage(this.listOperaQuery).then(response => {
        if(response.code == 0){
          console.log(response)
          this.listOperation = response.data.items
          this.operaTotal = response.data.total
        }
      })
    },
    // 充值金币数量变化
    rechargeAmountChange() {
      this.rechargeForm.amount = this.rechargeForm.amount.replace(/[^\.\d]/g,'')
      this.rechargeForm.amount = this.rechargeForm.amount.replace('.','')
      if(this.rechargeForm.amount != '') {
        this.rechargeForm.amount = Number(this.rechargeForm.amount)
      }
    },
    // 赠币数量改变
    givingAmountChange() {
      this.temp.amount = this.temp.amount.replace(/[^\.\d]/g,'')
      this.temp.amount = this.temp.amount.replace('.','')
      if(this.temp.amount != '') {
        this.temp.amount = Number(this.temp.amount)
      }
    }
  }
}
</script>
