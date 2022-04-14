<template>
  <el-dialog
    :visible.sync="open"
    width="40%"
    :title="title"
    @on-cancel="handleAction('cancel')">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="title">
          <el-input
            v-model="form.title"
            placeholder="请输入IP池名称"
            clearable />
        </el-form-item>
      </el-form>
      <el-button slot="footer"
        v-for="item in actionButton"
        :key="item.key"
        :type="item.type"
        :style="item.style"
        :icon="item.icon"
        :class="item.class"
        @click="handleAction(item.key)">{{item.name}}</el-button>
  </el-dialog>
</template>
<script>
export default {
  name: 'MyModal',
  props: {
    openModal: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: '创建'
    },
    actionButton: {
      type: Array,
      default: ()=>[
        {name:'取消',type:'default',icon:'', style:'',click:'cancel'},
        {name:'确定',type:'primary',icon:'', style:'',click:'addConfirm'}]
    },
    modalForm: {
      type:Object,
      default: ()=>{}
    }
  },
  data(){
    return {
      form:{
      },
      rules:{
        title:{
          required: true,  message: '必填', trigger: 'blur'
        },
        area:{
          required: true,  message: '必填', trigger: 'blur'
        },
        desc:{
          required: true,  message: '必填', trigger: 'blur'
        }
      },
      open: false
    }
  },
  watch: {
    openModal: {
      handler(val){
        this.open = val
        if(!val) {
          this.handleAction('cancel')
        }
      }
    },
    modalForm: {
      handler(val){
        this.form = val
      },
      deep: true
    }
  },
  methods: {
    handleAction(type){
      switch (type) {
        case 'addConfirm':
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.$emit('handleAction', type, this.form)
            }
          })
          break;
        
        case 'changeConfirm':
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.$emit('handleAction', type, this.form)
            }
          })
          break;

        case 'cancel':
          this.open = false
          this.$emit('update:openModal', false)
          this.form = {
            ldap:undefined
          }
          break;
      
        default:
          this.$emit('handleAction', type)
          break;
      }
    }
  }
}
</script>