<template>
  <div class="BussinessAdPutList">
    <div class="filter-container">
      <el-select v-model="listQuery.status" placeholder="是否上架" @change="getList" style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in statusList" :key="item+index" :label="item.name" :value="item.id"/>
      </el-select>
      <el-select v-model="listQuery.status" placeholder="是否上架" @change="getList" style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in statusList" :key="item+index" :label="item.name" :value="item.id"/>
      </el-select>
      <el-select v-model="listQuery.status" placeholder="是否上架" @change="getList" style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in statusList" :key="item+index" :label="item.name" :value="item.id"/>
      </el-select>
      <el-date-picker
        v-model="listQuery.putTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-input style="width: 250px" v-model="listQuery.name" placeholder="请输入搜索主题" />
      <el-button v-waves class="filter-item" type="success" icon="el-icon-search" @click="getList">筛选</el-button>
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
      <el-table-column label="ID" prop="id" align="center" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="埋点标题" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sensorsTitle }}</span>
        </template>
      </el-table-column>

      <el-table-column label="banner图片" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="width: 100px;" alt="" srcset="">
        </template>
      </el-table-column>

      <el-table-column label="状态" width="120px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1">{{ scope.row.status | statusFilters }}</el-tag>
          <el-tag type="danger" v-else>{{ scope.row.status | statusFilters }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="跳转类型" width="120px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.jumpType == 1">{{ scope.row.jumpType | jumpTypeFilters }}</el-tag>
          <el-tag v-if="scope.row.jumpType == 2" type="success">{{ scope.row.jumpType | jumpTypeFilters }}</el-tag>
          <el-tag v-if="scope.row.jumpType == 3" type="warning">{{ scope.row.jumpType | jumpTypeFilters }}</el-tag>
          <el-tag v-if="scope.row.jumpType == 4" type="danger">{{ scope.row.jumpType | jumpTypeFilters }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="跳转目标" width="250px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.jumpType == 1">{{ scope.row.pageUrl | pageUrlFilters }}</el-tag>
          <el-tag v-if="scope.row.jumpType == 2">{{ scope.row.jumpUrl }}</el-tag>
          <span v-if="scope.row.jumpType == 3">
            <el-tag v-if="scope.row.serviceType.firstName">{{ scope.row.serviceType.firstName }}</el-tag>
            <el-tag type="danger" v-if="scope.row.serviceType.secondName">{{ scope.row.serviceType.secondName }}</el-tag>
          </span>
          <el-tag v-if="scope.row.jumpType == 4">{{ scope.row.firm.firmName }}</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column :label="$t('table.actions')" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button style="margin-left: 10px;" type="success" size="small" @click="handleUp(scope.row)" v-if="scope.row.status !== 1">上架</el-button>
          <el-button style="margin-left: 10px;" type="warning" size="small" @click="handleDown(scope.row)" v-if="scope.row.status == 1">下架</el-button>
          <el-button style="margin-left: 10px;" type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import { advertPositionFullinfoList } from '@/api/adManager'
import waves from '@/directive/waves' // Waves directive
export default {
  name: 'BussinessputList',
  directives: { waves },
  props: {
    type: {
      type: String,
      default: 'baseSet'
    },
    typeId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      listQuery: {
        status: '',
        name: '',
        putTime: '',
        pageNum: 1,
        pageSize: 10,
        positionNo: this.typeId,
        startTime: '',
        endTime: '',
        adStatus: '',
        cityStatus: '',
        adTitle: '',
        goType: '',
        adType: '',
        cityCode: '',
        typeValue: '',
        adIndex: ''
      },
      statusList: [],
      listLoading: false,
      list: [],
    }
  },
  created(){
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      advertPositionFullinfoList(this.listQuery).then(res => {
        if(res.code == 0){
          console.log(res)
          this.listLoading = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.BussinessAdPutList {
  padding: 20px;
}
</style>
