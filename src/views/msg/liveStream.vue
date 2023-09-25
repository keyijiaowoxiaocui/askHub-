<template>
  <div id="local_video"></div>
</template>
<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
let livePusher = ref();
onMounted(() => {
  start();
});
const start = function () {
  //创建视频对象 livePusher变量我写在了data中 不再复制了 ，也可以直接在methods中直接声明变量
  livePusher = new TXLivePusher();
  livePusher.setRenderView("local_video");
  // 设置音视频流
  livePusher.setVideoQuality("720p");
  // 设置音频质量
  livePusher.setAudioQuality("standard");
  // 自定义设置帧率
  livePusher.setProperty("setVideoFPS", 25);

  // 开启直播
  // 打开摄像头
  livePusher.startCamera();
  // 打开麦克风
  livePusher.startMicrophone();
  //这里延时了4秒进行推流 推流地址需要从后端接收。
  // setTimeout(() => {
  //   livePusher.startPush(推流地址);
  // }, 4000);
};
onBeforeUnmount(() => {
  confirm("是否离开直播？");
  // 1.停止推流
  // livePusher.stopPush();
  // 2.关闭摄像头
  livePusher.stopCamera();
  // 3.关闭麦克风
  livePusher.stopMicrophone();
  // 4.销毁容器对象
  livePusher.destroy();
});
</script>
<style>
.local_video {
  margin: 0 auto;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>