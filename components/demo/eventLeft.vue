<template>
    <div style="color: red">
        左侧的组件
    </div>
</template>

<script>
export default {
    data(){
        return {
            name: "我是左侧的组件"
        }
    },

    mounted(){
        // $emit用于触发父组件传递的事件
        // 第二个参数是传递给函数的参数
        this.$emit("getName", this.name)
    }
}
</script>

<style>

</style>
