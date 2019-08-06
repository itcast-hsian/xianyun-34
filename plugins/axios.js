import {Message} from "element-ui";

// axios拦截插件,处理错误返回

// 每个nuxt的插件都会暴露出一个函数
// 插件的第一个参数是默认的nuxt对象
export default (  {$axios, redirect }  ) => {

    // axios的错误拦截
    $axios.onError( res => {
        // 判断错误信息， 提示错误的返回
        const {statusCode, message} = res.response.data;

        //  没有权限 401 ||403的错误
       if(statusCode === 401 || statusCode === 403){
           // 跳转到登录页
           redirect("/user/login");
       }

        // 400 的错误处理
        if(statusCode === 400){
            // alert(message);
            Message.warning(message);
        }
    } )
}