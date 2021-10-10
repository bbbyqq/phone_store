<template>
  <div>
    <div class="userinfo">
      aaaa
      <div class="userinfo-avatar">
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <div style="font-size: 34rpx">
        <open-data type="userNickName"></open-data>
      </div>
    </div>
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
export default {
  data() {
    return {
      active: 1,
      icon: {
        homeNormal: require("../../public/static/tabbar/index.png"),
        homeActive: require("../../public/static/tabbar/index_active.png"),
        userNormal: require("../../public/static/tabbar/mine.png"),
        userActive: require("../../public/static/tabbar/mine_active.png"),
      },
    };
  },
};
</script>

<style scoped>
.userinfo {
  position: relative;
  width: 750rpx;
  height: 320rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  overflow: hidden;
  display: block;
  width: 160rpx;
  height: 160rpx;
  margin: 20rpx;
  margin-top: 50rpx;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}
</style>
