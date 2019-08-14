<template>
  <div class="serviceSoldOutRecords">
    <div class="filter-container">
      <el-date-picker class="filter-item" style="width: 250px; margin-left: 10px;" @change="getList" v-model="listQuery.date" type="datetime" value-format="yyyy-MM-dd hh:mm:ss" :editable="false" placeholder="请选择下架时间"></el-date-picker>
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

        <el-table-column label="公司名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.firmName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="所在地址" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.firmAddress }}</span>
          </template>
        </el-table-column>

        <el-table-column label="联系电话" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.firmContactTell }}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" width="120px" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 1">{{ scope.row.status | statusFilters }}</el-tag>
            <el-tag type="danger" v-else>{{ scope.row.status | statusFilters }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="浏览量" width="120px" align="center">
          <template slot-scope="scope">
            <span style="color: #337ab7;">{{ scope.row.viewCount }}</span>
          </template>
        </el-table-column>
        
        <el-table-column :label="$t('table.actions')" align="center" width="240px" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button style="margin-left: 10px;" type="success" size="small" @click="handleUp(scope.row)" v-if="scope.row.status !== 1">上架</el-button>
            <el-button style="margin-left: 10px;" type="warning" size="small" @click="handleDown(scope.row)" v-if="scope.row.status == 1">下架</el-button>
            <el-button style="margin-left: 10px;" type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
      
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listQuery: {
        date: '',
        pageSize: 10,
        pageNum: 1
      },
      statusList: [],
      listLoading: false,
      list: [],
      total: 0
    }
  },
  created() {

  },
  methods: {
    getList() {
      console.log(this.listQuery)
    }
  }
}
</script>
<style lang="scss" scoped>
.serviceSoldOutRecords {
  padding: 20px;
}
</style>
