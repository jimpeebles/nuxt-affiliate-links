// components/index.js
import Vue from 'vue'
import AffiliateLink from '../node_modules/nuxt-affiliate-links/components/lib/AffiliateLink.vue'
import LinkWrap from '../node_modules/nuxt-affiliate-links/components/lib/LinkWrap.vue'

// loop through components and register them
Vue.component('affiliate-link', LinkWrap)
Vue.component('aff-link', AffiliateLink)
