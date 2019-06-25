<template>
  <div class="karte">
    <div id="map"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import * as route from "./../assets/route.js";

export default {
  data() {
    return {
      map: null
    };
  },
  //funktion wird ausgeführt wenn "Kartegeöffnet wird initialisierungs code"
  mounted() {
    // console.log(mapboxgl);
    mapboxgl.accessToken =
    "pk.eyJ1IjoiYnJ1Y2tiYXVlcmoiLCJhIjoiY2pwdmoxaWIxMHMyZzQxcGF2NmRydHBxeCJ9.mLg91Zz-JpAcsvoEwAgwxw";
    this.map = new mapboxgl.Map({
      container: "map",
      // Long Latitude,Longitude
      //Start IOT Lab
      center: [9.81245, 48.79984],
      zoom: 17,
      style: "mapbox://styles/mapbox/streets-v10"
    });
    this.map.on("load", () => {
      this.map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: route.data
        },
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#009388",
          "line-width": 8
        }
      });

      var coordinates = route.data.geometry.coordinates;

      var bounds = coordinates.reduce(function(bounds, coord) {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

      //this.map.fitBounds(bounds, {padding: 100}
      this.map.fitBounds(bounds, {
        padding:  {
          top: 20,
          right:20,
          bottom:400,
          left:20
        }}

      );

    });

    console.log(route);
  }
};
</script>

<style scoped>
@import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";
#map {
  width: 100%;
  height: 850px;
}
</style>
