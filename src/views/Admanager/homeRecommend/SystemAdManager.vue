<template>
  <div class="SystemAdManager">
    <System-Ad type="homeRecommend" v-on:func="show" />
  </div>
</template>
<script>
import SystemAd from '../components/SystemAd.vue'
export default {
  components: {
    SystemAd
  },
  data () {
    return {

    }
  },
  methods: {
    show () {

    }
  }
}
</script>
<style lang="scss" scoped>

</style>
