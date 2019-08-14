<template>
	<div class="land_page promotionPage">
		<div class="btn_Box filter-container">
      <el-input class="filter-item" style="width: 250px; margin-left: 10px;" type="text" placeholder="请输入来源" v-model="searchData.source"></el-input>
      <el-input class="filter-item" style="width: 250px; margin-left: 10px;" type="text" placeholder="请输入媒介" v-model="searchData.utmMedium"></el-input>
      <el-date-picker class="filter-item" style="width: 250px; margin-left: 10px;" v-model="searchData.date" type="date" value-format="yyyy-MM-dd" :editable="false" placeholder="选择日期">
      </el-date-picker>
      <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" @click="getList" icon="el-icon-search">搜索</el-button>
    </div>
    <el-table
      :data="tableListData"
      border
      fit
      highlight-current-row
      style="width: 100%">
      <el-table-column label="序号" type="index" :index="1" width="80px" align="center" >

      </el-table-column>
      <el-table-column label="应用名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.appName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="来源" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.source }}</span>
        </template>
      </el-table-column>
      <el-table-column label="点击数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.enteringNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="激活总数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.activeNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册总数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.registerNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="totalCount>0" :total="totalCount" :page.sync="searchData.page" :limit.sync="searchData.pageSize" @pagination="getList" />
	</div>
</template>

<script>
	// import storage from 'good-storage';
	import mixins from './mixins'
  // import ajax from '../../../api/common/ajax'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default {
    components: { Pagination },
    directives: { waves },
		data() {
			return {
				searchData: {
					source: '',
					utmMedium: '',
					date: '',
					page: 1,
					pageSize: 10
				},
				formLabelWidth: '120px',
				tableListData: [
					{
						source: '',
						appName: "",
						date: "",
						enteringNum: "",
						activeNum: "",
						registerNum: "",
						id: ''
					}
				],
        currentPage: 1,
        page: 1,
        totalCount: 0,
        totalPage: 0,
        app: []
			}
		},
		mixins: [mixins],
		methods: {
			getList() {
				this.searchData.page = this.currentPage;
				ajax('device/ad/count/byUpdDate', 'post', this.searchData).then(res => {
					if(res.code == 0) {
						this.tableListData = res.data.countVoList;
						this.page = this.searchData.page;
						this.totalCount = res.data.totalCount;
						this.totalPage = res.data.totalCount / this.searchData.pageSize
					}else {
						this.$message({
				            type: 'error',
				            message: res.msg
			          	}); 
					}
				})
			},
			getEnums() {
				ajax('qqGroup/enums', 'get', {}).then(res => {
					if(res.code == 0) {
						this.app = res.data.packageList;
						this.groupStatus = res.data.statusList;
						this.groupTypeList = res.data.groupTypeList;
					}else {
						this.$message({
				            type: 'error',
				            message: res.msg
			          	}); 
					}
				})
			},
			search() {

			},
			editItem(item) {
				this.$router.push({
					path: '/editLandPage',
					query: {
						id: item.id
					}
				})
			},
			openUrl(item) {
				window.open(item.landpageUrl)
			},
			copyItem(item) {
				ajax('api/channelPage/copy', 'post', {id: item.id}).then(res => {
					if(res.code == 10001) {
						this.getList();
					}else {
						this.$message({
				            type: 'error',
				            message: res.msg
			          	}); 
					}
				})
			},
			deleteItem(item) {
				let text = item.groupStatus == 2 ? '上架' : '下架';
				this.$confirm(`确认${text}该群么?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
		        }).then(() => {
		        	ajax('qqGroup/update', 'post', {id: item.id, groupStatus: item.groupStatus == 2 ? 1 : 2}).then(res => {
						if(res.code == 10001) {
					        this.$message({
					            type: 'success',
					            message: `${text}成功!`
					        });
							this.getList();
						}else {
							this.$message({
					            type: 'error',
					            message: res.msg
				          	}); 
						}
					})
		        }).catch(() => {
		          	this.$message({
			            type: 'info',
			            message: `已取消${text}`
		          	});          
		        });
			},
			handleCurrentChange(page) {
		        this.currentPage = page;
		        this.getList();
      		},
		    handleCommand(command) {
		    	let data = {
		    		id: command.item.id,
		    		groupStatus: command.status,
		    	}
		    	ajax('qqGroup/update/status', 'post', data).then(res => {
		    		if(res.code == 0) {
		    			this.getList();
		    		}else {
		    			this.$message({
				            type: 'error',
				            message: res.msg
			          	}); 
		    		}
		    	})
		    },
		    // 群类型
		    groupTypeFromatter (row, col, cellValue, index) {
		    	let groupType = this.groupTypeList.filter(item => item.groupType == cellValue);
		    	return groupType.length > 0 ? groupType[0].groupTypeDesc : ''
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
.promotionPage {
  padding: 20px;
}
	.btn_Box {
		width: 100%;
    display: flex;
    // justify-content: flex-end;
    align-items: center;
    margin-bottom: 10px;
	}
	.btn_Box .el-form {
		margin: 0 auto;
		width: 300px;
	}
</style>