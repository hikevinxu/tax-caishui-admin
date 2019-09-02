<template>
	<div class="land_page">
		<div class="btn_Box filter-container">
      <el-button v-waves class="filter-item" icon="el-icon-plus" type="primary" @click="$router.push('/landPage/createLandPage')">新建</el-button>
      <el-select class="filter-item" style="width: 250px; margin-left: 10px;" @change="searchDataChange" v-model="searchData.packageName" placeholder="请选择投放应用">
        <el-option value="" label="全部"></el-option>
        <el-option v-for="item in app" :label="item" :value="item" :key="item" > </el-option>
      </el-select>
      <el-input class="filter-item" type="text" style="width: 250px; margin-left: 10px;" placeholder="请输入投放渠道" v-model="searchData.advertisingChannel"></el-input>
      <el-input class="filter-item" type="text" style="width: 250px; margin-left: 10px;" placeholder="请输入渠道备注" v-model="searchData.channelRemark"></el-input>
      <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" @click="searchDataChange" icon="el-icon-search">搜索</el-button>
	    </div>
	    <el-table
          v-loading="listLoading"
	      	:data="tableListData"
          border
          fit
          highlight-current-row
	      	style="width: 100%">
	      	<el-table-column label="序号" type="index" :index="1" width="80px" align="center" >
	      	</el-table-column>
	      	<el-table-column label="产品名称" align="center" width="100px">
            <template slot-scope="scope">
              <span>{{ scope.row.packageName }}</span>
            </template>
	      	</el-table-column>
	      	<el-table-column label="渠道channel" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.advertisingChannel }}</span>
            </template>
	      	</el-table-column>
	      	<el-table-column label="渠道备注" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.channelRemark }}</span>
            </template>
	      	</el-table-column>
	      	<el-table-column label="落地页url" align="center">
	      		<template slot-scope="scope">
	      			<span @click="openUrl(scope.row)" style="color: #409eff;">{{scope.row.landpageUrl}}</span>
	      		</template>
	      	</el-table-column>
	      	<el-table-column label="预览"  align="center">
	        	<template slot-scope="scope">
	          	<img :src="scope.row.headImg" alt="" style="width: 40px;height: 40px">
	        	</template>
	      	</el-table-column>
	      	<el-table-column label="落地页标题" align="center">
            <template slot-scope="scope">
	          	<span>{{ scope.row.title }}</span>
	        	</template>
	      	</el-table-column>
          <el-table-column label="创建人" align="center">
          <template slot-scope="scope">
	          	<span>{{ scope.row.createUser ? scope.row.createUser : '——' }}</span>
	        	</template>
	      	</el-table-column>
	      	<el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
	          	<span>{{ scope.row.createTime }}</span>
	        	</template>
	      	</el-table-column>
	      	<el-table-column label="操作" align="center" width="220">
	        	<template slot-scope="scope">
	          	<el-dropdown  @command="handleCommand">
		            <el-button type="primary" size="small">
		              操作
		            </el-button>
		            <el-dropdown-menu slot="dropdown">
	              		<el-dropdown-item :command="{type: 'editItem', item: scope.row}">编辑</el-dropdown-item>
	              		<el-dropdown-item :command="{type: 'copyItem', item: scope.row}">复制</el-dropdown-item>
	              		<el-dropdown-item :command="{type: 'deleteItem', item: scope.row}">删除</el-dropdown-item>
	            	</el-dropdown-menu>
	          	</el-dropdown>
              <el-button style="margin-left: 10px;" type="danger" size="small" @click="lookRecords(scope.row)">操作记录</el-button>
	        	</template>
	      	</el-table-column>
	    </el-table>

    <pagination v-show="totalCount>0" :total="totalCount" :page.sync="searchData.pageNum" :limit.sync="searchData.pageSize" @pagination="getList" />

    <el-dialog title="操作记录" :visible.sync="dialogTableVisible" width="800px">
      <el-table 
      :data="recordData"
      border
      >
        <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.operate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="recordDataCount>0" :total="recordDataCount" :page.sync="recordsSearch.pageNum" :limit.sync="recordsSearch.pageSize" @pagination="getRecordList" />
    </el-dialog>
	</div>
</template>

<script>
	import mixins from './mixins'
  import { channelPageObtainPaging, channelPageCopy, channelPageDelete, channelPageRecord } from '@/api/landPage'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default {
    components: { Pagination },
    directives: { waves },
		data() {
			return {
        listLoading: false,
				searchData: {
					packageName: '',
					advertisingChannel: '',
					channelRemark: '',
					pageNum: 1,
					pageSize: 10
				},
				formLabelWidth: '120px',
				tableListData: [],
        currentPage: 1,
        page: 1,
        totalCount: 0,
        totalPage: 0,
        recordsSearch: {
          pageNum: 1,
          pageSize: 10,
          pageId: ''
        },
        recordDataCount: 0,
        dialogTableVisible: false,
        recordData: []
			}
		},
		mixins: [mixins],
		watch: {
			'searchData.packageName': function(newValue) {
				if(!newValue) {
					this.searchData.packageName = null
				}
			},
			'searchData.advertisingChannel': function(newValue) {
				if(!newValue) {
					this.searchData.advertisingChannel = null
				}
			},
			'searchData.channelRemark': function(newValue) {
				if(!newValue) {
					this.searchData.channelRemark = null
				}
			},
		},
		methods: {
			getList() {
        this.listLoading = true
        channelPageObtainPaging(this.searchData).then(res => {
          if(res.code == 0){
            this.listLoading = false
            this.tableListData = res.data.items
            this.totalCount = res.data.total
          }
        }).catch(err => {
          this.listLoading = false
        })
			},
			search() {
				this.searchData.pageNum = 1
				this.searchData.pageSize = 10
			},
			editItem(item) {
				this.$router.push({
					path: '/landPage/editLandPage',
					query: {
						id: item.id
					}
				})
			},
			openUrl(item) {
				window.open(item.landpageUrl)
			},
			copyItem(item) {
        let params = {
          id: item.id
        }
        channelPageCopy(params).then(res => {
          if(res.code == 0) {
            this.$message({
              type: 'success',
              message: '复制成功!'
            })
          } else {
            this.$message({
              type: 'success',
              message: '复制失败!'
            })
          }
          this.getList()
        })
			},
			deleteItem(item) {
				this.$confirm('确认删掉该条数据么?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
          let params = {
            id: item.id
          }
          channelPageDelete(params).then(res => {
            if(res.code == 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })     
        })
			},
			handleCurrentChange(page) {
        this.currentPage = page;
        this.getList();
      },
      handleCommand(command) {
        console.log(command)
        this[command.type](command.item)
      },
      lookRecords(row) {
        console.log(row)
        this.recordsSearch.pageNum = 1
        this.recordsSearch.pageSize = 10
        this.recordsSearch.pageId = row.id
        this.getRecordList()
      },
      getRecordList() {
        channelPageRecord(this.recordsSearch).then(res => {
          if(res.code == 0) {
            this.dialogTableVisible = true
            this.recordData = res.data.items
            this.recordDataCount = res.data.total
          }
        })
      },
      searchDataChange() {
        this.searchData.pageNum = 1
        this.searchData.pageSize = 10
        this.getList()
      },
    },
		created() {
			this.getList()
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
.land_page {
  padding: 20px;
}
.btn_Box {
  width: 100%;
  display: flex;
  /* justify-content: flex-end; */
  align-items: center;
  margin-bottom: 10px;
}
.btn_Box .el-form {
  margin: 0 auto;
  width: 300px;
}
</style>