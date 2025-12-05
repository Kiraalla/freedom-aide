<template>
  <!-- 自动补全引号功能测试文件 - Vue 版本 -->

  <!-- 测试 1: 正常属性赋值 - 应该触发补全 -->
  <div class="container">
    <!-- 在 class= 后输入等号，应该自动补全为 class="" -->
  </div>

  <!-- 测试 2: 在引号内输入等号 - 不应该触发补全 -->
  <div :data-value="'a=b'">
    <!-- 在 'a= 后输入等号，不应该补全 -->
  </div>

  <!-- 测试 3: Vue 指令 -->
  <div 
    v-if="show"
    v-for="item in list"
    :key="item.id"
    v-bind:class="className"
    v-on:click="handleClick">
    <!-- Vue 指令应该正常补全 -->
  </div>

  <!-- 测试 4: Vue 简写指令 -->
  <div 
    :class="className"
    :style="styleObject"
    @click="handleClick"
    @input="handleInput">
    <!-- 简写指令应该正常补全 -->
  </div>

  <!-- 测试 5: 动态属性 -->
  <div :[dynamicAttr]="value">
    <!-- 动态属性应该正常补全 -->
  </div>

  <!-- 测试 6: 修饰符 -->
  <input 
    @keyup.enter="handleEnter"
    @click.stop="handleStop"
    v-model.trim="inputValue">
    <!-- 带修饰符的指令应该正常补全 -->
  </input>

  <!-- 测试 7: 插槽 -->
  <component>
    <template v-slot:header="slotProps">
      <!-- 插槽应该正常补全 -->
    </template>
    <template #footer="{ data }">
      <!-- 简写插槽应该正常补全 -->
    </template>
  </component>

  <!-- 测试 8: 复杂表达式 -->
  <div 
    :class="{ active: isActive, 'text-danger': hasError }"
    :style="{ color: activeColor, fontSize: fontSize + 'px' }">
    <!-- 对象表达式中的引号不应该影响外部补全 -->
  </div>

  <!-- 测试 9: 字符串模板 -->
  <div :title="`Hello ${name}, age=${age}`">
    <!-- 模板字符串中的等号不应该触发补全 -->
  </div>

  <!-- 测试 10: 自定义指令 -->
  <div 
    v-custom-directive="value"
    v-custom:arg.modifier="value2">
    <!-- 自定义指令应该正常补全 -->
  </div>

  <!-- 测试 11: ref 引用 -->
  <div ref="myDiv">
    <!-- ref 应该正常补全 -->
  </div>

  <!-- 测试 12: is 属性 -->
  <component :is="currentComponent">
    <!-- is 属性应该正常补全 -->
  </component>

  <!-- 测试 13: 多行属性 -->
  <div
    class="container"
    :data-config="{
      key1: 'value1',
      key2: 'value2',
      equation: 'a=b'
    }">
    <!-- 多行属性中的等号不应该触发补全 -->
  </div>
</template>

<script>
export default {
  name: 'AutoQuoteDemo',
  data() {
    return {
      show: true,
      list: [],
      className: 'active',
      styleObject: {},
      dynamicAttr: 'data-id',
      value: '123',
      inputValue: '',
      isActive: true,
      hasError: false,
      activeColor: 'red',
      fontSize: 14,
      name: '张三',
      age: 25,
      currentComponent: 'MyComponent'
    }
  },
  methods: {
    handleClick() {},
    handleInput() {},
    handleEnter() {},
    handleStop() {}
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
