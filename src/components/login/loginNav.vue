<template>
    <div id="loginNav">
        <div class="nav_right">
            <div class="logo">
                <img src="https://qq-web.cdn-go.cn/zc.qq.com/f59c7d00/v3/img/qq-logo.svg" alt="">
            </div>
        </div>
        <div class="nav_left"></div>
    </div>
</template>
  
<script>
export default {
    name: 'LoginNav',
    data() {
        return {

        };
    },
}
</script>

<style lang="scss" scoped>
#loginNav {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    // display: flex;
    padding-left:56px;
    border-bottom: 1px solid #bbd9ea;

    .nav_right{
        width: 75%;
        height: 100%;
        line-height: 75px;

        .logo{
            width: 80px;
            height: 70px;
            background-repeat: no-repeat;

            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>