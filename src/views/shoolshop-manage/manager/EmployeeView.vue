<template>
  <div>
      <div>
        <!--                表单-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="员工姓名">
            <el-input v-model="formInline.user" placeholder="员工姓名" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    <!--                表格-->
    <el-scrollbar>
      <el-table :data="tableData" border style="width: 100%;" max-height="550"
                :cell-style="{ textAlign: 'center' }"
                :header-cell-style="{ 'text-align': 'center','backgroundColor':'aliceblue','color':'#666'}">
        <el-table-column type="selection" width="55" fixed>
<!--          <el-button type="danger" :icon="Delete" circle />-->
        </el-table-column>
        <el-table-column prop="id" label="员工id" width="100"></el-table-column>
        <el-table-column prop="avatar" label="员工头像" width="200">
          <template #default="scope">
            <div style="display: flex; align-items: center;justify-content: center">
              <el-avatar :size="'default'"  :src="scope.row.avatar" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="员工姓名" width="200" ></el-table-column>
        <el-table-column prop="phone" label="电话号码" width="200"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
        <el-table-column prop="state" label="员工状态" width="160">
          <template #default="scope">
            <el-tag>{{ scope.row.state? "启用":"禁用" }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="170">
          <template #default>
            <el-button type="primary" size="default">编辑</el-button>
            <el-button type="danger" size="default">禁用</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-scrollbar>
    <br>
    <div style="display: flex;align-items: center;justify-content: center">
      <!--        Pagination 分页-->
      <el-pagination background layout="sizes,prev,pager,next,jumper,total"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :page-sizes="[10,20,50,100]"
                     :default-page-size="10"
                     :page-size="pageSize"
                     :current-page="currentPage"
                     :total="Total" >
      </el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Delete} from '@element-plus/icons-vue'
import {onMounted, reactive, ref, toRefs} from "vue";
import {GetManagerPage} from "@/apis/manager";

const size = ref('default')

const state = reactive({
  currentPage:1,
  pageSize:10,
  Total:0,
  tableData:[],
})
const {currentPage,pageSize,Total,tableData} = toRefs(state)

onMounted(async()=>{
  GetManagerPage({page:state.currentPage,pageSize:state.pageSize}).then(res =>{
    if (res.data.code === 200){
      console.log(res);
      tableData.value = res.data.data.records
      Total.value = parseInt(res.data.data.total)
    }else {
      console.log("请求失败")
    }
  })
})

const formInline = reactive({
  user: '',
})
const onSubmit = () => {
  console.log('submit!')
  alert('submit')
}
const handleSizeChange = (val: number) => {
  state.pageSize = val;
  console.log(`${val} items per page`);
  // alert("每页记录数变化"+val);
}
const handleCurrentChange = (val: number) => {
  state.currentPage = val;
  console.log(`current page: ${val}`);
  // alert("页码发送变化"+val);
}
</script>


<style scoped lang="scss">

</style>