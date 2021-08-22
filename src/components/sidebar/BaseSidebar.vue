<template>
    <q-list>
        <item-sidebar v-for="sidebar in sidebars" :key="sidebar.id" :sidebar="sidebar">
        </item-sidebar>       
    </q-list>
</template>
<script>
import ItemSidebar from './ItemSidebar.vue'
export default {
    name: 'BaseSidebar',
    components: {
        ItemSidebar
    },
    data () {
        return{
            sidebars:[
                {id:1,label:'Dashboard',icon:'dashboard',children:[],to:'/'},
                {id:1,label:'Company Information',icon:'dashboard',children:[],to:'/'},
                {id:2,label:'Master Data',icon:'dashboard',children:[
                    {id:3,label:'Rack Data',icon:'dashboard',children:[],to:'/'},
                    {id:4,label:'Product Data',icon:'dashboard',children:[],to:'/'},
                ],to:'/'},
                {id:1,label:'Locations',icon:'dashboard',children:[],to:'/'},
                {id:1,label:'Transactions',icon:'dashboard',children:[
                    {id:1,label:'Stock In',icon:'dashboard',children:[],to:'/'},
                    {id:1,label:'Stock Out',icon:'dashboard',children:[],to:'/'},
                    {id:1,label:'Permanent Out',icon:'dashboard',children:[],to:'/'},
                    {id:1,label:'RFID Registration',icon:'dashboard',children:[],to:'/'},
                    {id:1,label:'Stock Opname',icon:'dashboard',children:[],to:'/'},
                ],to:'/'},
                {id:1,label:'Report',icon:'dashboard',children:[
                    {id:1,label:'All Asset',icon:'dashboard',children:[],to:'/'},
                    {id:1,label:'Stock In',icon:'dashboard',children:[],to:'/'},
                    {id:1,label:'Stock Out',icon:'dashboard',children:[],to:'/'},
                    {id:1,label:'Permanent Out',icon:'dashboard',children:[],to:'/'},
                    {id:1,label:'Registration',icon:'dashboard',children:[],to:'/'},
                    {id:1,label:'Stock Opname',icon:'dashboard',children:[],to:'/'},
                    {id:1,label:'Latest Placement',icon:'dashboard',children:[],to:'/'},
                ],to:'/'},
                {id:1,label:'Management',icon:'dashboard',children:[
                    {id:1,label:'User Management',icon:'dashboard',children:[],to:'/'},
                    {id:1,label:'Application Settings',icon:'dashboard',children:[],to:'/'},
                ],to:'/'},
            ]
        }
    }
}
</script>