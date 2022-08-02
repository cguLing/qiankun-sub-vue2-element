<template>
  <div>
    <el-row :type="searchFormConf.rowType" :justify="searchFormConf.rowJustify" style="margin:0">
      <el-form v-if="!$slots.default" ref="searchForm" :model="searchForm" inline :label-width="searchFormConf.labelWidth" @submit.native.prevent>
        <el-form-item
          v-for="item in Object.keys(searchForm)" :key="item"
          :prop="item+'.value'"
          :label="searchForm[item].label">
          <el-input
            v-if="searchForm[item].type=='input'"
            :prefix-icon="searchForm[item].prefixIcon"
            :suffix-icon="searchForm[item].suffixIcon"
            :style="searchForm[item].style"
            v-model="searchForm[item].value"
            :placeholder="searchForm[item].placeholder"
            @keyup.enter.native="handleSearch(searchForm[item].searchKey||'search')" />
          <el-input
            v-if="searchForm[item].type=='select_input'"
            :prefix-icon="searchForm[item].prefixIcon"
            :suffix-icon="searchForm[item].suffixIcon"
            :style="searchForm[item].style"
            v-model="searchForm[item].value"
            :placeholder="searchForm[item].placeholder"
            class="input-with-select"
            @keyup.enter.native="handleSearch(searchForm[item].searchKey||'search')" >
            <el-select
              v-model="searchForm[item].select"
              slot="prepend"
              :placeholder="searchForm[item].selectPlaceholder">
              <el-option v-for="obj in searchForm[item].selectOption" :key="obj.value" :label="obj.label" :value="obj.value"></el-option>
            </el-select>
          </el-input>
          <el-select
            v-if="searchForm[item].type=='select'"
            :style="searchForm[item].style"
            v-model="searchForm[item].value"
            :placeholder="searchForm[item].placeholder"
            :clearable="searchForm[item].clearable"
            :filterable="searchForm[item].filterable"
            @change="handleSearch(searchForm[item].searchKey||'search')" >
            <el-option
              v-for="obj in searchForm[item].selectOption"
              :key="obj.value"
              :label="obj.label"
              :value="obj.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="JSON.stringify(searchForm) != '{}'">
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
      <slot></slot>
    </el-row>
    <el-row v-if="tableButton.length>0" :style="Object.keys(searchForm).length==0?'margin-bottom:10px':'margin:0px 0 10px 0'">
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
        ref="table"
        :data="tableData"
        :header-cell-style="tableParams.stripe?{background:'#f3f3f3',padding:'8px'}:{background:'#f8f8f9',padding:'8px'}"
        :border="tableParams.border"
        :stripe="tableParams.stripe"
        v-loading = "tableLoading"
        @selection-change="handleSelectionChange">
        <template slot="empty">
          {{tableParams.empty}}
        </template>
        <template
            v-for="item in tableCols">
          <el-table-column
            v-if="item.type=='selection'"
            :type="item.type"
            :key="item.key"
            :align="item.align||'center'"
            :width="item.width">
          </el-table-column>
          <el-table-column
            v-else
            :type="item.type"
            :key="item.key"
            :class-name="item.class"
            :align="item.align||'center'"
            :width="item.width"
            :min-width="item.minWidth"
            :max-width="item.maxWidth"
            :prop="item.key"
            :label="item.title"
            :sortable="item.sortable"
            :fixed="item.fixed"
            :show-overflow-tooltip="item.tooltip">
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
        </template>
      </el-table>
    </el-row>
    <el-row v-if="tablePages.hasOwnProperty('total')">
      <pagination
        v-show="tablePages.total > 0"
        :total="tablePages.total"
        :page.sync="tablePages.page_index"
        :limit.sync="tablePages.page_size"
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
    styleFile:{
      type: String,
      default: 'commonTable.less'
    },
    searchFormConf: {
      type: Object,
      default: () => { return {
        rowType:'flex',
        rowJustify:'end',
        labelWidth:'0px'
      }}
    },
    searchButton: {
      type: Array,
      default: ()=>{ return [{
        key:'search',
        type:'',
        style:'',
        class:'rt-button-primary',
        icon:'el-icon-plus',
        name:'查询'
      }]}
    },
    tableButton: {
      type: Array,
      default: ()=>{ return [{
        key:'add',
        type:'',
        class:'rt-button-primary',
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
      default: () => { return {empty:'暂无数据'}}
    },
    tablePages: {
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
      style : require (`../../../styles/viewStyle/${this.styleFile}`)
    }
  },
  watch: {
  },
  methods: {
    handleSelectionChange(val){
      this.$emit('handleTableSelection', val)
    },
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
<style lang='less' scoped>
::v-deep .el-form-item__label{
  font-size: 13px;
  font-weight: 500;
}
</style>
<style lang='less'>
.rt-button-primary{
  color:#409EFF;
  border-color:#409EFF;
  &:hover{
    background:#f7fbff !important;
  }
}
.rt-button-success{
  color:#67C23A;
  border-color:#67C23A;
  &:hover{
    color:#67C23A !important;
    border-color:#67C23A !important;
    background:#f0f9eb !important;
  }
}
.rt-button-warning{
  color:#E6A23C;
  border-color:#E6A23C;
  &:hover{
    color:#E6A23C !important;
    border-color:#E6A23C !important;
    background:#fdf6ec !important;
  }
}
.rt-button-danger{
  color:#F56C6C;
  border-color:#F56C6C;
  &:hover{
    color:#F56C6C !important;
    border-color:#F56C6C !important;
    background:#fef0f0 !important;
  }
}
.rt-button-info{
  color:#909399;
  border-color:#909399;
  &:hover{
    color:#909399 !important;
    border-color:#909399 !important;
    background:#f4f4f5 !important;
  }
}
.rt-table-expend .el-table__expand-icon{
  display: none;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
  width:var(--input_select_width);
}
</style>