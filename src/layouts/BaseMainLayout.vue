<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>
          {{this.name}}
        </q-toolbar-title>
        <q-space/>
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="white" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
                 @click="$q.fullscreen.toggle()"
                 v-if="$q.screen.gt.sm">
          </q-btn>
          <q-btn round dense flat color="white" icon="notifications">
            <q-menu
            >
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense
                         class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img :src="user.avatar">
            </q-avatar>
            <q-menu
            >
              <q-list style="min-width: 100px">
                <card-profile-top
                  :user="user"
                ></card-profile-top>
                <q-separator class="bg-grey"/>
                <q-item to="/user-profile" active-class="q-item-no-link-highlighting">
                  <q-item-section>
                    <q-item-label>User Profile</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator class="bg-grey"/>
                <q-item to="/logout" active-class="q-item-no-link-highlighting">
                  <q-item-section>
                    <q-item-label>Log Out</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary text-white"
    >
      <base-sidebar>
      </base-sidebar>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
    import EssentialLink from 'components/EssentialLink'
    import BaseSidebar from 'components/sidebar/BaseSidebar'
    import Messages from "./Messages";
    import AppUtils from "src/utils/AppUtils";
    import CardProfileTop from "./template/CardProfileTop"
import APIService from 'src/utils/APIService';

    export default {
        name: 'MainLayout',

        components: {
            CardProfileTop,
            Messages,
            EssentialLink,
            BaseSidebar,
        },
        mounted(){
          APIService.assignInstanceSystem(this)
          this.name = process.env.BASE_NAME.split('"').join('')
          this.user = AppUtils.getUser()
        },
        data() {
            return {
              user:{},
              name:'',
              leftDrawerOpen: false,
            }
        }
    }
</script>
