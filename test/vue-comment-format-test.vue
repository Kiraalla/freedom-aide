<template>
  <!-- Vue 注释格式化测试 -->
  
  <!-- 测试用例 1: 简单注释 -->
  <div>简单内容</div>

  <!-- 测试用例 2: 包含代码的短注释 -->
  <!-- <div>这是注释中的代码</div> -->
  <div>实际内容</div>

  <!-- 测试用例 3: 多行注释 -->
  <!-- 
    <div class="complex">
      <span>多行注释代码</span>
    </div>
  -->
  <div>实际内容</div>

  <!-- 测试用例 4: 长注释（类似 WXML 的问题） -->
  <!-- <div class="car-collection"><van-checkbox :value="isSelectAll" @change="onSelectAllChange">全选(1)</van-checkbox><div class="wy-flex-none"><van-button plain round type="primary" size="small" class="wy-ml-12" custom-class="w180">收藏</van-button><van-button plain round type="primary" size="small" color="#999" class="wy-ml-12" custom-class="w180">删除</van-button></div></div> -->
  <div>实际内容</div>

  <!-- 测试用例 5: 包含 Vue 指令的注释 -->
  <!-- <div v-if="show" v-for="item in list" :key="item.id">{{ item.name }}</div> -->
  <div>实际内容</div>

  <!-- 测试用例 6: 包含插值表达式的注释 -->
  <!-- <div>{{ message }}</div> -->
  <div>{{ actualMessage }}</div>

  <!-- 测试用例 7: 包含事件绑定的注释 -->
  <!-- <button @click="handleClick">点击</button> -->
  <button @click="handleRealClick">实际按钮</button>

  <!-- 测试用例 8: 嵌套结构中的注释 -->
  <div class="container">
    <!-- 头部注释 -->
    <div class="header">
      <!-- <div>注释中的代码</div> -->
      <h1>标题</h1>
    </div>
    <!-- 底部注释 -->
  </div>
</template>

<script>
export default {
  name: 'VueCommentFormatTest',
  data() {
    return {
      actualMessage: 'Hello',
      show: true,
      list: []
    }
  },
  methods: {
    handleRealClick() {
      console.log('clicked')
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
