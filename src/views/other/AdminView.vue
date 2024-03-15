<template>
    <el-container class="layout-container-demo" style="height: 590px; border:1px solid #eee">
        <el-aside width="180px" style="border:1px solid #eee">
            <el-scrollbar>
                <el-menu :default-openeds="['1', '3']" >
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon><HomeFilled /></el-icon>首页
                        </template>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon><icon-menu /></el-icon>商品管理
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">
                                <router-link to="/admin">
                                    商品详情
                                </router-link>
                            </el-menu-item>
                            <el-menu-item index="2-2">
                                <router-link to="/login">
                                    添加商品
                                </router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="3">
                        <template #title>
                            <el-icon><setting /></el-icon>其他
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">测试一</el-menu-item>
                            <el-menu-item index="3-2">测试二</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <div class="toolbar">
                    <el-dropdown>
                        <el-icon style="margin-right: 8px; margin-top: 1px"
                        ><setting
                        /></el-icon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>View</el-dropdown-item>
                                <el-dropdown-item>Add</el-dropdown-item>
                                <el-dropdown-item>Delete</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <span>校园商城购物平台</span>
                </div>
            </el-header>

            <br>
            <el-main style="margin-left: 10px">

<!--                表单-->
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="商品名">
                        <el-input v-model="formInline.user" placeholder="商品名" clearable />
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
                                v-model="entrydate"
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
</template>

<script lang="ts" setup >
    import {onMounted, reactive} from 'vue'
    import {Menu as IconMenu ,HomeFilled,Setting} from "@element-plus/icons-vue";
    import {GetProductPage, GetTotal} from "@/apis/product";
    import {valueEquals} from "element-plus";

    const state = reactive({
        currentPage:1,
        pageSize:10,
        Total:0,
        tableData:[],
    })


    function getProductPage(){
        const param = {
            page:state.currentPage,
            pageSize:state.pageSize,
        }
        GetProductPage(param).then(res =>{
            console.log(res)
            console.log(param)
            if (res.data.code == 200){
                state.tableData = res.data.date;
            }
        })
    }
    onMounted(() => {
        getProductPage();
        GetTotal().then(res =>{
            if (res.data.code == 200){
                state.Total = res.data.data;
            }else {
                console.log(res)
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

    // const item = {
    //     id: '1',
    //     image: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    //     name: 'Tom',
    //     description: '1',
    //     price: '20',
    //     type: '食品',
    //     stock: '10',
    //     date: '2016-05-02',
    //
    // }
    //
    // const tableData= ref(Array.from({length:20}).fill(item))

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

<style scoped>
    .demo-form-inline .el-input{
        --el-input-width: 200px;
    }
    .el-select{
        width: 100px;
    }
    .layout-container-demo .el-header {
        position: relative;
        background-color: var(--el-color-primary-light-7);
        color: var(--el-text-color-primary);
    }
    .layout-container-demo .el-aside {
        color: var(--el-text-color-primary);
        background: var(--el-color-primary-light-8);
    }
    .layout-container-demo .el-menu {
        border-right: none;
    }
    .layout-container-demo .el-main {
        padding: 0;
    }
    .layout-container-demo .toolbar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        right: 20px;
    }

</style>

