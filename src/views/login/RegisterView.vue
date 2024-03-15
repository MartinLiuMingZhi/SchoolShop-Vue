<template>
  <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #478cf1">
    <div style="display: flex;background-color: white;width: 60%;border-radius: 5px;overflow: hidden">
      <div style="flex: 1">
        <img src="@/assets/register.png" alt="" style="width: 100%">
      </div>
      <div style="flex: 1;display: flex;align-items: center;justify-content: center">
        <el-form :model="user" :rules="rules" ref="registerRef">
          <div style="font-size: 30px;font-weight: bold;margin-bottom: 20px">欢迎注册后台管理系统</div>
          <el-form-item prop="username">
            <el-input prefix-icon="User" size="default" placeholder="请输入账号" v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="Lock" size="default" show-password placeholder="请输入密码" v-model="user.password" ></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input prefix-icon="Lock" size="default" show-password placeholder="请确认密码" v-model="user.checkPassword" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="register(registerRef)">注册</el-button>
          </el-form-item>
          <div style="display: flex">
            <div style="flex: 1">已经又账号了？请<span style="color: #478cf1; cursor: pointer" @click="router.push('/login')">登录</span> </div>
          </div>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {ElMessage, FormInstance} from "element-plus";
import router from "@/router";
import {Register} from "@/apis/manager";

const registerRef = ref<FormInstance>();

const validatePassword = (rule:any, confirmPassword:any, callback:any) => {
  if (confirmPassword === '') {
    callback(new Error('请确认密码'))
  } else if (confirmPassword !== user.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

const user = reactive({
  username:'',
  password:'',
  checkPassword:'',
})

const rules = reactive({
  username: [{ required:true,message:'请输入账号', trigger: 'blur' }],
  password: [{ required:true,message:'请输入密码', trigger: 'blur' }],
  checkPassword: [{ validator: validatePassword, trigger: 'blur'}],
})

const register = (formEl: FormInstance | undefined) =>{
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid){

      Register(user).then(res =>{
        if (res.data.code == 200){
          console.log(res);
          //将token进行报存
          localStorage.setItem('token',JSON.stringify(res.data.data));
          ElMessage.success("注册成功");
          //跳转界面
          router.push('/manager')
        }else {
          console.log(res)
          ElMessage.error(res.data.message)
        }
      })
      console.log("注册成功")
    }else {
      console.log("注册失败")
      return false
    }
  })
}



</script>

<style scoped lang="scss">

</style>