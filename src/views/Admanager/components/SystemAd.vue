<template>
  <div class="bussinessAd">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" @click="handleCreate">添加</el-button>
      <el-input class="filter-item" style="width: 250px" v-model="listQuery.name" placeholder="请输入公司名称" />
      <el-select v-model="listQuery.status" placeholder="是否上架" @change="getList" style="width: 150px" class="filter-item">
          <el-option v-for="(item,index) in statusList" :key="item+index" :label="item.name" :value="item.id"/>
      </el-select>
      <el-select v-model="listQuery.status" placeholder="是否上架" @change="getList" style="width: 150px" class="filter-item">
          <el-option v-for="(item,index) in statusList" :key="item+index" :label="item.name" :value="item.id"/>
      </el-select>
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

    <el-dialog width="800px" title="新增" :visible.sync="dialogFormVisible">
        <el-radio-group v-model="tabTitle" style="margin-bottom: 30px;" size="small">
          <el-radio-button label="baseSet">基本参数配置</el-radio-button>
          <el-radio-button label="list">投放列表</el-radio-button>
          <el-radio-button label="addCity">新增城市</el-radio-button>
        </el-radio-group>
        <div v-if="tabTitle == 'baseSet'">
          <el-form ref="dataForm" :model="form" label-position="right" label-width="150px" style="margin-left:50px;">
            <el-form-item label="主题：" prop="sensorsTitle">
              <el-input style="width: 250px" v-model="form.sensorsTitle" placeholder="请输入主题（15字以内）" />
            </el-form-item>
            <el-form-item label="Banner图：" prop="icon">
              <Upload type="banner" v-model="form.icon"/>
            </el-form-item>
            <el-form-item label="跳转类型：" prop="jumpType">
              <el-select v-model="form.jumpType" placeholder="跳转类型" clearable style="width: 250px" class="filter-item">
                <el-option v-for="(item,index) in jumpTypeList" :key="item.id+index" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align: right;">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogStatus == 'create' ? createData() : editData()">保存</el-button>
          </div>
        </div>
        <div v-if="tabTitle == 'list'">
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
            
            <el-table-column :label="$t('table.actions')" align="center" width="250" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button style="margin-left: 10px;" type="success" size="small" @click="handleUp(scope.row)" v-if="scope.row.status !== 1">上架</el-button>
                <el-button style="margin-left: 10px;" type="warning" size="small" @click="handleDown(scope.row)" v-if="scope.row.status == 1">下架</el-button>
                <el-button style="margin-left: 10px;" type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="listTab">
            <el-button type="warning">全部上架</el-button>
            <el-button type="danger">全部下架</el-button>
          </div>
        </div>
        <div v-if="tabTitle == 'addCity'">
          <el-form ref="addCityForm" :model="addCityForm" label-position="right" label-width="150px" style="margin-left:50px;">
            <el-form-item label="选择投放城市：" prop="putCity">
              <el-select v-model="addCityForm.putCity" placeholder="跳转类型" clearable style="width: 250px" class="filter-item">
                <el-option v-for="(item,index) in jumpTypeList" :key="item.id+index" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="选择投放时间：" prop="putTime">
              <el-date-picker
                v-model="addCityForm.putTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="可用广告位：" prop="jumpType">
              <el-select v-model="form.jumpType" placeholder="跳转类型" clearable style="width: 250px" class="filter-item">
                <el-option v-for="(item,index) in jumpTypeList" :key="item.id+index" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align: right;">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogStatus == 'create' ? createData() : editData()">保存</el-button>
          </div>
        </div>
    </el-dialog>

  </div>
</template>
<script>
import waves from '@/directive/waves' // Waves directive
import Upload from '@/components/Upload/uploadImg'
export default {
  name: 'SystemAd',
  components: {
    Upload
  },
  directives: { waves },
  props: {
    type: {
      type: String,
      default: 'baseSet'
    }
  },
  data () {
    return {
      listQuery: {
        status: '',
        name: ''
      },
      statusList: [],
      listLoading: false,
      list: [],
      dialogFormVisible: false,
      dialogStatus: '',
      form: {
        sensorsTitle: '',
        icon: '',
        jumpType: ''
      },
      addCityForm: {
        putCity: '',
        putTime: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        jumpType: ''
      },
      jumpTypeList: [
        { name: '无跳转', id: 1},
        { name: '原生', id: 2},
        { name: '其他URl', id: 3}
      ],
      tabTitle: 'baseSet'
    }
  },
  methods: {
    handleCreate() {
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
    },
    getList() {

    },
    handleUp () {

    },
    handleDown() {

    },
    handleDelete() {

    },
    createData() {
      console.log(this.type)
      this.$emit('func')
    },
    editData() {

    },
    selectType(val){
      console.log(val)
    }
  }
}
</script> 
<style lang="scss" scoped>
.bussinessAd {
  padding: 20px;
  .listTab {
    text-align: right;
    margin-top: 30px;
  }
}
</style>
