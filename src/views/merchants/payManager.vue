<template>
  <div class="payManager">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="warning" @click="back">返回</el-button>
      <el-button v-waves class="filter-item" type="primary" @click="openAddDialog">添加</el-button>
    </div>
    <el-radio-group v-model="tabPosition" @change="tabPositionChange" style="margin: 0 0 20px;">
      <el-radio-button label="PreTrialNumber">预审号码被动扣费</el-radio-button>
      <el-radio-button label="enquiry">询价单被动扣费</el-radio-button>
    </el-radio-group>
    <div class="tableClass">
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;">
        <el-table-column type="index" label="序号" width="80px" align="center">
        </el-table-column>

        <el-table-column label="服务类型" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.serviceTypeName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="服务区域" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cityNames }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.operateUser }}</span>
          </template>
        </el-table-column>

        <el-table-column label="修改时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.modifyTime }}</span>
          </template>
        </el-table-column>
        
        <el-table-column :label="$t('table.actions')" align="center" width="240px" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-dropdown style="margin-left: 12px;" @command="handleCommand">
              <el-button type="primary" size="small">
                操作
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{type: 'editRow', item: scope.row}">编辑</el-dropdown-item>
                <el-dropdown-item :command="{type: 'deleteRow', item: scope.row}">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button style="margin-left: 12px;" type="success" size="small" @click="lookRecords(scope.row)">操作记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
    <div class="dialog">
      <el-dialog width="860px" :title="(tabPosition == 'PreTrialNumber' ? '预审号码被动扣费-' : '询价单被动扣费-') + addTitle" :visible.sync="addDialog">
        <el-form :model="addDataForm">
          <el-form-item label="关联业务" label-width="100px">
            <el-select v-model="addDataForm.serviceCode" placeholder="请选择关联业务" @change="serviceCodeChange">
              <el-option v-for="(item, index) in serviceTypeList" :key="'serviceTypeList' + index" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务区域" label-width="100px" v-loading="cityTreeLoading">
            <el-cascader-panel ref="areaSelect" v-model="addDataForm.serviceArea" :props="props" :options="cityTree" @change="selectAreaChange"></el-cascader-panel>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button v-if="addTitle == '添加'" type="primary" @click="addData">确 定</el-button>
          <el-button v-else type="primary" @click="updateData">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="操作记录" :visible.sync="dialogTableVisible" width="800px">
      <el-table 
      :data="recordData"
      border
      >
        <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.operate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="recordDataCount>0" :total="recordDataCount" :page.sync="recordsSearch.pageNum" :limit.sync="recordsSearch.pageSize" @pagination="getRecordList" />
    </el-dialog>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { merchantDeductionList, merchantServiceTypeList, merchantDeductionAdd, merchantDeductionDetail, merchantDeductionDelete, merchantDeductionUpdate, serviceDistrictTree } from '@/api/merchants'
import { operateList } from '@/api/global'
export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tabPosition: 'PreTrialNumber',
      listLoading: false,
      list: [],
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        deductionType: 1,
        merchantId: this.$route.query.id
      },
      total: 0,
      addDialog: false,
      addTitle: '',
      addDataForm: {
        id: '',
        serviceCode: '',
        serviceId: '',
        serviceArea: []
      },
      serviceTypeList: [],
      //批量上架数据
      props: {
        multiple: true,
        emitPath: true,
        checkStrictly: false,
        children: 'childs',
        label: 'name',
        value: 'code'
      },
      cityTree: [],
      cityTreeLoading: false,
      recordsSearch: {
        pageNum: 1,
        pageSize: 10,
        type: 6,
        operateId: ''
      },
      recordDataCount: 0,
      dialogTableVisible: false,
      recordData: []
    }
  },
  created() {
    this.getList()
    this.getMerchantServiceTypeList()
  },
  methods: {
    // 返回按钮
    back() {
      this.$router.go(-1)
    },
    // tab 切换
    tabPositionChange(index) {
      console.log(index)
      if (index == 'PreTrialNumber') {
        this.listQuery.deductionType = 1
      } else {
        this.listQuery.deductionType = 2
      }
      this.getSearchList()
    },
    // 从第一页获取列表
    getSearchList() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    // 获取列表
    getList() {
      this.listLoading = true
      merchantDeductionList(this.listQuery).then(res => {
        if(res.code == 0) {
          this.listLoading = false
          this.total = res.data.total
          this.list = res.data.items
        }
      })
    },
    // 获取主营业务列表
    getMerchantServiceTypeList() {
      let params = {
        merchantId: this.$route.query.id
      }
      merchantServiceTypeList(params).then(res => {
        if(res.code == 0){
          this.serviceTypeList = res.data
        }
      })
    },
    // 操作-下拉菜单
    handleCommand(command) {
      console.log(command)
      this[command.type](command.item)
    },
    // 编辑
    editRow(row) {
      console.log(row)
      this.resetForm()
      let params = {
        id: row.id
      }
      merchantDeductionDetail(params).then(res => {
        if(res.code == 0){
          let deductionDistrictVos = res.data.deductionDistrictVos
          this.addDataForm.id = row.id
          this.addDataForm.serviceCode = res.data.serviceCode
          this.addDataForm.serviceId = res.data.serviceId
          this.addTitle = '编辑'
          this.addDialog = true
          serviceDistrictTree({serviceId: res.data.serviceId}).then(res => {
            if(res.code == 0){
              this.cityTree = res.data
              let cityArr = []
              if (deductionDistrictVos && deductionDistrictVos.length > 0) {
                for(let i=0;i<deductionDistrictVos.length;i++){
                  if(deductionDistrictVos[i].districtCodes && deductionDistrictVos[i].districtCodes != null) {
                    cityArr.push([deductionDistrictVos[i].countryCode, deductionDistrictVos[i].provinceCode, deductionDistrictVos[i].cityCode, deductionDistrictVos[i].districtCodes])
                  }else if (deductionDistrictVos[i].cityCode && deductionDistrictVos[i].cityCode != null) {
                    cityArr.push([deductionDistrictVos[i].countryCode, deductionDistrictVos[i].provinceCode, deductionDistrictVos[i].cityCode])
                  }else if (deductionDistrictVos[i].provinceCode && deductionDistrictVos[i].provinceCode != null) {
                    cityArr.push([deductionDistrictVos[i].countryCode, deductionDistrictVos[i].provinceCode])
                  }else if(deductionDistrictVos[i].countryCode && deductionDistrictVos[i].countryCode != null) {
                    cityArr.push([deductionDistrictVos[i].countryCode])
                  }
                }
              }
              this.addDataForm.serviceArea = cityArr
            }
          })
        }
      })
    },
    // 删除
    deleteRow(row) {
      console.log(row)
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          id: row.id
        }
        merchantDeductionDelete(params).then(res => {
          if(res.code == 0){
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.getSearchList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        }) 
      })
    },
    // 查看记录
    lookRecords(row) {
      this.recordsSearch.pageNum = 1
      this.recordsSearch.pageSize = 10
      this.recordsSearch.operateId = row.id
      this.getRecordList()
    },
    getRecordList() {
      operateList(this.recordsSearch).then(res => {
        if(res.code == 0) {
          this.dialogTableVisible = true
          this.recordData = res.data.items
          this.recordDataCount = res.data.total
        }
      })
    },
    // 表单重置
    resetForm() {
      this.addDataForm = {
        id: '',
        serviceCode: '',
        serviceId: '',
        serviceArea: []
      }
      this.cityTree = []
    },
    // 打开添加dialog
    openAddDialog() {
      this.resetForm()
      this.addTitle = '添加'
      this.addDialog = true
    },
    // 添加
    addData() {
      console.log(this.addDataForm.serviceArea)
      let arr = []
      if(this.addDataForm.serviceArea && this.addDataForm.serviceArea.length > 0) {
        for (let i=0;i<this.addDataForm.serviceArea.length;i++) {
          if (this.addDataForm.serviceArea[i].length > 2) {
            arr.push({
              countryCode: this.addDataForm.serviceArea[i][0] || null,
              provinceCode: this.addDataForm.serviceArea[i][1] || null,
              cityCode: this.addDataForm.serviceArea[i][2] || null,
              districtCodes: this.addDataForm.serviceArea[i][3] || null
            })
          } else {
            arr.push({
              countryCode: this.addDataForm.serviceArea[i][0] || null,
              provinceCode: this.addDataForm.serviceArea[i][1] || null,
              cityCode: this.addDataForm.serviceArea[i][2] || null,
              districtCodes: this.addDataForm.serviceArea[i][3] || null
            })
          }
        }
      }
      let params = {
        deductionDistrictVos: arr,
        deductionType: this.listQuery.deductionType,
        merchantId: this.listQuery.merchantId,
        serviceCode: this.addDataForm.serviceCode,
        serviceId: this.addDataForm.serviceId
      }
      merchantDeductionAdd(params).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success',
            duration: 2000
          })
          this.getSearchList()
          this.addDialog = false
        }
      })
    },
    // 修改
    updateData() {
      console.log(this.addDataForm.serviceArea)
      let arr = []
      if(this.addDataForm.serviceArea && this.addDataForm.serviceArea.length > 0) {
        for (let i=0;i<this.addDataForm.serviceArea.length;i++) {
          if (this.addDataForm.serviceArea[i].length > 2) {
            arr.push({
              countryCode: this.addDataForm.serviceArea[i][0] || null,
              provinceCode: this.addDataForm.serviceArea[i][1] || null,
              cityCode: this.addDataForm.serviceArea[i][2] || null,
              districtCodes: this.addDataForm.serviceArea[i][3] || null
            })
          } else {
            arr.push({
              countryCode: this.addDataForm.serviceArea[i][0] || null,
              provinceCode: this.addDataForm.serviceArea[i][1] || null,
              cityCode: this.addDataForm.serviceArea[i][2] || null,
              districtCodes: this.addDataForm.serviceArea[i][3] || null
            })
          }
        }
      }
      let params = {
        id: this.addDataForm.id,
        deductionDistrictVos: arr,
        deductionType: this.listQuery.deductionType,
        merchantId: this.listQuery.merchantId,
        serviceCode: this.addDataForm.serviceCode,
        serviceId: this.addDataForm.serviceId
      }
      merchantDeductionUpdate(params).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
          this.getSearchList()
          this.addDialog = false
        }
      })
    },
    // 城市选择change事件
    selectAreaChange(val) {
      console.log(val)
    },
    // 主营业务change事件
    serviceCodeChange(val){
      this.addDataForm.serviceArea = []
      if (val && val != '') {
        for(let i=0;i<this.serviceTypeList.length;i++) {
          if (this.serviceTypeList[i].code == val) {
            this.addDataForm.serviceId = this.serviceTypeList[i].id
            this.getServiceDistrictTree(this.serviceTypeList[i].id)
          }
        }
      }
    },
    // 获取服务区域
    getServiceDistrictTree(val) {
      let params = {
        serviceId: val
      }
      this.cityTreeLoading = true
      serviceDistrictTree(params).then(res => {
        if(res.code == 0){
          this.cityTreeLoading = false
          this.cityTree = res.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.payManager {
  padding: 24px;
}
</style>
