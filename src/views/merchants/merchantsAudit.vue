<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" @click="getList">筛选</el-button>
      <el-input style="width: 250px;" v-model="listQuery.name" placeholder="请输入公司名字" />
      <el-select v-model="listQuery.type" placeholder="机构类型" style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in types" :key="item+index" :label="item.name" :value="item.value"/>
      </el-select>
      <el-select v-model="listQuery.status" placeholder="状态" style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in statusList" :key="item+index" :label="item.name" :value="item.id"/>
      </el-select>
      <!-- <el-date-picker
        v-model="listQuery.submitTime"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker> -->
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
          <span>{{ scope.row.merchantId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="机构名称" width="250px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="机构类型" align="center">
        <template slot-scope="scope">
         <span>{{ scope.row.type | typesFiters }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系人" align="center">
        <template slot-scope="scope">
         <span>{{ scope.row.contactName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系电话" align="center">
        <template slot-scope="scope">
         <span>{{ scope.row.contactPhone }}</span>
        </template>
      </el-table-column>

      <el-table-column label="发布状态" width="150px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 102">{{ scope.row.status | releaseStatusFilters  }}</el-tag>
          <el-tag type="danger" v-else>{{ scope.row.status | releaseStatusFilters }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="提交时间" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.submitTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="300px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button style="margin-left: 12px;" type="success" size="small" @click="handleLookDetail(scope.row)">查看</el-button>
          <el-button v-if="scope.row.status == 102" style="margin-left: 12px;" type="primary" size="small" @click="handleCreate(scope.row)">审核</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="temp.action === 'create' ? '添加' : temp.action === 'look' ? '详情' : '编辑'" width="800px" :visible.sync="dialogFormVisible">
      <el-form class="update" ref="dataForm" :model="temp" label-position="right" label-width="120px" style="width: 650px; margin-left:50px;">
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="temp.action !== 'look'">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="temp.action === 'create' ? createData() : updateData()">提交</el-button>
      </div>
    </el-dialog>

    <!-- 审核弹框 -->
    <el-dialog :visible.sync="dialogAuditVisible" title="审核">
      <div class="header" v-if="isLookDetail">
        <h3 v-if="merchantDetail.status == 999" style="color: red;">审核不通过</h3>
        <h3 v-if="merchantDetail.status == 103" style="color: #67c23a;">审核通过</h3>
      </div>
      <div class="basicInformation">
        <h2 class="title">基本信息</h2>
        <div class="line">
          <span class="label">机构名称：</span>
          <span>{{ merchantDetail.name }}</span>
        </div>
        <div class="line">
          <span class="label">机构类型：</span>
          <span>{{ merchantDetail.type | typesFiters }}</span>
        </div>
        <div class="line">
          <span class="label">登录手机号：</span>
          <span>{{ merchantDetail.loginPhone }}</span>
        </div>
        <div class="line">
          <span class="label">机构logo：</span>
          <img :src="merchantDetail.logo" alt="" srcset="">
        </div>
        <div class="line">
          <span class="label">详细地址：</span>
          <span>{{ merchantDetail.address }}</span>
        </div>
        <div class="line">
          <span class="label">地址定位：</span>
          <span>{{ merchantDetail.location }}</span>
        </div>
        <div class="line">
          <span class="label">联系人：</span>
          <span>{{ merchantDetail.contactName }}</span>
        </div>
        <div class="line">
          <span class="label">联系电话：</span>
          <span>{{ merchantDetail.contactPhone }}</span>
        </div>
        <div class="line">
          <span class="label">QQ号：</span>
          <span>{{ merchantDetail.qq }}</span>
        </div>
        <div class="line">
          <span class="label">电子邮箱：</span>
          <span>{{ merchantDetail.email }}</span>
        </div>
        <div class="line">
          <span class="label">介绍图：</span>
          <div class="imgList">
            <img style="margin-right: 10px;" v-for="(item, index) in merchantDetail.publicityImgs" :src="item" alt="" srcset="" :key="index">
          </div>
        </div>
      </div>
      <div class="qualification">
        <h2 class="title">资质信息</h2>
        <div class="line">
          <span class="label">工商注册号：</span>
          <span>{{ merchantDetail.businessLicenseNo }}</span>
        </div>
        <div class="line">
          <span class="label">营业执照：</span>
          <img :src="merchantDetail.businessLicenseImg" alt="" srcset="">
        </div>
        <div class="line">
          <span class="label">法人手持身份证（正面）：</span>
          <img :src="merchantDetail.handheldIdCardImg" alt="" srcset="">
        </div>
        <div class="line">
          <span class="label">其他资质证书：</span>
          <img :src="merchantDetail.otherCertificateImg" alt="" srcset="">
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAuditVisible = false">返回</el-button>
        <el-button v-if="!isLookDetail" type="primary" @click="createData">通过</el-button>
        <el-button v-if="!isLookDetail" type="danger" @click="dialogRefuseVisible = true">拒绝</el-button>
      </span>
    </el-dialog>

    <!-- 拒绝弹框 -->
    <el-dialog :visible.sync="dialogRefuseVisible" title="拒绝">
      <el-form ref="dataForm1" :rules="rules1" :model="temp" label-position="right" label-width="120px">
        <el-form-item label="拒绝原因：" prop="failCause">
          <el-select @change="failChose" v-model="temp.failCause" placeholder="请选择原因"  style="width: 150px" class="filter-item">
            <el-option v-for="(item,index) in failReasonList" :key="item+index" :label="item.name" :value="item.name"/>
          </el-select>
        </el-form-item>
        <el-form-item v-show="showFailReason" label="添加原因：" prop="failReason">
          <el-input v-model="temp.failCause" placeholder="请输入拒绝原因" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRefuseVisible = false">返回</el-button>
        <el-button type="primary" @click="refuse">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { merchantApplyList, merchantApplyAudit, merchantApplyDetail, merchantApplyTypes } from '@/api/merchants'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'androidUpdate',
  components: { Pagination },
  directives: { waves },
  filters: {
    releaseStatusFilters (val) {
      if(val  == 102){
        return val = '审核中'
      }else if(val == 103){
        return val = '审核通过'
      }else if(val == 103){
        return val = '审核通过'
      }else if(val == 999){
        return val = '审核未通过'
      }else if(val == 100){
        return val = '等待公司提交信息'
      }else if(val == 101){
        return val = '等待提交资质信息'
      }
    },
    typesFiters(val){
      if(val == 101){
        return val = "会计培训机构"
      }else if(val == 102){
        return val = "会计服务机构"
      }else if(val == 103){
        return val = "税务师事务所"
      }else if(val == 104){
        return val = "会计师事务所"
      }else if(val == 105){
        return val = "资产评估公司"
      }else if(val == 106){
        return val = "律师事务所"
      }else if(val == 107){
        return val = "知识产权服务机构"
      }else if(val == 108){
        return val = "劳务服务机构"
      }else if(val == 109){
        return val = "融资服务机构"
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
        pageSize: 10,
        submitTime: '',
        status: ''
      },
      statusList: [
        {
          name: '审核中',
          id: 102,
        },
        {
          name: '审核通过',
          id: 103,
        },
        {
          name: '审核未通过',
          id: 999,
        },
      ],
      types: [],
      failReasonList: [
        {
          name: '机构已存在',
          id: 1
        },
        {
          name: '资质信息不符',
          id: 2
        },
        {
          name: '其他',
          id: -1
        }
      ],
      showFailReason: false,
      temp: {
        failCause: '',
        merchantId: '',
        through: true
      },
      merchantDetail:{},
      isLookDetail: false,
      dialogFormVisible: false,
      dialogAuditVisible: false,
      dialogRefuseVisible: false,
      rules: {},
      rules1: {
        failCause: [{ required: true, message: '拒绝原因必选'}]
      }
    }
  },
  created() {
    this.getList()
    this.getTypes()
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true
      merchantApplyList(this.listQuery).then(response => {
        if (response.code === 0) {
          console.log(response)
          this.list = response.data.items
          // this.total = response.data.total
          this.listLoading = false
        }
      })
    },
    getTypes(){
      merchantApplyTypes().then(res => {
        console.log(res)
        if(res.code == 0){
          this.types = res.data
        }
      })
    },
    failChose(){
      if(this.temp.failCause == '其他'){
        this.showFailReason = true
        this.temp.failCause = ''
      }else{
        this.showFailReason = false
      }
    },
    //重置表单
    resetTemp() {
      this.temp = {
        failCause: '',
        merchantId: '',
        through: true
      }
    },
    //唤起新建
    handleCreate(row) {
      this.resetTemp()
      this.temp.merchantId = row.merchantId
      this.isLookDetail = false
      let data = {
        id: row.merchantId
      }
      merchantApplyDetail(data).then(res => {
        console.log(res)
        if(res.code == 0){
          this.merchantDetail = res.data
        }
      })
      this.dialogAuditVisible = true
    },
    //新建
    createData() {
      // this.$refs['dataForm'].validate((valid) => {
      //   if (valid) {
          merchantApplyAudit(this.temp).then((response) => {
            if (response.code == 0) {
              this.$notify({
                title: '成功',
                message: '审核成功',
                type: 'success',
                duration: 2000
              })
              this.dialogAuditVisible = false
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
    },
    refuse(){
      this.$refs['dataForm1'].validate((valid) => {
        if (valid) {
          this.temp.through = false
          merchantApplyAudit(this.temp).then((response) => {
            if (response.code == 0) {
              this.$notify({
                title: '成功',
                message: '审核成功',
                type: 'success',
                duration: 2000
              })
              this.dialogAuditVisible = false
              this.dialogRefuseVisible = false
            } else {
              this.$message({
                message: response.msg,
                type: 'error',
                showClose: true,
                duration: 1000
              })
              this.dialogAuditVisible = false
              this.dialogRefuseVisible = false
            }
            this.getList()
          })
        }
      })
    },
    //查看
    handleLookDetail(row) {
      this.resetTemp()
      this.isLookDetail = true
      let data = {
        id: row.merchantId
      }
      merchantApplyDetail(data).then(res => {
        console.log(res)
        if(res.code == 0){
          this.merchantDetail = res.data
        }
      })
      this.dialogAuditVisible = true
    },
    // 编辑
    handleEdit (row) {
      this.resetTemp()
    },
    // 编辑提交
    updateData () {

    }
  }
}
</script>
<style lang="scss">
.filter-container .filter-item{
    margin-bottom: 0px;
}

.el-dialog__body{
  padding-top: 0px !important;
}
.line{
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  .label{
    font-weight: bold;
    display: block;
    // width: 150px;
  }
  .imgList{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  img{
    width: 100px;
    height: 80px;
  }
}
</style>
