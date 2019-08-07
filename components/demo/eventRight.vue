<template>
    <div style="color: blue; margin-left:50px;">
        右侧的组件
        左侧传递过来的字符串： {{ str }}
    </div>
</template>

<script>
export default {
    props: {
        str: {
            type: String,
            default: ""
        }
    }
}
</script>

<style>

</style>
