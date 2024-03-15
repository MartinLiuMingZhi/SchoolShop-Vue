<template>
  <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #0f9876">
    <div style="display: flex;background-color: white;width: 60%;border-radius: 5px;overflow: hidden">
      <div style="flex: 1">
        <img src="@/assets/login.png" alt="" style="width: 100%">
      </div>
      <div style="flex: 1;display: flex;align-items: center;justify-content: center">
        <el-form :model="user" :rules="rules" ref="loginRef">
          <div style="font-size: 30px;font-weight: bold;margin-bottom: 20px">欢迎登录后台管理系统</div>
          <el-form-item prop="username">
            <el-input prefix-icon="User" size="default" placeholder="请输入账号" v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="Lock" size="default" show-password placeholder="请输入密码" v-model="user.password" ></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <div style="display: flex">
              <el-input prefix-icon="CircleCheck" size="default" style="flex: 1" v-model="user.code"></el-input>
              <div style="flex: 1;height: 36px">
                <valid-code @update:value="getCode"/>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="login(loginRef)">登录</el-button>
          </el-form-item>
          <div style="display: flex">
            <div style="flex: 1">还没有账号？请<span style="color: #0f9876; cursor: pointer" @click="router.push('/register')">注册</span> </div>
            <div style="flex: 1; text-align: right"><span style="color: #0f9876; cursor: pointer" @click="handleForgetPass">忘记密码</span></div>
          </div>
        </el-form>
      </div>
    </div>

    <el-dialog v-model="forgetPassDialogVis" title="忘记密码" width="30%">
      <el-form :model="form" label-width="80px" style="padding-right: 20px">
        <el-form-item label="用户名" >
          <el-input v-model="form.username" autocomplete="off" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item label="电话号码" >
          <el-input v-model="form.phone" autocomplete="off" placeholder="请输入电话号码"/>
        </el-form-item>

      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="forgetPassDialogVis = false">取 消</el-button>
        <el-button type="primary" @click="resetPassword">确 定</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import ValidCode from "@/components/ValidCode.vue"
import {ElMessage, FormInstance, FormRules} from "element-plus";
import router from "@/router";
import {Login, ResetPassword} from "@/apis/manager";

const loginRef = ref<FormInstance>();
let validCode = ref("");
const getCode = (code:any) =>{
  console.log(code)
  validCode.value = code.toLowerCase()
}
// 验证码校验
const validateCode = (rule:any, value:any, callback:any) => {
  if (value === '') {
    callback(new Error('请输入验证码'))
  } else if (value.toLowerCase() !== validCode.value) {
    callback(new Error('验证码错误'))
  } else {
    callback()
  }
}
const user = reactive({
  code:'',        //用户输入的code
  username:'',
  password:''
})

const rules = reactive({
  username: [{ required:true,message:'请输入账号', trigger: 'blur' }],
  password: [{ required:true,message:'请输入密码', trigger: 'blur' }],
  code: [{ validator: validateCode, trigger: 'blur' }],
})

const login = (formEl: FormInstance | undefined) =>{
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid){
      Login({ username: user.username, password: user.password }).then(res =>{
        if (res.data.code === 200){
          console.log(res);
          //将token进行报存
          localStorage.setItem('token',JSON.stringify(res.data.data));
          console.log(document.cookie)
          ElMessage.success("登陆成功");
          //跳转界面
          router.push('/manager')
        }else {
          console.log(res)
          ElMessage.error(res.data.message)
        }
      })
      console.log("登录成功")
    }else {
      console.log("登录失败")
      return false
    }
  })
}

const forgetPassDialogVis = ref(false)

const form = reactive({
  username:'',
  phone:''
})

const handleForgetPass = () =>{
  form.username = ''
  form.phone = ''
  forgetPassDialogVis.value = true
}
const resetPassword = () =>{
  ResetPassword(form).then(res=>{
    if (res.data.code === 200){
      ElMessage.success('密码重置成功')
      forgetPassDialogVis.value = false
    }else {
      ElMessage.error('密码重置失败')
    }
  })
}

</script>

<style scoped lang="scss">

</style>