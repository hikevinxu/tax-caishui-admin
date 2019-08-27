<template>
  <div class="bannerSetting-container">
    <div class="filter-container">
      <el-input style="width: 250px;" v-model="listQuery.name" placeholder="请输入公司名字" />
      <!-- <el-select v-model="listQuery.status" placeholder="状态" style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in statusList" :key="item+index" :label="item.name" :value="item.id"/>
      </el-select> -->
      <el-date-picker
        v-model="value3"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="timeChose">
      </el-date-picker>
      <el-button v-waves class="filter-item" type="primary" @click="getList">筛选</el-button>
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

      <el-table-column label="企业名称" prop="id" align="center" width="280px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="入录时间" align="center" width="280px">
        <template slot-scope="scope">
          <span>{{ scope.row.handleTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="120px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1">{{ scope.row.status | releaseStatusFilters }}</el-tag>
          <el-tag type="danger" v-else>{{ scope.row.status | releaseStatusFilters }}</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column :label="$t('table.actions')" align="center" min-width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="small">编辑</el-button> -->
          <el-button type="primary" size="small" @click="goEdit(scope.row)">编辑</el-button>
          <el-button style="margin-left: 10px;" type="success" size="small" @click="handleUp(scope.row)" v-if="scope.row.shelf == false">上架</el-button>
          <el-button style="margin-left: 10px;" type="warning" size="small" @click="handleDown(scope.row)" v-if="scope.row.shelf == true">下架</el-button>
          <!-- <el-button style="margin-left: 10px;" type="danger" size="small" @click="handleDelete(scope.row)" v-if="scope.row.shelf == false">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog width="800px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="120px" style="margin-left:50px;">

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus == 'create' ? createData() : editData()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { claimList, claimInfo, claimCheck, claimSave, claimUpdate } from '@/api/claim'
import { merchantApplyTypes } from '@/api/merchants'
import { businessTypeList } from '@/api/homePageSetting'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
// import Upload from '@/components/Upload/uploadImgTemp'
export default {
  name: 'participles',
  components: { Pagination },
  directives: { waves },
  filters: {
    releaseStatusFilters (val) {
      if(val  == 1){
        return val = '已上架'
      }else if(val == 0){
        return val = '已下架'
      }
    },
    typesFiters(val){
      if(val == 101){
        return val = "税务师事务所"
      }else if(val == 102){
        return val = "会计师事务所"
      }else if(val == 103){
        return val = "资产评估公司"
      }else if(val == 104){
        return val = "律师事务所"
      }else if(val == 105){
        return val = "知识产权代理公司"
      }else if(val == 106){
        return val = "劳务及人力资源公司"
      }else if(val == 107){
        return val = "融资服务公司"
      }else if(val == 108){
        return val = "代理记账公司"
      }else if(val == 109){
        return val = "财税培训机构"
      }else if(val == 110){
        return val = "刻章店"
      }else if(val == 111){
        return val = "税务筹划公司"
      }else if(val == 112){
        return val = "工程造价咨询公司"
      }else if(val == 113){
        return val = "离岸公司注册的公司"
      }
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: false,
      value3: '',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        startTime: '',
        dataSource: 102,
        endTime: '',
        // status: ''
      },
      types: [],
      statusList: [
        {name:'已上架',id: true},
        {name:'已下架',id: false}
      ],
      dialogStatus: '',
      dialogFormVisible: false,
      textMap: {
        update: '编辑',
        create: '新建'
      },
      rules: {},
      uploadImg: {
        fileId: '',
        imgUrl: ''
      },
      temp: {},
    }
  },
  created() {
    this.getList()
    this.getTypes()
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true
      claimList(this.listQuery).then(response => {
        if(response.code == 0){
          console.log(response)
          this.list = response.data.items
          this.total = response.data.total
        }
        this.listLoading = false
      })
    },
    getTypes(){
      merchantApplyTypes().then(res => {
        console.log(res)
        if(res.code == 0){
          this.types = res.data
        }
      })
    },
    timeChose(e){
      console.log(e)
      if(e !=null){
        this.listQuery.startTime = e[0]
        this.listQuery.endTime = e[1]
      }else {
        this.listQuery.startTime = ''
        this.listQuery.endTime = ''
      }
      console.log(this.listQuery)
      // this.getList()
    },
    // 上架
    handleUp(row) {
      const id = row.id
      this.$confirm('确认上架?', '提示', {}).then(() => {
        let query = {
          id: id
        }
        merchantUp(query).then(response => {
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
        merchantDown(query).then(response => {
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
        icon: '',
        serviceCode: '',
        name: ''
      }
      this.uploadImg.imgUrl = ''
      this.uploadImg.fileId = ''
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
          let serviceCode,
              name
          let params = {
            id: '',
            icon: this.uploadImg.fileId,
            serviceCode: serviceCode,
            name: this.temp.name,
            shelf: false
          }
          // console.log(params)
          serviceTagAdd(params).then((response) => {
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
      this.temp.icon = row.icon
      this.temp.serviceCode = row.serviceCode
      this.temp.name = row.name
      this.uploadImg.imgUrl = row.icon
      this.uploadImg.fileId = row.icon
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
            serviceCode: this.temp.serviceCode,
            name: this.temp.name,
            icon: this.uploadImg.fileId,
            shelf: false
          }
          console.log(params)
          serviceTagUpdate(params).then((response) => {
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
        serviceTagDelete(query).then(response => {
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
    firstCodeChange(value) {
      this.showThird = false
      if(this.serviceType.firstCode != ''){
        this.showSend = true
      }
      this.serviceType.secondCode = ''
      let data = {
        parentCode: this.serviceType.firstCode
      }
      businessTypeList(data).then(res => {
        if(res.code == 0) {
          this.secondCodeList = res.data
          console.log(res)
        }
      })
    },
    goEdit(row){
      this.$router.push({
          path: '/manually/createManually',
          query: {
            id: row.id
          }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container .filter-item{
  vertical-align: inherit;
  margin-bottom: 0;
}
.bannerSetting-container {
  padding: 20px;
}
</style>
