<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" @click="handleCreate">添加</el-button>
      <el-button v-waves class="filter-item" type="danger" @click="dialogOperationVisible = true">操作记录</el-button>
      <el-select  class="filter-item" style="width: 200px" v-model="firstCode" @change="firstCodeChange" clearable placeholder="请选择一级服务">
        <el-option v-for="(item,index) in firstCodeList" :key="item.code+index" :label="item.name" :value="item.code"> </el-option>
      </el-select>
      <el-select class="filter-item" style="width: 200px" v-model="listQuery.serviceCode" @change="secondCodeChange" clearable placeholder="请选择二级服务">
        <el-option v-for="(item,index) in secondCodeList" :key="item.code+index" :label="item.name" :value="item.code"> </el-option>
      </el-select>
    </div>

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

      <el-table-column label="一级类目" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.parentServiceName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="二级类目" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.serviceName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="名称" width="250px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注" width="250px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column label="值" align="center" width="300px">
        <template slot-scope="scope">
          <span>{{ scope.row.attrNames }}</span>
        </template>
      </el-table-column>

      <el-table-column label="类型" align="center" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.type | typeFilters }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="状态" width="120px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.shelf == true">{{ scope.row.shelf | releaseStatusFilters }}</el-tag>
          <el-tag type="danger" v-else>{{ scope.row.shelf | releaseStatusFilters }}</el-tag>
        </template>
      </el-table-column> -->
      
      <el-table-column :label="$t('table.actions')" align="center" min-width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button style="margin-left: 12px;" type="warning" size="small" @click="handleAdd(scope.row)" v-show="scope.row.type == 2 || scope.row.type == 3">添加值</el-button>
          <el-button style="margin-left: 12px;" type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button style="margin-left: 12px;" type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="120px" style="margin-left:50px;">

        <el-form-item label="一级业务：" prop="firstCode" v-show="dialogStatus == 'create'">
          <el-select  style="width: 300px" v-model="temp.firstCode" @change="createCodeChange" clearable placeholder="请选择一级业务">
          <el-option v-for="(item,index) in firstCodeList" :key="item.code+index" :label="item.name" :value="item.code"> </el-option>
        </el-select>
        </el-form-item>

        <el-form-item  label="二级业务：" prop="serviceCode" v-show="dialogStatus == 'create'">
          <el-select style="width: 300px" v-model="temp.serviceCode" @change="serviceCodeChange" clearable placeholder="请选择二级业务">
            <el-option v-for="(item,index) in secondCodeList" :key="item.code+index" :label="item.name" :value="item.code"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="扩展名称：" prop="name">
          <el-input style="width: 300px" v-model="temp.name" placeholder="请输入扩展名称" />
        </el-form-item>

        <el-form-item label="备注：" prop="remark">
          <el-input style="width: 300px" v-model="temp.remark" placeholder="请输入备注" />
        </el-form-item>

        <el-form-item label="类型：" prop="type">
          <el-select  style="width: 200px" v-model="temp.type"  clearable placeholder="请选择类型">
            <el-option v-for="(item,index) in typeList" :key="item.name+index" :label="item.name" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 添加字段 -->
    <el-dialog title="添加值" :visible.sync="dialogFormVisibleAdd">
      <el-form ref="dataForm" :rules="rules1" :model="tempAdd" label-position="right" label-width="120px" style="margin-left:50px;">

        <el-form-item label="值：" prop="name">
          <el-input style="width: 300px" v-model="tempAdd.name" placeholder="请输入标题" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="add">确定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="Edit" :visible.sync="dialogFormVisibleEdit">
      <el-form ref="dataForm" :rules="rules2" :model="tempEdit" label-position="right" label-width="120px" style="margin-left:50px;">

        <el-form-item label="名称：" prop="name">
          <el-input style="width: 300px" v-model="tempEdit.name" placeholder="请输入标题" />
        </el-form-item>

        <el-form-item label="备注：" prop="remark">
          <el-input style="width: 300px" v-model="tempEdit.remark" placeholder="请输入备注" />
        </el-form-item>

        <!-- <el-form-item label="类型：" prop="type">
          <el-select  style="width: 200px" v-model="tempEdit.type"  clearable placeholder="请选择类型">
            <el-option v-for="(item,index) in typeList" :key="item.name+index" :label="item.name" :value="item.value"> </el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item label="值："  v-show="tempEdit.type == 2 || tempEdit.type == 3">
          <div style="display:flex;">
            <div class="inputList">
              <div v-for="(item,index) in tempEdit.voList" :key="index" style="display: flex;">
                <el-input style="width: 300px;margin-bottom: 10px;" v-model.trim="item.name" placeholder="请输入值" />
                <el-button type="danger" style="height: 36px;margin-left:10px;" @click="deleteExtend(item,index)">删除</el-button>
              </div>
            </div>
          </div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="edit">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="操作记录" :visible.sync="dialogOperationVisible">
      <el-table
      :data="listOperation"
      border
      fit
      highlight-current-row
      style="width: 100%;">
        <el-table-column label="ID" prop="id" align="center" width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="用户" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.operate }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作Id" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.operateId }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作条目" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作时间" min-width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        
      </el-table>
      <pagination v-show="operaTotal>0" :total="operaTotal" :page.sync="listOperaQuery.pageNum" :limit.sync="listOperaQuery.pageSize" @pagination="getOperaList" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogOperationVisible = false">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { extendPage, extendSave, extendDelete, extendAttrSave, extendDetail, extendEdit, operateList } from '@/api/extend'
import { serviceTypeList } from '@/api/service'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Upload from '@/components/Upload/uploadImgTemp'
export default {
  name: 'hotWordsSetting',
  components: { Pagination,Upload },
  directives: { waves },
  filters: {
    typeFilters (val) {
      if(val  == 1){
        return val = '文本'
      }else if(val == 2){
        return val = '单选'
      }else if(val == 3){
        return val = '复选'
      }
    },
  },
  data() {
    return {
      list: null,
      listOperation: null,
      total: 0,
      operaTotal: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        serviceCode: ''
      },
      firstCode: '',
      listOperaQuery: {
        pageNum: 1,
        type: 3,
        pageSize: 10
      },
      id: '',
      extendCode: '',
      typeList: [
        {
          name: '文本',
          value: 1,
        },
        {
          name: '单选',
          value: 2,
        }
      ],
      temp: {
        firstCode: '',
        serviceCode: '',
        type: '',
        remark: '',
        name: ''
      },
      tempAdd: {
        name: '',
        extendCode: ''
      },
      tempEdit: {
        type: '',
        remark: '',
        name: '',
        voList: [
          {
            value: ''
          }
        ]
      },
      uploadImg: {
        imgUrl: '',
        fileId: ''
      },
      firstCodeList: [],
      secondCodeList: [],
      dialogFormVisible: false,
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogOperationVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        serviceCode:  [{ required: true, message: '类目必选'}],
        name: [{ required: true, message: '扩展名称必填', trigger: 'blur' }],
        type: [{ required: true, message: '类型必选' }]
      },
      rules1: {
        name: [{ required: true, message: '值名称必填', trigger: 'blur' }]
      },
      rules2: {
        name: [{ required: true, message: '值名称必填', trigger: 'blur' }],
        type: [{ required: true, message: '类型必选' }],
      }
    }
  },
  created() {
    this.getList()
    this.getBusinessTypeList()
  },
  methods: {
    /**
     * 获取热门词条列表
     * @function getList
     */
    getList() {
      this.listLoading = true
      extendPage(this.listQuery).then(response => {
        // console.log(response)
        if(response.code == 0){
          console.log(response)
          this.list = response.data.items
          this.total = response.data.total
          this.getOperaList()
        }
        this.listLoading = false
      })
    },
    getOperaList() {
      operateList(this.listOperaQuery).then(response => {
        // console.log(response)
        if(response.code == 0){
          console.log(response)
          this.listOperation = response.data.items
          this.operaTotal = response.data.total
        }
      })
    },
    /**
     * 词条上架
     * @function handleUp
     */
    handleUp(row) {
      const id = row.id
      this.$confirm('确认上架?', '提示', {}).then(() => {
        let query = {
          id: id,
        }
        qualificateUp(query).then(response => {
          console.log(response)
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
    /**
     * 词条下架
     * @function handleDown
     */
    handleDown(row) {
      const id = row.id
      this.$confirm('确认下架?', '提示', {}).then(() => {
        let query = {
          id: id,
        }
        qualificateDown(query).then(response => {
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
        firstCode: '',
        serviceCode: '',
        name: '',
        type: 1,
        remark: ''
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
    handleAdd(row){
      this.extendCode = row.code
      console.log( row.code)
      this.dialogFormVisibleAdd = true
      this.tempAdd = {
        name: '',
        extendCode: row.code
      }
      console.log(this.tempAdd)
    },
    handleEdit(row){
      this.id = row.id
      let data = {
        id: row.id
      }
      this.tempEdit.id = row.id
      extendDetail(data).then(response => {
        console.log(response)
        if(response.code == 0){
          this.dialogFormVisibleEdit = true
          this.tempEdit.name = response.data.name
          this.tempEdit.remark = response.data.remark
          this.tempEdit.type = response.data.type
          this.tempEdit.voList = response.data.voList
        }
      })
    },
    // 词条删除
    handleDelete(row) {
      const id = row.id
      this.$confirm('确认删除？', '提示', {}).then(() => {
        let query = {
          id: id
        }
        extendDelete(query).then(response => {
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
    // 新建词条
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.temp)
          extendSave(this.temp).then((response) => {
            if (response.code == 0) {
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success',
                duration: 2000
              })
              this.dialogFormVisible = false
            }
            console.log(response)
            this.getList()
          })
        }
      })
    },
    add() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.tempAdd)
          extendAttrSave(this.tempAdd).then((response) => {
            if (response.code == 0) {
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success',
                duration: 2000
              })
              this.dialogFormVisibleAdd = false
            }
            console.log(response)
            this.getList()
          })
        }
      })
    },
    edit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.tempEdit)
          console.log(this.tempEdit.voList)
          for (let i = 0; i < this.tempEdit.voList.length; i++) {
            if(this.tempEdit.voList[i].name == ''){
              this.$message({
                message: '值不能为空',
                type: 'error',
                showClose: true,
                duration: 1000
              })
              return
            }
          }
          extendEdit(this.tempEdit).then((response) => {
            if (response.code == 0) {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
              this.dialogFormVisibleEdit = false
            }
            console.log(response)
            this.getList()
          })
        }
      })
    },
    addValue(){
      let json = {
        value: ''
      }
      this.valueList.push(json)
    },
    deleteExtend(item,index){
      if(this.tempEdit.voList.length > 1){
        this.tempEdit.voList.splice(index,1)
      }else{
        this.$message({
          message: '至少添加一个值',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
    },
    getBusinessTypeList () {
      let data = {
        parentCode: ''
      }
      serviceTypeList().then(res => {
        if(res.code == 0) {
          this.firstCodeList = res.data
          console.log(res)
        }
      })
    },
    firstCodeChange(value) {
      let data = {
        parentCode: this.firstCode
      }
      this.listQuery.serviceCode = ''
      console.log(data)
      serviceTypeList(data).then(res => {
        if(res.code == 0) {
          this.secondCodeList = res.data
          console.log(res)
        }
      })
    },
    secondCodeChange(value){
      let data = {
        serviceCode: this.listQuery.serviceCode
      }
      console.log(data)
      if(this.listQuery.serviceCode != ''){
        extendPage(this.listQuery).then(response => {
          if(response.code == 0){
            console.log(response)
            this.list = response.data.items
            this.total = response.data.total
          }
          this.listLoading = false
        })
      }else {
        this.list = []
        this.listLoading = false
      }
    },
    createCodeChange(value) {
      this.temp.serviceCode = ''
      this.secondCodeList = []
      let data = {
        parentCode: this.temp.firstCode
      }
      console.log(data)
      serviceTypeList(data).then(res => {
        if(res.code == 0) {
          this.showCreateSend = true
          this.secondCodeList = res.data
          console.log(res)
        }
      })
    },
    serviceCodeChange(value){
      console.log(value)
      this.temp.serviceCode = value
      console.log(this.temp)
    }
  }
}
</script>
