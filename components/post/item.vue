<template>
    <div class="item">
        {{data.title}}

        <items v-for="(item, index) in data.children" :key="index" :data="item"/>
    </div>
</template>

<script>
export default {
    // 组件名字，组件内部可以通过该属性自己调用自己
    name: "items",
    props: ["data"]
}
</script>

<style scoped>
.item div{
    padding-left:50px;
}
</style>
