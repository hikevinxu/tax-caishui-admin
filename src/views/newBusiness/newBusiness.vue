<template>
  <div class="bannerSetting-container">
    <div class="filter-container">
      <el-date-picker
        v-model="value3"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>

    <el-table
      v-loading="listLoading"
      ref="multipleTable"
      tooltip-effect="dark"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="序号" prop="id" align="center" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.sortIndex }}</span>
        </template>
      </el-table-column>

      <el-table-column label="机构名称" prop="id" align="center" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系人" align="center" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请业务" align="center" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="描述" prop="id" align="center" min-width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="提交时间" prop="id" align="center" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

  </div>
</template>

<script>
import waves from '@/directive/waves' // Waves directive
import { businessTypeList } from '@/api/homePageSetting'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'participles',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      value3: '',
      listLoading: false,
      listQuery: {
        pageNum: 1,
        shelf: '',
        pageSize: 10
      },
      statusList: [
        {name:'已上架',id: true},
        {name:'已下架',id: false}
      ],
      dialogFormVisible: false,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true
      businessTypeList().then(response => {
        if(response.code == 0){
          console.log(response)
          this.list = response.data
          // this.total = response.data.total
        }
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bannerSetting-container {
  padding: 20px;
}
</style>
