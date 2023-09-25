<template>
    <el-input v-model="input" placeholder="Please input" clearable />
</template>
  
<script setup>
import { ref } from 'vue'
const input = ref('123')
</script>

<style scoped></style>