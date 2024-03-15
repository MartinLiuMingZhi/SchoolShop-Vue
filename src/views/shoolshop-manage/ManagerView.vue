<template>
  <div>
    <el-container>
      <!--      侧边栏-->
      <el-aside :width="asideWidth" style="min-height: 100vh; background-color: #304156">
        <div style="height: 60px;color: white;display: flex;align-items: center;justify-content: center">
          <img src="@/assets/newLogo.png" alt="" style="width: 40px;height: 40px;">
          <!--          <transition name="el-fade-in-linear">-->
          <!--            <span style="margin-left: 5px;font-size: 15px" v-show="!isCollapse">校园商城购物平台</span>-->
          <!--          </transition>-->
          <span class="logo-title" v-show="!isCollapse">校园商城购物平台</span>
        </div>
        <el-menu :unique-opened="true" :collapse="isCollapse" router background-color="#304156" text-color="rgba(255,255,255,0.65)" active-text-color="rgb(64, 158, 255)" style="border: none" :default-active="$route.path">
          <el-menu-item index="/home">
            <el-icon><HomeFilled /></el-icon>
            <span>系统首页</span>
          </el-menu-item>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><UserFilled /></el-icon>
              <span>系统信息管理</span>
            </template>
            <el-menu-item index="/employee">
              <el-icon><Histogram /></el-icon>
              <span>员工信息管理</span>
            </el-menu-item>
            <el-menu-item index="/user">
              <el-icon><Histogram /></el-icon>
              <span>用户信息管理</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><GoodsFilled /></el-icon>
              <span>商品信息管理</span>
            </template>
            <el-menu-item index="/product">
              <el-icon><Histogram /></el-icon>
              <span>商品信息管理</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><List /></el-icon>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/order">
              <el-icon><Histogram /></el-icon>
              <span>订单信息管理</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><Comment /></el-icon>
              <span>消息管理</span>
            </template>
            <el-menu-item index="/news">
              <el-icon><Histogram /></el-icon>
              <span>信息详情</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <el-icon><Message /></el-icon>
              <span>系统公告</span>
            </template>
            <el-menu-item index="/notice">
              <el-icon><Histogram /></el-icon>
              <span>公告详情</span>
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
            <el-breadcrumb-item :to="{path:$route.path}">{{$route.meta.name}}</el-breadcrumb-item>
          </el-breadcrumb>

          <div style="flex: 1;width: 0;display:flex;align-items: center;justify-content: flex-end">
            <i class="element-icons el-icon-fullScreen" style="font-size: 26px" @click="handleFull"></i>
            <el-dropdown placement="bottom">
              <div style="display: flex;align-items: center;cursor: default">
                <el-avatar :size="40" :src="user.avatar" style="margin: 0 5px"/>
                <span style="font-weight: bold;">{{user.username}}</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push('/person')">个人信息</el-dropdown-item>
                  <el-dropdown-item @click="router.push('/password')">修改密码</el-dropdown-item>
                  <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

          </div>
        </el-header>
        <!--        主体区域-->
        <el-main >
          <router-view @update:user="updateUser"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, toRefs} from "vue";
import {Goods, GoodsFilled, Notebook} from "@element-plus/icons-vue";
import {Logout} from "@/apis/manager";
import router from "@/router";

const isCollapse = ref(false)
const asideWidth = ref('200px')
const collapseIcon = ref('Fold')


const handleCollapse = () => {
  isCollapse.value = !isCollapse.value;
  asideWidth.value = isCollapse.value? '64px':'200px'
  collapseIcon.value = isCollapse.value? 'Expand':'Fold'
  console.log("点击了")
}
const user = JSON.parse(localStorage.getItem('token')||'{}')

// const user = reactive({
//   circleUrl : 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
//   name: ''
// })
// const {circleUrl} = toRefs(user)
const handleFull = () => {
  document.documentElement.requestFullscreen()
}

const logout = () =>{
  Logout().then(res =>{
    console.log(res)
    if (res.data.code === 200){
      console.log("账号退出成功")
      router.push('/login')
    }else {
      console.log("账号退出失败")
    }
  })
}

const updateUser = (new_user:any) =>{
  user.value = new_user
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