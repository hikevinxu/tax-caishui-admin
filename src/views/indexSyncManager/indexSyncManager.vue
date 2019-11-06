<template>
  <div class="indexSyncManager">
    <div class="customer">
      <div class="customerInfo">
        <div class="title">公司全量索引同步</div>
        <div class="customerAvatar">
          <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="">
        </div>
        <div class="customerName">{{ name.slice(0, -12) }}</div>
        <div class="customerRemark">海纳百川，有容乃大</div>
        <div class="infoList">
          <div style="width: 270px; margin: 0 auto;">
            <el-button v-waves class="filter-item" @click="comapnyIndexSync">全量索引同步</el-button>
            <el-button v-waves class="filter-item" @click="getCompanyIndexSyncFullSyncResult">获取同步结果</el-button>
          </div>
        </div>
        <div class="customerData">
          <div class="title">公司全量索引同步结果</div>
          <EmptyImag class="nodata" v-if="companySyncInfo.status == ''" />
          <div v-else v-loading="companyLoading">
            <p><i class="el-icon-document"></i>同步状态：<span><el-tag>{{companySyncInfo.status}}</el-tag></span></p>
            <p><i class="el-icon-document"></i>更新总数：<span>{{companySyncInfo.updateTotal}}</span></p>
            <p><i class="el-icon-document"></i>更新成功数量：<span>{{companySyncInfo.updateSuccessCount}}</span></p>
            <p><i class="el-icon-document"></i>更新失败数量：<span>{{companySyncInfo.updateFailCount}}</span></p>
            <p><i class="el-icon-document"></i>删除总数：<span>{{companySyncInfo.deleteTotal}}</span></p>
            <p><i class="el-icon-document"></i>删除数量：<span>{{companySyncInfo.deleteCount}}</span></p>
            <p><i class="el-icon-document"></i>开始时间：<span>{{companySyncInfo.startTime | timeFormatter}}</span></p>
            <p><i class="el-icon-document"></i>结束时间：<span>{{companySyncInfo.finishTime | timeFormatter}}</span></p>
            <p><i class="el-icon-document"></i>同步时间：<span>{{companySyncInfo.syncTimestamp | timeFormatter}}</span></p>
          </div>
        </div>
      </div>
      <div class="customerInfo">
        <div class="title">服务全量索引同步</div>
        <div class="customerAvatar">
          <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="">
        </div>
        <div class="customerName">{{ name.slice(0, -12) }}</div>
        <div class="customerRemark">海纳百川，有容乃大</div>
        <div class="infoList">
          <div style="width: 270px; margin: 0 auto;">
            <el-button v-waves class="filter-item" @click="serviceIndexSync">全量索引同步</el-button>
            <el-button v-waves class="filter-item" @click="getServiceIndexSyncFullSyncResult">获取同步结果</el-button>
          </div>
        </div>
        <div class="customerData">
          <div class="title">服务全量索引同步结果</div>
          <EmptyImag class="nodata" v-if="serviceSyncInfo.status == ''"/>
          <div v-else v-loading="serviceLoading">
            <p><i class="el-icon-document"></i>同步状态：<span><el-tag>{{serviceSyncInfo.status}}</el-tag></span></p>
            <p><i class="el-icon-document"></i>更新总数：<span>{{serviceSyncInfo.updateTotal}}</span></p>
            <p><i class="el-icon-document"></i>更新成功数量：<span>{{serviceSyncInfo.updateSuccessCount}}</span></p>
            <p><i class="el-icon-document"></i>更新失败数量：<span>{{serviceSyncInfo.updateFailCount}}</span></p>
            <p><i class="el-icon-document"></i>删除总数：<span>{{serviceSyncInfo.deleteTotal}}</span></p>
            <p><i class="el-icon-document"></i>删除数量：<span>{{serviceSyncInfo.deleteCount}}</span></p>
            <p><i class="el-icon-document"></i>开始时间：<span>{{serviceSyncInfo.startTime | timeFormatter}}</span></p>
            <p><i class="el-icon-document"></i>结束时间：<span>{{serviceSyncInfo.finishTime | timeFormatter}}</span></p>
            <p><i class="el-icon-document"></i>同步时间：<span>{{serviceSyncInfo.syncTimestamp | timeFormatter}}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves' // Waves directive
import { indexSyncFullSync, indexSyncFullSyncResult } from '@/api/indexSyncManager'
import { mapGetters } from 'vuex'
import EmptyImag from '@/components/EmptyImag/index'
export default {
  components: {
    EmptyImag
  },
  directives: { waves },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      companyLoading: false,
      serviceLoading: false,
      companySyncInfo: {
        status: ''
      },
      serviceSyncInfo: {
        status: ''
      }
    }
  },
  created() {
  },
  methods: {
    getCompanyIndexSyncFullSyncResult(){
      let params = {
        type: 'company'
      }
      this.companyLoading = true
      indexSyncFullSyncResult(params).then(res => {
        if(res.code == 0){
          this.companyLoading = false
          this.companySyncInfo = res.data
        }
      })
    },
    getServiceIndexSyncFullSyncResult() {
      let params = {
        type: 'service'
      }
      this.serviceLoading = true
      indexSyncFullSyncResult(params).then(res => {
        if(res.code == 0){
          this.serviceLoading = false
          this.serviceSyncInfo = res.data
        }
      })
    },
    comapnyIndexSync() {
      let params = {
        type: 'company'
      }
      indexSyncFullSync(params).then(res => {
        if(res.code == 0){
          console.log(res)
          this.$notify({
            title: '成功',
            message: '公司全量索引同步开始',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    serviceIndexSync() {
      let params = {
        type: 'service'
      }
      indexSyncFullSync(params).then(res => {
        if(res.code == 0){
          console.log(res)
          this.$notify({
            title: '成功',
            message: '服务全量索引同步开始',
            type: 'success',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.indexSyncManager {
  padding: 20px;
  min-height: calc(100vh - 84px);
  background: #f0f2f5;
  .customer {
    display: flex;
  }
  .customerInfo {
    width: 350px;
    height: 670px;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: 'tnum';
    position: relative;
    background: #fff;
    border-radius: 2px;
    transition: all 0.3s;
    padding: 24px;
    margin-right: 20px;
    .title {
      margin-bottom: 12px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
    }
    .customerAvatar {
      width: 104px;
      height: 104px;
      margin: 0 auto;
      border-radius: 50%;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .customerName {
      width: 130px;
      margin: 0 auto;
      height: 28px;
      border-radius: 2px;
      margin-top: 20px;
      text-align: center;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }
    .customerRemark {
      width: 180px;
      margin: 0 auto;
      height: 22px;
      border-radius: 2px;
      margin-top: 5px;
      text-align: center;
      font-size: 14px;
    }
    .customerData,
    .infoList {
      margin-top: 24px;
      margin-bottom: 24px;
      padding-bottom: 24px;
      border-bottom: 1px dashed #e8e8e8;
      .nodata {
        margin-top: 30px;
      }
      .title {
        margin-bottom: 12px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
      }
      p {
        margin: 0;
        padding: 0;
        margin-bottom: 8px;
        padding-left: 26px;
        font-size: 14px;
        position: relative;
        >i {
          position: absolute;
          top: 3px;
          left: 0;
        }
        >span {
          position: absolute;
          top: 0px;
          left: 170px;
        }
      }
    }
    .customerData {
      border-bottom: 0;
    }
  }
}
</style>
