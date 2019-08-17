<template>
  <div class="bannerSetting-container">
    <div class="filter-container">
      <el-date-picker
        v-model="value3"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd hh:mm:ss"
        @change="timeChose">
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
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="机构名称" prop="id" align="center" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.applyName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系人" align="center" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.contacts }}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请业务" align="center" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="描述" prop="id" align="center" min-width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.introduce }}</span>
        </template>
      </el-table-column>

      <el-table-column label="提交时间" prop="id" align="center" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

  </div>
</template>

<script>
import waves from '@/directive/waves' // Waves directive
import { businessList } from '@/api/service'
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
        name: '',
        applyName: '',
        startTime: '',
        endTime: '',
        pageSize: 20
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
      businessList(this.listQuery).then(response => {
        if(response.code == 0){
          console.log(response)
          this.list = response.data.items
          // this.total = response.data.total
        }
        this.listLoading = false
      })
    },
    timeChose(e){
      console.log(e)
      this.listQuery.startTime = e[0]
      this.listQuery.endTime = e[1]
      console.log(this.listQuery)
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.bannerSetting-container {
  padding: 20px;
}
</style>
