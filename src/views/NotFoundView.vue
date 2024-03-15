<template>
  <el-result title="404" sub-title="Sorry, request error">
    <template #icon>
      <el-image style="width: 55%; height: 100%"
          src="https://web-schoolshop.oss-cn-beijing.aliyuncs.com/R-C%20%281%29.jfif"
      />
    </template>
    <template #extra>
      <el-button type="primary" @click="$router.push('/')">回到首页</el-button>
    </template>
  </el-result>
</template>