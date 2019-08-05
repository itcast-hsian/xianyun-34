<template>
    <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span v-for="(item, index) in tabs" :key="index"
            @click="handleSearchTab(item, index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>

        <el-form class="search-form-content" ref="form" label-width="80px">

            <el-form-item label="出发城市">
                
                <!-- fetch-suggestions: 当每次在输入框中输入文字时候会触发该事件 -->
                <!-- select：选中下拉列表的选项时候触发的事件 -->
                <el-autocomplete
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                class="el-autocomplete"
                v-model="form.departCity"
                ></el-autocomplete>

            </el-form-item>

            <el-form-item label="到达城市">
                <el-autocomplete
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                class="el-autocomplete"
                v-model="form.destCity"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                @change="handleDate"
                v-model="form.departDate">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>
            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>  
      </div>
</template>

<script>

import moment  from "moment";

export default {
    data(){
        return {
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab: 0,

            // 表单数据
            form: {
                departCity: "",
                departCode: "",
                destCity: "",
                destCode: "",
                departDate: ""
            }
        }
    },
    methods: {
        // tab切换时触发
        handleSearchTab(item, index){
            if(index === 1){
                this.$alert("暂时不支持往返", "提示", { type: "warning" });
            }
        },
        
        // 出发城市每次输入值时候触发
        // value: 输入框的值
        // cb：回调函数，必须要调用，接收的参数格式是固定的,必须是一个数组，数组中每一项必须是一个对象
        // 对象中必须包含value属性
        queryDepartSearch(value, cb){

            // 没有输入框的值时候返回
            if(!value) {
                cb([]);
                return;
            }

            // 获取城市列表
            this.$axios({
                url: "/airs/city",
                // 设置get请求的参数
                params: {
                    name: value
                }
            }).then(res => {
                const {data} = res.data;

                // 循环给每一项数据添加一个value属性,map写法
                // const newData = data.map( v => {
                //     v.value = v.name.replace("市", ""); // 城市名称
                //     return v;
                // } )

                // forEach写法
                const newData = [];
                data.forEach(v => {
                    v.value = v.name.replace("市", "");
                    newData.push(v);
                })

                //  设置第一个为选中的默认值
                this.form.departCity = newData[0].value;
                this.form.departCode = newData[0].sort;

                cb(newData);
            })
        },

        // 目标城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        queryDestSearch(value, cb){
             // 没有输入框的值时候返回
            if(!value) {
                cb([]);
                return;
            }

            // 获取城市列表
            this.$axios({
                url: "/airs/city",
                // 设置get请求的参数
                params: {
                    name: value
                }
            }).then(res => {
                const {data} = res.data;

                 // 循环给每一项数据添加一个value属性
                const newData = [];
                data.forEach(v => {
                    v.value = v.name.replace("市", "");
                    newData.push(v);
                })

                //  设置第一个为选中的默认值
                this.form.destCity = newData[0].value;
                this.form.destCode = newData[0].sort;

                cb(newData);
            })
        },
       
        // 出发城市下拉选择时触发
        handleDepartSelect(item) {
            // 赋值给出发城市
            this.form.departCity = item.value;
            // 赋值给出发城市代码
            this.form.departCode =  item.sort;
        },

        // 到达城市下拉选择时触发
        handleDestSelect(item) {
            this.form.destCity = item.value;
            this.form.destCode =  item.sort;
        },

        // 确认选择日期时触发
        handleDate(value){
            this.form.departDate = moment( value ).format("YYYY-MM-DD");
        },

        // 触发和目标城市切换时触发
        handleReverse(){
            const { departCity,  departCode,  destCity, destCode} = this.form;

            this.form.departCity = destCity;
            this.form.departCode = destCode;

            this.form.destCity = departCity;
            this.form.destCode = departCode;
        },

        // 提交表单是触发
        handleSubmit(){

            // 表单验证
            if(!this.form.departCity){
                this.$alert("出发城市不能为空", "提示", {
                    type: "warning"
                })
                return;
            }

            if(!this.form.destCity){
                this.$alert("到达城市不能为空", "提示", {
                    type: "warning"
                })
                return;
            }

            if(!this.form.departDate){
                this.$alert("出发时间不能为空", "提示", {
                    type: "warning"
                })
                return;
            }

            // 跳转到机票列表页
            this.$router.push({
                    path: "/air/flights",
                    // url的5个参数
                    query: this.form
            });

            // 获取出本地(vuex)的数据
            const arr = [...this.$store.state.air.history];
            
            // 新的记录添加到第一个
            arr.unshift(this.form);

            // 如果长度大于5，只保留5位
            if( arr.length > 5  ){
                arr.length = 5;
            }

            // 调用vuex的方法保存数据
            this.$store.commit("air/setHistory" ,arr )
        }
    },
    mounted() {
       
    }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>
