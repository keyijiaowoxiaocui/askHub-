<template>
  <div class="recommend_user w">
    <div class="content">
      <h1>原创写手&nbsp;<span class="iconfont icon-keben"></span></h1>
      <div class="flex">
        <Avatar_name />
      </div>
    </div>
  </div>
</template>

<script>
import Avatar_name from '@/components/Avatar_name'
export default {
  components: {
    Avatar_name,
  },
};
</script>

<style lang="scss" scoped>
.recommend_user {
  background-color: pink;
  height: 500px;
  border: transparent;
}
h1 {
  width: 1200px;
  display: block;
  padding-top: 50px;
  padding-left: 50px;
  color: #000000;
}
.flex {
  position: relative;
  width: 1200px;
  height: 359px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.iconfont {
  font-size: 31px;
}
</style>
