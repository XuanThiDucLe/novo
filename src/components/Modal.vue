<template>
  <div>
    <!-- The Modal -->
    <!-- Modal content -->
    <div class="modal-content">
      <div v-on:click="klick" class="modal-content-routetitle">
        <img class="drag" src="../assets/drag.png"></img>
        <h1 class="title">Schwäbisch Gmünd – Heubach<br>
          übers Kalte Feld
        </h1>
        <img class="saved" src="../assets/saved.png"></img>
      </div>
      <div class="modal-content-info">
        <h1 class="number">27,7</h1><h1 class="unit">km</h1>
          <h1 class="number">799</h1><h1 class="unit">hm</h1>
            <h1 class="number">1</h1><h1 class="unit">h </h1><h1 class="number">40</h1><h1 class="unit">min</h1>
      </div>
      <div>
        <hr/>
      </div>
      <div class="modal-content-hohenakku">
        <Hohenakku/>
      </div>
    </div>
  </div>
</template>

<script>
import bootstrap from "bootstrap";
import Hohenakku from "./../components/Hohenakku.vue";
import * as route from "./../assets/route.js";

export default {
  methods:{   klick:function(event){
    console.log(this.count)
   fetch("http://localhost:3000/akkuverbrauch", {
      method: "POST",

      //myChart.data.datasets[1].data[item[0]._index]
      body: JSON.stringify({
        motorleistung: this.daten[this.count]
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => console.log("Success:", response))
      .catch(error => console.error("Error:", error));

      this.count++;
      console.log(this.daten[this.count]);
      if(this.count>=10){
        this.count=0;


      }
    }

},

data:function(){return{
  daten: [200, 250, 400, 250, 350, 500, 250, 300, 300, 300, 300],
count:0

}},
  components: {
    Hohenakku
  }

};
</script>

<style >
@import "../../node_modules/bootstrap/dist/css/bootstrap.css";

/* Modal Content/Box */
.modal-content {
  display: flex; /* Hidden by default */
  position: absolute; /* Stay in place */
  z-index: 1; /* Sit on top */
  top: 488px;
  height: 324px;
  background-color: #fefefe;
  width: 100%; /* Could be more or less, depending on screen size */
  border-radius :25px 25px 0px 0px;
  border-color: white;
  box-shadow: 0px 0px 10px #a9a9a9;
}

.modal-content-routetitle {
  width: 367px;
  background-color: #f4f4f4;
  border-radius: 20px 20px 20px 20px;
  border-color: white;
  margin: 4px auto;
}

img.drag {
  padding: 0%;
}

h1 {
  color: black;
  font-size: 15px;
  font-weight: bold;
}

h1.title {
  padding: 0px 0px 0px 10px;
}

img.saved {
  padding: 2px 0px 10px 10px;
}

.modal-content-info {
  margin: 10px 39px 0px 39px;
}

h1.number {
  font-family: "Lato", sans-serif;
  color: black;
  font-size: 16px;
  font-weight: normal;
  display: inline;
  padding: 0px;
  margin: 0px;
}

h1.unit {
  color: #CFCFCF;
  display: inline;
  padding: 0px 0px 0px 2px;
  margin: 0px;
}

hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #CFCFCF;
    margin: 0px 39px;
    padding: 0px;
}

.modal-content-hohenakku {
  margin: 0px 39px 0px 39px;
  height: 214px;
}

a.mapboxgl-ctrl-logo{
  display: contents;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
