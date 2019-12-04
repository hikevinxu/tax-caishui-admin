<template>
  <div class="cityPricingMa_container">
    <div class="filter-container">
      <el-button icon="el-icon-circle-plus" v-waves class="filter-item" type="warning" @click="openDialog">添加</el-button>
      <el-select v-model="listQuery.provinceCode" clearable @change="getSearchList" placeholder="请选择省" style="width: 200px" class="filter-item">
        <el-option v-for="(item,index) in provinceList" :key=" 'province' + index" :label="item.name" :value="item.code"/>
      </el-select>
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

        <el-table-column label="省份" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.provinceName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="城市" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cityName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="费率" align="center">
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
      <!-- 添加/编辑询价单类目定价 -->
      <el-dialog title="城市费率" :visible.sync="dialogCityPricing" width="500px">
        <el-form ref="cityPricingRef" :rules="cityPricingRules" :model="cityPricingForm" label-width="110px">
          <el-form-item label="费率" prop="price">
            <el-input style="width: 200px" @keyup.native="priceChange" v-model="cityPricingForm.price" type="tel" placeholder="请输入费率">
              <template slot="append"> % </template>
            </el-input>
          </el-form-item>
          <el-form-item label="省" prop="provinceCode">
            <el-select v-if="action == 'created'" v-model="cityPricingForm.provinceCode" clearable @change="provinceCodeChange" placeholder="请选择省份" style="width: 200px" class="filter-item">
              <el-option v-for="(item,index) in provinceList" :key="'province'+index" :label="item.name" :value="item.code"/>
            </el-select>
            <span v-else><el-tag>{{ cityPricingForm.provinceName }}</el-tag></span>
          </el-form-item>
          <el-form-item label="市" prop="cityCodes">
            <el-select v-if="action == 'created'" v-model="cityPricingForm.cityCodes" clearable multiple placeholder="请选择城市" style="width: 200px" class="filter-item">
              <el-option v-for="(item,index) in cityList" :key="'city'+index" :label="item.name" :value="item.code"/>
            </el-select>
            <span v-else><el-tag>{{ cityPricingForm.cityName }}</el-tag></span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogCityPricing = false">取消</el-button>
          <el-button v-if="action == 'created'" :loading="cityPricingLoading" type="primary" @click="handleCreate">确定</el-button>
          <el-button v-else :loading="cityPricingLoading" type="primary" @click="saveEdit">确定</el-button>
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
import { addressProvinces } from '@/api/cityList'
import { operateList } from '@/api/global'
import { intentionPriceCityList, intentionPriceCitySave, intentionPriceCityCheck, intentionPriceCityEdit, intentionPriceCityDelete } from '@/api/inquiryPricingMa'
import { isCityRate } from '@/utils/validate'
export default {
  directives: { waves },
  components: { Pagination },
  data() {
    return {
      listQuery: {
        provinceCode: '',
        pageNum: 1,
        pageSize: 10
      },
      provinceList: [],
      cityList: [],
      listLoading: false,
      list: [],
      total: 0,
      dialogCityPricing: false,
      cityPricingLoading: false,
      cityPricingRules: {
        price: [
          {required: true, message: '请输入0<x<=1000内的正整数', trigger: 'blur' },
          {validator: isCityRate, trigger: 'change'},
          {validator: isCityRate, trigger: 'blur'}
        ],
        provinceCode: [
          {required: true, message: '请选择省份', trigger: 'change' }
        ],
        cityCodes: [
          {required: true, message: '请选择城市', trigger: 'change' }
        ]
      },
      cityPricingForm: {
        id: '',
        cityCodes: [],
        price: '',
        provinceCode: '',
        provinceName: '',
        cityName: ''
      },
      action: '',
      // 操作记录
      listOperaQuery: {
        type: 10,
        pageNum: 1,
        pageSize: 10
      },
      dialogOperationVisible: false,
      listOperation: [],
      operaTotal: 0
    }
  },
  created() {
    this.getProvinceList()
    this.getSearchList()
  },
  methods: {
    getList() {
      intentionPriceCityList(this.listQuery).then(res => {
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
    // 打开添加
    openDialog() {
      this.resetCityPricingForm()
      this.action = 'created'
      this.dialogCityPricing = true
    },
    resetCityPricingForm() {
      this.cityList = []
      this.cityPricingForm = {
        id: '',
        cityCodes: [],
        price: '',
        provinceCode: '',
        provinceName: '',
        cityName: ''
      }
    },
    // 添加
    handleCreate() {
      if(Number(this.cityPricingForm.price) > 1000){
        this.$message({
          message: '城市费率不能超过100',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }

      if(Number(this.cityPricingForm.price) <=  0){
        this.$message({
          message: '输入0~1000%的费率',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }

      if(this.cityPricingForm.cityCodes.length <= 0) {
        this.$message({
          message: '输入0~1000%的费率',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }

      this.$refs['cityPricingRef'].validate((valid) => {
        if (valid) {
          this.cityPricingLoading = true
          let params = {
            price: Number(this.cityPricingForm.price),
            // 国家code： 中国大陆
            countryCode: 'INT156',
            provinceCode: this.cityPricingForm.provinceCode,
            cityCodes: this.cityPricingForm.cityCodes
          }
          intentionPriceCitySave(params).then(res => {
            if(res.code == 0){
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success',
                duration: 2000
              })
              this.cityPricingLoading = false
              this.dialogCityPricing = false
              this.getSearchList()
            }
          }).catch(err => {
            this.cityPricingLoading = false
          })
        } else {
          return false
        }
      })
    },
    // 唤起修改
    handleEdit(row) {
      this.resetCityPricingForm()
      this.action = 'edit'
      this.cityPricingForm.id = row.id
      this.cityPricingForm.provinceName = row.provinceName
      this.cityPricingForm.cityName = row.cityName
      this.cityPricingForm.price = parseInt(row.price.substr(0, row.price.length - 1))
      this.dialogCityPricing = true
    },
    // 修改
    saveEdit() {
      if(Number(this.cityPricingForm.price) > 100){
        this.$message({
          message: '输入0~1000%的费率',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }

      if(Number(this.cityPricingForm.price) <=  0){
        this.$message({
          message: '输入0~1000%的费率',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      let params = {
        id: this.cityPricingForm.id,
        price: Number(this.cityPricingForm.price)
      }
      this.cityPricingLoading = true
      intentionPriceCityEdit(params).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
          this.cityPricingLoading = false
          this.dialogCityPricing = false
          this.getSearchList()
        }
      }).catch(err => {
        this.cityPricingLoading = false
      })
    },
    // 删除
    handleDelete(row) {
      const id = row.id
      this.$confirm('确认删除？', '提示', {}).then(() => {
        let params = {
          id: id
        }
        intentionPriceCityDelete(params).then(res => {
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
    // 获取所有的省
    getProvinceList() {
      addressProvinces().then(res => {
        if(res.code == 0){
          this.provinceList = res.data
        }
      })
    },
    provinceCodeChange(val) {
      this.cityList = []
      this.cityPricingForm.cityCodes = []
      if(val && val != ''){
        let params = {
          provinceCode: val,
          // 国家code： 中国大陆
          countryCode: 'INT156'
        }
        intentionPriceCityCheck(params).then(res => {
          if(res.code == 0){
            this.cityList = res.data
          }
        })
      }
    },
    // 输入费率改变
    priceChange() {
      this.cityPricingForm.price = this.cityPricingForm.price.replace(/[^\.\d]/g,'')
      this.cityPricingForm.price = this.cityPricingForm.price.replace('.','')
      if(this.cityPricingForm.price != '') {
        this.cityPricingForm.price = Number(this.cityPricingForm.price)
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
.cityPricingMa_container {
  padding: 20px;
}
</style>
