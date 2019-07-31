<template>
    <div class="header">
        <div class="main">

            <el-row type="flex" justify="space-between">
                <!-- logo -->
                <div class="logo">
                    <img src="http://157.122.54.189:9093/images/logo.jpg" alt="">
                </div>

                <!-- 菜单 -->
                <el-row type="flex" class="navs">
                    <nuxt-link to="/">首页</nuxt-link>
                    <nuxt-link to="/post">旅游攻略</nuxt-link>
                    <nuxt-link to="/hotel">酒店</nuxt-link>
                    <nuxt-link to="/air">国内机票</nuxt-link>
                </el-row>

                <!-- 登录注册 -->
                <div v-if="!$store.state.user.userInfo.token">
                    <!-- <router-link to="/"></router-link>     -->
                    <nuxt-link to="/user/login">登录注册</nuxt-link>    
                </div>
                <!-- 登录之后的布局 -->
                <div v-else>

                    <el-dropdown>

                        <span class="el-dropdown-link">
                            <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt="">
                            {{$store.state.user.userInfo.user.nickname}}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>

                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>个人中心</el-dropdown-item>
                            <el-dropdown-item  @click.native="handleLogout">
                                 退出
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>

            </el-row>

        </div>
    </div>
</template>

<script>
export default {
    mounted(){
        // console.log( this.$store.state.user.userInfo.user.nickname)
    },

    methods: {
        handleLogout(){
            // 清除userinfo的数据
            this.$store.commit("user/clearUserInfo");
        }
    }
}
</script>

<style scoped lang="less">
    .header{
        height:60px;
        line-height:60px;
        border-bottom: 1px #ccc solid;
        box-shadow:  0 3px 3px #eee;
    }

    .main{
        width:1000px;
        margin: 0 auto;
    }

    .logo {
        margin-top:9px;
        img{
            width:156px;
            height:42px;
            display:block;
        }
    }

    .navs{
        flex: 1;
        margin-left: 20px;

        a{
            display:block;
            padding:0 20px;
            height:60px;
            line-height: 60px;
            box-sizing: border-box;

            &:hover{
                color: #409eff;
                border-bottom: 5px #409eff solid;
            }
        }

        //  nuxt会通过url匹配每个nuxt-link标签的链接，如果匹配上默认会加上nuxt-link-exact-active样式
        .nuxt-link-exact-active{
            background: #409eff;
            color:#fff;

            &:hover{
                color:#fff;
            }
        }
    }

    .el-dropdown-link{
        img{
            width: 36px;
            height:36px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right:5px;
        }
    }

</style>
