<template>
    <div>
        {{ abc }}
    </div>
</template>

<script>
export default {

    // 声明组件可以接收哪些属性
    // props: ["abc", "arr"],

    props: {
        abc: {
            // 声明属性的类型
            type: String,
            default: ""
        },

        arr: {
            type: Array,
            default: []
        }
    },

    mounted(){
        this.arr.push(5);
        console.log(this.arr)
    }

}
</script>

<style>

</style>
