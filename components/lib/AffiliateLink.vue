<template>
  <a :href="finalUrl">
    <slot></slot>
  </a>
</template>
<script>
export default {
  inheritAttrs: false,
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
  },
  data() {
    return {
      query: {},
      finalUrl: ""
    };
  },
  methods: {
    decorateUrl(url) {
      url = url + "?";
      let attr = this.$store.state.attribution;
      let params;
      if (this.overwriteQuery) {
        params = { ...this.query, ...attr };
      } else {
        params = { ...attr, ...this.query };
      }
      for (let i = 0; i < Object.entries(params).length; i++) {
        if(i === 0){
          url = `${url}${Object.entries(params)[i][0]}=${Object.entries(params)[i][1]}`;
        }
        else {
          url = `${url}&${Object.entries(params)[i][0]}=${Object.entries(params)[i][1]}`;
        }
      }
      return url;
    },
    decorateUrlCustom(url) {
      url = url + "?";
      let attr = this.$store.state.attribution;
      let params;
      if (this.overwriteQuery) {
        params = { ...this.query, ...attr };
      } else {
        params = { ...attr, ...this.query };
      }
      for (let i = 0; i < Object.entries(params).length; i++) {
        if (this.valuesToPass.hasOwnProperty(Object.entries(params)[i][0])) {
          if(i === 0){
            url = `${url}${this.valuesToPass[Object.entries(params)[i][0]]}=${Object.entries(params)[i][1]}`;
          }
          else {
            url = `${url}&${this.valuesToPass[Object.entries(params)[i][0]]}=${Object.entries(params)[i][1]}`;
          }
        }
      }
      return url;
    },
    // Strips query params and returns base url
    stripQuery(url) {
      let urlObj = new URL(url);
      let params = urlObj.searchParams;

      for (let pair of params.entries()) {
        this.query[pair[0]] = pair[1];
      }

      return urlObj.protocol + "//" + urlObj.hostname;
    }
  },
  mounted() {
    let url = this.stripQuery(this.baseUrl);
    let decorated;
    if (
      Object.entries(this.valuesToPass).length > 0 &&
      this.valuesToPass.constructor === Object
    ) {
      decorated = this.decorateUrlCustom(url);
    }
    else {
      decorated = this.decorateUrl(url);
    }

    this.finalUrl = decorated;
  }
};
</script>
