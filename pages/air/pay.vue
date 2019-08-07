<template>
    <div class="container">
        <div class="main">
            <div class="pay-title">
                支付总金额 <span class="pay-price">￥ {{ infoData.price }}</span>
            </div>
            <div class="pay-main">
                <h4>微信支付</h4>
                <el-row type="flex" 
                justify="space-between" 
                align="middle"
                class="pay-qrcode">
                    <div class="qrcode">

                        <!-- 二维码 -->
                        <canvas id="qrcode-stage"></canvas>

                        <p>请使用微信扫一扫</p>
                        <p>扫描二维码支付</p>
                    </div>
                    <div class="pay-example">
                        <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
                    </div>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import QRCode from "qrcode";

export default {
    data(){
        return {
            // 订单详情
            infoData: {},
            timer: null
        }
    },

    methods: {
        // 查询付款状态，没3秒查询一次
        // 返回promise
        isPay(){
            // 查询 
            return this.$axios({
                url: "/airorders/checkpay",
                method: "POST",
                data: {
                    id: this.infoData.id,
                    nonce_str:  this.infoData.price,
                    out_trade_no: this.infoData.orderNo
                },
                headers: {
                    // JWT是后台的token的标准，前端只管传递一个Bearer
                    Authorization: `Bearer ${ this.$store.state.user.userInfo.token }`
                }
            }).then(res => {
                // console.log(res.data)
                return res.data;
            })
        }
    },
    
    mounted(){
        // 获取到id
        const {id} = this.$route.query;

        setTimeout(() => {

            // 获取订单详情
            this.$axios({
                url: "/airorders/" + id,
                headers: {
                    // JWT是后台的token的标准，前端只管传递一个Bearer
                    Authorization: `Bearer ${ this.$store.state.user.userInfo.token }`
                }
            }).then(res => {
                this.infoData = res.data;

                // canvas的标签
                const stage = document.querySelector("#qrcode-stage");
                // 生成二维码
                QRCode.toCanvas(stage, this.infoData.payInfo.code_url);

                // 查询付款的状态
                this.timer = setInterval(() => {
                    // 付款的状态
                    this.isPay().then( value => {
                        if(value.statusTxt === "支付完成"){
                            clearInterval( this.timer );
                            this.$message.success("支付成功，感谢100万的巨款")
                        }
                    } )
                }, 3000);
            })
        }, 1)
    },

    // 组件销毁时候触发
    destroyed(){
        clearInterval( this.timer );
    }
}
</script>

<style scoped lang="less">
.container{
    background:#f5f5f5;
    padding: 30px 0;

    .main{
        width:1000px;
        margin:0 auto;

        .pay-title{
            text-align: right;
            span{
                font-size:28px;
                color:orangered;
            }
        }

        .pay-main{
            background:#fff;
            margin-top:10px;
            border-top: 5px orange solid;
            padding:30px;

            h4{
                font-size: 28px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            .pay-qrcode{
                padding:0 80px;
            }

            .qrcode{
                border:1px #ddd solid;
                padding:15px;
                height: fit-content;

                #qrcode-stage{
                    width:200px;
                    height:200px;
                    margin-bottom: 10px;
                }

                p{
                    line-height: 2;
                    text-align: center;
                }
            }
        }
    }
}
</style>