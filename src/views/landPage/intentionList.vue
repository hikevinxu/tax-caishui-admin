<template>
  <div class='intentionList'>
    <div class="filter-container">
      <el-select class="filter-item" style="width: 250px; margin-left: 10px;" @change="searchDataChange" v-model="listQuery.formType" placeholder="请选择投放应用">
        <el-option value="" label="全部"></el-option>
        <el-option v-for="item in formTypeList" :label="item.name" :value="item.id" :key="item.id" > </el-option>
      </el-select>
    </div>
    <div class="intentionList_table">
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%">
        <el-table-column label="序号" type="index" :index="1" width="80px" align="center" >
        </el-table-column>
        <el-table-column label="意向收集表单类型" align="center" width="200px">
          <template slot-scope="scope">
            <span>{{ scope.row.formType | formTypeFilters }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地区" align="center" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.country }}</span>
          </template>
        </el-table-column>
        <el-table-column label="意向" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.intention ? scope.row.intention : '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="称呼" align="center">
          <template slot-scope="scope">
            <span style="color: #409eff;">{{scope.row.name ? scope.row.name : '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系方式"  align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提交时间"  align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>

  </div>
</template>
<script>
import { channelPageIntentionList } from '@/api/landPage'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import global from '@/utils/global'
export default {
  components: { Pagination },
  data(){
    return {
      listLoading: false,
      list: [],
      listQuery: {
        pageSize: 10,
        pageNum: 1,
        pageType: 3,
        formType: ''
      },
      total: 0,
      formTypeList: global.formTypeList
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      channelPageIntentionList(this.listQuery).then(res => {
        if(res.code == 0) {
          this.list = res.data.items
          this.total = res.data.total
          this.listLoading = false
        }
      })
    },
    searchDataChange(){
      this.listQuery.pageSize = 10
      this.listQuery.pageNum = 1
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
.intentionList {
  padding: 20px;
}
</style>
