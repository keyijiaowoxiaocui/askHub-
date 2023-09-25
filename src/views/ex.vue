<template>
  <div>
    <button @click="startWorker">Start Worker</button>
    <p style="color: #fff;">Worker Result: {{ workerResult }}</p>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const workerResult = ref('');

  const startWorker = () => {
    const worker = new Worker('/worker/worker.js'); // Web Worker 文件的路径

    worker.postMessage(100000); // 向 Worker 发送消息

    worker.onmessage = (event) => {
      workerResult.value = event.data; // 处理 Worker 返回的消息
    };
  };
</script>