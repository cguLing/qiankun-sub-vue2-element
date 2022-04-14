<template>
  <el-card shadow="never">
    <common-table ref=""
      :tableCols="tableCols"
      :tableData="tableData"
      :tableLoading="tableLoading"
      :searchForm.sync="searchForm"
      :searchButton="searchButton"
      @handleSearch="handleSearch"
      @handleTable="handleTable"
      @handleAction="handleAction" />
  </el-card>
</template>

<script>
import CommonTable from "@/components/Table/commonTable"
export default {
  components:{
    CommonTable
  },
  data() {
    return {
      searchForm:{
        page: 1,
        page_size: 10,
        total: 21,
        keyword: '',
      },
      searchButton:[{
        key:'search',
        type:'',
        style:'',
        class:'rt-primaryB',
        icon:'',
        name:'查询'
      },{
        key:'reset',
        name:'重置'
      }],
      tableCols: [
        {
          title: '名称',
          key: 'title'
        },
        {
          title: 'IDC',
          key: 'idc',
          render: (h, params) => {
            return h('div', [
              h('i', {
                class: params.row.idc?'el-icon-star-off':'el-icon-star-on',
                style: {
                  color: params.row.idc?'green':'red'
                },
              })
            ])
          }
        },
        {
          title: '区域',
          key: 'area'
        },
        {
          title: '操作',
          slot: 'action',
          width: 120,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('el-button', {
                props: {
                  size: "mini",
                  icon: "el-icon-edit",
                  type: 'text'
                },
                style: {
                  color: '#2d8cf0',
                  'margin-right': '5px'
                },
                on: {
                  click: () => {
                    this.handleAction(params.row,'edit')
                  }
                }
              }, '编辑'),
              h('el-popconfirm', {
                props: {
                  icon:"el-icon-info",
                  iconColor:"red",
                  title:"确认删除吗？"
                },
                on: {
                  'confirm': () => {
                      this.handleAction(params.row,'delete')
                  }
                }
              },[
                h('el-button', {
                  props: {
                    size: "mini",
                    icon: "el-icon-delete",
                    type: 'text',
                  },
                  slot: "reference",
                  style: {
                    color: '#ed4014'
                  }
                }, '删除')
              ]),
            ])
          }
        }
      ],
      tableData: [{title:'xxx',area:'yyy',idc:false}],
      tableLoading: false,
    }
  },
  mounted() {
  },
  methods: {
    handleSearch(key, form){
      switch (key) {
        case 'search':
          
          break;
        case 'reset':
          
          break;
      
        default:
          break;
      }
      // this.tableLoading = true
      // ipPoolGet().then((res)=>{
      //   this.tableData = res.data.data
      // }).then(()=>{
      //   this.tableLoading = false
      // }).catch(()=>{
      //   this.tableLoading = false
      // })
    },
    handleTable(key){
      switch (key) {
        case 'add':
          
          break;
      
        default:
          break;
      }
      // this.modalForm = {
      //   title:'',
      //   idc: false,
      //   it: false,
      //   area: '',
      //   ext_opt: '',
      //   desc: ''
      // }
      // this.modalTitle='新增IP池'
      // this.actionButton = [
      // {name:'取消',type:'default',icon:'', style:'',click:'cancel'},
      // {name:'确定',type:'primary',icon:'', style:'',click:'addConfirm'}]
      // this.modalOpen = true
    },
    handleAction(row, type){
      switch (type) {
        case 'edit':
          // this.modalTitle='修改IP池'
          // this.modalForm = row
          // this.actionButton = [
          // {name:'取消',type:'default',icon:'', style:'',click:'cancel'},
          // {name:'确定',type:'primary',icon:'', style:'',click:'changeConfirm'}]
          // this.modalOpen = true
          break;
            
        case 'delete':
          // ipPoolDelete(row).then((res)=>{}).then(()=>{
          //   this.$Message.success('删除成功！');
          //   this.handleSearch()
          // })
          break;
    
        default:
          break;
        }
    }
  }
}
</script>