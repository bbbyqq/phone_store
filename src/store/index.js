// 引用vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 选择的第几个商品
        specsId: '',
        // 选择了几个商品
        quantity: ''
    },
    mutations: {

    },
    actions: {              // actions提交mutations

    },
    modules: {  //子模块，一般在主模块中用到

    }
})