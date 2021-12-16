<template>
    <view>props: {{id}}</view>
</template>
<script lang="ts" setup>
import { getCurrentInstance } from 'vue'
console.log(getCurrentInstance())
defineProps(['id'])
</script>