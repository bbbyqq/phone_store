<template>
    <div>
        <van-address-edit
                :area-list="areaList"
                show-delete
                :address-info="addressInfo"
                save-button-text="修改"
                @save="onSave"
                @delete="onDelete"
        />
    </div>
</template>

<script>
    // 引入axios
    const axios = require('axios');
    import {Toast} from "vant";
    import AreaList from "../api/area";

    export default {
        created() {
            let data = JSON.parse(this.$route.query.item);
            this.addressInfo = data;
            let index = data.address.indexOf("区");
            if (index < 0) index = data.address.indexOf("县");
            this.addressInfo.addressDetail = data.address.substring(index + 1);
        },
        data() {
            return {
                areaList: AreaList,
            };
        },
        methods: {
            onSave(item) {
                var that = this;
                axios.put("http://localhost:8181/address/uodate",item).then(function (resp) {
                    if (resp.data.code == 0) {
                        let instance = Toast("修改成功");
                        setTimeout(() => {
                            instance.close();
                            that.$router.push("/addressList");
                        }, 1000);
                    }
                })
            },
            onDelete() {
                // 退回上一页
                history.go(-1);
            },
        },
    };
</script>