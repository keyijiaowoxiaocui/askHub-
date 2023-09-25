<template>
    <div class="summary-box">
        <textarea class="summary-textarea" v-model="articleContent" @input="handleInput" placeholder="请输入文章内容"></textarea>
        <p class="summary-info">
            字数：{{ currentCount }}/{{ maxCount }}
            <button type="submit">一键输入</button>
        </p>
    </div>
</template>
  
<script>
export default {
    name: "SummaryBox",
    data() {
        return {
            articleContent: "",
            maxCount: 260,
            currentCount: 0,
            summary: "",
        };
    },
    methods: {
        handleInput() {
            this.currentCount = this.articleContent.length;
            if (this.currentCount <= this.maxCount) {
                this.summary = this.articleContent;
            } else {
                this.summary = this.articleContent.slice(0, this.maxCount) + "...";
            }
        },
    },
};
</script>
  
<style scoped>
.summary-box {
    position: relative;
    width: 100%;
}

.summary-textarea {
    width: 100%;
    height: 150px;
    padding: 10px;
    resize: none;
    margin-top: 20px;
    margin-left: -30px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 2px;
    outline: none;
}

.summary-textarea:focus {
    border: 1px solid #409eff;
}

.summary-info {
    position: absolute;
    top: 136px;
    left: 100px;
    font-size: 14px;
    color: #888;
}

.summary-info>button {
    margin-left: 5px;
    height: 32px;
    padding: 2px 16px;
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: auto 0;
    width: 100px;
    margin-left: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    background-color: #f4f5f5;
    color: #86909c;
}

.summary-info>button:hover {
    background-color: #e5e6eb;
}
</style>