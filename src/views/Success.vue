<template>
    <div>
        <!-- <van-image
                width="200"
                height="65"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/WeChat_Pay.png/800px-WeChat_Pay.png"
        /> -->
        <div class="paySuccess">支付成功</div>
        <van-cell :title="amount" style="text-align: center"/>
        <van-cell-group class="goods-cell-group">
            <van-cell class="goods-express">
                <van-col span="21">配送方式</van-col>
                <van-col>快递</van-col>
            </van-cell>
        </van-cell-group>
        <van-button type="primary" size="large" @click="showInfo">查看订单详情</van-button>
    </div>
</template>

<script>
    export default {
        name: "Success",
        data() {
            return {
                orderId: null,
                amount: null
            }
        },
        created(){
            this.orderId = this.$route.query.orderId
            this.amount = this.$route.query.amount
        },
        methods:{
            showInfo(){
                this.$router.push('/info?orderId='+this.orderId)
            }
        }
    }
</script>

<style scoped>
    .paySuccess {
        height: 50px;
        text-align: center;
        font-size: 24px;
        font-weight: 700;
        line-height: 50px;
    }
</style>