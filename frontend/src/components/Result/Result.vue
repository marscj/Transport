<template>
  <div class="result">
    <div>
      <a-icon :class="{ 'icon': true, [`${type}`]: true }" :type="localIsSuccess ? 'check-circle' : 'close-circle'"/>
    </div>
    <div class="title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div class="description">
      <slot name="description">
        {{ description }}
      </slot>
    </div>
    <div class="extra" v-if="$slots.default">
      <slot></slot>
    </div>
    <div class="action" v-if="$slots.action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script>
const resultEnum = ['success', 'error']

export default {
  name: 'Result',
  props: {
    /** @Deprecated */
    isSuccess: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: resultEnum[0],
      validator (val) {
        return (val) => resultEnum.includes(val)
      }
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  computed: {
    localIsSuccess: function () {
      return this.type === resultEnum[0]
    }
  }
}
</script>

<style lang="sass" scoped>
  
</style>
