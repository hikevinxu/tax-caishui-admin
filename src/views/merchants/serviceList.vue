<template>
  <div class="serviceList">
    <div class="filter-container">
      <el-select class="filter-item" v-model="firstServiceCode" placeholder="请选择关联类目" @change="firstServiceCodeChange" style="width: 200px">
        <el-option v-for="(item,index) in firstServiceCodeList" :key="item+index" :label="item.name" :value="item.code"/>
      </el-select>
      <el-select class="filter-item" v-if="secondServiceCodeList.length > 0" v-model="secondServiceCode" placeholder="请选择关联类目" @change="secondServiceCodeChange"  style="width: 200px">
        <el-option v-for="(item,index) in secondServiceCodeList" :key="item+index" :label="item.name" :value="item.code"/>
      </el-select>
      <el-select class="filter-item" v-if="thirdServiceCodeList.length > 0" v-model="thirdServiceCode" placeholder="请选择关联类目" @change="thirdServiceCodeChange"  style="width: 200px">
        <el-option v-for="(item,index) in thirdServiceCodeList" :key="item+index" :label="item.name" :value="item.code"/>
      </el-select>
      <el-select class="filter-item" v-model="listQuery.companyId" filterable remote reserve-keyword placeholder="请输入公司全称" style="width: 350px" @change="companyChange" :remote-method="searchCompanyList" :loading="loading">
        <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-button v-waves class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-search" @click="getList">搜索</el-button>
    </div>
    <div class="tableClass">
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

        <el-table-column label="关联类目" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.serviceName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="服务标题" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>

        <el-table-column label="企业名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.companyName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="上架时间" width="200px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.upShelfTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" width="120px" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 1">{{ scope.row.status | statusFilters }}</el-tag>
            <el-tag type="danger" v-else>{{ scope.row.status | statusFilters }}</el-tag>
          </template>
        </el-table-column>
        
        <el-table-column :label="$t('table.actions')" align="center" width="240px" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="lookDetail(scope.row)">查看</el-button>
            <el-button style="margin-left: 10px;" type="success" size="small" @click="serviceShelfUp(scope.row)" v-if="scope.row.status !== 1">上架</el-button>
            <el-button style="margin-left: 10px;" type="warning" size="small" @click="handleDown(scope.row)" v-if="scope.row.status == 1">下架</el-button>
            <el-button type="primary" size="small" @click="lookServiceDownRecords(scope.row)">下架记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

      <!-- 下架弹框 -->
      <el-dialog :visible.sync="dialogRefuseVisible" width="600px" title="下架原因">
        <el-form ref="dataForm1" :model="temp" label-position="right" label-width="120px">
          <el-form-item label="拒绝原因：" prop="failCause">
            <el-select @change="failChose" v-model="temp.failCause" placeholder="请选择原因"  style="width: 150px" class="filter-item">
              <el-option v-for="(item,index) in failReasonList" :key="item+index" :label="item.name" :value="item.name"/>
            </el-select>
          </el-form-item>
          <el-form-item v-show="showFailReason" label="添加原因：" prop="failReason">
            <el-input v-model="temp.otherReason" placeholder="请输入下架原因" />
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogRefuseVisible = false">返回</el-button>
          <el-button type="primary" @click="serviceShelfDown">确定</el-button>
        </span>
      </el-dialog>

      <!-- 服务详情弹出框 -->
      <el-dialog :visible.sync="dialogDetailVisible" width="800px" title="服务详情" top="5vh">
        <div class="serviceDetail">
          <div class="detail_item">
            <label>企业名称</label>
            <div>杭州顶呱呱科技有限公司</div>
          </div>
          <div class="detail_item">
            <label>关联服务</label>
            <div>代理记账</div>
          </div>
          <div class="detail_item">
            <label>关联服务</label>
            <div>
              <ul>
                <li v-for="(item, index) in serviceDetailData.imgs" :key="'imgs'+index" ><img :src="item.img" alt=""></li>
              </ul>
            </div>
          </div>
          <div class="detail_item">
            <label>服务区域</label>
            <div>杭州顶呱呱科技有限公司</div>
          </div>
          <div class="detail_item">
            <label>服务标题</label>
            <div>代理记账公司 杭州0元公司注册提供注册地址 专业代理记账</div>
          </div>
          <div class="detail_item">
            <label>服务介绍</label>
            <div class="introduce" v-html="serviceDetailData.introduce"></div>
          </div>
          <div class="detail_item">
            <label>服务报价</label>
            <div class="table">
              <el-table
                v-loading="listLoading"
                :data="serviceDetailData.items"
                border
                fit
                highlight-current-row
                style="width: 100%;">
                <el-table-column label="服务项" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="报价" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.price }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogDetailVisible = false">返回</el-button>
          <el-button style="margin-left: 10px;" type="success" @click="serviceShelfUp(serviceDetailData)" v-if="serviceDetailData.status !== 1">上架</el-button>
          <el-button style="margin-left: 10px;" type="warning" @click="handleDown(serviceDetailData)" v-if="serviceDetailData.status == 1">下架</el-button>
        </span>
      </el-dialog>

      <!-- 下架记录弹框 -->
      <el-dialog :visible.sync="dialogDownRecordsVisible" width="1000px" title="下架记录">
        <el-table
          v-loading="downRecordsLoading"
          :data="downRecordsData"
          border
          fit
          highlight-current-row
          style="width: 100%;">
          <el-table-column label="序号" type="index" align="center" width="50px">
          </el-table-column>

          <el-table-column label="关联类目" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.serviceName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="服务标题" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>

          <el-table-column label="企业名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.companyName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="下架时间" width="200px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.downShelfTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="下架原因" width="120px" align="center">
            <template slot-scope="scope">
              <span style="color: #337ab7;">{{ scope.row.downShelfCause }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { serviceList, serviceShelfDown, serviceShelfUp, serviceServiceItems, serviceDetail, serviceDownRecords } from '@/api/merchants'
import { companySearch, serviceTypeList } from '@/api/adManager'
export default {
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilters (status) {
      switch(status){
        case 1:
          return '已上架'
          break;
        case 2:
          return '已下架'
          break;
        case 3:
          return '平台下架'
          break;
        default: 
          return ''
          break;
      }
    }
  },
  data() {
    return {
      loading: false,
      listQuery: {
        companyId: '',
        pageSize: 10,
        pageNum: 1,
        serviceCode: ''
      },
      firstServiceCode: '',
      firstServiceCodeList: [],
      secondServiceCode: '',
      secondServiceCodeList: [],
      thirdServiceCode: '',
      thirdServiceCodeList: [],
      companyList: [],
      statusList: [],
      listLoading: false,
      list: [],
      total: 0,
      dialogRefuseVisible: false,
      failReasonList: [{
        name: '服务信息不合规'
      },
      {
        name: '内容不合法'
      },
      {
        name: '其他'
      }],
      showFailReason: false,
      temp: {
        id: '',
        failCause: '',
        otherReason: ''
      },
      dialogDetailVisible: false,
      serviceDetailData: {},
      dialogDownRecordsVisible: false,
      downRecordsData: [],
      downRecordsLoading: false
    }
  },
  created() {
    this.getServiceTypeList()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      serviceList(this.listQuery).then(res => {
        if(res.code == 0) {
          this.list = res.data.items
          this.total = res.data.total
          this.listLoading = false
        }
      })
    },
    getServiceTypeList() {
      serviceTypeList().then(res => {
        if(res.code == 0){
          this.firstServiceCodeList = res.data
        }
      })
    },
    firstServiceCodeChange(val) {
      this.secondServiceCode = ''
      this.thirdServiceCode = ''
      this.secondServiceCodeList = []
      this.thirdServiceCodeList = []
      if(val && val != ''){
        let param = {
          parentCode: val
        }
        serviceTypeList(param).then(res => {
          if(res.code == 0){
            if (res.data.length > 0) {
              this.secondServiceCodeList = res.data
            } else {
              this.listQuery.serviceCode = val
              this.getList()
            }
          }
        })
      }
    },
    secondServiceCodeChange(val) {
      this.thirdServiceCode = ''
      this.thirdServiceCodeList = []
      if(val && val != ''){
        let param = {
          parentCode: val
        }
        serviceTypeList(param).then(res => {
          if(res.code == 0){
            if (res.data.length > 0) {
              this.thirdServiceCodeList = res.data
            } else {
              this.listQuery.serviceCode = val
              this.getList()
            }
          }
        })
      }
    },
    thirdServiceCodeChange(val) {
      this.listQuery.serviceCode = val
      this.getList()
    },
    handleDown(row) {
      this.dialogRefuseVisible = true
      this.temp.id = row.id
    },
    failChose() {
      if(this.temp.failCause == '其他'){
        this.showFailReason = true
      }else{
        this.showFailReason = false
      }
    },
    serviceShelfDown() {
      let params = {
        id: this.temp.id,
        downShelfCause: this.temp.failCause == '其他' ? this.temp.otherReason : this.temp.failCause
      }
      if (params.downShelfCause == '') {
        this.$message({
          message: '下架原因不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      serviceShelfDown(params).then(res => {
        if(res.code == 0){
          this.dialogRefuseVisible = false
          this.dialogDetailVisible = false
          this.$notify({
            title: '成功',
            message: '下架成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        }
      })
    },
    serviceShelfUp(row) {
      let params = {
        id: row.id
      }
      serviceShelfUp(params).then(res => {
        if(res.code == 0){
          this.dialogDetailVisible = false
          this.$notify({
            title: '成功',
            message: '上架成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        }
      })
    },
    lookServiceDownRecords(row) {
      this.dialogDownRecordsVisible = true
      this.downRecordsLoading = true
      let param = {
        id: row.id
      }
      serviceDownRecords(param).then(res => {
        if(res.code == 0) {
          console.log(res)
          this.downRecordsData = res.data
          this.downRecordsLoading = false
        }
      })
    },
    companyChange() {
      this.getList()
    },
    searchCompanyList(query){
      if (query !== '') {
        this.loading = true
        let params = {
          pageNum: 1,
          pageSize: 20,
          keyword: query
        }
        companySearch(params).then(res => {
          if(res.code == 0){
            console.log(res)
            this.loading = false
            this.companyList = res.data.items
          }
        })
      } else {
        this.companyList = []
      }
    },
    resetServiceDetailData () {

    },
    lookDetail(row) {
      let param ={
        id: row.id
      }
      serviceDetail(param).then(res => {
        if(res.code == 0){
          this.serviceDetailData = res.data
          this.serviceDetailData.status = row.status
        }
      })
      this.dialogDetailVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.serviceList {
  padding: 20px;
  .serviceDetail {
    .detail_item {
      width: 100%;
      overflow: hidden;
      margin-top: 10px;
      label {
        float: left;
        line-height: 24px;
        margin-right: 20px;
      }
      div {
        float: left;
        max-width: 650px;
        line-height: 24px;
        ul {
          margin: 0;
          padding: 0;
          overflow: hidden;
          li {
            display: block;
            float: left;
            width: 150px;
            height: 150px;
            margin-right: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
            img {
              width: 100%;
              height: 100%;
              display: block;
              border-radius: 5px;
            }
          }
        }
      }
      .introduce {
        width: 100%;
        min-height: 200px;
        background-color: #f3f3f3;
        border-radius: 10px;
        padding: 10px 20px;
      }
      .table {
        width: 100%;
      }
    }
  }
}
</style>
