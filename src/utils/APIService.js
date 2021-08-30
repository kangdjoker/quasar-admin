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
      'Token-Access': token,
      'DeviceID': AppUtils.getDeviceID()
    },
    data: data,
    url: finalUrl,
    onUploadProgress:onUploadProgress
  })
    .then(response => {
      return handleSuccess(response, onSuccess, onFailed, onFinish)
    })
    .catch(error => {
      if(typeof error !== 'undefined' && error!==null && typeof error.response!=='undefined' && error.response!==null && parseInt(error.response.status)===401){
        instanceSystem.$router.replace('/login')
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
      onSuccess(user)
    }, (err)=>{
      AppUtils.clearUser()
      onFailed(err)
    }, onFinish)
  },  
  uploadAvatar(files,onUploadProgress,onSuccess,onFailed,onFinish){
    const data = new FormData()
    data.append('avatar', files[0])
    apiCall('post','/selfservice/upload/avatar',data,onSuccess,onFailed,onFinish,onUploadProgress)
  },  
}
