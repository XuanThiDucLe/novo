<template>
  <div id="app">
    <Modal/>
    <Karte/>


  </div>
</template>

<script>
import Karte from "./components/Karte.vue";
import Modal from "./components/Modal.vue";

//import mapboxgl from "mapbox-gl";

export default {
  name: "app",
  components: {
    Modal,
    Karte,


  }
};
</script>

<style>
#app {
  font-family: "Montserrat", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
