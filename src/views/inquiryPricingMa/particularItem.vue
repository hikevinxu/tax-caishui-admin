<template>
  <div class="particularItem_container">
    <div class="filter-container">
      <el-button icon="el-icon-circle-plus" v-waves class="filter-item" type="warning" @click="openDialog">添加</el-button>
      <el-cascader class="filter-item" v-model="listQuery.intentionCodeList" @change="intentionCodeChange" :options="intentionCodeList" clearable :props="props" :show-all-levels="false"  placeholder="请选择业务需求"></el-cascader>
      <!-- <el-select v-model="listQuery.type" clearable @change="getSearchList" placeholder="请选择一级服务" style="width: 200px" class="filter-item">
        <el-option v-for="(item,index) in types" :key="item+index" :label="item.name" :value="item.value"/>
      </el-select>
      <el-select v-model="listQuery.status" clearable @change="getSearchList" placeholder="请选择二级服务" style="width: 200px" class="filter-item">
        <el-option v-for="(item,index) in statusList" :key="item+index" :label="item.name" :value="item.id"/>
      </el-select> -->
      <el-button icon="el-icon-search" v-waves class="filter-item" type="primary" @click="getSearchList">筛选</el-button>
      <el-button v-waves class="filter-item" type="info" @click="handleOperation">操作记录</el-button>
    </div>
    <div class="table">
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;">
        <el-table-column label="序号" type="index" :index="1" width="80px" align="center" ></el-table-column>

        <el-table-column label="一级类目" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.parentName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="二级类目" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.serviceName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.extendName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="值" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.extendValueName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="定价" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
    <div class="dialog">
      <!-- 添加/编辑询价单特定项定价 -->
      <el-dialog title="询价单特定值定价" :visible.sync="dialogServicePricing" width="500px">
        <el-form ref="servicePricingRef" :rules="servicePricingRules" :model="servicePricingForm" label-width="110px">
          <el-form-item label="设定价格" prop="price">
            <el-input style="width: 250px" @keyup.native="priceChange" v-model="servicePricingForm.price" type="tel" placeholder="请输入设定的价格" />
          </el-form-item>
          <el-form-item label="选择业务类目">
            <el-cascader v-if="action == 'created'" style="width: 250px" v-model="servicePricingForm.intentionCodeList" @change="intentionCodeDialogChange" :options="intentionCodeList" clearable :props="propsDialog" :show-all-levels="false"  placeholder="请选择业务需求"></el-cascader>
            <span v-else><el-tag>{{ servicePricingForm.parentName + '-' + servicePricingForm.serviceName }}</el-tag></span>
          </el-form-item>
          <el-form-item label="选择项" prop="extendCode">
            <el-select v-if="action == 'created'" v-model="servicePricingForm.extendCode" clearable @change="extendCodeChange" placeholder="请选择选择项" style="width: 250px" class="filter-item">
              <el-option v-for="(item,index) in extendList" :key="'extendList'+index" :label="item.name" :value="item.code"/>
            </el-select>
            <span v-else><el-tag>{{ servicePricingForm.extendName }}</el-tag></span>
          </el-form-item>
          <el-form-item label="选择值" prop="extendValueCodes">
            <el-select v-if="action == 'created'" v-model="servicePricingForm.extendValueCodes" clearable multiple placeholder="请选择特殊定价的值" style="width: 250px" class="filter-item">
              <el-option v-for="(item,index) in extendValueList" :key="'extendValueList'+index" :label="item.name" :value="item.code"/>
            </el-select>
            <span v-else><el-tag>{{ servicePricingForm.extendValueName }}</el-tag></span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogServicePricing = false">取消</el-button>
          <el-button v-if="action == 'created'" :loading="servicePricingLoading" type="primary" @click="handleCreate">确定</el-button>
          <el-button v-else :loading="servicePricingLoading" type="primary" @click="saveEdit">确定</el-button>
        </div>
      </el-dialog>
      <!-- 操作记录 -->
      <el-dialog title="操作记录" :visible.sync="dialogOperationVisible" width="800px">
        <el-table
          :data="listOperation"
          border
          fit
          highlight-current-row
          style="width: 100%;">
          <el-table-column label="序号" type="index" :index="1" width="80px" align="center" ></el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.operate }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作人" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.userName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="operaTotal>0" :total="operaTotal" :page.sync="listOperaQuery.pageNum" :limit.sync="listOperaQuery.pageSize" @pagination="getOperaList" />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import api from '@/api/api'
import { operateList } from '@/api/global'
import { intentionPriceExtendList, intentionPriceExtendSave, intentionPriceExtendCheck, intentionPriceExtendValueCheck, intentionPriceExtendEdit, intentionPriceExtendDelete } from '@/api/inquiryPricingMa'
import { isPrice } from '@/utils/validate'
export default {
  directives: { waves },
  components: { Pagination },
  data() {
    return {
      listQuery: {
        serviceCode: '',
        intentionCodeList: [],
        pageNum: 1,
        pageSize: 10
      },
      intentionCodeList: [],
      props: {
        value: 'code',
        label: 'name',
        children: 'childs',
        checkStrictly: true
      },
      propsDialog: {
        value: 'code',
        label: 'name',
        children: 'childs'
      },
      listLoading: false,
      list: [],
      total: 0,
      dialogServicePricing: false,
      servicePricingLoading: false,
      servicePricingRules: {
        price: [
          {required: true, message: '请输入0<x<=3000内的正整数', trigger: 'blur' },
          {validator: isPrice, trigger: 'change'},
          {validator: isPrice, trigger: 'blur'}
        ],
        extendCode: [
          {required: true, message: '请选择选择项', trigger: 'change' }
        ],
        extendValueCodes: [
          {required: true, message: '请选择选择值', trigger: 'change' }
        ]
      },
      servicePricingForm: {
        id: '',
        price: '',
        intentionCodeList: [],
        intentionCode: '',
        parentName: '',
        serviceName: '',
        extendValueCodes: [],
        extendCode: '',
        extendName: '',
        extendValueName: ''
      },
      extendList: [],
      extendValueList: [],
      action: '',
      // 操作记录
      listOperaQuery: {
        type: 9,
        pageNum: 1,
        pageSize: 10
      },
      dialogOperationVisible: false,
      listOperation: [],
      operaTotal: 0
    }
  },
  created() {
    this.getIntentionTrees()
    this.getSearchList()
  },
  methods: {
    getList() {
      intentionPriceExtendList(this.listQuery).then(res => {
        if(res.code == 0){
          this.list = res.data.items
          this.total = res.data.total
        }
      })
    },
    getSearchList() {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = 10
      this.getList()
    },
    // 打开添加弹框
    openDialog() {
      this.action = 'created'
      this.resetServicePricingForm()
      this.dialogServicePricing = true
    },
    // 重置表单
    resetServicePricingForm() {
      this.extendList = []
      this.extendValueList = []
      this.servicePricingForm = {
        id: '',
        price: '',
        intentionCodeList: [],
        intentionCode: '',
        parentName: '',
        serviceName: '',
        extendValueCodes: [],
        extendCode: '',
        extendName: '',
        extendValueName: ''
      }
    },
    // 添加
    handleCreate() {
      if(Number(this.servicePricingForm.price) > 3000){
        this.$message({
          message: '请输入1~3000的金额',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }

      if(Number(this.servicePricingForm.price) <=  0){
        this.$message({
          message: '请输入1~3000的金额',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }

      if(this.servicePricingForm.extendValueCodes.length <= 0) {
        this.$message({
          message: '请先选择至少一个特定值',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }

      this.$refs['servicePricingRef'].validate((valid) => {
        if (valid) {
          this.servicePricingLoading = true
          let params = {
            price: this.servicePricingForm.price,
            serviceCode: this.servicePricingForm.intentionCode,
            extendValueCodes: this.servicePricingForm.extendValueCodes
          }
          intentionPriceExtendSave(params).then(res => {
            if(res.code == 0){
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success',
                duration: 2000
              })
              this.servicePricingLoading = false
              this.dialogServicePricing = false
              this.getSearchList()
            }
          }).catch(err => {
            this.servicePricingLoading = false
          })
        } else {
          return false
        }
      })
    },
    // 唤起修改
    handleEdit(row) {
      this.resetServicePricingForm()
      this.action = 'edit'
      this.servicePricingForm.id = row.id
      this.servicePricingForm.price = row.price
      this.servicePricingForm.parentName = row.parentName
      this.servicePricingForm.serviceName = row.serviceName
      this.servicePricingForm.extendName = row.extendName
      this.servicePricingForm.extendValueName = row.extendValueName
      this.dialogServicePricing = true
    },
    // 保存修改
    saveEdit() {
      if(Number(this.servicePricingForm.price) > 3000){
        this.$message({
          message: '请输入1~3000的金额',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }

      if(Number(this.servicePricingForm.price) <=  0){
        this.$message({
          message: '请输入1~3000的金额',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }

      let params = {
        id: this.servicePricingForm.id,
        price: this.servicePricingForm.price
      }
      this.servicePricingLoading = true
      intentionPriceExtendEdit(params).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
          this.servicePricingLoading = false
          this.dialogServicePricing = false
          this.getSearchList()
        }
      }).catch(err => {
        this.servicePricingLoading = false
      })
    },
    // 删除
    handleDelete(row) {
      const id = row.id
      this.$confirm('确认删除？', '提示', {}).then(() => {
        let params = {
          id: id
        }
        intentionPriceExtendDelete(params).then(res => {
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
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取需求业务类目
    getIntentionTrees() {
      api.serviceTree().then(res => {
        if(res.code == 0){
          this.intentionCodeList = res.data
        }
      })
    },
    intentionCodeChange(val) {
      console.log(val)
      this.listQuery.intentionCodeList = val
      this.listQuery.serviceCode = val[val.length - 1]
      this.getSearchList()
    },
    intentionCodeDialogChange(val) {
      this.extendList = []
      this.servicePricingForm.extendCode = ''
      this.servicePricingForm.extendValueCodes = []
      this.extendValueList = []
      if(val && val != '') {
        this.servicePricingForm.intentionCodeList = val
        this.servicePricingForm.intentionCode = val[val.length - 1]
        let params = {
          serviceCode: this.servicePricingForm.intentionCode
        }
        intentionPriceExtendCheck(params).then(res => {
          if(res.code == 0){
            this.extendList = res.data
          }
        })
      } else {
        this.servicePricingForm.intentionCodeList = []
        this.servicePricingForm.intentionCode = ''
      }
    },
    extendCodeChange(val) {
      this.servicePricingForm.extendValueCodes = []
      this.extendValueList = []
      if(val && val != '') {
        let params = {
          serviceCode: this.servicePricingForm.intentionCode,
          extendCode: val
        }
        intentionPriceExtendValueCheck(params).then(res => {
          if(res.code == 0){
            this.extendValueList = res.data
          }
        })
      }
    },
    // 输入价格改变
    priceChange() {
      this.servicePricingForm.price = this.servicePricingForm.price.replace(/[^\.\d]/g,'')
      this.servicePricingForm.price = this.servicePricingForm.price.replace('.','')
      if(this.servicePricingForm.price != '') {
        this.servicePricingForm.price = Number(this.servicePricingForm.price)
      }
    },
    // 打开操作记录弹框
    handleOperation(){
      this.dialogOperationVisible = true
      this.getOperaList()
    },
    // 获取操作记录
    getOperaList() {
      operateList(this.listOperaQuery).then(res => {
        if(res.code == 0){
          this.listOperation = res.data.items
          this.operaTotal = res.data.total
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.particularItem_container {
  padding: 20px;
}
</style>
