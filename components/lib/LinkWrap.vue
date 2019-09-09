<template>
  <client-only>
    <aff-link :baseUrl="this.baseUrl" :overwriteQuery="this.overwriteQuery" :valuesToPass="this.valuesToPass"><slot></slot></aff-link>
  </client-only>
</template>
<script>

export default {
  props: {
    baseUrl: {
      type: String,
      required: true
    },
    // Overwrite any params present in baseUrl with values from cookie
    overwriteQuery: {
      type: Boolean,
      required: false,
      default: true
    },
    // Values to pass, with mappings
    // e.g. { a: 'aff', gclid: 's5' }
    // Leave blank to pass through all values
    valuesToPass: {
      type: Object,
      required: false,
      default: () => {return new Object}
    }
  }
}
</script>
