<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" @click="handleCreate">筛选</el-button>
      <el-select v-model="listQuery.status" placeholder="机构类型" @change="getList" style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in statusList" :key="item+index" :label="item.name" :value="item.id"/>
      </el-select>
      <el-select v-model="listQuery.status" placeholder="状态" @change="getList" style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in statusList" :key="item+index" :label="item.name" :value="item.id"/>
      </el-select>
      <el-date-picker
        v-model="listQuery.putTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
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

      <el-table-column label="机构名称" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.positionName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="机构类型" align="center">
        <template slot-scope="scope">
         <span>{{ scope.row.elementNum }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系人" align="center">
        <template slot-scope="scope">
         <span>{{ scope.row.relateType }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系电话" align="center">
        <template slot-scope="scope">
         <span>{{ scope.row.positionNo }}</span>
        </template>
      </el-table-column>

      <el-table-column label="发布状态" width="100px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.enableStatus == true">{{ scope.row.enableStatus  }}</el-tag>
          <el-tag type="danger" v-else>{{ scope.row.enableStatus }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="提交时间" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.positionNo }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="300px" class-name="small-padding fixed-width">
        <template slot-scope="">
          <el-button style="margin-left: 12px;" type="success" size="small" @click="dialogAuditVisible = true">查看</el-button>
          <el-button style="margin-left: 12px;" type="primary" size="small" @click="dialogAuditVisible = true">审核</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="temp.action === 'create' ? '添加' : temp.action === 'look' ? '详情' : '编辑'" width="800px" :visible.sync="dialogFormVisible">
      <el-form class="update" ref="dataForm" :model="temp" label-position="right" label-width="120px" style="width: 650px; margin-left:50px;">
        <el-form-item label="终端：" prop="type">
          <span>android</span>
        </el-form-item>

        <el-form-item label="新版本号：" prop="appVersion">
          <el-input :disabled="temp.action === 'look'" v-model="temp.appVersion"/>
        </el-form-item>

        <el-form-item label="更新内容：">
          <el-input :disabled="temp.action === 'look'" :autosize="{ minRows: 3, maxRows: 5}" v-model="temp.updateContent" type="textarea" placeholder="请输入更新内容"/>
        </el-form-item>

        <el-form-item label="下载地址：" prop="downloadUrl">
          <el-input :disabled="temp.action === 'look'" v-model="temp.downloadUrl"/>
        </el-form-item>

        <el-form-item label="最低强更版本：" prop="forceUpdateVersion">
          <el-input :disabled="temp.action === 'look'" v-model="temp.forceUpdateVersion"/>
        </el-form-item>

        <el-form-item label="备注：">
          <el-input :disabled="temp.action === 'look'" v-model="temp.remark"/>
        </el-form-item>

        <!-- <el-form-item label="更新渠道：">
          <el-checkbox-group :disabled="temp.action === 'look'" v-model="temp.channels">
            <el-checkbox v-for="(item, index) in phoneTypeList" :key="index" :label="item.phoneType" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="temp.action !== 'look'">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="temp.action === 'create' ? createData() : updateData()">提交</el-button>
      </div>
    </el-dialog>

    <!-- 审核弹框 -->
    <el-dialog :visible.sync="dialogAuditVisible" title="审核">
      <div class="basicInformation">
        <h4 class="title">基本信息</h4>
        <div class="line">
          <span class="label">机构名称：</span>
          <span>杭州税牛科技有限公司</span>
        </div>
        <div class="line">
          <span class="label">机构类型：</span>
          <span>杭州税牛科技有限公司</span>
        </div>
        <div class="line">
          <span class="label">登录手机号：</span>
          <span>杭州税牛科技有限公司</span>
        </div>
        <div class="line">
          <span class="label">机构logo：</span>
          <img src="" alt="" srcset="">
        </div>
        <div class="line">
          <span class="label">所在地区：</span>
          <span>杭州税牛科技有限公司</span>
        </div>
        <div class="line">
          <span class="label">地址定位：</span>
          <span>杭州税牛科技有限公司</span>
        </div>
        <div class="line">
          <span class="label">联系人：</span>
          <span>杭州税牛科技有限公司</span>
        </div>
        <div class="line">
          <span class="label">联系电话：</span>
          <span>杭州税牛科技有限公司</span>
        </div>
        <div class="line">
          <span class="label">QQ号：</span>
          <span>杭州税牛科技有限公司</span>
        </div>
        <div class="line">
          <span class="label">电子邮箱：</span>
          <span>杭州税牛科技有限公司</span>
        </div>
        <div class="line">
          <span class="label">介绍图：</span>
          <div class="imgList"></div>
        </div>
      </div>
      <div class="qualification">
        <h4 class="title">资质信息</h4>
        <div class="line">
          <span class="label">工商注册号：</span>
          <span>杭州税牛科技有限公司</span>
        </div>
        <div class="line">
          <span class="label">营业执照：</span>
          <img src="" alt="" srcset="">
        </div>
        <div class="line">
          <span class="label">法人手持身份证（正面）：</span>
          <img src="" alt="" srcset="">
        </div>
        <div class="line">
          <span class="label">其他资质证书：</span>
          <img src="" alt="" srcset="">
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAuditVisible = false">返回</el-button>
        <el-button type="primary" @click="dialogAuditVisible = false">通过</el-button>
        <el-button type="danger" @click="dialogRefuseVisible = true">拒绝</el-button>
      </span>
    </el-dialog>

    <!-- 拒绝弹框 -->
    <el-dialog :visible.sync="dialogRefuseVisible" title="拒绝">
      <el-form ref="dataForm1" :rules="rules1" :model="temp" label-position="right" label-width="120px">
        <el-form-item label="拒绝原因：" prop="failReason">
          <el-select @change="failChose" v-model="temp.failReason" placeholder="请选择原因"  style="width: 150px" class="filter-item">
            <el-option v-for="(item,index) in failReasonList" :key="item+index" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item v-show="showFailReason" label="添加原因：" prop="failReason">
          <el-input v-model="temp.failReasonText" placeholder="请输入拒绝原因" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRefuseVisible = false">返回</el-button>
        <el-button type="primary" @click="dialogRefuseVisible = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { advertPositionInfoList, advertPositionList } from '@/api/adManager'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'androidUpdate',
  components: { Pagination },
  directives: { waves },
  filters: {
    releaseStatusFilters (status) {}
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        putTime: ''
      },
      statusList: [
        {
          name: '全部',
          id: 0,
        },
        {
          name: '未上架',
          id: 1,
        },
        {
          name: '已上架',
          id: 2,
        },
      ],
      failReasonList: [
        {
          name: '机构已存在',
          id: 1
        },
        {
          name: '资质信息不符',
          id: 2
        },
        {
          name: '其他',
          id: -1
        }
      ],
      showFailReason: false,
      temp: {
        failReason: ''
      },
      dialogFormVisible: false,
      dialogAuditVisible: false,
      dialogRefuseVisible: false,
      rules: {},
      rules1: {
        failReason: [{ required: true, message: '拒绝原因必选'}]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true
      advertPositionList(this.listQuery).then(response => {
        if (response.code === 0) {
          console.log(response)
          this.list = response.data
          // this.total = response.data.total
          this.listLoading = false
        }
      })
    },
    failChose(){
      if(this.temp.failReason == -1){
        this.showFailReason = true
      }else{
        this.showFailReason = false
      }
    },
    //重置表单
    resetTemp() {
      this.temp = {
        action: '',
        deviceType: 'android',
        downloadUrl: '',
        forceUpdateVersion: '',
        remark: '',
        updateContent: '',
        appVersion: '',
        channels: []
      }
    },
    //唤起新建
    handleCreate() {
      this.resetTemp()
      this.temp.action = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    //新建
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          releaseSave(this.temp).then((response) => {
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
                message: response.msg,
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
    //查看
    handleLookDetail(row) {
      this.resetTemp()
      this.temp.action = 'look'
      this.temp.appVersion = row.appVersion
      this.temp.downloadUrl = row.downloadUrl
      this.temp.forceUpdateVersion = row.forceUpdateVersion
      this.temp.remark = row.remark
      this.temp.channels = row.channels
      this.temp.updateContent = row.updateContent
      this.temp.id = row.id
      this.dialogFormVisible = true
    },
    // 编辑
    handleEdit (row) {
      this.resetTemp()
      this.temp.action = 'edit'
      this.temp.appVersion = row.appVersion
      this.temp.downloadUrl = row.downloadUrl
      this.temp.forceUpdateVersion = row.forceUpdateVersion
      this.temp.remark = row.remark
      this.temp.channels = row.channels
      this.temp.updateContent = row.updateContent
      this.temp.id = row.id
      this.dialogFormVisible = true
    },
    // 编辑提交
    updateData () {
      releaseSave(this.temp).then(res => {
        if (res.code === 0) {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
          this.dialogFormVisible = false
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            showClose: true,
            duration: 1000
          })
        }
        this.getList()
      })
    }
  }
}
</script>
<style lang="scss">
.filter-container .filter-item{
    margin-bottom: 0px;
}
</style>
