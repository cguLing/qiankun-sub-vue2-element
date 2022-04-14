<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="page_size"
      :layout="layout"
      :page-sizes="page_sizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from "@/libs/scroll-to";

export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 20,
    },
    page_sizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50,100, 500,1000];
      },
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    // style: {
    //   type: Object,
    //   default() {
    //     return {};
    //   },
    // }
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    page_size: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("pagination", { page: this.currentPage, limit: val });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.page_size });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-pagination{
  font-weight: normal;
}
.el-pager li{
  font-size: 12px;
}
::v-deep .el-pagination.is-background .el-pager li{
  border: 1px solid #dcdee2;
  background: #fff;
  border-radius: 4px;
  &:hover{
    border-color: #409eff;
  }
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active{
  color: #409eff;
  background: #fff;
  border: 1px solid #409eff;
}
</style>
