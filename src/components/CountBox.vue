<template>
  <div class="count-box">
    <button class="minus" @click="handleSub">-</button>
      <input :value="value" class="inp" type="text" @change="handleChange">
    <button class="add" @click="handleAdd">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub () {
      // value -1
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    handleAdd () {
      // value +1
      this.$emit('input', this.value + 1)
    },
    handleChange (e) {
      // 直接修改 value
      const num = +e.target.value // 转换为数字
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box {
  width: 110px;
  display: flex;
  font-size: 16px;
  .add,
  .minus{
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
