/*
 * @Author: Letmeouted
 * @Email: 1002726239@qq.com
 * @FilePath: \AneuFilerVue\src\renderer\store\index.js
 */

import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  state: {
    Encoding: 'GBK'
  },
  plugins: process.env.IS_WEB ? [] : [
    require('vuex-electron').createPersistedState(),
    require('vuex-electron').createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
