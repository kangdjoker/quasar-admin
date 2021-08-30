import APIService from "src/utils/APIService";
import AppUtils from "src/utils/AppUtils";
import Vue from 'vue'
Vue.prototype.$services = APIService
Vue.prototype.$utils = AppUtils
