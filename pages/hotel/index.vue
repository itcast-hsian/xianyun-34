<template>
    <div>

        <div id="container"></div> 

    </div>
</template>

<script>
export default {
    mounted(){
        window.onLoad  = function(){
            var map = new AMap.Map('container', {
                zoom:11,//级别
                center: [118.8718107, 31.32846821],//中心点坐标
                viewMode:'3D'//使用3D视图
            });

            // 创建一个 Marker 实例：
            var marker = new AMap.Marker({
                position: new AMap.LngLat( 118.8718107, 31.32846821),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: '北京'
            });

            // 将创建的点标记添加到已有的地图实例：
            map.add(marker);
        }
        
        var url = 'https://webapi.amap.com/maps?v=1.4.15&key=8205e8295ae64dd2d94937ea12091506&callback=onLoad';
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
    }
}
</script>

<style>
    #container {width:500px; height: 500px; }  

</style>
