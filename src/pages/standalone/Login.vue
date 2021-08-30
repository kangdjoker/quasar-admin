<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="username"
                label="Username"
                lazy-rules
              />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules

              />

              <div>
                <q-btn label="Login" @click="doLogin" type="button" class="bg-green-8 text-white q-ml-sm q-mb-xs" :loading="loading">
                  <template v-slot:loading>
                    <q-spinner-dots class="center" />
                  </template>
                </q-btn>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
    import AppUtils from "src/utils/AppUtils";
    export default {
        mounted(){
          this.$services.assignInstanceSystem(this)
            AppUtils.clearUser()
        },
        methods:{
            doLogin(){
                console.log('doLogin')
                if(this.loading)return;
                this.loading = true;
                this.$services.loginUser(this.username,this.password,(res)=>{
                  this.$router.replace('/')
                },(e)=>{
                },()=>{
                  this.loading = false
                })
            }
        },
        data() {
            return {
              loading:false,
              username: 'administrator',
              password: '4344d64a425b06cf311918a7772e6e4d'
            }
        },
    }
</script>

<style>

  .bg-image {
   background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
  }
</style>
