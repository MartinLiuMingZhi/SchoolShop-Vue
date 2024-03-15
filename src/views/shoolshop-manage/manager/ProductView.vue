<template>
  <div>
  <!--                表单-->
  <el-form :inline="true" :model="formInline" class="demo-form-inline"
           :cell-style="{ textAlign: 'center' }"
           :header-cell-style="{ 'text-align': 'center' }">
    <el-form-item label="商品名">
      <el-input v-model="formInline.user" placeholder="商品名" clearable />
      <!--              <el-autocomplete-->
      <!--                  v-model="formInline.user"-->
      <!--                  :fetch-suggestions="querySearch"-->
      <!--                  clearable-->
      <!--                  class="inline-input w-50"-->
      <!--                  placeholder="商品名"-->
      <!--                  @select="handleSelect"></el-autocomplete>-->
    </el-form-item>
    <el-form-item label="商品类型">
      <el-select
          v-model="formInline.region"
          placeholder="商品类型"
          clearable
      >
        <el-option label="食品" value="food" />
        <el-option label="文具用品" value="stationery" />
        <el-option label="服装" value="clothing"/>
        <el-option label="电子产品" value="electronics"/>
        <el-option label="日用品" value="dialy_necessities"/>

      </el-select>
    </el-form-item>
    <el-form-item label="入库日期">
      <el-date-picker
          v-model="datetime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :size="size"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
  <!--                表格-->
  <el-scrollbar>
    <el-table :data="tableData" border style="width: 100%;" max-height="550"
              :cell-style="{ textAlign: 'center' }"
              :header-cell-style="{ 'text-align': 'center','backgroundColor':'aliceblue','color':'#666'}">
      <el-table-column fixed prop="id" label="商品id" width="80" ></el-table-column>
      <el-table-column prop="image" label="商品图片" width="100">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-image
                style="width: 100px; height: 70px"
                :src="scope.row.image"
                :zoom-rate="1.2"
                :preview-src-list="[scope.row.image]"
                :initial-index="4"
                fit="cover"></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名" width="120" ></el-table-column>
      <el-table-column prop="description" label="商品描述" width="500"></el-table-column>
      <el-table-column prop="price" label="商品价格" width="90"></el-table-column>
      <el-table-column prop="type" label="商品类型" width="100"></el-table-column>
      <el-table-column prop="stock" label="商品库存" width="90"></el-table-column>
      <el-table-column prop="date" label="入库日期" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default>
          <el-button type="primary" size="default">编辑</el-button>
          <el-button type="danger" size="default">删除</el-button>
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
                   :page-sizes="[5,10,20,50]"
                   :default-page-size="5"
                   :page-size="pageSize"
                   :current-page="currentPage"
                   :total="Total" >
    </el-pagination>
  </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, toRefs} from "vue";
import {GetProductPage} from "@/apis/product";

const datetime = ref('')
const size = ref('default')

const state = reactive({
  currentPage:1,
  pageSize:5,
  Total:0,
  tableData:[],
})
const {currentPage,pageSize,Total,tableData} = toRefs(state)

onMounted(async () => {
  GetProductPage({page:state.currentPage,pageSize:state.pageSize}).then(res =>{
    if (res.data.code === 200){
      console.log(res);
      tableData.value = res.data.data.records
      Total.value = parseInt(res.data.data.total)
    }else {
      console.log("请求失败"+res.data.code)
    }
  })
})

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})
const onSubmit = () => {
  console.log('submit!')
  alert('submit')
}
const handleSizeChange = (val: number) => {
  state.pageSize = val;
  console.log(`${val} items per page`);
  // alert("每页记录数变化"+val);
  tableData.value=[]
  Total.value = 0
  GetProductPage({page:state.currentPage,pageSize:val}).then(res =>{
    console.log(state.currentPage,state.pageSize)
    if (res.data.code === 200){
      console.log(res);
      tableData.value = res.data.data.records
      Total.value = parseInt(res.data.data.total)
    }else {
      console.log("请求失败")
    }
  })
}
const handleCurrentChange = (val: number) => {
  state.currentPage = val;
  console.log(`current page: ${val}`);
  // alert("页码发送变化"+val);
  tableData.value=[]
  Total.value = 0
  GetProductPage({page:val,pageSize:state.pageSize}).then(res =>{
    if (res.data.code === 200){
      console.log(res);
      tableData.value = res.data.data.records
      Total.value = parseInt(res.data.data.total)
    }else {
      console.log("请求失败")
    }
  })
}
</script>


<style scoped lang="scss">

</style>