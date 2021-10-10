<template>
    <div class="goods">
        <van-cell-group class="goods-cell-group">
            <van-cell>
                <van-col span="16"
                >
                    <van-icon name="location-o" style="margin-right: 30px"/>
                    收货人：{{
                    data.buyerName
                    }}
                </van-col
                >
                <van-col>{{ data.tel }}</van-col>
                <van-col span="21" style="padding-left: 43px; font-size: 13px"
                >收货地址：{{ data.address }}
                </van-col
                >
            </van-cell>
        </van-cell-group>

        <van-card
                :num="data.num"
                :price="data.price"
                :desc="data.specs"
                :title="data.phoneName"
                :thumb="data.icon"
        />

        <van-cell-group class="goods-cell-group">
            <van-cell class="goods-express">
                <van-col span="21">配送方式</van-col>
                <van-col>快递</van-col>
            </van-cell>
        </van-cell-group>

        <van-cell-group class="goods-cell-group">
            <van-cell class="goods-express" style="font-weight: bold">
                <van-col span="20">商品金额</van-col>
                <van-col style="color: red">￥{{ data.amount - 10 }}</van-col>
            </van-cell>
        </van-cell-group>

        <van-cell-group>
            <van-cell class="goods-express" style="font-weight: bold">
                <van-col span="20">运费</van-col>
                <van-col style="color: red">￥{{ data.freight }}</van-col>
            </van-cell>
        </van-cell-group>

        <van-submit-bar
                :price="data.amount * 100"
                button-text="确认付款"
                @submit="onSubmit"
        />
    </div>
</template>

<script>
    // 引入axios
    const axios = require('axios');
    import {
        Tag,
        Col,
        Icon,
        Cell,
        Toast,
        CellGroup,
        Swipe,
        SwipeItem,
        GoodsAction,
        GoodsActionIcon,
        GoodsActionButton,
    } from "vant";

    export default {
        components: {
            [Tag.name]: Tag,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [GoodsAction.name]: GoodsAction,
            [GoodsActionIcon.name]: GoodsActionIcon,
            [GoodsActionButton.name]: GoodsActionButton,
        },
        data() {
            return {
                data: {
                    orderId:"",
                    amount:""
                },
            };
        },
        created() {
            var that = this;
            axios.get("http://localhost:8181/order/detail/" + this.$route.query.orderId).then(function (resp) {
                that.data = resp.data.data;
            })
        },
        methods: {
            onSubmit() {
                var that = this;
                axios.put("http://localhost:8181/order/pay/" + this.$route.query.orderId).then(function (resp) {
                    if (resp.data.code == 0) {
                        let instance = Toast("支付成功");
                        setTimeout(() => {
                            instance.close();
                            that.$router.push(
                                "/success?orderId=" +
                                that.data.orderId +
                                "&amount=" +
                                (that.data.amount)
                            );
                        }, 1000);
                    }
                })
            },
        },
    };
</script>