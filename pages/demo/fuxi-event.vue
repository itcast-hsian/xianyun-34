<template>
    <el-row type="flex" style="padding:50px;">

        <EventLeft @getName="getName"/>

        <EventRight :str="name"/>
        
    </el-row >
</template>

<script>

import EventLeft from "@/components/demo/eventLeft"
import EventRight from "@/components/demo/eventRight"

export default {
    data(){
        return {
            name: ""
        }
    },

    components: {
        EventLeft,
        EventRight
    },

    methods: {

        getName( str ){
            // 没有的方法
            this.name = str;
        }
    }
}
</script>

<style>

</style>
