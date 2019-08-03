<template>
    <div style="padding:50px; position:relative; width:520px;">
        <div class="ctrl">
            <span 
            @mouseenter="current = index" 
            v-for="(item, index) in [1,1,1]"
            :key="index"
            :class="{ active: current === index }"></span>
        </div>

        <div>
            <ul>
                <li v-show="current === 0">
                    <img src="https://img.alicdn.com/simba/img/TB1Si2ObAH0gK0jSZPiSuuvapXa.jpg" alt="" srcset="">
                </li>
                <li v-show="current === 1">
                    <img src="https://img.alicdn.com/tps/i4/TB19knBbND1gK0jSZFsSuvldVXa.jpg_q90_.webp" alt="" srcset="">
                </li>
                <li v-show="current === 2">
                    <img src="https://aecpm.alicdn.com/tps/i2/TB10vPXKpXXXXacXXXXvKyzTVXX-520-280.jpg" alt="" srcset="">
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return {
            current: 0 , // 当前显示的下标，动态变化
        }
    }
}
</script>

<style scoped>
    .ctrl{
        position:absolute;
        left: 50%;
        margin-left:-20px;
        bottom: 60px;
    }

     .ctrl span{
         width:10px;
         height:10px;
         display: inline-block;
         background:rgba(255,255,255, 0.7);
         box-shadow: 2px 2px 2px #333;
         margin: 0 2px;
         border-radius:50px;
         cursor: pointer;
     }

     .ctrl .active{
         background: red;
     }
</style>
