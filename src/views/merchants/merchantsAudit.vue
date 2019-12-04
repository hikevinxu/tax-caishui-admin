<template>
  <div class="app-container merchantAuditPage">
    <div class="filter-container">
      <el-input class="filter-item" style="width: 250px;" v-model="listQuery.name" placeholder="请输入公司名字" />
      <el-select v-model="listQuery.type" placeholder="机构类型" style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in types" :key="item+index" :label="item.name" :value="item.value"/>
      </el-select>
      <el-select v-model="listQuery.status" placeholder="状态" style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in statusList" :key="item+index" :label="item.name" :value="item.id"/>
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
          <span>{{ scope.row.merchantId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="机构名称" align="center">
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
          <el-tag type="danger" v-if="scope.row.status == 999">{{ scope.row.status | releaseStatusFilters  }}</el-tag>
          <el-tag type="success" v-if="scope.row.status == 103">{{ scope.row.status | releaseStatusFilters }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="提交时间" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.submitTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button style="margin-left: 12px;" type="success" size="small" @click="handleLookDetail(scope.row)">查看</el-button>
          <el-button v-if="scope.row.status == 102" style="margin-left: 12px;" type="primary" size="small" @click="handleCreate(scope.row)">审核</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="temp.action === 'create' ? '添加' : temp.action === 'look' ? '详情' : '编辑'" width="800px" :visible.sync="dialogFormVisible">
      <el-form class="update" ref="dataForm" :model="temp" label-position="right" label-width="120px" style="width: 650px; margin-left:50px;">
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="temp.action !== 'look'">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="temp.action === 'create' ? createData() : updateData()">提交</el-button>
      </div>
    </el-dialog>

    <!-- 审核弹框 -->
    <el-dialog class="auditDialog" :visible.sync="dialogAuditVisible" title="审核">
      <div class="header" v-if="isLookDetail">
        <h3 class="noPass" v-if="merchantDetail.status == 999" style="color: red;">不通过</h3>
        <h3 class="pass" v-if="merchantDetail.status == 103" style="color: #67c23a;">通过</h3>
      </div>
      <div class="basicInformation">
        <span style="color: red;" v-if="isLookDetail && merchantDetail.status == 999">拒审原因：{{merchantDetail.auditFailCause}}</span>
        <el-divider content-position="left">基本信息</el-divider>
        <div class="line">
          <div class="label"><span>机构名称：</span></div>
          <span>{{ merchantDetail.name }}</span>
        </div>
        <div class="line">
          <div class="label"><span>机构类型：</span></div>
          <span>{{ merchantDetail.type | typesFiters }}</span>
        </div>
        <div class="line">
          <div class="label"><span>登录手机号：</span></div>
          <span>{{ merchantDetail.loginPhone }}</span>
        </div>
        <div class="line logo" v-if="merchantDetail.logo && merchantDetail.logo != ''">
          <div class="label"><span>机构logo：</span></div>
          <span><img @click="imageShow($event)" :src="merchantDetail.logo" alt="" srcset=""></span>
        </div>
        <div class="line">
          <div class="label"><span>详细地址：</span></div>
          <span>{{ merchantDetail.address }}</span>
        </div>
        <div class="line">
          <div class="label"><span>地址定位：</span></div>
          <span>{{ merchantDetail.location }}</span>
        </div>
        <div class="line">
          <div class="label"><span>联系人：</span></div>
          <span>{{ merchantDetail.contactName }}</span>
        </div>
        <div class="line">
          <div class="label"><span>联系电话：</span></div>
          <span>{{ merchantDetail.contactPhone }}</span>
        </div>
        <div class="line">
          <div class="label"><span>QQ号：</span></div>
          <span>{{ merchantDetail.qq }}</span>
        </div>
        <div class="line">
          <div class="label"><span>电子邮箱：</span></div>
          <span>{{ merchantDetail.email }}</span>
        </div>
        <div class="line publicityImgs" v-if="merchantDetail.publicityImgs && merchantDetail.publicityImgs.length > 0">
          <div class="label"><span>介绍图：</span></div>
          <span class="imgList">
            <span>
              <img @click="imageShow($event)" style="margin-right: 10px;" v-for="(item, index) in merchantDetail.publicityImgs" :src="item" alt="" srcset="" :key="index">
            </span>
          </span>
        </div>
      </div>
      <div class="qualification">
        <el-divider content-position="left">资质信息</el-divider>
        <div class="line">
          <div class="label"><span>工商注册号：</span></div>
          <span>{{ merchantDetail.businessLicenseNo }}</span>
        </div>
        <div class="line logo" v-if="merchantDetail.businessLicenseImg && merchantDetail.businessLicenseImg != ''">
          <div class="label"><span>营业执照：</span></div>
          <span><img @click="imageShow($event)" :src="merchantDetail.businessLicenseImg" alt="" srcset=""></span>
        </div>
        <div class="line logo" v-if="merchantDetail.handheldIdCardImg && merchantDetail.handheldIdCardImg != ''">
          <div class="label"><span>法人手持身份证（正面）：</span></div>
          <span><img @click="imageShow($event)" :src="merchantDetail.handheldIdCardImg" alt="" srcset=""></span>
        </div>
        <div class="line logo" v-if="merchantDetail.otherCertificateImg && merchantDetail.otherCertificateImg != ''">
          <div class="label"><span>其他资质证书：</span></div>
          <span><img @click="imageShow($event)" :src="merchantDetail.otherCertificateImg" alt="" srcset=""></span>
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

    <imgPreview :url="imgUrl" :show="imgShow" v-if="imgShow" @letImageHide="imgShow = false" />
  </div>
</template>

<script>
import { merchantApplyList, merchantApplyAudit, merchantApplyDetail, merchantApplyTypes } from '@/api/merchants'
import imgPreview from '@/components/imgPreView'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'androidUpdate',
  components: { Pagination,imgPreview },
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
        return val = "税务师事务所"
      }else if(val == 102){
        return val = "会计师事务所"
      }else if(val == 103){
        return val = "资产评估公司"
      }else if(val == 104){
        return val = "律师事务所"
      }else if(val == 105){
        return val = "知识产权代理公司"
      }else if(val == 106){
        return val = "劳务及人力资源公司"
      }else if(val == 107){
        return val = "融资服务公司"
      }else if(val == 108){
        return val = "代理记账公司"
      }else if(val == 109){
        return val = "财税培训机构"
      }else if(val == 110){
        return val = "刻章店"
      }else if(val == 111){
        return val = "税务筹划公司"
      }else if(val == 112){
        return val = "工程造价咨询公司"
      }else if(val == 113){
        return val = "离岸公司注册的公司"
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
        { name: '审核中', id: 102 },
        { name: '审核通过', id: 103 },
        { name: '审核未通过', id: 999 },
      ],
      types: [],
      failReasonList: [
        { name: '机构已存在', id: 1 },
        { name: '资质信息不符', id: 2 },
        { name: '其他', id: -1 }
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
      },
      imgUrl: '',
      imgShow: false
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
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
        }
      })
    },
    getTypes(){
      merchantApplyTypes().then(res => {
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
        if(res.code == 0){
          this.merchantDetail = res.data
        }
      })
      this.dialogAuditVisible = true
    },
    //新建
    createData() {
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

    },
    imageShow(e) {
      this.imgUrl = e.target.src
      this.imgShow = true
    },
    imageHide () {
      this.imgShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
.merchantAuditPage {
  .header{
    position: absolute;
    right: 100px;
    top: 60px;
    .pass{
      display: flex;
      font-size: 20px;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 1px solid #67c23a;
      transform: rotateZ(-45deg);
    }
    .noPass{
      display: flex;
      font-size: 20px;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 1px solid red;
      transform: rotateZ(-45deg);
    }
  }
  .line {
    display: flex;
    flex-direction: row;
    border: 1px solid #ccc;
    border-bottom: 0;
    >.label{
      width: 150px;
      padding: 10px;
      font-weight: bold;
      border-right: 1px solid #ccc;
      background: #f5f5f5;
      position: relative;
      span {
        display: block;
        text-align: center;
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    >span {
      flex: 1;
      min-height: 40px;
      padding: 10px;
      text-align: center;
      img {
        height: 80px;
      }
    }
    .imgList{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    &:last-child{
      border-bottom: 1px solid #ccc;
    }
  }
  .publicityImgs.line {
    .imgList {
      width: 100%;
      >span {
        position: relative;
        left: 50%;
        top: 0;
        transform: translate(-50%, 0);
        img {
          height: 80px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.merchantAuditPage {
  .auditDialog {
    .el-dialog__body {
      padding-top: 0px;
    }
  }
}
</style>
