<template>
    <div class="mainContent-box">
        <!-- 收藏模块 -->

        <div class="collect-list-bo">
            <div class="collect-list-header">
                <div class="collect-list-title">
                    <h4><a href="jscrip:;">我的收藏夹</a></h4>
                </div>
            </div>
            <div class="collect-list-footer">
                <div class="collect-list-footer-content">
                    <div class="collect-list-left">
                        <div>最近更新 2023.07.10</div>
                        <div>3 内容</div>
                        <div>0 关注</div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

</script>

<style lang="scss">
.mainContent-box {
    height: 580px;
    // overflow: auto;
    background-color: #fff;
}

.collect-list-bo {
    padding: 24px 0;
    margin: 0 24px;
    border-bottom: 1px solid #f0f0f2;
}

.collect-list-header {
    display: flex;
    justify-content: space-between;
}

.collect-list-title {
    display: flex;
    align-items: center;
}

.collect-list-footer {
    margin-top: 16px;
    color: #555666;
    font-size: 14px;
}

.collect-list-footer-content {
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}

.collect-list-left {
    display: flex;
    color: #555666;
}

.collect-list-left>div {
    margin-right: 10px;
}
</style>