<template>
  <el-card shadow="never">
    <common-table ref=""
      :tableCols="tableCols"
      :tableData="tableData"
      :tableLoading="tableLoading"
      :tablePages="tablePages"
      :searchForm.sync="searchForm"
      :searchButton="searchButton"
      @handleSearch="handleSearch"
      @handleTable="handleTable"
      @handleAction="handleAction">
    </common-table>
    <my-modal
        :openModal.sync="modalOpen"
        :modalForm="modalForm"
        :title="modalTitle"
        :actionButton="actionButton"
        @handleAction="handleModalAction"/>
  </el-card>
</template>

<script>
import MyModal from './components/myModal.vue'
import CommonTable from "@/components/Table/commonTable"
export default {
  components:{
    CommonTable,
    MyModal
  },
  data() {
    return {
      searchForm:{
        keyword: {
          type:'input',
          value:'',
          prefixIcon:'el-icon-search',
          style:'width:300px',
          placeholder:'请输入关键字搜索'
        },
        type: {
          type:'select_input',
          value:'',
          style:'width:320px',
          placeholder:'请输入关键字搜索',
          select:'',
          selectOption:[
            {label:'xxx',value:'1111'},
            {label:'yyy',value:'2222'}
          ]
        },
        select: {
          type:'select',
          value:'',
          style:'width:300px',
          placeholder:'请输入关键字搜索',
          filterable: true,
          selectOption:[
            {label:'xxx',value:'1111'},
            {label:'yyy',value:'2222'}
          ]
        }
      },
      tablePages:{
        page: 1,
        page_size: 10,
        total: 21,
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
          type: 'selection',
          key: 'select',
          width: '55'
        },
        {
          type: 'expand',
          key: 'expand',
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
          width: '120',
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
      modalOpen: false,
      modalTitle: '新增IP池',
      modalForm: {
        title:'',
      },
      actionButton:[],
    }
  },
  mounted() {
  },
  methods: {
    handleSearch(key, form){
      this.tableLoading = true
      switch (key) {
        case 'search':
          console.log(form)
          this.tableLoading = false
          break;
        case 'reset':
          console.log(form)
          this.tableLoading = false
          break;
      
        default:
          break;
      }
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
          this.modalForm = {
            title:''
          }
          this.modalTitle='新增IP池'
          this.actionButton = [
          {name:'取消',type:'default',icon:'', style:'',key:'cancel'},
          {name:'确定',type:'primary',icon:'', style:'',key:'addConfirm'}]
          this.modalOpen = true
          break;
      
        default:
          break;
      }
    },
    handleAction(row, type){
      switch (type) {
        case 'edit':
          this.modalTitle='修改IP池'
          // this.modalForm = row
          this.actionButton = [
          {name:'取消',type:'default',icon:'', style:'',key:'cancel'},
          {name:'确定',type:'primary',icon:'', style:'',key:'changeConfirm'}]
          this.modalOpen = true
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
    },
    handleModalAction(type, form){
      switch (type) {
        case 'addConfirm':
          // ipPoolPost(form).then((res)=>{}).then(()=>{
          //   this.$Message.success('添加成功！');
          //   this.handleSearch()
          // }).catch((err)=>{
          //   this.$Message.error('添加失败：'+err);
          // })
          this.modalOpen = false
          break;

        case 'changeConfirm':
          // ipPoolPut(form).then((res)=>{}).then(()=>{
          //   this.$Message.success('修改成功！');
          //   this.handleSearch()
          // })
          this.modalOpen = false
          break;

        default:
          break;
        }
    }
  }
}
</script>