<template>
  <div>
    <van-col span="24">
      <van-tabs @click="ClickTabs">
        <van-tab
          v-for="index in categories.length"
          :title="categories[index - 1].name"
        >
          <van-card
            v-for="(item, key) in phones"
            :price="item.price"
            :desc="item.desc"
            :title="item.title"
            :thumb="item.thumb"
          >
            <template #tags>
              <van-tag
                v-for="tag in item.tag"
                color="#fa4e3a"
                style="margin-left: 5px"
                >{{ tag.name }}
              </van-tag>
            </template>
            <template #footer>
              <van-button size="small" type="info" round @click="ClickBuy(key)"
                >购 买
              </van-button>
              <van-divider />
            </template>
          </van-card>
        </van-tab>
      </van-tabs>
    </van-col>
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :hide-stock="sku.hide_stock"
      @buy-clicked="onBuyClicked"
    >
      <template #sku-actions="props">
        <div class="van-sku-actions">
          <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
          <van-button
            square
            size="large"
            type="danger"
            @click="props.skuEventBus.$emit('sku:buy')"
          >
            立即购买
          </van-button>
        </div>
      </template>
    </van-sku>
    <van-tabbar v-model="active" active-color="#ff0000">
      <van-tabbar-item :to="{ name: 'Home' }">
        <span>首页</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.homeActive : icon.homeNormal"
        />
      </van-tabbar-item>
      <van-tabbar-item :to="{ name: 'Mine' }">
        <span>我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.userActive : icon.userNormal"
        />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// 引入axios
const axios = require("axios");
export default {
  data() {
    return {
      categories: "",
      phones: "",
      show: false,
      sku: {},
      goods: {},
      active: 0,
      icon: {
        homeNormal: require("../../public/static/tabbar/index.png"),
        homeActive: require("../../public/static/tabbar/index_active.png"),
        userNormal: require("../../public/static/tabbar/mine.png"),
        userActive: require("../../public/static/tabbar/mine_active.png"),
      }
    };
  },
  created() {
    var that = this;
    axios.get("http://localhost:8181/phone/index").then(function (resp) {
      that.categories = resp.data.data.categories;
      that.phones = resp.data.data.phones;
    });
  },
  methods: {
    ClickTabs(index) {
      var that = this;
      axios
        .get(
          "http://localhost:8181/phone/findByCategoryType/" +
            this.categories[index].type
        )
        .then(function (resp) {
          that.phones = resp.data.data;
        });
    },

    ClickBuy(index) {
      this.show = true;
      var that = this;
      axios
        .get(
          "http://localhost:8181/phone/findSpecsByPhoneId/" +
            this.phones[index].id
        )
        .then(function (resp) {
          that.goods = resp.data.data.goods;
          that.sku = resp.data.data.sku;
        });
    },

    onBuyClicked(item) {
      // 存入vuex
      this.$store.state.specsId = item.selectedSkuComb.s1;
      this.$store.state.quantity = item.selectedNum;
      this.$router.push("/addressList");
    },
  },
};
</script>

<style>
</style>
