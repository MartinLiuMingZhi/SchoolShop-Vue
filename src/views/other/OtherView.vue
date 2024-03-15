<template>
  <div>
    <el-container>
      <!--      侧边栏-->
      <el-aside :width="asideWidth" style="min-height: 100vh; background-color: #304156">
        <div style="height: 60px;color: white;display: flex;align-items: center;justify-content: center">
          <img src="../../assets/logo1.png" alt="" style="width: 40px;height: 40px;">
          <!--          <transition name="el-fade-in-linear">-->
          <!--            <span style="margin-left: 5px;font-size: 15px" v-show="!isCollapse">校园商城购物平台</span>-->
          <!--          </transition>-->
          <span class="logo-title" v-show="!isCollapse">校园商城购物平台</span>
        </div>
        <el-menu :collapse="isCollapse" router background-color="#304156" text-color="rgba(255,255,255,0.65)" active-text-color="rgb(64, 158, 255)" style="border: none" :default-active="$route.path">
          <el-menu-item index="/home">
            <el-icon><HomeFilled /></el-icon>
            <span>系统首页</span>
          </el-menu-item>
          <el-sub-menu>
            <template #title>
              <el-icon><UserFilled /></el-icon>
              <span>系统信息管理</span>
            </template>
            <el-menu-item index="/user">
              <el-icon><Histogram /></el-icon>
              <span>员工信息管理</span>
            </el-menu-item>
            <el-menu-item index="/employee">
              <el-icon><Histogram /></el-icon>
              <span>用户信息管理</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <el-container>
        <!--        头部区域-->
        <el-header style="height: 60px; line-height: 60px; display: flex; align-items: center; box-shadow: 2px 0 6px rgba(0, 21, 41, .35);">
          <el-icon :size="26" @click="handleCollapse">
            <Component :is="collapseIcon"></Component>
          </el-icon>
          <el-breadcrumb separator="/" style="margin-left: 20px">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/user'}">用户管理</el-breadcrumb-item>
          </el-breadcrumb>

          <div style="flex: 1;width: 0;display:flex;align-items: center;justify-content: flex-end">
            <i class="element-icons el-icon-fullScreen" style="font-size: 26px" @click="handleFull"></i>
            <el-dropdown placement="bottom">
              <div style="display: flex;align-items: center;cursor: default">
                <el-avatar :size="40" :src="circleUrl" style="margin: 0 5px"/>
                <span>管理员</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item >个人信息</el-dropdown-item>
                  <el-dropdown-item >修改密码</el-dropdown-item>
                  <el-dropdown-item >退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

          </div>
        </el-header>
        <!--        主体区域-->
        <el-main >

          <!--                表单-->
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
            <el-table :data="tableData" border >
              <el-table-column prop="id" label="商品id" width="80" ></el-table-column>
              <el-table-column prop="image" label="商品图片" width="100">
                <template #default="scope">
                  <div style="display: flex; align-items: center">
                    <el-image
                        style="width: 100px; height: 70px"
                        :src="scope.row.image"
                        :zoom-rate="1.2"
                        :preview-src-list="scope.row.image"
                        :initial-index="4"
                        fit="cover"></el-image>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="商品名" width="120" ></el-table-column>
              <el-table-column prop="description" label="商品描述" width="170"></el-table-column>
              <el-table-column prop="price" label="商品价格" width="100"></el-table-column>
              <el-table-column prop="type" label="商品类型" width="100"></el-table-column>
              <el-table-column prop="stock" label="商品库存" width="100"></el-table-column>
              <el-table-column prop="date" label="入库日期" width="120"></el-table-column>
              <el-table-column label="操作">
                <el-button type="primary" size="default">编辑</el-button>
                <el-button type="danger" size="default">删除</el-button>
              </el-table-column>

            </el-table>
          </el-scrollbar>
          <br>
          <!--        Pagination 分页-->
          <el-pagination background layout="sizes,prev, pager, next,jumper,total"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :default-page-size="10"
                         :page-size="pageSize"
                         :current-page="currentPage"
                         :total="Total" ></el-pagination>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, toRefs} from "vue";

const isCollapse = ref(false)
const asideWidth = ref('200px')
const collapseIcon = ref('Fold')
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value;
  asideWidth.value = isCollapse.value? '64px':'200px'
  collapseIcon.value = isCollapse.value? 'Expand':'Fold'
  console.log("点击了")
}
const user = reactive({
  circleUrl : 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
})
const {circleUrl} = toRefs(user)
const handleFull = () => {
  document.documentElement.requestFullscreen()
}

const datetime = ref('')
const size = ref('default')

const state = reactive({
  currentPage:1,
  pageSize:10,
  Total:0,
  tableData:[],
})
const {currentPage,pageSize,Total,tableData} = toRefs(state)
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
  alert("每页记录数变化"+val);
}
const handleCurrentChange = (val: number) => {
  state.currentPage = val;
  console.log(`current page: ${val}`);
  alert("页码发送变化"+val);
}

</script>

<style scoped lang="scss">
.el-menu--inline{
  background-color: #1f2d3d !important;
}
.el-menu--inline .el-menu-item{
  background-color: #1f2d3d !important;
}
.el-menu-item:hover, .el-sub-menu__title:hover{
  color: #ffffff !important;
}
.el-sub-menu__title:hover i{
  color: #ffffff !important;
}

//.el-menu-item.is-active{
//  background-color: #478cf1 !important;
//  border-radius: 10px !important;
//  margin: 20px !important;
//}
.el-menu-item{
  height: 50px !important;
  line-height: 50px !important;
}
.el-sub-menu__title{
  height: 50px !important;
  line-height: 50px !important;
}
.el-aside{
  transition: width .2s;
  box-shadow: 2px 0 6px rgba(0,21,41,.35);
}
.logo-title{
  margin-left: 5px;
  font-size: 15px;
  transition: all .2s;
}
.el-head{
  box-shadow: 2px 0 6px rgba(0,21,41,.35);
  display: flex;
  align-items: center;
}
</style>