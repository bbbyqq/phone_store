<template>
    <div>
        <van-address-list
                v-model="chosenAddressId"
                :list="list"
                @add="onAdd"
                @edit="onEdit"
                @select="onselect"
        />
    </div>
</template>


<script>
    import {Toast} from "vant";
    // 引入axios
    const axios = require('axios');
    export default {
        data() {
            return {
                chosenAddressId: "0",
                list: []
            };
        },
        created() {
            var that = this;
            axios.get("http://localhost:8181/address/list").then(function (resp) {
                that.list = resp.data.data;
            })
        },
        methods: {
            onAdd() {
                this.$router.push("/addressNew");
            },
            onEdit(item, index) {
                let data = JSON.stringify(item);
                this.$router.push({path: "/addressEdit", query: {item: data}});
            },
            onselect(item) {
                let orderForm = {
                    name: item.name,
                    tel: item.tel,
                    address: item.address,
                    specsId: this.$store.state.specsId,
                    quantity: this.$store.state.quantity
                }

                var that = this
                axios.post("http://localhost:8181/order/create", orderForm).then(function (resp) {
                    if (resp.data.code == 0) {
                        let instance = Toast("下单成功");
                        setTimeout(() => {
                            instance.close();
                            that.$router.push("/detail?orderId="+resp.data.data.orderId);
                        }, 1000);
                    }
                })
            },
        },
    };
</script>