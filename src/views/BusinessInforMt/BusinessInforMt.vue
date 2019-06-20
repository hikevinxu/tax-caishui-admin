<template>
  <div class="BusinessInforMt-container">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="8" :sm="8" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <div class="card-panel-text">已上架</div>
          </div>
          <div class="card-panel-description">
            <count-to :start-val="0" :end-val="102400" :duration="2000" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <div class="card-panel-text">未上架</div>
          </div>
          <div class="card-panel-description">
            <count-to :start-val="0" :end-val="81212" :duration="2000" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <div class="card-panel-text">待补充</div>
          </div>
          <div class="card-panel-description">
            <count-to :start-val="0" :end-val="9280" :duration="2000" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" @click="handleCreate">添加</el-button>
      <el-input class="filter-item" style="width: 250px" v-model="listQuery.title" placeholder="请输入公司名称" />
      <el-select v-model="listQuery.status" placeholder="状态" clearable style="width: 250px" class="filter-item">
          <el-option v-for="(item,index) in statusList" :key="item+index" :label="item.name" :value="item.id"/>
      </el-select>
      <el-select v-model="listQuery.status" placeholder="是否置顶" clearable style="width: 250px" class="filter-item">
          <el-option v-for="(item,index) in statusList" :key="item+index" :label="item.name" :value="item.id"/>
      </el-select>
      <el-button v-waves class="filter-item" type="success" icon="el-icon-search" @click="getList">筛选</el-button>
    </div>
    <el-table
      v-loading="listLoading"
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

      <el-table-column label="词条名称" width="450px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.word }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="120px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1">{{ scope.row.statusValue }}</el-tag>
          <el-tag type="danger" v-else>{{ scope.row.statusValue }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="浏览量" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.clickCount }}</span>
        </template>
      </el-table-column>
      
      <el-table-column :label="$t('table.actions')" align="center" min-width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button style="margin-left: 12px;" type="success" size="small" @click="handleUp(scope.row)" v-if="scope.row.status == 0">上架</el-button>
          <el-button style="margin-left: 12px;" type="warning" size="small" @click="handleDown(scope.row)" v-if="scope.row.status == 1">下架</el-button>
          <el-button style="margin-left: 12px;" type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog width="800px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="120px" style="margin-left:50px;">

        <el-form-item label="公司名称：" prop="word">
          <el-input style="width: 300px" v-model="temp.word" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item label="公司地址：" prop="word">
          <el-input style="width: 350px" v-model="temp.word" placeholder="请输入公司地址" />
        </el-form-item>
        <el-form-item label="所属地区：" prop="word">
          <el-select style="width: 150px" v-model="value" clearable placeholder="请选择所属地区">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
          <el-select style="width: 150px" v-model="value" clearable placeholder="请选择所属地区">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
          <el-select style="width: 150px" v-model="value" clearable placeholder="请选择所属地区">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话：" prop="word">
          <el-input style="width: 300px" v-model="temp.word" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="公司简介：" prop="word">
          <el-input type="textarea" style="width: 350px" v-model="temp.word" placeholder="请输入公司简介" />
        </el-form-item>
        <el-form-item label="主营业务：" prop="word">
          <el-input style="width: 300px" v-model="temp.word" placeholder="请选择主营业务" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'BusinessInforMt',
  components: { CountTo, Pagination },
  directives: { waves },
  data(){
    return {
      listLoading: false,
      list: [],
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        title: '',
        status: ''
      },
      statusList: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      temp: {
        word: ''
      },
      rules: {
        // word: [{ required: true, message: '词条名称必填', trigger: 'blur' }]
      },
      options: [],
      value:''
    }
  },
  created(){

  },
  methods: {
    // 获取列表
    getList(){

    },
    // 重置表单
    resetTemp(){
      this.temp ={
        word: ''
      }
    },
    // 唤起新建
    handleCreate(){
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 新建
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // hotSave(this.temp).then((response) => {
          //   if (response.code == 0) {
          //     this.$notify({
          //       title: '成功',
          //       message: '添加成功',
          //       type: 'success',
          //       duration: 2000
          //     })
          //     this.dialogFormVisible = false
          //   }
          //   this.getList()
          // })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.BusinessInforMt-container {
  padding: 20px;
  .panel-group {
    .card-panel-col{
      margin-bottom: 20px;
    }
    .card-panel {
      height: 72px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: hsl(179, 56%, 52%);
        }
        .icon-message {
          background: #36a3f7;
        }
        .icon-money {
          background: #f4516c;
        }
        .icon-shopping {
          background: #34bfa3
        }
      }
      .icon-people {
        color: #36a3f7;
      }
      .icon-message {
        color: #40c9c6;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shopping {
        color: #34bfa3;
      }
      .card-panel-icon-wrapper {
        float: left;
        height: 52px;
        margin: 10px;
        padding: 10px 20px;
        box-sizing: border-box;
        line-height: 32px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
        .card-panel-text {
          font-size: 16px;
          font-weight: 700;
        }
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
