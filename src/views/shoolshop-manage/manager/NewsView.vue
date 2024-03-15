<template>
  <div>
    <div>
      <el-input style="width: 200px" placeholder="查询标题" v-model="title"></el-input>
      <el-button type="primary" style="margin-left: 10px" @click="load(1)">查询</el-button>
      <el-button type="info" @click="reset">重置</el-button>
    </div>
    <div style="margin: 10px 0">
      <el-button type="primary" plain @click="handleAdd">新增</el-button>
      <el-button type="danger" plain @click="delBatch">批量删除</el-button>
    </div>
    <el-table :data="tableData" stripe :header-cell-style="{ backgroundColor: 'aliceblue', color: '#666' }" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="id" label="序号" width="70" align="center"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="description" label="简介"></el-table-column>
      <el-table-column prop="content" label="内容" show-overflow-tooltip></el-table-column>
      <el-table-column prop="author" label="发布人"></el-table-column>
      <el-table-column prop="time" label="发布时间"></el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template v-slot="scope">
          <el-button size="mini" type="primary" plain @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" plain @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin: 10px 0">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total">
      </el-pagination>
    </div>

    <el-dialog title="新闻信息" v-model="fromVisible" width="60%" destroy-on-close>
      <el-form :model="form" label-width="80px" style="padding-right: 20px" :rules="rules" ref="formRef">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="description">
          <el-input v-model="form.description" placeholder="简介"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
<!--          <el-input v-model="form.content" placeholder="内容"></el-input>-->
          <div id="editor"></div>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="fromVisible = false">取 消</el-button>
          <el-button type="primary" @click="save(formRef)">确 定</el-button>
        </div>
      </template>
    </el-dialog>


  </div>
</template>

<script setup lang="ts">
import {nextTick, reactive, ref, toRefs} from "vue";
  import E from 'wangeditor'
  import {ElMessage, ElMessageBox, FormInstance} from "element-plus";
import hljs from 'highlight.js'
import {deleteBatch, deleteById, saveData, selectByPage} from "@/apis/news";

  const formRef = ref<FormInstance>()
  const user = JSON.parse(localStorage.getItem('token')||'{}')

  let editor: any = null
  const state = reactive({
    title:'',
    tableData:[],
    pageNum:1,
    pageSize:5,
    total:0,
    ids:[],
    username:'',
    fromVisible:false,
    // form:{}
  })
  const {title,tableData,pageNum,pageSize,total,ids,username,fromVisible} = toRefs(state)

  const form = reactive({
    id:0,
    title:'',
    description:'',
    content:''
  })

  const rules = reactive({
    title:[{ required:true,message:'请输入标题', trigger: 'blur' }],
  })
  const load =(pageNum?:any) => {
    if (pageNum) pageNum = pageNum.value
    selectByPage({page:pageNum,pageSize:pageSize.value,title:title.value}).then(res =>{
      if (res.data.code === 200){
        tableData.value = res.data.data.records
        total.value = res.data.data.total
      }
    })
  }

  const reset = () =>{
    title.value = ''
    load()
  }

  const handleAdd = () =>{
    form.id = 0;
    form.title = '';
    form.content = '';
    form.description = '';
    // form.value = {}
    fromVisible.value = true;
    nextTick(() => {
      editor = new E('#editor')
      editor.highlight = hljs
      editor.create()
    })
  }

  const delBatch = () =>{
    if (!ids.value.length){
      ElMessage.warning('请选择数据')
      return
    }
    ElMessageBox.confirm('您确认批量删除这些数据吗？', '确认删除', {confirmButtonText: 'OK', cancelButtonText: 'Cancel',type: "warning"}).then(response => {
      deleteBatch(JSON.stringify(ids.value)).then(res => {
        if (res.data.code === 200){
          ElMessage.success('操作成功')
          load(1)
        }else {
          ElMessage.error(res.data.message)
        }
      })
    })
  }

  const handleSelectionChange = (rows:any) =>{
    ids.value = rows.map((v: { id: number; }) => v.id)
  }

  const handleEdit = (row:any) =>{
    form.id = JSON.parse(JSON.stringify(row)).id
    form.title= JSON.parse(JSON.stringify(row)).title
    form.description = JSON.parse(JSON.stringify(row)).description
    form.content = JSON.parse(JSON.stringify(row)).content
    // form.value = JSON.parse(JSON.stringify(row))
    fromVisible.value = true;
    nextTick(() => {
      editor = new E('#editor')
      editor.highlight = hljs
      editor.create()
    })
  }

  const del = (id:number) => {
    ElMessageBox.confirm('您确认批量删除这些数据吗？', '确认删除', {confirmButtonText: 'OK', cancelButtonText: 'Cancel',type: "warning"}).then(response => {
      deleteById(id).then(res => {
        if (res.data.code === 200){
          ElMessage.success('操作成功')
          load(1)
        }else {
          ElMessage.error(res.data.message)
        }
      })
    })
  }

  const save = (formEl: FormInstance | undefined) =>{
    if (!formEl) return;
    formEl.validate((valid) => {
      if (valid){
        //获取编辑框的内容
        let content = editor.txt.html()
        form.content = content

        saveData(form).then(res => {
          if (res.data.code === 200){
            ElMessage.success("保存成功")
            load(1)
            fromVisible.value = false
          }else {
            ElMessage.error(res.data.message)
            console.log("请求失败")
          }
        })
      }else {
        console.log("表单错误")
        return false
      }
    })
  }

  const handleCurrentChange = (pageNum:any) =>{
    load(pageNum)
  }
</script>


<style scoped lang="scss">

</style>