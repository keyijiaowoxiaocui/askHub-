<template>
  <div class="mood_notes">
    <h1>心&nbsp;情&nbsp;小&nbsp;记</h1>
    <div class="now">Now</div>
    <div ref="box1" class="container">
      <div class="vertical_line" ref="box2"></div>

      <Single_note_left />

      <!-- <Single_note_right /> -->
      <!-- <Single_note_left />
			<Single_note_right /> -->
    </div>
    <div class="learn w">
      <a href="javascript:;" id="more" @click="learn_more">了解更多</a>
    </div>
  </div>
</template>

<script>
import Single_note_left from "@/components/Single_note_left.vue"
import { useRouter } from "vue-router"
import { ref, onMounted, nextTick } from "vue"
export default {
  components: {
    Single_note_left,
    // Single_note_right,
  },

  setup () {
    const router = useRouter()
    const learn_more = () => {
      router.push("/article/5")
    }
    return {
      learn_more,
    }
  },
};
</script>

<style lang="scss" scoped>
.mood_notes {
  margin-top: -27px;
  width: 100%;

  //height: 900px;
  background-color: #ecf0f5;
}
.container {
  position: relative;
  //padding-bottom: 50px;
}
h1 {
  font-size: 36px;
  padding-top: 50px;
  text-align: center;
}
.now {
  text-align: center;
  line-height: 34px;
  color: #1171ee;
  border: 1px solid rgba(30, 128, 255, 0.3);
  width: 100px;
  height: 34px;
  background-color: #007fff;
  font-size: 14px;
  font-weight: 600;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 43px;
}
.vertical_line {
  position: absolute;
  width: 1px;
  //min-height: 100px;
  //z-index: 1000;
  //height: 131px;
  //border-color: rgb(21, 1, 1);
  height: 100%;
  z-index: 0;
  left: 50%;
  background-color: #98b2d2;
}
#more {
  text-align: center;
  line-height: 45px;
  display: block;

  width: 102px;
  height: 45px;
  background-color: #03a2ea;
  color: #fff;
  font-size: 17px;
  border-radius: 21px;
}
#more:hover {
  box-shadow: 0 0 10px 5px #b0b7c4;
  transform: scale(1.03);
}
.learn {
  //position: absolute;
  width: 102px;
  height: 49px;
  //left: 50%;
  //margin-left: -47px;
  background-color: #ecf0f5;
  //margin-top: 252px;
  padding-bottom: 30px;
}
</style>
