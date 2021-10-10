<template>
    <div>
        <van-address-edit
                :area-list="areaList"
                show-delete
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
        data() {
            return {
                areaList: AreaList,
            };
        },
        methods: {
            onSave(item) {

                var that = this;
                axios.post("http://localhost:8181/address/create",item).then(function (resp) {
                    if (resp.data.code == 0) {
                        let instance = Toast("添加成功");
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