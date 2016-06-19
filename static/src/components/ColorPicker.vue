<template>
  <ul class="color-picker">
    <li v-for="oneColor in colors"><i
      :class="['fa', oneColor === color ? 'fa-check-square' : 'fa-square', 'fa-'+oneColor]"
      @click="selectIt(oneColor)"></i></li>
  </ul>
</template>
<style>

</style>
<script>
  export default{
    props: ['color'],
    data: function () {
      if (!this.color) {
        this.color = 'red';
      }
      return {
        colors: ['red', 'blue', 'purple', 'orange', 'yellow', 'green']
      }
    },
    methods: {
      selectIt: function (color) {
        this.color = color;
      }
    }
  }
</script>
