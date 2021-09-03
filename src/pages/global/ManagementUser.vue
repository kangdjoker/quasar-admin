<template>
  <q-page class="q-pa-sm bg-primary text-white">
    <q-card class="q-mb-md" dark>
      <q-card-section class="q-pa-none ">
        <q-table
          dark
          title="User Management"
          :data="users"
          :pagination.sync="pagination"
          :columns="userColumns"
          row-key="id"
          class="bg-primary text-white"
          :filter="userFilter"
          :loading="userLoading"
        >
          <template v-slot:body-cell-avatar="props">
            <q-td :props="props">
              <q-avatar size="30px">
                <q-img :src="props.row.avatar" style="width: 30px;height: 30px;"/>
              </q-avatar>
            </q-td>
          </template>
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>
          <template v-slot:top-right>
            <q-input dark v-if="userFilterShow" filled borderless dense debounce="300" v-model="userFilter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>
            <q-btn class="q-ml-xs" icon="filter_list" @click="userFilterShow=!userFilterShow" flat/>
            <q-btn class="q-ml-xs" icon="add" @click="showDialogAdd()" flat v-if="user.code==='superadmin'"/>
          </template>
          <template v-slot:body-cell-menu_count="props">
            <q-td :props="props">
              <a style="text-decoration: underline;" @click="showMenus(props.row)" >{{props.row.menu_count}}</a>
            </q-td>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <div>
                <q-btn
                  class="q-mx-xs"
                  dense
                  icon="edit"
                  @click="showDialogEdit(props.row)" flat>
                  <q-tooltip
                    anchor="bottom right" self="top right">Edit</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-mx-xs"
                  dense
                  icon="lock_open"
                  v-if="!props.row.is_active"
                  @click="showDialogActive(props.row)" flat>
                  <q-tooltip
                    anchor="bottom right" self="top right">Activate</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-mx-xs"
                  dense
                  icon="lock"
                  v-if="props.row.is_active"
                  @click="showDialogDelete(props.row)" flat>
                  <q-tooltip
                    anchor="bottom right" self="top right">De-Activate</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-mx-xs"
                  dense
                  icon="vpn_key"
                  @click="showDialogPassword(props.row)" flat>
                  <q-tooltip
                    anchor="bottom right" self="top right">Reset Password</q-tooltip>
                </q-btn>
              </div>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <q-dialog v-model="menu.dialog" >
      <q-card dark style="width: 700px; max-width: 80vw;">
        <q-toolbar>
          <q-toolbar-title><span class="text-h6">Allowed Menu</span></q-toolbar-title>
          <q-btn
            flat
            round
            dense
            icon="close"
            size="0.7em"
            v-close-popup>
            <q-tooltip>
              Close
            </q-tooltip>
          </q-btn>
        </q-toolbar>
        <q-separator dark/>
        <q-card-section class="q-pa-none ">
          <q-table
            dark
            :data="menus"
            :columns="menuColumns"
            row-key="id"
            :rows-per-page-options="[50]"
            class="bg-primary text-white"
            :loading="userLoading"
          >
          </q-table>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="edit.dialog" persistent>
      <q-card dark>
        <q-toolbar>
          <q-toolbar-title><span class="text-h6">Ubah Pengguna</span></q-toolbar-title>
          <q-btn
            flat
            round
            dense
            icon="close"
            size="0.7em"
            v-close-popup>
            <q-tooltip>
              Close
            </q-tooltip>
          </q-btn>
        </q-toolbar>
        <q-separator dark/>
        <q-card-section class="q-pa-sm row">
          <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-item-section>
              <q-file
                label-color="white"
                v-model="edit.file"
                label="Photo"
                bg-color="blue-7"
                filled
                :filter="checkFileTypeImageEdit"
                @rejected="onRejectedImage">
                <template v-slot:file="{ index, file }">
                  <q-chip
                    class="full-width q-my-xs"
                    square
                  >
                    <q-linear-progress
                      :value="edit.progress"
                      class="absolute-full full-height"
                      track-color="white"
                    />
                  </q-chip>
                </template>
              </q-file>
            </q-item-section>
          </q-item>
          <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-item-section>
              <q-select
                dark dense outlined color="white" round
                v-model="edit.role"
                :options="codes"
                label="Role"/>
            </q-item-section>
          </q-item>
          <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input type="email" dark dense outlined color="white" round v-model="edit.username"
                       disable
                       label="Username"/>
            </q-item-section>
          </q-item>
          <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input type="name" dark dense outlined color="white" round v-model="edit.name"
                       label="Name"/>
            </q-item-section>
          </q-item>
          <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input type="phone" dark dense outlined color="white" round v-model="edit.phone"
                       label="Phone"/>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-separator dark/>
        <q-card-actions align="right">
          <q-btn flat label="Simpan" class="bg-green-8 text-white" @click="confirmEdit" :loading="this.edit.loading">
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
              Loading...
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="add.dialog" persistent>
      <q-card dark>
        <q-toolbar>
          <q-toolbar-title><span class="text-h6">Add User</span></q-toolbar-title>
          <q-btn
            flat
            round
            dense
            icon="close"
            size="0.7em"
            v-close-popup>
            <q-tooltip>
              Close
            </q-tooltip>
          </q-btn>
        </q-toolbar>
        <q-separator dark/>
        <q-card-section class="q-pa-sm row">
          <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-item-section>
              <q-file
                label-color="white"
                v-model="add.file"
                label="Photo"
                bg-color="blue-7"
                filled
                :filter="checkFileTypeImageAdd"
                @rejected="onRejectedImage">
                <template v-slot:file="{ index, file }">
                  <q-chip
                    class="full-width q-my-xs"
                    square
                  >
                    <q-linear-progress
                      :value="add.progress"
                      class="absolute-full full-height"
                      track-color="white"
                    />
                  </q-chip>
                </template>
              </q-file>
            </q-item-section>
          </q-item>
          <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-item-section>
              <q-select
                dark dense outlined color="white" round
                v-model="add.role"
                :options="codes"
                label="Role"/>
            </q-item-section>
          </q-item>
          <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input type="email" dark dense outlined color="white" round v-model="add.username"
                       label="Username"/>
            </q-item-section>
          </q-item>
          <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input type="name" dark dense outlined color="white" round v-model="add.name"
                       label="Name"/>
            </q-item-section>
          </q-item>
          <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input type="phone" dark dense outlined color="white" round v-model="add.phone"
                       label="Phone"/>
            </q-item-section>
          </q-item>
          <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input :type="add.ispwd ? 'password' : 'text'" dark dense outlined color="white" round v-model="add.password"
                       label="Password">
                <template v-slot:append>
                  <q-icon
                    :name="add.ispwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="add.ispwd = !add.ispwd"
                  />
                </template>
              </q-input>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-separator dark/>
        <q-card-actions align="right">
          <q-btn flat label="Simpan" class="bg-green-8 text-white" @click="confirmAdd" :loading="this.add.loading">
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
              Loading...
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="password.dialog" persistent>
      <q-card dark>
        <q-toolbar>
          <q-toolbar-title><span class="text-h6">Change Password</span></q-toolbar-title>
          <q-btn
            flat
            round
            dense
            icon="close"
            size="0.7em"
            v-close-popup>
            <q-tooltip>
              Close
            </q-tooltip>
          </q-btn>
        </q-toolbar>
        <q-separator dark/>
        <q-card-section class="q-pa-sm row">
          <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input :type="password.ispwd ? 'password' : 'text'" dark dense outlined color="white" round v-model="password.password"
                       label="Password">
                <template v-slot:append>
                  <q-icon
                    :name="password.ispwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="password.ispwd = !password.ispwd"
                  />
                </template>
              </q-input>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-separator dark/>
        <q-card-actions align="right">
          <q-btn flat label="Simpan" class="bg-green-8 text-white" @click="confirmChangePassword" :loading="this.password.loading">
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
              Loading...
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <confirmation-dialog
      :confirm="this.delete.dialog"
      :loading="this.delete.loading"
      txt-negative="Batal"
      txt-positive="OK"
      txt="Are you sure want to de-active this user?"
      @onPositive="confirmDelete"
      @onNegative="cancelDelete"
    />
    <confirmation-dialog
      :confirm="this.active.dialog"
      :loading="this.active.loading"
      txt-negative="Batal"
      txt-positive="OK"
      txt="Are you sure want to activate this user?"
      @onPositive="confirmActive"
      @onNegative="cancelActive"
    />
  </q-page>
</template>

<script>
import ConfirmationDialog from "components/dialog/ConfirmationDialog";
import AppUtils from "src/utils/AppUtils";
import App from "src/App";
export default {
  name: "ManagementUser",
  components:{ConfirmationDialog},
  mounted() {
    this.getListUser()
    this.$services.logThis('Open User Management')
  },
  methods:{
    showMenus(row){
      this.$services.getListMenu((res)=>{
        this.menus = res.data
        this.menu.dialog = true
      },(e)=>{

      },()=>{

      })
    },
    showDialogPassword(row){
      this.password.id = row.id
      this.password.dialog = true
    },
    confirmChangePassword(){
      this.password.loading = true
      this.$services.updatePassword(this.password.id,this.password.password,(d)=>{
        if(d.status===1){
          this.$services.logThis('Change Password for user '+this.password.id)
          this.password.dialog = false
          AppUtils.successNotification(this,'Ubah password berhasil');
        }else if(d.status===-1){
          AppUtils.errorNotification(this,d.data.message);
        }
      },(e)=>{

      },()=>{
        this.password.loading = false
      })
    },
    checkFileTypeImageAdd (files) {
      let tb = files.filter(file => file.type === 'image/png'||file.type === 'image/jpg'||file.type === 'image/jpeg'||file.type === 'image/svg'||file.type === 'image/gif'||file.type === 'image/bmp')
      if(tb) this.onAcceptedImageAdd(files)
      return tb
    },
    onAcceptedImageAdd (acceptedEntries) {
      this.$services.uploadAvatar(acceptedEntries,(progress)=>{
        this.add.progress = progress.loaded / progress.total
      },(data)=>{
        this.add.avatar = data.data.avatar[0];
      },(err)=>{

      },()=>{

      });
    },
    checkFileTypeImageEdit (files) {
      let tb = files.filter(file => file.type === 'image/png'||file.type === 'image/jpg'||file.type === 'image/jpeg'||file.type === 'image/svg'||file.type === 'image/gif'||file.type === 'image/bmp')
      if(tb) this.onAcceptedImageEdit(files)
      return tb
    },
    onAcceptedImageEdit (acceptedEntries) {
      this.$services.uploadAvatar(acceptedEntries,(progress)=>{
        this.edit.progress = progress.loaded / progress.total
      },(data)=>{
        this.edit.avatar = data.data.avatar[0];
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
    confirmEdit(){
      this.edit.loading = true
      let role = this.edit.role.toLowerCase();
      this.$services.updateUser(this.edit.id,role,this.edit.avatar,this.edit.name,this.edit.phone,(d)=>{
        this.$services.logThis('Edit User Management '+this.edit.name+' success')
        this.getListUser()
      },(e)=>{
        this.edit.loading = false
      },()=>{

      })
    },
    confirmAdd(){
      this.add.loading = true
      AppUtils.saveCreatePassword(this.add.password)
      let role = this.add.role.toLowerCase();
      this.$services.addUser(role,this.add.avatar,this.add.username,this.add.name,this.add.phone,this.add.password,(d)=>{
        this.$services.logThis('Add User Management '+this.add.name+' success')
        this.getListUser()
      },(e)=>{
        this.add.loading = false
      },()=>{

      })
    },
    cancelDelete(){
      this.delete.dialog = false
    },
    cancelActive(){
      this.active.dialog = false
    },
    confirmActive(){
      this.active.loading = true
      this.$services.activateUser(this.active.id,(d)=>{
        this.$services.logThis('Activate User Management ID User '+this.active.id)
        this.getListUser()
      },(e)=>{
        this.active.loading = false
      },()=>{

      })
    },
    confirmDelete(){
      this.delete.loading = true
      this.$services.deleteUser(this.delete.id,(d)=>{
        this.$services.logThis('Delete User Management ID User '+this.delete.id)
        this.getListUser()
      },(e)=>{
        this.delete.loading = false
      },()=>{

      })
    },
    showDialogAdd(){
      this.add.dialog = true
      this.add.file = null
      this.add.loading = false
      this.add.avatar = null
    },
    showDialogEdit(row){
      this.edit.id = row.id
      this.edit.avatar = row.avatar
      this.edit.username = row.username
      this.edit.name = row.name
      this.edit.phone = row.phone
      this.edit.role = row.code
      this.edit.file = null
      this.edit.progress = 0
      this.edit.dialog = true
    },
    showDialogActive(row){
      this.active.id = row.id
      this.active.loading = false
      this.active.dialog = true
    },
    showDialogDelete(row){
      this.delete.id = row.id
      this.delete.loading = false
      this.delete.dialog = true
    },
    getListUser(){
      this.userLoading = true
      this.$services.getListUser(this.pagination,(res)=>{
        this.users = res.data.list
      },(err)=>{

      },()=>{
        this.userLoading = false
        this.add.dialog =false
        this.add.loading = false
        this.edit.dialog = false
        this.edit.loading = false
        this.delete.dialog =false
        this.delete.loading = false
        this.active.dialog = false
        this.active.loading = false
      })
    }
  },
  data(){
    let data = {
      menus:[],
      menuColumns:[
        {name: 'name', label: 'Name', field: row => row.name, format: val => `${val}`, sortable: false, align: 'left'},
        {name: 'description', label: 'Description', field: row => row.description, format: val => `${val}`, sortable: false, align: 'left'},
        {name: 'method', label: 'Method', field: row => row.method, format: val => `${val}`, sortable: false, align: 'left'},
        {name: 'path', label: 'Path', field: row => row.path, format: val => `${val}`, sortable: false, align: 'left'},
      ],
      menu:{
        dialog:false
      },
      pagination:AppUtils.tableGetPagination(),
      codes:['SuperAdmin','Admin','Operator'],
      password:{
        loading:false,
        dialog:false,
        password:null,
        ispwd:true,
        id:null
      },
      active:{
        id:null,
        loading:false,
        dialog:false
      },
      add:{
        role:null,
        ispwd:true,
        progress:0,
        dialog:false,
        loading:false,
        avatar:null,
        file:null,
        username:null,
        name:null,
        phone:null,
        password:null
      },
      edit:{
        role:null,
        ispwd:true,
        progress:0,
        id:null,
        dialog:false,
        loading:false,
        avatar:null,
        file:null,
        username:null,
        name:null,
        phone:null
      },
      delete:{
        id:null,
        dialog:false,
        loading:false
      },
      userLoading:false,
      users:[],
      userColumns:[
        {name: 'avatar', label: 'Photo', field: 'avatar',align: 'center',style: 'width: 30px'},
        {name: 'username', label: 'Username', field: row => row.username, format: val => `${val}`, sortable: false, align: 'left'},
        {name: 'name', label: 'Name', field: row => row.name, format: val => `${val}`, sortable: false, align: 'left'},
        {name: 'phone', label: 'Phone', field: row => row.phone, format: val => `${val}`, sortable: false, align: 'left'},
        {name: 'roles', label: 'Roles', field: row => row.roles, format: val => `${val}`, sortable: false, align: 'left'},
        {name: 'menu_count', label: '#Menu', field: row => row.menu_count, format: val => `${val}`, sortable: false, align: 'center'},
        {name: 'department', label: 'Department', field: row => row.department, format: val => `${val}`, sortable: false, align: 'left'},
        {name: 'position', label: 'Position', field: row => row.position, format: val => `${val}`, sortable: false, align: 'left'},
        {name: 'time_create', label: 'Time Create', field: row => row.time_create, format: val => `${val}`, sortable: false, align: 'left'},
        {name: 'time_update', label: 'Time Update', field: row => row.time_update, format: val => `${val}`, sortable: false, align: 'left'},
        {name: 'password_expired', label: 'Password Expired', field: row => row.password_expired, format: val => `${val}`, sortable: false, align: 'left'},
        {name: 'is_active', label: 'Active?', field: row => (''+row.is_active).toUpperCase(), format: val => `${val}`, sortable: false, align: 'center'},
        {name: 'action', align: 'center', label: 'Aksi', field: 'action' },        
      ],
      userFilter:'',
      userFilterShow:false,
      user:AppUtils.getUser()
    }
    return data
  }
}
</script>

<style scoped>

</style>
