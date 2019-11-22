<template>
  <div class="app-container merchants_page">
    <div class="filter-container">
      <el-input class="filter-item" style="width: 250px;" v-model="listQuery.name" clearable @change="getDetailList" placeholder="请输入公司名字" />
      <el-select v-model="listQuery.type" clearable @change="getDetailList" placeholder="机构类型" style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in types" :key="item+index" :label="item.name" :value="item.value"/>
      </el-select>
      <el-select v-model="listQuery.status" clearable @change="getDetailList" placeholder="状态" style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in statusList" :key="item+index" :label="item.name" :value="item.id"/>
      </el-select>
      <el-select v-model="listQuery.isWeiChat" clearable @change="getDetailList" placeholder="是否绑定微信" style="width: 150px" class="filter-item">
        <el-option label="已绑定" value="1"/>
        <el-option label="未绑定" value="0"/>
      </el-select>
      <el-select v-model="listQuery.isService" clearable @change="getDetailList" placeholder="是否补充服务" style="width: 150px" class="filter-item">
        <el-option label="已补充" value="1"/>
        <el-option label="未补充" value="0"/>
      </el-select>
      <el-select v-model="listQuery.isDeduction" clearable @change="getDetailList" placeholder="是否设置被动扣费" style="width: 180px" class="filter-item">
        <el-option label="已设置" value="1"/>
        <el-option label="未设置" value="0"/>
      </el-select>
      <el-select v-permission="['MERCHANT_FILTER_MA']" class="filter-item" style="width: 300px;" v-model="listQuery.personId" filterable clearable @change="getDetailList" placeholder="请选择负责人">
        <el-option v-for="item in adminUserArr" :key="item.id" :label="item.name" :value="item.id">
          <span style="float: left">{{ item.name }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.email }}</span>
        </el-option>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" @click="getDetailList">筛选</el-button>
    </div>
    <div class="table">
      <div class="table-top">
        <div v-if="bulkBinding == false">
          <el-button v-waves type="primary" @click="bulkBinding = true">批量绑定负责人</el-button>
        </div>
        <div v-else class="selectTable">
          <i class="el-icon-info"></i>
          <span>
            已选择&nbsp;<b>{{multipleSelection.length}}</b>&nbsp;项
            <el-button style="margin-left: 20px;" type="text" @click="cancelBulkBinding">取消</el-button>
            <el-button style="margin-left: 20px;" type="text" @click="openBindingPrincipalDialogByMultiple">确定</el-button>
          </span>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        ref="multipleTable"
        :data="list"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
        style="width: 100%;">
        <el-table-column
          v-if="bulkBinding == true"
          :selectable="selectable"
          type="selection"
          width="50">
        </el-table-column>

        <el-table-column label="ID" prop="id" align="center" width="50px">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="机构名称" width="300px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.companyName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="机构类型" align="center" width="150px">
          <template slot-scope="scope">
          <span>{{ scope.row.companyType | typesFiters }}</span>
          </template>
        </el-table-column>

        <el-table-column label="联系人" align="center">
          <template slot-scope="scope">
          <span>{{ scope.row.contactName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="联系电话" align="center" width="150px">
          <template slot-scope="scope">
          <span>{{ scope.row.contactPhone }}</span>
          </template>
        </el-table-column>

        <el-table-column label="发布状态" width="100px" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.companyStatus == 1">{{ scope.row.companyStatus | releaseStatusFilters  }}</el-tag>
            <el-tag type="danger" v-else>{{ scope.row.companyStatus | releaseStatusFilters }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="微信绑定" align="center">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.isWeiChat">已绑定</el-tag>
            <el-tag type="danger" v-show="!scope.row.isWeiChat">未绑定</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="是否补充服务" align="center">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.isService">已补充</el-tag>
            <el-tag type="danger" v-show="!scope.row.isService">未补充</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="设置被动扣费" align="center">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.isDeduction">已设置</el-tag>
            <el-tag type="danger" v-show="!scope.row.isDeduction">未设置</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="负责人" align="center">
          <template slot-scope="scope">
          <span>{{ scope.row.personName ? scope.row.personName : '-' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="350px">
          <template slot-scope="scope">
            <el-button v-show="scope.row.companyStatus == 0" type="warning" size="mini" @click="handleUp(scope.row)">上架</el-button>
            <el-button v-show="scope.row.companyStatus == 1" style="margin-left: 10px;" type="danger" size="mini" @click="handleDown(scope.row)">下架</el-button>
            <el-button style="margin-left: 10px;" type="success" size="mini" @click="handleLookDetail(scope.row)">查看</el-button>
            <el-dropdown style="margin-left: 10px;" @command="handleCommand">
              <el-button type="primary" size="mini">
                操作
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item style="text-align: center;" :command="{type: 'goMain', item: scope.row}">业务管理</el-dropdown-item>
                <el-dropdown-item style="text-align: center;" :command="{type: 'goServiceManager', item: scope.row}">服务管理</el-dropdown-item>
                <el-dropdown-item style="text-align: center;" :command="{type: 'payManager', item: scope.row}">付费管理</el-dropdown-item>
                <el-dropdown-item v-permission="['BIND_MERCHANT_PRINCIPAL']" v-if="scope.row.personName && scope.row.personName != ''" style="text-align: center;" :command="{type: 'unbundlingPrincipal', item: scope.row}">解绑</el-dropdown-item>
                <el-dropdown-item v-permission="['BIND_MERCHANT_PRINCIPAL']" v-else style="text-align: center;" :command="{type: 'openBindingPrincipalDialog', item: scope.row}">绑定</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button style="margin-left: 10px;" type="info" size="mini" @click="openOperationDialog(scope.row)">操作记录</el-button>
          </template>
        </el-table-column>

      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    </div>
    <!-- 审核弹框 -->
    <el-dialog :visible.sync="dialogAuditVisible" title="基本信息">
      <div class="basicInformation">
        <div class="line">
          <span class="label">机构名称：</span>
          <span>{{ merchantDetail.companyInfo.name }}</span>
        </div>
        <div class="line">
          <span class="label">机构类型：</span>
          <span>{{ merchantDetail.companyInfo.type | typesFiters }}</span>
        </div>
        <div class="line">
          <span class="label">登录手机号：</span>
          <span>{{ merchantDetail.loginPhone }}</span>
        </div>
        <div class="line" v-if="merchantDetail.companyInfo.logo">
          <span class="label">机构logo：</span>
          <img @click="imageShow($event)" :src="merchantDetail.companyInfo.logo" alt="" srcset="">
        </div>
        <div class="line">
          <span class="label">详细地址：</span>
          <span>{{ merchantDetail.companyInfo.address }}</span>
        </div>
        <div class="line">
          <span class="label">地址定位：</span>
          <span>{{ merchantDetail.companyInfo.location }}</span>
        </div>
        <div class="line">
          <span class="label">服务时间：</span>
          <span>{{ merchantDetail.companyInfo.workTime }}</span>
        </div>
        <div class="line">
          <span class="label">服务电话：</span>
          <span v-for="(item, index) in merchantDetail.companyInfo.phones" :key="index">{{item}}</span>
        </div>
        <div class="line">
          <span class="label">品牌标签：</span>
          <span v-for="(item, index) in merchantDetail.companyInfo.brandTags" :key="index">{{item}}</span>
        </div>
        <div class="line" v-if="merchantDetail.companyInfo.publicityImgs.length > 0">
          <span class="label">介绍图：</span>
          <div class="imgList">
            <img @click="imageShow($event)" style="margin-right: 10px;" v-for="(item, index) in merchantDetail.companyInfo.publicityImgs" :src="item.img" alt="" srcset="" :key="index">
          </div>
        </div>
      </div>
      <div class="qualification">
        <h2 class="title">资质信息</h2>
        <div class="line">
          <span class="label">工商注册号：</span>
          <span>{{ merchantDetail.businessLicenseNo }}</span>
        </div>
        <div class="pic">
          <div class="picItem" v-if="merchantDetail.businessLicenseImg && merchantDetail.businessLicenseImg != ''">
            <span class="label">营业执照</span>
            <img @click="imageShow($event)" :src="merchantDetail.businessLicenseImg" alt="" srcset="">
          </div>
          <div class="picItem" v-if="merchantDetail.handheldIdCardImg && merchantDetail.handheldIdCardImg != ''">
            <span class="label">法人手持身份证（正面）</span>
            <img @click="imageShow($event)" :src="merchantDetail.handheldIdCardImg" alt="" srcset="">
          </div>
          <div class="picItem" v-if="merchantDetail.otherCertificateImg && merchantDetail.otherCertificateImg != ''">
            <span class="label">其他资质证书</span>
            <img @click="imageShow($event)" :src="merchantDetail.otherCertificateImg" alt="" srcset="">
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAuditVisible = false">返回</el-button>
      </span>
    </el-dialog>
    <!-- 审核弹框 -->
    <el-dialog :visible.sync="bindingPrincipalDialog" title="指认商户负责人" width="400px">
      <div>
        <div style="margin-bottom: 10px;">
          请输入负责人名称
        </div>
        <el-select style="width: 300px;" v-model="principal" filterable clearable placeholder="请选择负责人">
          <el-option v-for="item in adminUserArr" :key="item.id" :label="item.name" :value="item.id">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.email }}</span>
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bindingPrincipalDialog = false">返回</el-button>
        <el-button type="primary"  @click="bindingPrincipal">确定</el-button>
      </span>
    </el-dialog>
    <!-- 操作记录 -->
    <el-dialog title="操作记录" :visible.sync="lookOperationDialog">
      <el-table
        :data="operationList"
        border
        fit
        highlight-current-row
        style="width: 100%;">

        <el-table-column label="序号" type="index" :index="1" width="80px" align="center" ></el-table-column>

        <el-table-column label="内容记录" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.operate }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作者" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="时间" width="200px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="operationTotal>0" :total="operationTotal" :page.sync="operationRecordQuery.pageNum" :limit.sync="operationRecordQuery.pageSize" @pagination="getOperationList" />
    </el-dialog>
    <!-- 图片展示 -->
    <imgPreview :url="imgUrl" :show="imgShow" v-if="imgShow" @letImageHide="imgShow = false" />
  </div>
</template>

<script>
import { merchantList, merchantUp, merchantDetail, merchantDown, merchantApplyTypes, merchantBindPerson, merchantUnbindPerson } from '@/api/merchants'
import { adminUserUserList } from '@/api/userManager'
import { operateList } from '@/api/global'
import waves from '@/directive/waves' // Waves directive
import permission from '@/directive/permission/index.js' // 权限判断指令
import imgPreview from '@/components/imgPreView'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'androidUpdate',
  components: { Pagination,imgPreview },
  directives: { waves, permission },
  filters: {
    releaseStatusFilters (val) {
      if(val  == 1){
        return val = '已上架'
      }else if(val == 0){
        return val = '已下架'
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
        name: '',
        status: '',
        isWeiChat: '',
        isService: '',
        isDecuction: '',
        personId: ''
      },
      statusList: [
        {name: '已上架',id: 1},
        {name: '已下架',id: 0}
      ],
      types: [],
      failReasonList: [
        {name: '机构已存在',id: 1},
        {name: '资质信息不符',id: 2},
        {name: '其他',id: -1}
      ],
      showFailReason: false,
      temp: {
        failCause: '',
        merchantId: '',
        through: true
      },
      merchantDetail:{
        companyInfo: {
          name: '',
          logo: '',
          address: '',
          brandTags: [],
          location: '',
          phones: [],
          publicityImgs: [],
          workTime: ''
        },
        loginPhone: ''
      },
      isLookDetail: false,
      dialogFormVisible: false,
      dialogAuditVisible: false,
      dialogRefuseVisible: false,
      rules: {},
      rules1: {
        failCause: [{ required: true, message: '拒绝原因必选'}]
      },
      imgUrl: '',
      imgShow: false,
      // 绑定负责人
      adminUserArr: [],
      bindingPrincipalDialog: false,
      principal: '',
      // 批量绑定负责人开关
      bulkBinding: false,
      multipleSelection: [],
      // 操作记录
      lookOperationDialog: false,
      operationList: [],
      operationTotal: 0,
      operationRecordQuery: {
        operateId: '',
        pageNum: 1,
        pageSize: 10,
        type: 6
      }
    }
  },
  created() {
    console.log(this.listQuery)
    this.listQuery = this.$store.getters.merchantInfoPageQuery
    this.getList()
    this.getTypes()
    this.getAdminUserList()
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true
      this.$store.dispatch('saveMerchantsInfoPageQueryInfo', this.listQuery)
      merchantList(this.listQuery).then(response => {
        if (response.code === 0) {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
        }
      })
    },
    getDetailList(){
      this.listQuery.pageNum = 1
      this.getList()
    },
    // 获取全部负责人
    getAdminUserList() {
      adminUserUserList().then(res => {
        if(res.code == 0) {
          this.adminUserArr = res.data
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
    // 上架
    handleUp(row) {
      const id = row.id
      this.$confirm('确认上架?', '提示', {}).then(() => {
        let query = {
          id: id
        }
        merchantUp(query).then(response => {
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
      this.$alert('<p>确认下架?</p><p style="color: red;">(下架前请确保所有广告位没有该商户，防止程序出错)</p>', '提示', {
        dangerouslyUseHTMLString: true,
      }).then(() => {
        let query = {
          id: id
        }
        merchantDown(query).then(response => {
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
    //重置表单
    resetTemp() {
      this.temp = {
        failCause: '',
        id: '',
        through: true
      }
    },
    //唤起新建
    handleCreate(row) {
      this.resetTemp()
      this.temp.id = row.id
      this.isLookDetail = false
      let data = {
        id: row.id
      }
      merchantDetail(data).then(res => {
        if(res.code == 0){
          this.merchantDetail = res.data
        }
      })
      this.dialogAuditVisible = true
    },
    //查看
    handleLookDetail(row) {
      this.resetTemp()
      this.isLookDetail = true
      let data = {
        id: row.id
      }
      merchantDetail(data).then(res => {
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
    },
    goMain(row){
      this.$router.push({
        path: '/mainBusiness/mainBusiness',
        query: {
          id: row.companyId
        }
      })
    },
    goServiceManager(row) {
      this.$router.push({
        path: '/merchants/serviceManager',
        query: {
          id: row.companyId
        }
      })
    },
    payManager(row) {
      this.$router.push({
        path: '/merchants/payManager',
        query: {
          id: row.id
        }
      })
    },
    // 操作-下拉菜单
    handleCommand(command) {
      console.log(command)
      this[command.type](command.item)
    },
    // 单选-打开绑定负责人弹框
    openBindingPrincipalDialog(row) {
      this.bulkBinding = false
      this.multipleSelection = []
      this.multipleSelection.push(row)
      this.principal = ''
      this.bindingPrincipalDialog = true

    },
    // 多选-打开绑定负责人弹框
    openBindingPrincipalDialogByMultiple() {
      this.principal = ''
      if(this.multipleSelection.length == 0) {
        this.$message({
          message: '请先选择至少一条',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      this.bindingPrincipalDialog = true
    },
    // 绑定负责人
    bindingPrincipal() {
      let merchantIds = []
      for(let i=0;i<this.multipleSelection.length;i++) {
        merchantIds.push(this.multipleSelection[i].id)
      }
      let params = {
        personId: this.principal,
        merchantIds: merchantIds
      }
      merchantBindPerson(params).then(res => {
        if(res.code == 0) {
          this.$notify({
            title: '成功',
            message: '绑定成功',
            type: 'success',
            duration: 2000
          })
          this.bindingPrincipalDialog = false
          this.bulkBinding = false
          this.getList()
        }
      })
    },
    // 解绑负责人
    unbundlingPrincipal(row) {
      const id = row.id
      this.$alert('<p>您确定要解除<span style="color: red">' + row.personName + '</span>对<span style="color: red">' + row.companyName + '</span>的绑定吗？</p>', '解除商户负责人', {
        dangerouslyUseHTMLString: true
      }).then(() => {
        let params = {
          merchantId: row.id
        }
        merchantUnbindPerson(params).then(res => {
          if(res.code == 0){
            this.$notify({
              title: '成功',
              message: '解绑成功',
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
    // 取消批量绑定
    cancelBulkBinding() {
      this.bulkBinding = false
      this.$refs.multipleTable.clearSelection()
      console.log(this.multipleSelection)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 打开操作记录 弹框
    openOperationDialog(row) {
      this.operationList = []
      this.operationTotal = 0
      this.operationRecordQuery.pageNum = 1
      this.operationRecordQuery.pageSize = 10
      this.operationRecordQuery.operateId = row.id
      this.lookOperationDialog = true
      this.getOperationList()
    },
    // 查看操作记录
    getOperationList() {
      operateList(this.operationRecordQuery).then(res => {
        if(res.code == 0) {
          this.operationList = res.data.items
          this.operationTotal = res.data.total
        }
      })
    },
    selectable(row, index) {
      if(row.personName && row.personName != ''){
        return false
      } else {
        return true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.merchants_page {
  .table {
    .table-top {
      margin-top: 20px;
      margin-bottom: 10px;
      .selectTable {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5;
        list-style: none;
        font-feature-settings: 'tnum';
        position: relative;
        padding: 8px 15px 8px 37px;
        word-wrap: break-word;
        border-radius: 4px;
        background-color: #e6f7ff;
        border: 1px solid #91d5ff;
        position: relative;
        .el-icon-info {
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translate( 0, -50%);
        }
        .el-icon-info:before {
          font-size: 18px;
          color: #409EFF;
        }
        span {
          line-height: 40px;
          position: absolute;
          top: 50%;
          left: 40px;
          transform: translate(0, -50%);
          color: rgba(0, 0, 0, 0.85);
          b {
            color: #1890FF;
          }
        }
      }
    }
  }
  .basicInformation{
    .title {
      margin: 0;
    }
  }
  .qualification {
    .pic {
      overflow: hidden;
      .picItem {
        float: left;
        width: 30%;
        border: 1px solid #ccc;
        height: 200px;
        .label{
          display: block;
          height: 40px;
          line-height: 40px;
          font-weight: bold;
          text-align: center;
          display: block;
          border-bottom: 1px solid #ccc;
        }
        img{
          display: block;
          width: 150px;
          height: 100px;
          margin: 0 auto;
          margin-top: 20px;
        }
      }
    }
  }
  .line{
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    .label{
      font-weight: bold;
      display: block;
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
}
</style>
