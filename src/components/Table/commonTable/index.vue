<template>
  <div>
    <el-row type="flex" justify="end">
      <el-form ref="searchForm" :model="searchForm" inline>
        <el-form-item prop="keyword" v-if="searchForm.hasOwnProperty('keyword')">
          <el-input 
            prefix-icon="el-icon-search" style="width:300px" v-model="searchForm.keyword" :placeholder="searchPlace" />
        </el-form-item>
        <el-form-item v-if="searchForm.hasOwnProperty('keyword')">
          <el-button
            v-for="item in searchButton"
            :key="item.key"
            :type="item.type"
            :style="item.style"
            :icon="item.icon"
            :class="item.class"
            plain @click="handleSearch(item.key)">{{item.name}}</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row :style="Object.keys(searchForm).length==0?'margin-bottom:10px':'margin:-25px 0 10px 0'">
      <el-button
        v-for="item in tableButton"
        :key="item.key"
        :type="item.type"
        :style="item.style"
        :icon="item.icon"
        :class="item.class"
        plain @click="handleTable(item.key)">{{item.name}}</el-button>
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        :header-cell-style="{background:'#f8f8f9',padding:'8px'}"
        :border="tableParams.border"
        :stripe="tableParams.stripe"
        v-loading = "tableLoading">
        <el-table-column
            v-for="item in tableCols"
            :key="item.key"
            :align="item.align||'center'"
            :min-width="item.width||'135'"
            :prop="item.key"
            :label="item.title">
            <template slot-scope="scope">
              <ex-slot
                v-if="item.render"
                :render="item.render"
                :row="scope.row"
                :index="scope.$index"
                :column="item" />
              <span v-else>{{ scope.row[item.key] || '-' }}</span>
            </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row v-if="searchForm.hasOwnProperty('total')">
      <pagination
        v-show="searchForm.total > 0"
        :total="searchForm.total"
        :page.sync="searchForm.page_index"
        :limit.sync="searchForm.page_size"
        @pagination="handlePage"
       />
    </el-row>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
var exSlot = {
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },
  render: (h, data) => {
    const params = {
      row: data.props.row,
      index: data.props.index
    }
    if (data.props.column) params.column = data.props.column
    return data.props.render(h, params)
  }
}
export default {
  name: 'CommonTable',
  props: {
    searchPlace: {
      type: String,
      default: '请输入关键字搜索'
    },
    searchButton: {
      type: Array,
      default: ()=>{ return [{
        key:'search',
        type:'',
        style:'',
        class:'rt-primaryB',
        icon:'el-icon-plus',
        name:'查询'
      }]}
    },
    tableButton: {
      type: Array,
      default: ()=>{ return [{
        key:'add',
        type:'',
        class:'rt-primaryB',
        style:'',
        icon:'el-icon-plus',
        name:'新增'
      }]}
    },
    tableCols: {
      required: true,
      type: Array
    },
    tableData: {
      type: Array,
      default: ()=>[]
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
    tableParams: {
      type: Object,
      default: () => { return {}}
    },
    searchForm: {
      type: Object,
      default: () => { return {}}
    }
  },
  components:{
    Pagination,
    exSlot
  },
  data() {
    return {
    }
  },
  watch: {
  },
  methods: {
    handleSearch(key){
      this.$emit('handleSearch', key, this.searchForm)
    },
    handleTable(key){
      this.$emit('handleTable', key)
    },
    handleAction(row, type){
      this.$emit('handleAction', row, type)
    },
    handlePage(){
      this.handleSearch('search')
    }
  }
}
</script>
<style lang='less'>
.rt-primaryB{
  color:#409EFF;
  border-color:#409EFF;
  &:hover{
    background:#f7fbff !important;
  }
}
</style>