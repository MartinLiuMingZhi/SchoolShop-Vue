<template>
  <div style="display: flex;justify-content: center;align-items: center;padding-top: 80px">
    <el-card style="width: 50%">
      <el-form ref="updateRef" :model="User" :rules="rules" label-width="80px" style="padding-right: 20px">
        <el-form-item label="原始密码" prop="password">
          <el-input show-password v-model="User.password" placeholder="原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input show-password v-model="User.newPassword" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input show-password v-model="User.confirmPassword" placeholder="确认密码"></el-input>
        </el-form-item>
        <div style="text-align: center; margin-bottom: 20px">
          <el-button type="primary" @click="update(updateRef)">确认修改</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<!--style="display: flex;align-items: center;justify-content: center"-->
<script setup lang="ts">
  import {reactive, ref} from "vue";
  import {ElMessage, FormInstance} from "element-plus";
  import {UpdatePassword} from "@/apis/manager";

  const updateRef = ref<FormInstance>();
  const user = reactive(JSON.parse(localStorage.getItem('token')||'{}'))
  const User = reactive({
    password:'',
    newPassword:'',
    confirmPassword:''
  })
  const validatePassword = (rule:any, confirmPassword:any, callback:any) => {
    if (confirmPassword === '') {
      callback(new Error('请确认密码'))
    } else if (confirmPassword !== User.newPassword) {
      callback(new Error('确认密码错误'))
    } else if (confirmPassword === User.password){
      callback(new Error('新密码与原密码一致'))
    }
    else {
      callback()
    }
  }

  const rules = reactive({
    password: [{ required:true,message:'请输入原密码', trigger: 'blur' }],
    newPassword:[{ required:true,message:'请输入修改密码', trigger: 'blur' }],
    confirmPassword:[{ validator: validatePassword, trigger: 'blur'}],
  })


  const update = (formEl: FormInstance | undefined) =>{
    if (!formEl) return;
    formEl.validate((valid) => {
      if (valid) {
        user.password = User.newPassword
        UpdatePassword(User).then(res =>{
          console.log(res)
          if (res.data.code === 200){
            ElMessage.success("修改密码成功")
          }else {
            ElMessage.error(res.data.message)
            // ElMessage.error("修改密码失败，请重试")
          }
        })
      }else {
        console.log("修改密码失败，请重试")
        return false
      }
    })
  }
</script>

<style scoped lang="scss">
::v-deep(.el-form-item__label ){
  font-weight: bold;
}
</style>