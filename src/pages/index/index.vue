<template>
    <view @click="onNext">next</view>
    <a id="123"/>
</template>
<script lang="ts" setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import a from './a.vue'
const workerRef = ref()

const onNext = () => {
    console.log(getCurrentInstance())
    uni.navigateTo({
        url: '/pages/b/a?id=123'
    })

}
</script>