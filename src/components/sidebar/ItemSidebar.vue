<template>
    <div>
        <q-item :to="sidebar.to" active-class="q-item-no-link-highlighting" v-if="sidebar.children.length===0">
            <q-item-section avatar v-if="sidebar.icon!==''">
            <q-icon :name="sidebar.icon" />
            </q-item-section>
            <q-item-section>
            <q-item-label>{{sidebar.label}}</q-item-label>
            </q-item-section>
        </q-item>
        <q-expansion-item
            v-if="sidebar.children.length>0"
            :icon="sidebar.icon"
            :label="sidebar.label"
            >
            <q-list class="q-pl-lg">
                <item-sidebar v-for="sidebar in sidebar.children" :key="sidebar.id" :sidebar="sidebar">
                </item-sidebar>
            </q-list>
        </q-expansion-item>
    </div>
</template>
<script>
import ItemSidebar from './ItemSidebar.vue'

export default {
    name: 'ItemSidebar',
    components: {
        ItemSidebar
    },
    props:['sidebar'],
    data () {
        return{
        }
    }
}
</script>
