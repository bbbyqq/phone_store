// 配置路由相关信息
import VueRouter from 'vue-router'
import Vue from 'vue'
import Home from '../views/Home.vue'
import Mine from '../views/Mine.vue'
import AddressList from '../views/AddressList.vue'
import AddressNew from '../views/AddressNew.vue'
import AddressEdit from '../views/AddressEdit.vue'
import Detail from '../views/Detail.vue'
import Success from '../views/Success.vue'
import Info from '../views/Info.vue'



const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

export default new VueRouter({
    // 配置路由和组件的关系
    mode:'history',
    base:process.env.BASE_URL,
    routes:[
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/mine',
            name: 'Mine',
            component: Mine
        },
        {
            path: '/addressList',
            name: '地址列表',
            component: AddressList
        },
        {
            path: '/addressNew',
            name: '新增地址',
            component: AddressNew
        },
        {
            path: '/addressEdit',
            name: '修改地址',
            component: AddressEdit
        },
        {
            path: '/detail',
            name: '订单详情',
            component: Detail
        },
        {
            path: '/success',
            name: '付款成功',
            component: Success
        },
        {
            path: '/info',
            name: '订单信息',
            component: Info
        }
    ]
})


