import {LocalStorage} from "quasar";

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
};

export default {
  tableGetPagination(){
    return {rowsPerPage:50,page:1}
  },
  mainLayout(){
    // TODO OVERRIDE
  },
  successNotification(instance,text){
    instance.$q.notify({
      type: 'positive',
      message: text
    })
  },
  errorNotification(instance,text){
    instance.$q.notify({
      type: 'negative',
      message: text
    })
  },
  getDeviceID(){
    let deviceid = LocalStorage.getItem('deviceid');
    if(deviceid===null||deviceid===''){
      deviceid = ''+new Date().getTime()+'-'+makeid(6);
      LocalStorage.set('deviceid',deviceid);
    }
    return deviceid;
  },
  saveUser(user){
    console.log('SAVE USER',JSON.stringify(user))
    LocalStorage.set('user',JSON.stringify(user));
  },
  saveProfile(profile){
    console.log('SAVE PROFILE',JSON.stringify(profile))
    LocalStorage.set('profile',JSON.stringify(profile));
  },
  saveSidebar(sidebar){
    console.log('SAVE Sidebar',JSON.stringify(sidebar))
    LocalStorage.set('sidebar',JSON.stringify(sidebar));
  },
  getUser () {
    const user = LocalStorage.getItem('user')
    if (typeof user !=='undefined' && user !== null && user !== '') {
      return JSON.parse(user)
    }
    return null
  },
  getProfile () {
    const profile = LocalStorage.getItem('profile')
    if (typeof profile !=='undefined' && profile !== null && profile !== '') {
      return JSON.parse(profile)
    }
    return null
  },
  getSidebar () {
    const sidebar = LocalStorage.getItem('sidebar')
    if (typeof sidebar !=='undefined' && sidebar !== null && sidebar !== '') {
      return JSON.parse(sidebar)
    }
    return null
  },
  clearUser(){
    LocalStorage.clear()
  },
  getToken(){
    let user = this.getUser()
    if(user === null){
      return undefined
    }else return user.token
  },
  isEmpty (string) {
    return typeof string === 'undefined' || string == null || string === ''
  },
  saveFCMToken(fcmtoken){
    LocalStorage.set('fcmtoken',fcmtoken)
  },
  getFCMToken(){
    return LocalStorage.getItem('fcmtoken')
  },
  tableGetPagination(){
    return {rowsPerPage:50}
  }
}
