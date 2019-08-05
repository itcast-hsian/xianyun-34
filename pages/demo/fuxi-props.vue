<template>
    <div style="padding:50px;">

        组件传值
        <Props  abc="123" />
    </div>
</template>

<script>
import Props from "@/components/props"

export default {

    data(){
        return {
            // list: [1,2,3,4]
            list: { a: 1, b:2 }
        }
    },

    components: {
        Props
    }
}
</script>

<style>

</style>
