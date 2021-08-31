<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar size="70px">
        <q-img
          style="width: 70px;height: 70px;"
          :src="this.user.avatar"
        />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-bold text-subtitle1">{{this.user.name}}</q-item-label>
      <q-item-label class="text-body2">{{this.user.username}}</q-item-label>
      <q-item-label caption class="text-caption text-weight-light" style="margin-top: 12px !important;">
        {{this.user.roles.join(', ').toUpperCase()}}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "CardProfileTop",
  props:{
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
