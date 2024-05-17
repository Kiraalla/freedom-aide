exports.moduleFile = `
import { defineStore } from 'pinia';

export const useMyStore = defineStore({
  id: 'myStore',
  state: () => ({
    data: 'example data',
  }),
  getters: {
    getData() {
      return this.data;
    },
  },
  actions: {
    fetchData() {
      // 异步操作示例
    },
  },
  mutations: {
    setData(newValue) {
      this.data = newValue;
    },
  },
});
`