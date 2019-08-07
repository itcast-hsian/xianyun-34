<template>
    <div style="padding: 50px;">
        组件递归
        
        <Item v-for="(item, index) in list" :key="index" :data="item">
        </item>
    </div>
</template>

<script>
import Item from "@/components/post/item"
export default {

    data(){
        return {
            list: [
                {
                    title: "衣服",
                    children: [
                        { title: "男装" , children: [
                            { title: "老男人" },
                            { title: "正规男装" },
                        ]} ,
                        { title: "女装", children: [
                            { title:  "正规女装"},
                            { title:  "正规透视装"},
                        ] },
                        { title: "童装" }
                    ]
                },
                 {
                    title: "电器", children: [
                         { title: "正规按摩椅" },
                         { title: "正规电饭煲" },
                    ]
                }
            ]
        }
    },

    components: {
        Item
    }
}
</script>

<style>

</style>
