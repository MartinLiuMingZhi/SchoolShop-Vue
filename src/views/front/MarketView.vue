<template>
  <el-container>
    <el-header style="background-color: #0f9876; overflow: hidden">
      <el-menu
          router
          :default-active="$router.path"
          active-text-color="#F56C6C"
          mode="horizontal"
          :ellipsis="false"
          background-color="#C0C4CC"
          style="border: none; overflow: hidden; align-items: center; justify-content: center; display: flex"
      >
        <el-menu-item>
          <i class="element-icons el-icon-shop"></i> 校园商城购物平台
        </el-menu-item>
        <el-menu-item>请登录</el-menu-item>
        <el-menu-item>免费注册</el-menu-item>
        <el-menu-item>
          <el-icon color="#409EFC">
            <ShoppingCart />
          </el-icon>
          <span>购物车</span>
        </el-menu-item>
        <el-menu-item>我的订单</el-menu-item>
        <el-sub-menu>
          <template #title>联系客服</template>
          <el-menu-item>消费者客服</el-menu-item>
          <el-menu-item>卖家客服</el-menu-item>
          <el-menu-item>意见反馈</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-header>
    <el-main
        style="background-color: cornflowerblue; align-items: center; display: flex; flex-direction: column"
    >
      <div style="width: 50%; display: flex;">
        <el-input v-model="input" placeholder="搜索商品" size="large">
          <template #append>
            <el-icon>
              <Search />
            </el-icon>
          </template>
        </el-input>
      </div>

      <br />
      <div>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <el-row :gutter="15" style="justify-content: center">
                <el-col :span="5">
                  <el-menu
                      router
                      :default-active="$route.path"
                      active-text-color="red"
                      style="border: none;"
                  >
                    <el-menu-item index="/home">
                      <el-icon>
                        <Search />
                      </el-icon>
                      食品
                    </el-menu-item>
                    <el-menu-item index="/product">
                      <el-icon>
                        <Search />
                      </el-icon>
                      文具用品
                    </el-menu-item>
                    <el-menu-item index="/person">
                      <el-icon>
                        <Message />
                      </el-icon>
                      服装
                    </el-menu-item>
                    <el-menu-item index="/person">
                      <el-icon>
                        <Message />
                      </el-icon>
                      电子产品
                    </el-menu-item>
                    <el-menu-item index="/person">
                      <el-icon>
                        <Message />
                      </el-icon>
                      日用品
                    </el-menu-item>
                  </el-menu>
                </el-col>
                <el-col :span="14">
                  <el-carousel indicator-position="outside" style="width: 100%">
                    <el-carousel-item v-for="item in 4" :key="item">
                      <h3 text="2xl" justify="center">{{ item }}</h3>
                    </el-carousel-item>
                  </el-carousel>
                </el-col>
                <el-col :span="5">
                  <el-card style="width: 900px; height: 200px; display: flex; flex-direction: column">
                    <div style="margin-left: 100px">
                      <el-link>
                        <div
                            style="display: flex; flex-direction: column; justify-content: center; align-items: center"
                        >
                          <el-avatar>user</el-avatar>
                          <el-text>Hi!校园商城购物平台</el-text>
                        </div>
                      </el-link>
                    </div>
                    <div style="display: flex; padding-top: 20px;">
                      <router-link to="/">
                        <el-icon>
                          <ShoppingCart />
                        </el-icon>
                        <span>购物车</span>
                      </router-link>
                      <router-link to="/">
                        <el-icon>
                          <ShoppingBag />
                        </el-icon>
                        <span>订单</span>
                      </router-link>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </template>

          <div v-for="o in 4" :key="o" class="text item">
            {{ 'List item ' + o }}
          </div>
        </el-card>
      </div>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { Message, Search } from "@element-plus/icons-vue";
</script>

<style scoped lang="scss">
.index {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.el-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.el-main {
  height: 100%;
  overflow: hidden;
}
.el-footer {
  display: flex;
  height: 4vh;
  width: 100%;
  align-items: center;
}
.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100%;
}
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 30px;
  min-width: 100%;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.box-card {
  width: 100%;
}
</style>
