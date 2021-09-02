<template>
  <q-page class="q-pa-sm bg-dark text-white">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <q-card class="card-bg text-white">
          <q-card-section class="text-h6 ">
            <div class="text-h6">Edit Profile</div>
            <div class="text-subtitle2">Complete your profile</div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section side>
                  <q-avatar size="100px">
                    <q-img :src="user.avatar"/>
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-file
                    label-color="white"
                    v-model="avatarFiles"
                    label="Change Photo"
                    class="text-capitalize"
                    bg-color="blue-7"
                    rounded standout
                    :filter="checkFileTypeImage"
                    @rejected="onRejectedImage"
                    style="max-width: 200px"></q-file>
                  <q-linear-progress :value="progressAvatar" :class="progressAvatarVisibility" color="positive"/>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dark color="white" dense v-model="getUser.code" label="Privilege" disable />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dark color="white" dense v-model="user.username" label="Email" disable />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dark color="white" dense v-model="user.phone" label="Phone Number"/>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dark color="white" dense v-model="user.name" label="Name"/>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dark color="white" dense v-model="user.company" disable label="Company" />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dark color="white" dense v-model="user.department" disable label="Department" />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dark color="white" dense v-model="user.position" disable label="Position" />
                </q-item-section>
              </q-item>

            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="text-capitalize bg-green-8 text-white" @click="updateUserProfile" :loading="loadingUpdateProfile" >Update User Profile
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                Loading...
              </template>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <q-card class="card-bg text-white">
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">Change Password</div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                Password Expired
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input type="password" dark dense outlined color="white" round v-model="user.password_expired" disable
                         label="Password Expired"/>
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                Current Password
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  type="password"
                  v-model="password_dict.old_password"
                  @input="changePasswordOld"
                  :error-message="errormessage_password_old"
                  dark dense outlined color="white" round
                  :error="password_dict.error_old"
                  label="Current Password"/>
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                New Password
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  type="password"
                  dark dense outlined color="white"
                  round
                  @input="changePasswordNew"
                  v-model="password_dict.new_password"
                  :error="password_dict.error_new"
                  error-message="Password combination is not strong enough. Must consist of 8 alphanumeric charaters, minimum one symbol"
                  label="New Password"/>
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                Confirm New Password
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  type="password" dark dense outlined round color="white"
                  v-model="password_dict.confirm_new_password"
                  :error="password_dict.error_confirm"
                  error-message="Password confirmation is not match"
                  @input="changePasswordConfirmation"
                  label="Confirm New Password"/>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn :loading="loadingUpdatePassword" class="text-capitalize bg-green-8 text-white" @click="changePassword">Change Password
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                Loading...
              </template>
            </q-btn>
          </q-card-actions>

        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import AppUtils from "src/utils/AppUtils";

export default {
  name: "UserProfile",
  computed:{
    getUser(){
        let user = this.user;
        user.code  = user.roles.join(', ').toUpperCase();
        return user
    }
  },
  methods:{
    checkFileTypeImage (files) {
      let tb = files.filter(file => file.type === 'image/png'||file.type === 'image/jpg'||file.type === 'image/jpeg'||file.type === 'image/svg'||file.type === 'image/gif'||file.type === 'image/bmp')
      if(tb) this.onAcceptedImage(files)
      return tb
    },
    onAcceptedImage (acceptedEntries) {
      console.log('onAcceptedImage')
      this.$services.uploadAvatar(acceptedEntries,(progress)=>{
        this.progressAvatar = progress.loaded / progress.total
        this.refreshProgressAvatarVisibility()
      },(data)=>{
        this.user.avatar = data.data.avatar[0]
        console.log('UPLOAD SUCCESS',JSON.stringify(data))
      },(err)=>{

      },()=>{

      });
    },
    onRejectedImage (rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'negative',
        message: `Hanya menerima file bertipe png, jpg, jpeg, gif, bmp, dan svg`
      })
    },
    refreshProgressAvatarVisibility(){
      let splitted = this.progressAvatarVisibility.split(' ');
      if(this.progressAvatar === 0.0 && splitted.length === 1){
        this.progressAvatarVisibility = splitted[0]+' invisible';
      }else if(this.progressAvatar > 0.0 && splitted.length >1){
        this.progressAvatarVisibility = splitted[0]
      }
    },
    updateUserProfile(){
      this.loadingUpdateProfile = true
      this.$services.changeProfile(
        this.user.avatar,
        this.user.name,
        this.user.phone,
        this.user.position,
        this.user.unit,
        (data)=>{
          AppUtils.saveUser(this.user)
          AppUtils.showGenericDialog('Success','Change profile success')
        },(err)=>{

        },()=>{
          this.loadingUpdateProfile = false
          AppUtils.mainLayout().refreshUserData()
        }
      )
    },
    changePasswordOld(){
      this.password_dict.error_old = false;
    },
    changePasswordNew(){
      if(this.password_dict.new_password!==''&&(!this.regexPassword.test(this.password_dict.new_password)||this.password_dict.new_password.length<8)){
        this.password_dict.error_new = true;
      }else{
        this.password_dict.error_new = false;
      }
    },
    changePasswordConfirmation(){
      console.log('changePasswordConfirmation')
      if(this.password_dict.confirm_new_password!==''&&this.password_dict.new_password===this.password_dict.confirm_new_password){
        this.password_dict.error_confirm = false
      }else{
        this.password_dict.error_confirm = true
      }
    },
    changePassword(){
      if(this.password_dict.new_password===''||this.password_dict.confirm_new_password===''||this.password_dict.error_new||this.password_dict.error_confirm||this.password_dict.error_old){
        console.log('Ignore it, have error')
      }else{
        this.loadingUpdatePassword = true
        this.$services.changePassword(this.password_dict.old_password,this.password_dict.new_password,(data)=>{
          console.log('SUCCESS',JSON.stringify(data));
          if(data.status === -1){
            if(data.data.code === 3){
              AppUtils.showGenericDialog('Error',data.data.message);
              this.errormessage_password_old = data.data.message;
            }
          }else if(data.status === 1){
            this.password_dict.old_password = ''
            this.password_dict.new_password = ''
            this.password_dict.confirm_new_password = ''
            AppUtils.showGenericDialog('Success','Change password success!');
          }else{
            AppUtils.showGenericDialog('Success','Unknown error');
          }
        },(err)=>{

        },()=>{
          this.loadingUpdatePassword = false
        })
      }
    }
  },
  data() {
    return {
      avatarFiles:null,
      progressAvatar:0,
      errormessage_password_old :'Incorrect existing password',
      regexPassword : /^((?=.*[a-z])|(?=.*[A-Z]))(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      user: AppUtils.getUser(),
      profile: AppUtils.getProfile(),
      loadingUpdateProfile: false,
      loadingUpdatePassword: false,
      password_dict:{
        confirm_new_password:'',
        new_password: '',
        old_password: '',
        error_old: false,
        error_new: false,
        error_confirm: false
      },
      progressAvatarVisibility:'q-mt-md invisible'
    }
  }
}
</script>

<style scoped>

.card-bg {
  background-color: #363636;
}
</style>
