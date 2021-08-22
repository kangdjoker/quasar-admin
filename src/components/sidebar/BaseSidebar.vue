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
                {id:1,label:'Label 1',icon:'dashboard',children:[],to:'/'},
                {id:2,label:'Label 2',icon:'dashboard',children:[
                    {id:3,label:'Label 3',icon:'',children:[],to:'/'},
                    {id:4,label:'Label 4',icon:'dashboard',children:[
                        {id:1,label:'Label 1',icon:'dashboard',children:[
                            {id:1,label:'Label 1',icon:'dashboard',children:[
                                {id:1,label:'Label 1',icon:'dashboard',children:[],to:'/'}
                            ],to:'/'}
                        ],to:'/'}
                    ],to:'/'},
                    {id:5,label:'Label 5',icon:'dashboard',children:[],to:'/'},
                    {id:6,label:'Label 6',icon:'dashboard',children:[],to:'/'}
                ],to:'/'}
            ]
        }
    }
}
</script>