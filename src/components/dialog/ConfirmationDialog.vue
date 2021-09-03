<template>
  <q-dialog v-model="getConfirm" :value="vconfirm">
    <q-card dark>
      <q-card-section class="row items-center">
        <span class="q-ml-sm text-h5">{{txt}}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="txtNegative" color="negative" v-close-popup @click="onNegative" />
        <q-btn flat :label="txtPositive" color="positive" v-close-popup @click="onPositive" :loading="loading">
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Loading...
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "ConfirmationDialog",
  props:['confirm','txt','txtNegative','txtPositive','loading'],
  methods:{
    onPositive(){
      console.log('onPositive')
      this.$emit('onPositive')
    },
    onNegative(){
      console.log('onNegative')
      this.$emit('onNegative')
    }
  },
  computed:{
    getConfirm:{
      get(){
        return this.confirm
      },set(newVal){
        this.vconfirm = newVal
      }
    }
  },
  data(){
    return {
      vconfirm: false
    }
  }
}
</script>

<style scoped>

</style>
