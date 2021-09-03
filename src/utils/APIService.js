import axios from 'axios'
import AppUtils from './AppUtils'
const instance = axios.create({
  baseURL: process.env.BASE_URL.split('"').join(''),
  crossDomain: true
})

let instanceSystem = null

function handleSuccess (response, onSuccess, onFailed, onFinish) {
  if(typeof onSuccess === 'function' ) onSuccess(response.data)
  return typeof onFinish === 'function' ? onFinish() : null
}

function handleError (error, onSuccess, onFailed, onFinish) {
  if(typeof onFailed === 'function' ) onFailed(error)
  return typeof onFinish === 'function' ? onFinish() : null
}

function apiCall (method, url, data, onSuccess, onFailed, onFinish,onUploadProgress) {
  let finalUrl = url;
  if(method.toLowerCase()==='get'){
    let i = 0;
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        let value = data[key];
        if(i===0){
          finalUrl += "?"+key+"="+encodeURIComponent(value);
        }else{
          finalUrl += "&"+key+"="+encodeURIComponent(value);
        }
        i++;
      }
    }
  }
  const token = AppUtils.getToken()
  instance({
    method: method,
    headers: {
      'xtoken': token,
      'DeviceID': AppUtils.getDeviceID()
    },
    data: data,
    url: finalUrl,
    onUploadProgress:onUploadProgress
  })
    .then(response => {
      console.log('apicall:then')
      return handleSuccess(response, onSuccess, onFailed, onFinish)
    })
    .catch(error => {
      console.log('apicall:error')
      if(typeof error !== 'undefined' && error!==null && typeof error.response!=='undefined' && error.response!==null){
        switch(parseInt(error.response.status)){
          case 401:
            instanceSystem.$router.replace('/login')
            break;
          case 422:
            AppUtils.errorNotification(instanceSystem,error.response.data.message)
            break;
        }
      }
      return handleError(error, onSuccess, onFailed, onFinish)
    })
}

export default{
  assignInstanceSystem(instance){
    instanceSystem = instance
  },
  loginUser(username,password,onSuccess,onFailed,onFinish){
    apiCall('post','/auth/login', {username:username,password:password}, (user) => {
      console.log('USER',JSON.stringify(user));
      AppUtils.saveUser(user.data)
      apiCall('get','/sidebar', {}, (sidebar) => {
        console.log('SIDEBAR',JSON.stringify(sidebar));
        AppUtils.saveSidebar(sidebar.data)
        onSuccess(user)
      }, (err)=>{
        AppUtils.clearUser()
        onFailed(err)
      }, onFinish)
    }, (err)=>{
      AppUtils.clearUser()
      onFailed(err)
    }, onFinish)
  },  
  uploadAvatar(files,onUploadProgress,onSuccess,onFailed,onFinish){
    const data = new FormData()
    data.append('avatar', files[0])
    apiCall('post','/upload/avatar',data,onSuccess,onFailed,onFinish,onUploadProgress)
  },
  changeProfile(avatar,phone,onSuccess,onFailed,onFinish){
    apiCall('patch','/user/profile', {avatar:avatar,phone:phone}, (data) => {
      // AppUtils.saveProfile(data)
      onSuccess(data)
    }, onFailed, onFinish)
  },
  changePassword(oldPassword,newPassword,onSuccess,onFailed,onFinish){
    apiCall('patch','/user/password', {password:newPassword,last_password:oldPassword}, (data) => {
      // AppUtils.saveProfile(data)
      onSuccess(data)
    }, onFailed, onFinish)
  },
  getListUser(pagination,onSuccess,onFailed,onFinish){
    apiCall('post','/user/list',pagination,onSuccess,onFailed,onFinish)
  },
}
