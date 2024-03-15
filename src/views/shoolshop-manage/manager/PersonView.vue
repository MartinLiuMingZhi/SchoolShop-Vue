<template>
  <div style="height: 80vh; display: flex;justify-content: center;align-items: center">
    <div style="display: flex;border-radius: 5px;overflow: hidden">
      <div style="flex: 1">
        <el-card style="width: 500px;height: 550px">
          <el-form :model="{user}" label-width="80px" style="padding-right: 20px;padding-left: 10px">
            <div style="margin: 15px;text-align: center">
              <el-upload
                  class="avatar-uploader"
                  action="http://47.120.37.156:8080/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
              >
                <img v-if="user.avatar" :src="user.avatar" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </div>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="user.username" placeholder="用户名" clearable></el-input>
            </el-form-item>
            <el-form-item label="状态码" prop="state">
              <el-input v-model="user.state" placeholder="状态码" disabled></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="role">
              <el-input v-model="user.role" placeholder="角色 " disabled></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="phone">
              <el-input v-model="user.phone" placeholder="电话号码 "></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="user.email" placeholder="邮箱 "></el-input>
            </el-form-item>
            <div style="text-align: center;margin-bottom: 20px;">
              <el-button type="primary" @click="update" style="width: 200px">保存</el-button>
            </div>
          </el-form>
        </el-card>
      </div>
      <div style="flex: 1">
        <img src="@/assets/newLogo.png" alt="" style="width: 500px;height: 550px;font-weight: bold;">
      </div>
    </div>
  </div>
</template>

<!--:headers="{ 'Content-Type': 'multipart/form-data'}"-->

<script setup lang="ts">
import { ElMessage, UploadProps} from "element-plus";
import {Update} from "@/apis/manager";
import {reactive} from "vue";

  const user = reactive(JSON.parse(localStorage.getItem('token')||'{}'));

  const handleAvatarSuccess: UploadProps['onSuccess'] = (
      response,
      uploadFile
  ) => {
    console.log(response)
    user.avatar = response.data.url
    console.log(user)
  }
  // const props = defineProps(['user'])
  const emit = defineEmits(['update:user'])
  const update = () =>{
    console.log(user)
    Update(user).then(res => {
      console.log(res.data.code)
      if (res.data.code === 200){
        ElMessage.success("保存成功")

        localStorage.setItem('token',JSON.stringify(user))
        console.log(JSON.parse(localStorage.getItem('token')||'{}'))
        //触发父级的数据更新
        emit('update:user',user)
      }else {
        ElMessage.error("保存失败,请重新操作")
      }
    })
  }
</script>

<style scoped lang="scss">

::v-deep(.el-form-item__label){
    font-weight: bold;
  }
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
  border-radius: 50%;
}
</style>

<style>
 .avatar-uploader .el-upload {
   border: 1px dashed var(--el-border-color);
   border-radius: 6px;
   cursor: pointer;
   position: relative;
   overflow: hidden;
   transition: var(--el-transition-duration-fast);
  border-radius: 50%;
 }

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  border-radius: 50%;
}
</style>