
// 保存数据的属性 state
export const state = {
    // 用户信息
    userInfo: {
        token: "",
        user: {}
    }
}


// 同步修改数据 mutations
export const mutations = {
    
    // state就是上面的state，这个参数是固定默认的
    // data使用调用该方法时候传入的数据
    setUserInfo(state, data){
        state.userInfo  = data;
    }
}


// 异步修改数据 actions
export const actions = {
    
}
