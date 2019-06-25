<template>
  <div class="bannerSetting-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" @click="handleCreate">添加</el-button>
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
      <el-table-column label="序号" prop="id" align="center" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="埋点标题" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sensorsTitle }}</span>
        </template>
      </el-table-column>

      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
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
          <span>{{ scope.row.jumpUrl }}</span>
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog width="800px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="150px" style="margin-left:50px;">
        <el-form-item label="埋点标题：" prop="sensorsTitle">
          <el-input style="width: 250px" v-model="temp.sensorsTitle" placeholder="请输入埋点标题" />
        </el-form-item>

        <el-form-item label="标题：" prop="title">
          <el-input style="width: 250px" v-model="temp.title" placeholder="请输入标题" />
        </el-form-item>

        <el-form-item label="ICON图：" prop="icon">
          <Upload v-model="temp.icon"/>
        </el-form-item>

        <el-form-item label="跳转类型：" prop="jumpType">
          <el-select v-model="temp.jumpType" placeholder="跳转类型" clearable style="width: 250px" class="filter-item">
            <el-option v-for="(item,index) in jumpTypeList" :key="item.id+index" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item v-if="temp.jumpType == 1" label="跳转页面：" prop="pageUrl">
          <el-select v-model="temp.pageUrl" placeholder="跳转页面" @change="pageUrlChange" clearable style="width: 250px" class="filter-item">
            <el-option v-for="(item,index) in pageUrlList" :key="item.id+index" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item v-if="temp.jumpType == 2" label="跳转地址：" prop="jumpUrl">
          <el-input style="width: 300px" v-model="temp.jumpUrl" placeholder="请输入跳转地址" />
        </el-form-item>

        <el-form-item v-if="temp.jumpType == 3" label="选择服务：">
          <el-select style="width: 150px" v-model="temp.serviceType.firstCode" @change="firstCodeChange" clearable placeholder="请选择一级服务">
            <el-option v-for="(item,index) in firstCodeList" :key="item.name+index" :label="item.name" :value="item.code"> </el-option>
          </el-select>
          <el-select style="width: 150px" v-model="temp.serviceType.secondCode" clearable placeholder="请选择二级服务">
            <el-option v-for="(item,index) in secondCodeList" :key="item.name+index" :label="item.name" :value="item.code"> </el-option>
          </el-select>
          <!-- <el-select style="width: 150px" v-model="temp.serviceType.thirdCode" clearable placeholder="请选择三级服务">
            <el-option v-for="(item,index) in thirdCodeList" :key="item+index" :label="item.name" :value="item.id"> </el-option>
          </el-select> -->
        </el-form-item>

        <el-form-item v-if="temp.jumpType == 4" label="选择公司：" prop="firmId">
          <el-select v-model="temp.firm.id" placeholder="选择公司" clearable style="width: 250px" class="filter-item">
            <el-option v-for="(item,index) in firmIdList" :key="item+index" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="排序：" prop="sortIndex">
          <el-input-number v-model="temp.sortIndex" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>

        <el-form-item label="跳转是否需要登录：" prop="jumpType">
          <el-switch v-model="temp.needLogin"></el-switch>
        </el-form-item>

        <el-form-item label="是否保存并上线：" prop="saveAndRelease">
          <el-switch v-model="temp.saveAndRelease"></el-switch>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus == 'create' ? createData() : editData()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { systemTagList, systemTagSave, systemTagPublish, systemTagDown, systemTagDelete, businessTypeList } from '@/api/bannerAndTagSetting'
import { jumpTypeFilters, statusFilters } from '@/filters/index'
import global from '@/utils/global'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Upload from '@/components/Upload/singleImage4'
export default {
  name: 'participles',
  components: { Pagination, Upload },
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        pageNum: 1,
        status: 1,
        pageSize: 10
      },
      statusList: global.statusList,
      jumpTypeList: global.jumpTypeList,
      pageUrlList: [
        {name: '原生普通页面', id: "1"},
        {name: 'h5链接', id: "2"},
        {name: '服务搜索页', id: "3"},
        {name: '公司详情页', id: "4"}
      ],
      firstCodeList: [],
      secondCodeList: [],
      thirdCodeList: [],
      firmIdList: [],
      temp: {
        id: '',
        sensorsTitle: '',
        title: '',
        icon: '',
        jumpType: undefined,
        jumpUrl: '',
        needLogin: false,
        pageUrl: '',
        serviceType: {
          firstCode: '',
          secondCode: '',
          thirdCode: '',
        },
        firm: {
          id: ''
        },
        saveAndRelease: false,
        sortIndex: 1
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
      },
      rules: {
        word: [{ required: true, message: '词条名称必填', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
    this.getBusinessTypeList()
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true
      systemTagList(this.listQuery).then(response => {
        if(response.code == 0){
          this.list = response.data.items
          this.total = response.data.total
        }
        this.listLoading = false
      })
    },
    // 上架
    handleUp(row) {
      const id = row.id
      this.$confirm('确认上架?', '提示', {}).then(() => {
        let query = {
          id: id
        }
        systemTagPublish(query).then(response => {
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
      this.$confirm('确认下架?', '提示', {}).then(() => {
        let query = {
          id: id
        }
        systemTagDown(query).then(response => {
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
        id: '',
        sensorsTitle: '',
        title: '',
        icon: '',
        jumpType: undefined,
        jumpUrl: '',
        needLogin: false,
        pageUrl: '',
        serviceType: {
          firstCode: '',
          secondCode: '',
          thirdCode: ''
        },
        firm: {
          id: ''
        },
        saveAndRelease: false,
        sortIndex: 1
      }
    },
    //唤起新建
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    //新建
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let params = {
            sensorsTitle: this.temp.sensorsTitle,
            title: this.temp.title,
            icon: this.temp.icon,
            jumpType: this.temp.jumpType,
            needLogin: this.temp.needLogin,
            saveAndRelease: this.temp.saveAndRelease,
            sortIndex: this.temp.sortIndex
          }
          if (this.temp.jumpType == 1) {
            params.pageUrl = this.temp.pageUrl
          }else if(this.temp.jumpType == 2) {
            params.jumpUrl = this.temp.jumpUrl
          }else if(this.temp.jumpType == 3){
            params.serviceType = this.temp.serviceType
          }else if(this.temp.jumpType == 4){
            params.firm = this.temp.firm
          }
          systemTagSave(params).then((response) => {
            if (response.code == 0) {
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success',
                duration: 2000
              })
              this.dialogFormVisible = false
            } else {
              this.$message({
                message: response.data.msg,
                type: 'error',
                showClose: true,
                duration: 1000
              })
            }
            this.getList()
          })
        }
      })
    },
    // 编辑
    handleEdit(row) {
      this.resetTemp()
      this.temp.id = row.id
      this.temp.sensorsTitle = row.sensorsTitle
      this.temp.title = row.title
      this.temp.icon = row.icon
      this.temp.jumpType = row.jumpType
      this.temp.needLogin = row.needLogin
      this.temp.sortIndex = row.sortIndex
      if (row.jumpType == 1) {
        this.temp.pageUrl = row.pageUrl
      }
      if (row.jumpType == 2) {
        this.temp.jumpUrl = row.jumpUrl
      }
      if (row.jumpType == 3) {
        for(let i=0;i<this.firstCodeList.length;i++){
          if(this.firstCodeList[i].code == row.serviceType.firstCode) {
            this.secondCodeList = this.firstCodeList[i].children
          }
        }
        this.temp.serviceType = row.serviceType
      }
      if (row.jumpType == 4) {
        this.temp.firm = row.firm
      }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    editData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let params = {
            id: this.temp.id,
            sensorsTitle: this.temp.sensorsTitle,
            title: this.temp.title,
            icon: this.temp.icon,
            jumpType: this.temp.jumpType,
            needLogin: this.temp.needLogin,
            saveAndRelease: this.temp.saveAndRelease,
            sortIndex: this.temp.sortIndex
          }
          if (this.temp.jumpType == 1) {
            params.pageUrl = this.temp.pageUrl
          }else if(this.temp.jumpType == 2) {
            params.jumpUrl = this.temp.jumpUrl
          }else if(this.temp.jumpType == 3){
            params.serviceType = this.temp.serviceType
          }else if(this.temp.jumpType == 4){
            params.firm = this.temp.firm
          }
          systemTagSave(params).then((response) => {
            if (response.code == 0) {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
              this.dialogFormVisible = false
            } else {
              this.$message({
                message: "修改失败",
                type: 'error',
                showClose: true,
                duration: 1000
              })
            }
            this.getList()
          })
        }
      })
    },
    // 删除
    handleDelete(row) {
      const id = row.id
      this.$confirm('确认删除?', '提示', {}).then(() => {
        let query = {
          id: id
        }
        systemTagDelete(query).then(response => {
          if (response.code == 0) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              message: '删除失败',
              type: 'error',
              showClose: true,
              duration: 1000
            })
          }
          this.getList()
        })
      })
    },
    getBusinessTypeList () {
      businessTypeList().then(res => {
        if(res.code == 0) {
          this.firstCodeList = res.data
        }
      })
    },
    firstCodeChange(value) {
      this.temp.serviceType.secondCode = ''
      for(let i=0;i<this.firstCodeList.length;i++){
        if(this.firstCodeList[i].code == value) {
          this.secondCodeList = this.firstCodeList[i].children
        }
      }
    },
    pageUrlChange(){
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
.bannerSetting-container {
  padding: 20px;
}
</style>
