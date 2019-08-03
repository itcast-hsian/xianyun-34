<template>
    <div style="padding:50px">

        <!-- fetch-suggestions：每次输入值都会触发 -->
        <el-autocomplete
        v-model="value"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        @select="handleSelect"
        ></el-autocomplete>

    </div>
</template>

<script>
export default {
    data(){
        return {
            // 相当于后台返回的数据
            list: [
                { text: "abc" },
                { text: "apple" },
                { text: "usa" },
                { text: "bbc" },
            ],

            value: "", // 输入框的值

        }
    },

    methods: {
        // value就是输入框的值
        // cb是回调函数，必须要调用的，调用时候接受数组，数组中必须是一个对象，对象中必须包含value属性
        querySearchAsync(value, cb){
            // 要显示在页面的数组
            var arr = []

            // 过滤value属性，从list数据中判断
            this.list.forEach( v => {
                // 判断字符串是否包含输入框的值
                if(v.text.indexOf(value) > -1){
                    v.value = v.text;
                    arr.push(v);
                }
            })

            cb(arr)
        },

        handleSelect(item){
            console.log(item)
        }
    }
}
</script>

<style>

</style>
