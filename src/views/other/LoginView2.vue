<template>
    <div class="login">
        <Particles
                id="tsparticles"
                class="login__particles"
                :particlesInit="particlesInit"
                :particlesLoaded="particlesLoaded"
                :options="options"
        />
    <div class="login-box">
        <h2>用户登录</h2>
        <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                status-icon
                :rules="rules"
                label-width="120px"
                class="demo-ruleForm"
                style="transform:translate(-30px);"
                @submit.prevent
        >
            <el-form-item label="账号:" prop="username">
                <el-input v-model="ruleForm.username"  placeholder="请输入账号" maxlength="20" autocomplete="true" clearable/>
            </el-form-item>
            <el-form-item label="密码:" prop="password" clearable>
                <el-input
                        v-model="ruleForm.password"
                        type="password"
                        placeholder="请输入密码"
                        maxlength="20"
                        autocomplete="true"
                        show-password
                />
            </el-form-item>
            <el-form-item label="验证码：" prop="code">
                <el-input style="width: 150px;" v-model="ruleForm.code" placeholder="请输入验证码" maxlength="4" clearable @keyup.enter="onSubmit(ruleFormRef)" />
                <img class="verifyCodeImg" :src="imgUrl" @click="resetImg">
            </el-form-item>
            <el-form-item>
                <el-button class="btn" type="primary" @click="submitForm(ruleFormRef)"
                >登录</el-button
                >
                <div style="text-align: right;transform:translate(0,30px);">
                    <el-link type="warning" @click="changeRegist">没有账号？去注册</el-link>
                </div>
            </el-form-item>
        </el-form>
    </div>
    </div>
</template>

<script lang="ts" setup>
    import { reactive, ref} from "vue";
    import {FormInstance, FormRules} from "element-plus";
    import { loadFull } from "tsparticles"
    import type { Engine } from 'tsparticles-engine'
    import {UserLogin} from "@/apis/user";
    import {useRouter} from "vue-router";

    const router = useRouter()
    const ruleFormRef = ref<FormInstance>();
    const validateUsername = (rule: any, value: any, callback: any) => {
        if (value === ''){
            callback(new Error('请输入账号'))
        }else {
            callback()
        }
    }
    const validatePassword = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('请输入密码'))
        } else {
            callback()
        }
    }

    const checkCode = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('请输入验证码'))
        }  else {
            callback()
        }
    }

    const ruleForm = reactive({
            username:"",
            password:"",
            code:"",
    })
    const rules = reactive<FormRules<typeof ruleForm>>({
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        code: [{ validator: checkCode, trigger: 'blur' }],
    })

    let imgUrl=ref("http://47.120.37.156:8080/verifyCode?time="+new Date());
    //47.120.37.156
    const resetImg=()=>{
        imgUrl.value = "http://47.120.37.156:8080/verifyCode?time="+new Date();
    }

    const particlesInit = async (engine:Engine) => {
        await loadFull(engine)
    }

    const particlesLoaded = async (container:any) => {
        console.log('Particles container loaded', container)
    }
    const options = reactive({
        fpsLimit: 60,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: 'push' // 可用的click模式有: "push", "remove", "repulse", "bubble"。
                },
                onHover: {
                    enable: true,
                    mode: 'grab' // 可用的hover模式有: "grab", "repulse", "bubble"。
                },
                resize: true
            },
            modes: {
                bubble: {
                    distance: 400,
                    duration: 2,
                    opacity: 0.8,
                    size: 40
                },
                push: {
                    quantity: 4
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                grab: {
                    distance: 200,
                    duration: 0.4
                },
                attract: { // 鼠标悬浮时，集中于一点，鼠标移开时释放产生涟漪效果
                    distance: 200,
                    duration: 0.4,
                    factor: 5
                }
            }
        },
        particles: {
            color: {
                value: '#ffffff'
            },
            links: {
                color: '#ffffff', // '#dedede'。线条颜色。
                distance: 150, // 线条长度
                enable: true, // 是否有线条
                opacity: 0.5, // 线条透明度。
                width: 1 // 线条宽度。
            },
            collisions: {
                enable: false
            },
            move: {
                direction: 'none',
                enable: true,
                outMode: 'bounce',
                random: false,
                speed: 4, // 粒子运动速度。
                straight: false
            },
            number: {
                density: {
                    enable: true,
                    area: 800
                },
                value: 80 // 粒子数量。
            },
            opacity: {
                value: 0.5 // 粒子透明度。
            },
            shape: {
                type: 'star' // 可用的粒子外观类型有："circle","edge","triangle", "polygon","star"
            },
            size: {
                random: true,
                value: 5
            }
        },
        detectRetina: true
    })

    const submitForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate((valid) => {
            if (valid) {
                UserLogin(ruleForm).then(res=>{
                    if (res.data.code == 200){
                        console.log(res);
                        //将token进行报存
                        localStorage.setItem('token',res.data.token);
                        alert("登陆成功");
                        //跳转界面
                        router.push('/admin')
                    }else {
                      console.log(res)
                        alert(res.data.message)
                    }
                })
                console.log('submit!')
            } else {
                console.log('error submit!')
                return false
            }
        })
    }

</script>

<style scoped>
    .login {
      height: 100%;
      width: 100%;
      //overflow: hidden;
    }
    .login__particles{
      height: 100%;
      width: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-image: url('@/assets/background.gif');
      opacity:0.9;
      position:fixed;
      pointer-events: none;
    }
    .login-box{
        position:absolute;
        /*定位方式绝对定位absolute*/
        top:50%;
        left:50%;
        /*顶和高同时设置50%实现的是同时水平垂直居中效果*/
        transform:translate(-50%,-50%);
        /*实现块元素百分比下居中*/
        width:450px;
        padding:50px;
        background: rgba(255,204,255,.3);
        /*背景颜色为黑色，透明度为0.8*/
        box-sizing:border-box;
        /*box-sizing设置盒子模型的解析模式为怪异盒模型，
        将border和padding划归到width范围内*/
        box-shadow: 0px 15px 25px rgba(0,0,0,.5);
        /*边框阴影  水平阴影0 垂直阴影15px 模糊25px 颜色黑色透明度0.5*/
        border-radius:15px;
        /*边框圆角，四个角均为15px*/
    }
    h2{
        margin:0 0 30px;
        padding:0;
        color: #fff;
        text-align:center;
        /*文字居中*/
    }
</style>