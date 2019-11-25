<template>
  <div class="serviceManager">
    <div class="serviceManagerInfo">
      <div class="serviceManager_title">
        <h4>服务管理</h4>
        <span class="addService" @click="toAddService">+添加服务</span>
      </div>
      <div class="serviceManager_table">
        <el-table
          v-loading="listLoading"
          :data="list"
          class="tableClass"
          border
          style="width: 100%">
          <el-table-column type="index" label="序号" align="center" width="80">
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
          <el-table-column label="上架时间"  align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.upShelfTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status == 1" type="success">{{ scope.row.status | statusFilters }}</el-tag>
              <el-tag v-if="scope.row.status == 2" type="warning">{{ scope.row.status | statusFilters }}</el-tag>
              <el-tag v-if="scope.row.status == 3" type="danger">{{ scope.row.status | statusFilters }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button style="color: #FF7F4A;" v-if="scope.row.status == 2" @click="serviceShelfUp(scope.row)" type="text" size="small">上架</el-button>
              <el-button style="color: #5AB3A4;" v-if="scope.row.status == 1" @click="serviceShelfDown(scope.row)" type="text" size="small">下架</el-button>
              <el-button style="color: #5AB3A4;" v-if="scope.row.status != 1" type="text" size="small" @click="editService(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="lookDetail(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
      </div>
      <div class="dialog">
        <el-dialog title="查看" :visible.sync="lookDetailDialog" width="500px">
          <div class="detail">
            <div class="detailItem">
              <label>关联业务</label>
              <span>{{seviceAreaDetail.relateName}}</span>
            </div>
            <div class="detailItem">
              <label>服务区域</label>
              <span class="tree">
                <el-tree :data="seviceAreaDetail.addressTree" :default-expand-all="true" :props="defaultProps"></el-tree>
              </span>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import serviceManager from '@/api/serviceManager'
export default {
  components: { Pagination },
  filters: {
    statusFilters(status){
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
      listLoading: false,
      listQuery: {
        companyId: this.$route.query.id,
        pageNum: 1,
        pageSize: 10,
        shelf: false
      },
      total: 0,
      list: [],
      lookDetailDialog: false,
      seviceAreaDetail: {
        relateName: '',
        addressTree: []
      },
      defaultProps: {
        children: 'childs',
        label: 'name'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      serviceManager.serviceList(this.listQuery).then(res => {
        if(res.code == 0){
          this.total = res.data.total
          this.list = res.data.items
          this.listLoading = false
        }
      })
    },
    serviceShelfUp(row) {
      let params = {
        companyId: this.$route.query.id,
        id: row.id
      }
      serviceManager.serviceShelfUp(params).then(res => {
        if(res.code == 0){
          this.$message({
            message: '上架成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          this.getList()
        }
      })
    },
    serviceShelfDown(row) {
      let params = {
        companyId: this.$route.query.id,
        id: row.id
      }
      serviceManager.serviceShelfDown(params).then(res => {
        if(res.code == 0){
          this.$message({
            message: '下架成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          this.getList()
        }
      })
    },
    toAddService() {
      this.$router.push('/merchants/serviceEdit?companyId=' + this.$route.query.id)
    },
    editService(row) {
      this.$router.push('/merchants/serviceEdit?id=' + row.id + '&companyId=' + this.$route.query.id)
    },
    // 打开查看弹框
    lookDetail(row) {
      this.seviceAreaDetail = {
        relateName: '',
        addressTree: []
      }
      this.lookDetailDialog = true
      let params = {
        id: row.id
      }
      serviceManager.merchantServiceView(params).then(res => {
        if(res.code == 0){
          this.seviceAreaDetail = res.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.serviceManager {
  padding-bottom: 20PX;
  .serviceManagerInfo {
    width: 100%;
    box-sizing: border-box;
    padding: 24Px 32Px;
    background-color: #fff;
    .serviceManager_title {
      width: 100%;
      overflow: hidden;
      h4 {
        float: left;
        font-family: PingFangSC-Medium;
        font-size: 16Px;
        color: rgba(0,0,0,0.87);
        line-height: 22Px;
      }
      .addService {
        float: right;
        width: 96Px;
        height: 36Px;
        border: 0;
        outline: none;
        cursor: pointer;
        background: #5AB3A4;
        border-radius: 4Px;
        font-family: PingFangSC-Medium;
        font-size: 14Px;
        color: #FFFFFF;
        text-align: center;
        line-height: 36Px;
      }
      .addService {
        background: #5AB3A4;
      }
      .addService:hover {
        background: #5AB3B4;
      }
    }
  }
  .dialog {
    .detail{
      .detailItem {
        width: 100%;
        margin: 10px 0;
        overflow: hidden;
        label {
          margin-right: 20px;
          float: left;
          line-height: 26px;
        }
        span {
          display: block;
          line-height: 26px;
          float: left;
          width: 350px;
          max-height: 500px;
        }
        span.tree {
          overflow: scroll;
          overflow-x: hidden;
          // &::-webkit-scrollbar {
          //   width: 0;
          //   height: 0;
          //   background-color: transparent;
          // }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.serviceManager {
  .serviceManager_table {
    margin-top: 20Px;
    .el-table {
      .el-table__header {
        tr {
          background: #E0E0E0;
          th {
            background: #E0E0E0;
          }
        }
      }
      thead {
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: rgba(0,0,0,0.87);
        text-align: center;
        line-height: 20px;
      }
    }
  }
}
</style>
