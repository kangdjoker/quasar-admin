<template>
    <q-page class="q-pa-sm">
        <l-map style="height: 600px" :zoom="zoom" :center="center" @ready="doSomethingOnReady()" ref="myMap">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker :lat-lng="markerLatLng">
                <l-popup>
                    Ahaay Bro<b>TEst </b>
                </l-popup>
                <l-tooltip>
                    Ehem
                </l-tooltip>
            </l-marker>
            <l-polyline :lat-lngs="polyline">
            </l-polyline>
        </l-map>
    </q-page>
</template>
<script>
import L from 'leaflet';
import {LMap, LTileLayer, LMarker,LPopup,LTooltip,LPolyline} from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-arrowheads'

import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
    name: "MapLeaflet",
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        LTooltip,
        LPolyline
    },
    mounted(){
        console.log('Mounted')
        setTimeout(this.callPeriodic,1000)
    },
    methods: {
        insertPolyLine(){
            this.polylineArrow = L.polyline([[-6.353221,106.6998625],[-6.453221,106.6998625],[-6.453221,106.7998625]]).arrowheads({frequency: this.freq,size: '5px', fill: true})
            this.polylineArrow.addTo(this.map)
        },
        doSomethingOnReady() {
            this.map = this.$refs.myMap.mapObject
            this.insertPolyLine()
        },
        callPeriodic(){
            console.log('CallPeriodic')
            this.i++;
            if((this.i%2)===0) {
                this.freq = 20;
                this.map.removeLayer(this.polylineArrow)
                this.insertPolyLine()
            }
            else {
                this.freq = 25;
                this.map.removeLayer(this.polylineArrow)
                this.insertPolyLine();
            }          
            setTimeout(this.callPeriodic,1000)
        },
    },
    data(){
        return {
            map:null,
            i:0,
            freq:20,
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            // attribution:'&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            attribution:'-',
            zoom: 15,
            center: [-6.353221,106.6998625],
            markerLatLng: [-6.353221,106.6998625],
            // polyline: [[-6.353221,106.6998625],[-6.453221,106.6998625],[-6.453221,106.7998625]],
            polyline: [],
            polylineArrow:null
        }
    },
}
</script>
