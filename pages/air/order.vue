<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <OrderForm  @setInfoData="setInfoData"/>

            <!-- 侧边栏 -->
            <OrderAside  :data="infoData"/>
        </el-row>
    </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue";
import OrderAside from "@/components/air/OrderAside.vue";

export default {
    data(){
        return {
            // orderFrom组件传递过来值，再传给orderAside
            infoData: {}
        }
    },

    components: {
        OrderForm,
        OrderAside
    },

    methods: {

        // 用户接收子组件返回的数据
        setInfoData( data ){
            this.infoData = data;
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>