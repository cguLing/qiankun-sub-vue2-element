<template>
  <el-card shadow="never" class="rt-overflow">
      <el-form ref="queryForm" 
        :model="queryParams" 
        :inline="true"
        @submit.native.prevent
        >
        <el-form-item prop="tld">
          <el-input
            v-model="queryParams.tld"
            placeholder="请输入域名"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="small"
            @click="handleQuery"
            >搜索</el-button
          >
          <el-button icon="el-icon-refresh" size="small" @click="resetQuery"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        v-loading="loading"
        :data="tldList"
      >
        <el-table-column
          label="ID"
          prop="id"
          align="center"
          width="60"
        />
        <el-table-column
          label="域名称"
          prop="tld"
          align="center"
          min-width="100"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="showSub(scope.row)">{{scope.row.tld}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="默认TTL"
          prop="ttl"
          align="center"
          width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="最小时间"
          prop="minimum"
          align="center"
          width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="项目"
          prop="project"
          align="center"
          width="120"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="状态"
          prop="status"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status=='on'?'primary':'info'">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          prop="note"
          align="center"
          width="120"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="插入时间"
          prop="createdate"
          align="center"
          width="140"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="更新时间"
          prop="updatedate"
          align="center"
          width="140"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="操作"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-s-data"
              @click="subLogs(scope.row)"
            >SUB日志
            </el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-s-data"
              @click="recordLogs(scope.row)"
            >Record日志
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.page_index"
        :limit.sync="queryParams.page_size"
        @pagination="getData"
      />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination'
import { mapState } from 'vuex';
import {
  getZone,
} from "@/api/zone";

export default {
  // components: { Item },
  name: "MyDNS",
  computed: {
    ...mapState({
      name: state => state.user.rdMail.split("@")[0],
    }),
  },
  components:{
    Pagination
  },
  data() {
    return {
      total: 0,
      moreInfo:[],
      moreInfoDialogVisible:false,
      moreInfoDialogName:undefined,
      loading:true,
      queryParams: {
        page_index: 1,
        page_size: 30,
        tld:undefined
      },
      tldList:[],
    };
  },
  created() {
    this.getData();
  },
  watch : {
  },
  methods: {
    showSub(row){
      this.$router.push({path:'/admin_dns/admin_sub/'+row.tld});
    },
    subLogs(row){
      this.$router.push({path:'/admin_dns/dns_logs/Sub/'+row.tld});
    },
    recordLogs(row){
      this.$router.push({path:'/admin_dns/dns_logs/Record/'+row.tld});
    },
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      if(!this.single){
        selection.forEach((item,idx) => {
          this.row=item;
          this.index=idx;
        });
      } else {
        this.row={};
      }
      this.multiple = !selection.length;
    },
    getData(){
      this.loading=true;
      // let query={
      //   tld:this.queryParams.tld==''?undefined:this.queryParams.tld
      // };
      if(this.queryParams.tld=='')this.queryParams.tld=undefined;
      // getZone(this.name,this.queryParams).then((res)=>{
      //     if(res.data.code==0){
      //       this.total = res.data.count;//TODO:res.data.count
      //       this.tldList=res.data.data;
      //     }else{
      //       this.msgError(res.data.data);
      //     }
      // }).catch(() => {
      //       this.msgError("无查询数据");
      //       this.tldList=[];
      //   });
      this.loading=false;
    },
    handleQuery() {
      this.getData();
    },
    resetQuery() {
      this.queryParams= {
        page_index: 1,
        page_size:30,
        tld: undefined,
      };
      this.resetForm("queryForm");
      this.getData();
    },
  },
};
</script>
<style scoped>
  .el-row {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .el-col {
    border-radius: 4px;
  }
</style>
