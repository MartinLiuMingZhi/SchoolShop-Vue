<template>
  <div>订单管理</div>
  <div style="display: flex;align-items: center;justify-content: center">
    <el-pagination background layout="sizes,prev,pager,next,jumper,total"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :page-sizes="[5,10,20,50]"
                   :default-page-size="5"
                   :page-size="pageSize"
                   :current-page="currentPage"
                   :total="100000" >
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, toRefs} from "vue";

const size = ref('default')

const state = reactive({
  currentPage:1,
  pageSize:5,
})
const {currentPage,pageSize,} = toRefs(state)

const handleSizeChange = (val: number) => {
  state.pageSize = val;
  console.log(`当前页：${state.currentPage},页数：${state.pageSize}条`);
  // alert("每页记录数变化"+val);

}
const handleCurrentChange = (val: number) => {
  state.currentPage = val;
  console.log(`当前页：${state.currentPage},页数：${state.pageSize}条`);
  // alert("页码发送变化"+val);
}
</script>

<style scoped lang="scss">

</style>