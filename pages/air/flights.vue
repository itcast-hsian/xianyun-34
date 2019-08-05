<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <FlightsFilters :data="cacheFlightsData" @getDataList="getDataList"/>
                
                <!-- 航班头部布局 -->
                <FlightsListHead/>
                
                <!-- 航班信息 -->
                <div>
                    <!-- flightsData.flights是后台返回的机票列表 -->
                    <FlightsItem 
                    v-for="(item, index) in dataList"
                    :key="index"
                    :data="item"/>

                    <!-- 分页 -->
                    <!-- @size-change：修改条数时候触发
                    @current-change：修改页数时候触发
                    current-page：当前页面
                    page-size：当前页面显示的条数
                    total：总条数 -->
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[2, 4, 6, 8]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
                <FlightsAside/>
            </div>
        </el-row>
    </section>
</template>

<script>

import FlightsListHead from "@/components/air/flightsListHead.vue"
import FlightsItem from "@/components/air/flightsItem.vue"
import FlightsFilters from "@/components/air/FlightsFilters.vue" 
import FlightsAside from "@/components/air/flightsAside.vue"

export default {
    data(){
        return {
            // 后台返回的大的数据列表
            flightsData: {
                info: {},
                options: {}
            },

            // 缓存的数据
            cacheFlightsData: {
                info: {},
                options: {}
            },

            // 保存当前显示的列表数据
            dataList: [],

            // 当前页数
            pageIndex: 1,
            // 显示的条数
            pageSize: 2,
            // 总条数
            total: 0
        }
    },

    components: {
        FlightsListHead,
        FlightsItem,
        FlightsFilters,
        FlightsAside
    },

        // watch是监听属性，可以监听实例下所有的属性变化 this.xxx
    watch: {
        // 监听路由信息的变化
        $route(){
            // console.log(this.$route)
            // 请求新的数据
            this.pageIndex = 1;
           this.getData();
        }
    },

    methods: {
        // 修改分页条数时候触发
        handleSizeChange(value){
            // 修改分页条数
            this.pageSize = value;
            // 获取分页的数据
            this.getDataList();
        },

        // 切换页数时候触发
        handleCurrentChange(value){
            // 修改页数
            this.pageIndex = value;

            // 获取分页的数据
            this.getDataList();
        },

        // 获取分页的数据
        getDataList(arr){

            // 过滤组件调用时候返回的过滤后的数据
            if(arr){
                // 替换掉列表数据
                 this.flightsData.flights = arr;

                 this.total = arr.length;
            }

             // 修改dataList的数据 //0 | 2 //2 | 4
           this.dataList = this.flightsData.flights.slice( 
               (this.pageIndex - 1) * this.pageSize,  
               (this.pageIndex  - 1) * this.pageSize + this.pageSize 
            );
        },

        // 请求列表数据
        getData(){
            this.$axios({
                url: "/airs",
                method: "GET",
                params: this.$route.query
            }).then(res => {
                // 保存总的大数据
                this.flightsData = res.data;

                // 缓存数据一旦赋值之后不能再被修改
                this.cacheFlightsData = {...res.data};
                
                // 总条数
                this.total = this.flightsData.flights.length;

                // 切割出当前页面要显示的数据
                this.dataList = this.flightsData.flights.slice( 0, 2 );
            });
        }
    },

    mounted(){
        // console.log(this.$route.query)
         // 请求列表数据
        this.getData();
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>