<template>
  <div class="mainBusinesss">
    <div class="business" v-show="!noData">
      <div class="business_title">
        <h4>主营业务管理</h4>
        <span class="addBusiness" @click="handleFetchPv">+添加新业务</span>
      </div>
      <div class="business_content">
        <el-table
          v-loading="listLoading"
          :data="listData"
          :span-method="objectSpanMethod"
          border
          fit
          style="width: 100%;">
          <el-table-column type="index" label="序号" prop="id" align="center" width="80PX">
          </el-table-column>
          
          <el-table-column label="主业务" width="250PX" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.firstName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="子业务" width="250PX" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.secondName }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column label="子子业务" width="250PX" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.thirdName }}</span>
            </template>
          </el-table-column> -->

          <!-- <el-table-column label="介绍类型" width="300PX" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.introduceType | typeChange }}</span>
            </template>
          </el-table-column> -->

          <el-table-column label="状态" width="120PX" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.shelf == 1" type="success">{{ scope.row.shelf | statusChange }}</el-tag>
              <el-tag v-if="scope.row.shelf == 0" type="danger">{{ scope.row.shelf | statusChange }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" min-width="200PX" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button v-show="scope.row.shelf == false" style="margin-left: 12PX;color: #f56c6c;" type="text" size="small" @click="changeShelfUp(scope.row)">上架</el-button>
              <el-button v-show="scope.row.shelf == true" style="margin-left: 12PX;color: #5AB3A4;" type="text" size="small" @click="changeShelfDown(scope.row)">下架</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!-- <pagination :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" /> -->
        
        <!-- 添加 -->
        <el-dialog :visible.sync="dialogPvVisible" title="添加业务">
          <div class="choseBusiness">
            <div class="title" style="font-size: 14PX;color: rgba(0,0,0,0.60);">选择业务</div>
            <div class="selectLine">
              <el-select style="width: 33%" @change="getType1" v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  >
                </el-option>
              </el-select>

              <el-select style="width: 33%" @change="getType2" v-model="value1" placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>

              <!-- <el-select v-show="showOptions3" style="width: 33%" v-model="value2" placeholder="请选择">
                <el-option
                  v-for="item in options3"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select> -->
            </div>
          </div>
          <span slot="footer" class="dialog-footer" style="display: flex;justify-content: space-between;align-items: center;">
            <div class="newBtn">
              <span>没有找到相关业务？</span>
              <!-- <span id="newService" @click="goNewService">申请新业务 ></span> -->
            </div>
            <div>
              <el-button @click="dialogPvVisible = false">取消</el-button>
              <el-button type="success" @click="create()">保存</el-button>
            </div>
          </span>
        </el-dialog>
      </div>
    </div>
    <div class="business" v-show="noData">
      <div class="business_title">
        <h4>业务管理</h4>
      </div>
      <div class="business_title" style="justify-content: flex-start;margin-top: 16PX;">
        <h4 style="font-size: 14PX;">新增业务</h4>
        <span style="font-size: 12PX;color: rgba(0,0,0,0.38);margin-left:16PX">(最多添加3个主营业务)</span>
      </div>
      <div class="business_content_noData">
        <div class="case">
          <div class="title">
            <span>主业务</span>
            <span v-show="showTwo">子业务</span>
            <span v-show="showThree">子子业务</span>
          </div>
          <el-cascader-panel v-model="casList" :props="props" :options="options" @change="casa" @expand-change="chose"></el-cascader-panel>
        </div>
        <span slot="footer" class="dialog-footer" style="display: flex;justify-content: flex-start;width:100%;margin-top: 16PX;">
          <el-button style="width: 120PX;" type="primary" @click="refuse">添加</el-button>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import service from '@/api/serviceManager'
import qs from 'qs'
import Pagination from '@/components/Pagination'
import { parse } from 'path'
import { get } from 'http'
export default {
  name: 'mainBusinesss',
  components: { Pagination },
  filters: {
    typeChange(val){
      if(val == 'text'){
        return val = '无'
      }else if(val == 'image'){
        return val = '自定义图片'
      }
    },
    statusChange(val){
      if(val == true){
        return val = '已上架'
      }else if(val == false){
        return val = '已下架'
      }
    }
  },
  data(){
    return {
      noData: false,
      id: undefined,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
      },
      total: 0,
      fileId: '',
      fileIdDetail: '',
      list: [],
      listData: [],
      listLoading: false,
      dialogPvVisible: false,
      dialogUpdate: false,
      options1: [],
      options2: [],
      options3: [],
      options4: [],
      options5: [],
      options6: [],
      showOptions3: false,
      showOptions4: false,
      value: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      radio: '1',
      checked: false,
      introduceContent: '',
      hideIntroduceContent: true,
      detailTitle: '',
      createData: {
        serviceCode: '',
        introduceContent: '',
        introduceType: ''
      },
      introduceImg: '',
      introduceImgUpload: false,
      detailImgUpload: false,
      detailImg: '',
      id: '',
      disabled: false,
      updeteData: {
        code: '',
        id: '',
        introduceContent: {},
        introduceType: ''
      },
      //批量上架数据
      props: {
        multiple: true,
        value: 'code',
        label: 'name',
        children: 'childs'
      },
      casList: [],
      oneList: [],
      codeList: [],
      showTwo: false,
      showThree: false,
      options: [],
    }
  },
  created(){
    if(this.$route.query.id){
      this.id = this.$route.query.id
    }else {
      return
    }
    let params = {
      companyId: this.id
    }
    this.getList(params)
    this.getTypes()
    this.getTree(params)
    this.createData.companyId = this.id
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if(row.index % row.count === 0){
          return {
            rowspan: row.count,
            colspan: 1
          };
        }else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else if(columnIndex === 2){
        if(row.childIndex % row.childCount === 0){
          return {
            rowspan: row.childCount,
            colspan: 1
          };
        }else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    goNewService(){
      this.$router.push({path: '/newBusiness'})
    },
    //上传图片
    upload (files) {
      const loading = this.$loading({
        lock: true,
        text: '图片上传中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let formData = new FormData()
      formData.append('files', files.file)
      api.fileupload(formData).then(res => {
        if (res.code == 0) {
          loading.close()
          console.log(res)
          this.fileId =  res.data[0].fileId
          let reader = new FileReader();
          let file = files.file
          let imgUrlBase64
          if(file){
            imgUrlBase64 = reader.readAsDataURL(file);
            reader.onload = (e) => {
              this.introduceImg = reader.result
              this.introduceImgUpload = true
            }
          }
        }
      }).catch(err => {
        this.$message.error('上传失败，请重新上传')
      })
    },
    uploadDetail(files) {
      const loading = this.$loading({
        lock: true,
        text: '图片上传中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let formData = new FormData()
      formData.append('files', files.file)
      api.fileupload(formData).then(res => {
        loading.close()
        if (res.code == 0) {
          console.log(res)
          this.fileIdDetail =  res.data[0].fileId
          let reader = new FileReader();
          let file = files.file
          let imgUrlBase64
          if(file){
            imgUrlBase64 = reader.readAsDataURL(file);
            reader.onload = (e) => {
              this.detailImg = reader.result
              this.detailImgUpload = true
            }
          }
        }
      }).catch(err => {
        this.$message.error('上传失败，请重新上传')
      })
    },
    getList(params){
      this.listData  = []
      api.serviceList(params).then(res => {
        console.log(res)
        if(res.code == 0){
          this.list = res.data
          if(!res.data || res.data.length == 0){
            this.noData = true
          }else{
            this.noData = false
          }
          // this.total = res.data.total
          for (let i=0;i<this.list.length;i++) {
            let num = 0
            let index = -1
            for(let a = 0; a<this.list[i].childs.length; a++){
              if(this.list[i].childs[a].childs && this.list[i].childs[a].childs.length > 0){
                num += this.list[i].childs[a].childs.length
              }else {
                num += 1
              }
            }
            console.log(num)
            for (let j=0;j<this.list[i].childs.length;j++) {
              if (!this.list[i].childs[j].childs || this.list[i].childs[j].childs.length == 0 ) {
                this.list[i].childs[j].childs = [
                  {
                    name: '无',
                    id: this.list[i].childs[j].id,
                    shelf: this.list[i].childs[j].shelf
                  }
                ]
              }
              for (let k=0;k<this.list[i].childs[j].childs.length;k++) {
                index += 1
                this.listData.push({
                  id: this.list[i].childs[j].childs[k].id,
                  shelf: this.list[i].childs[j].childs[k].shelf,
                  firstName: this.list[i].name,
                  index: index,
                  count: num,
                  childIndex: k,
                  childCount: this.list[i].childs[j].childs.length,
                  secondName: this.list[i].childs[j].name,
                  thirdName: this.list[i].childs[j].childs[k].name,
                })
              }
            }
          }
          console.log(this.listData)
        }
      })
    },
    getTree(){
      api.serviceTree().then(res => {
        // console.log(res)
        if(res.code == 0){
          this.options = res.data
        }
      })
    },
    //创建类型
    getTypes(){
      let data = {
        parentCode: ''
      }
      api.serviceType().then(res => {
        // console.log(res)
        if(res.code == 0){
          this.options1 = res.data
        }
      })
    },
    getType1(){
      this.value1 = ''
      this.value2 = ''
      this.options3 = []
      this.showOptions3 = false
      let data = {
        parentCode: this.value
      }
      api.serviceType(data).then(res => {
        // console.log(res)
        if(res.code == 0){
          this.options2 = res.data
        }
      })
    },
    getType2(){
      let data = {
        parentCode: this.value1
      }
      api.serviceType(data).then(res => {
        // console.log(res)
        if(res.code == 0){
          if(res.data.length > 0){
            this.options3 = res.data
            this.showOptions3 = true
          }else{
            this.options3 = []
            this.showOptions3 = false
          }
          
        }
      })
    },
    getType3(){
      let data = {
        parentCode: this.value3
      }
      api.serviceType(data).then(res => {
        // console.log(res)
        if(res.code == 0){
          this.options5 = res.data
        }
      })
    },
    getType4(){
      let data = {
        parentCode: this.value4
      }
      api.serviceType(data).then(res => {
        // console.log(res)
        if(res.code == 0){
          if(res.data.length > 0){
            this.options6 = res.data
            this.showOptions4 = true
          }else{
            this.options6 = []
            this.showOptions4 = false
          }
        }
      })
    },
    create(){
      if(this.radio == '1'){
        this.createData.introduceType = 'text'
        if(this.value != '' &&  this.value1 != ''){
          if(this.showOptions3 == true){
            if(this.value2 != ''){
              this.createData.serviceCode = this.value2
              this.createData.introduceContent = ''
              this.submit(this.createData)
            }else{
              this.createData.serviceCode = this.value1
              this.createData.introduceContent = ''
              this.submit(this.createData)
            }
          }else{
            this.createData.serviceCode = this.value1
            this.submit(this.createData)
          }
        }else{
          this.$message({
            message: '请填写数据后保存',
            type: 'warning',
            showClose: true,
            duration: 1000
          })
        }
      }else if(this.radio == '2'){
        this.createData.introduceType = 'image'
        if(this.checked == false){
          if(this.value != '' &&  this.fileId != '' && this.value1 != ''){
            if(this.showOptions3 == true){
              if(this.value2 != ''){
                this.createData.serviceCode = this.value2
                let introduceContent = {
                  introduceImg: this.fileId,
                  detailJump: false
                }
                this.createData.introduceContent = JSON.stringify(introduceContent)
                this.submit(this.createData)
              }else{
                this.$message({
                  message: '请填写数据后保存',
                  type: 'warning',
                  showClose: true,
                  duration: 1000
                })
              }
            }else{
              this.createData.serviceCode = this.value1
              let introduceContent = {
                introduceImg: this.fileId,
                detailJump: false
              }
              this.createData.introduceContent = JSON.stringify(introduceContent)
              this.submit(this.createData)
            }
          }else{
            this.$message({
              message: '请填写数据后保存',
              type: 'warning',
              showClose: true,
              duration: 1000
            })
          }
        }else {
          if(this.value != '' &&  this.fileId != '' && this.value1 != '' && this.fileIdDetail != ''){
            if(this.showOptions3 == true){
              if(this.value2 != ''){
                this.createData.serviceCode = this.value2
                let introduceContent = {
                  introduceImg: this.fileId,
                  detailJump: true,
                  detailTitle: this.detailTitle,
                  detailImg: this.fileIdDetail
                }
                this.createData.introduceContent = JSON.stringify(introduceContent)
                this.submit(this.createData)
              }else{
                this.$message({
                  message: '请填写数据后保存',
                  type: 'warning',
                  showClose: true,
                  duration: 1000
                })
              }
            }else{
              this.createData.serviceCode = this.value1
              let introduceContent = {
                introduceImg: this.fileId,
                detailJump: true,
                detailTitle: this.detailTitle,
                detailImg: this.fileIdDetail
              }
              this.createData.introduceContent = JSON.stringify(introduceContent)
              this.submit(this.createData)
            }
          }else{
            this.$message({
              message: '请填写数据后保存',
              type: 'warning',
              showClose: true,
              duration: 1000
            })
          }
        }
      }
    },
    submit(data){
      api.serviceSave(data).then(res =>{
        console.log(res)
        if(res.code == 0){
          this.$message({
            message: '保存成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          let params = {
            companyId: this.id
          }
          this.getList(params)
          this.dialogPvVisible = false
        }else{
          this.$message({
            message: '保存失败',
            type: 'error',
            showClose: true,
            duration: 1000
          })
          let params = {
            companyId: this.id
          }
          this.getList(params)
          this.dialogPvVisible = false
        }
      })
    },
    //调起添加页面
    handleFetchPv(){
      this.dialogPvVisible = true
      //重新赋值
      this.resetForm()
    },
    //重置表单
    resetForm(){
      this.value = ''
      this.value1 = ''
      this.value3 = ''
      this.showOptions3 = false
      this.options3 = []
      this.options5 = []
      this.value4 = ''
      this.options6 = []
      this.showOptions4 = false
      this.value5 = ''
      this.radio = '1'
      this.checked = false
      this.introduceContent = ''
      this.introduceImg = ''
      this.introduceImgUpload = false
      this.detailTitle = ''
      this.detailImg = ''
      this.fileId = ''
      this.fileIdDetail = ''
      this.detailImgUpload = false
      this.introduceContent = ''
    },
    //调起编辑页面
    handleUpdate(row){
      this.resetForm()
      this.dialogUpdate = true
      this.id = row.id
      this.disabled = true
      console.log(row)

      //获取三个下拉框里面的数据
      this.value3 = row.parentCodes[0]
      let data = {
        parentCode: this.value3
      }
      api.serviceType(data).then(res => {
        if(res.code == 0){
          this.options5 = res.data
        }
      })
      if(row.parentCodes.length > 1){
        this.value4 = row.parentCodes[1]
        this.value5 = row.code
        this.showOptions4 = true
        let data = {
          parentCode: this.value4
        }
        api.serviceType(data).then(res => {
          if(res.code == 0){
            this.options6 = res.data
          }
        })
      }else{
        this.value4 = row.code
      }

      //单选框复选框赋值
      if(row.introduceType == 'text'){
        this.radio = '1'
        this.introduceContent = row.introduceContent
        this.checked = false
      }else{
        this.radio = '2'
        this.introduceContent = JSON.parse(row.introduceContent)
        this.introduceImg = this.introduceContent.introduceImg
        this.introduceImgUpload = true
        // console.log(this.introduceImg)
        if(this.introduceContent.detailJump == true){
          this.checked = true
          this.detailTitle = this.introduceContent.detailTitle
          this.detailImg = this.introduceContent.detailImg
          this.detailImgUpload = true
        }else{
          this.detailTitle = ''
          this.detailImg = ''
          this.detailImgUpload = false
          this.checked = false
        }
      }
    },
    //公司业务上架
    changeShelfUp(row){
      console.log(row)
      // this.$confirm('确认上架该业务?', '提示', {}).then(() => {
        let data = {
          id: row.id,
          shelf: true,
          companyId: this.id
        }
        data = qs.stringify(data)
        console.log(data)
        api.serviceChangeShelf(data).then(res => {
          console.log(res)
          if(res.code == 0){
            this.$message({
              message: '上架成功',
              type: 'success',
              showClose: true,
              duration: 1000
            })
            let params = {
              companyId: this.id
            }
            this.getList(params)
          }else{
            this.$message({
              message: '上架失败',
              type: 'success',
              showClose: true,
              duration: 1000
            })
            let params = {
              companyId: this.id
            }
            this.getList(params)
          }
        })
      // })
    },
    //公司业务下架
    changeShelfDown(row){
      console.log(row)
      this.$confirm('业务下架后，关联服务将同时被下架，确认下架？', '提示', {}).then(() => {
        let data = {
          id: row.id,
          shelf: false,
          companyId: this.id
        }
        data = qs.stringify(data)
        console.log(data)
        api.serviceChangeShelf(data).then(res => {
          console.log(res)
          if(res.code == 0){
            this.$message({
              message: '下架成功',
              type: 'success',
              showClose: true,
              duration: 1000
            })
            let params = {
              companyId: this.id
            }
            this.getList(params)
          }else{
            this.$message({
              message: '下架失败',
              type: 'success',
              showClose: true,
              duration: 1000
            })
            let params = {
              companyId: this.id
            }
            this.getList(params)
          }
        })
      })
    },
    serviceDelete(row){
      let data = {
        id: row.id,
        companyId: this.id
      }
      data = qs.stringify(data)
      this.$confirm('确认删除该业务?', '提示', {}).then(() => {
        api.serviceDelete(data).then(res => {
          if(res.code == 0){
            this.$message({
              message: '删除成功',
              type: 'success',
              showClose: true,
              duration: 1000
            })
            let params = {
              companyId: this.id
            }
            this.getList(params)
          }else{
            this.$message({
              message: '删除失败',
              type: 'error',
              showClose: true,
              duration: 1000
            })
            let params = {
              companyId: this.id
            }
            this.getList(params)
          }
        })
      })
    },
    casa(e){
      // console.log(e)
      console.log(e)
      let oneList = []
      let codeList = []
      for (let i = 0; i < this.casList.length; i++) {
        codeList.push(this.casList[i][this.casList[i].length -1])
        if(oneList.indexOf(this.casList[i][0]) == -1){
          oneList.push(this.casList[i][0])
          this.oneList = oneList
        }
      }
      this.codeList = codeList
      if(this.oneList.length > 3){
        this.$message({
          message: '一级业务最多添加三个',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
    },
    chose(e){
      if(e.length == 1){
        this.showTwo = true
        this.showThree = false
      }else if(e.length == 2){
        this.showThree = true
      }
    },
    refuse(){
      if(this.oneList.length > 3){
        this.$message({
          message: '一级业务最多添加三个',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      let data = {
        codes: this.codeList,
        companyId: this.id
      }
      console.log(data)
      // data = qs.stringify(data)
      api.serviceBulkAdd(data).then(res => {
        console.log(res)
        if(res.code == 0){
          this.$message({
            message: '添加成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          let params = {
            companyId: this.id
          }
          this.getList(params)
          this.casList = []
        }
      })
    }
  }
}
</script>
<style lang="scss">
.el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color: #FF7F4A;
}
.el-pagination.is-background .el-pager li:not(.disabled).active:hover{
  color: #ffffff;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover{
  color: #FF7F4A;
}
.el-button--success{
  background: #5AB3A4;
  border-color: #5AB3A4;
}
.el-dialog{
  width: 70%;
  min-width: 750PX;
}
.el-upload {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
.el-table {
  .el-table__header {
    tr {
      background: #E0E0E0;
      th {
        background: #E0E0E0;
      }
    }
  }
  thead {
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: rgba(0,0,0,0.87);
    text-align: center;
    line-height: 20px;
  }
}
.mainBusinesss {
  // width: 100vw;
  min-height: 100vh;
  padding-bottom: 20PX;
  .business{
    width: 100%;
    min-width: 1040PX;
    // height: 199PX;
    background: #ffffff;
    box-shadow: 0 4PX 8PX 0 rgba(0,0,0,0.04);
    padding-bottom: 40PX;
    padding-top: 24PX;
    margin-bottom: 16PX;
    .business_title{
      width: 93.84%;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      h4{
        font-size: 16PX;
        color: rgba(0,0,0,0.87);
      }
      .addBusiness{
        display: flex;
        width: 120PX;
        height: 36PX;
        align-items: center;
        justify-content: center;
        background: #5AB3A4;
        border-radius: 4PX;
        font-size: 15PX;
        color: #FFFFFF;
        cursor: pointer;
      }
    }
    .business_content{
      width: 93.84%;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      align-items: center;
      // justify-content: space-between;
      flex-flow: column;
      margin-top: 24PX;
      .choseBusiness{
        .title{
          margin-bottom: 12PX;
        }
        .selectLine{
          width: 100%;
          display: flex;
          align-items: center;
          // justify-content: flex-start;
          margin-bottom: 16PX;
          .el-select{
            margin-right: 16PX;
          }
        }
        .describeContent{
          width: 100%;
          display: flex;
          align-items: flex-start;
          .describe{
            width: 50%;
            border-right: 1PX solid rgba(0,0,0,0.08);
            .choseType{
              display: flex;
              align-items: center;
            }
            .textDescribe{
              margin-top: 16PX;
              width: 100%;
              .introduceInput{
                width: 90%;
                background: #FAFAFA;
                border-radius: 4PX;
                outline: none;
                display: block;
                border: none;
                height: 158PX;
                padding: 16PX;
                font-size: 14PX;
                color: #000000;
                line-height: 24PX;
                resize:none;
              }
              .default{
                font-size: 14PX;
                color: #FF7F4A;
                display: block;
                margin-left: 16PX;
                margin-top: 8PX;
                cursor: pointer;
              }
            }
            .imgDesrcibe{
              width: 90%;
              margin-right: auto;
              background: #FAFAFA;
              border-radius: 4PX;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-flow: column;
              height: 232PX;
              margin-top: 24PX;
              font-size: 12PX;
              color: rgba(0,0,0,0.26);
              line-height: 18PX;
              cursor: pointer;
              .introduceImg{
                display: block;
                height: 100%;
                width: 100%;
                // background: #FAFAFA;
                border-radius: 4PX;
              }
            }
          }
          .details_img{
            width: 50%;
            .addImg{
              width: 90%;
              margin-left: 30PX;
              background: #FAFAFA;
              border-radius: 4PX;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-flow: column;
              height: 220PX;
              margin-top: 16PX;
              font-size: 12PX;
              color: rgba(0,0,0,0.26);
              line-height: 18PX;
              cursor: pointer;
              .detailImg{
                display: block;
                height: 100%;
                width: 100%;
                // background: #FAFAFA;
                border-radius: 4PX;
              }
            }
          }
        }  
      }
      .newBtn{
        display: flex;
        align-items: center;
        font-family: PingFangSC-Regular;
        font-size: 12PX;
        color: rgba(0,0,0,0.60);
        #newService{
          background: #FF7F4A;
          border-radius: 14PX;
          width: 98PX;
          text-align: center;
          font-family: PingFangSC-Regular;
          font-size: 12PX;
          color: #FFFFFF;
          height: 24PX;
          line-height: 24PX;
          cursor: pointer;
          margin-left: 8PX;
        }
      }
    }
    .business_content_noData{
      width: 93.84%;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      align-items: flex-start;
      // justify-content: space-between;
      flex-flow: column;
      margin-top: 24PX;
      .case{
        width: 100%;
        display: flex;
        flex-flow: column;
        align-items: center;
        .title{
          display: flex;
          align-items: center;
          width: 100%;
          justify-content: flex-start;
          span{
            display: block;
            width: 29.4%;
            // max-width: 298PX;
            margin-right: 40PX;
            height: 40PX;
            line-height: 40PX;
            text-align: center;
            background: linear-gradient(135deg, #FF7F4A 0%, #FB5332 100%);
            font-size: 14PX;
            color: #ffffff;
          }
        }
        .el-cascader-panel.is-bordered{
          width: 100%;
          display: flex;
          justify-content: flex-start;
          .el-cascader-menu{
            width: 29.4%;
            // max-width: 298PX;
            margin-right: 40PX;
          }
          .el-cascader-menu__wrap{
            height: 400PX;
            border-bottom: solid 1PX #E4E7ED;
            border-left: solid 1PX #E4E7ED;
          }
        }
        .el-cascader-panel.is-bordered{
          border: none;
          .el-cascader-menu__list{
            width: 100%;
          }
          .el-cascader-menu:last-child{
            border-right: solid 1PX #E4E7ED;
          }
        }
      }
    }
  }
}
</style>
