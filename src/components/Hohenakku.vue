<template>
  <div v-on:keydown="key">
    <canvas id="myChart"></canvas>

  </div>
</template>

<script>
import chart from "chart.js";
import * as route from "./../assets/route.js";
import haversinedistance from "haversine-distance";

export default {
  //objekt definition von methods funktion ist ein Attribut ?
  methods: {
    // berechnung distanz zwischen zwei koordinaten
    key:function(event){console.log("sjdjfsfjsedf")},
    routeChart(gjson) {
      const coordinates = gjson.data.geometry.coordinates;
      console.log(coordinates.length);
      //schritte
      const stepsize = Math.round(coordinates.length / 10);
      let stepCtr = 0;
      let distance = 0;
      let labels = [0];

      for (let i = 1; i < coordinates.length; i++) {
        var a = { lat: coordinates[i - 1][0], lng: coordinates[i - 1][1] };
        var b = { lat: coordinates[i][0], lng: coordinates[i][1] };
        distance += Math.round(haversinedistance(a, b));
        stepCtr++;

        if (stepCtr == stepsize) {
          labels.push(distance);
          stepCtr = 0;
        }
      }
      console.log(labels.length, "asd");
      return labels;
    },

    altitudeGeber(gjson) {
      const coordinates = gjson.data.geometry.coordinates;
      let alti = [coordinates[0][2]];
      const stepsize = Math.round(coordinates.length / 10);
      //let stepCtr=0

      console.log(stepsize);
      for (let i = 0; i < coordinates.length; i += stepsize) {
        alti.push(coordinates[i][2]);
        console.log(i, "wswdd");
      }
      return alti;
    }
  },

  mounted() {
    //maße werte sollen im backend berechnet werden

    this.routeChart(route);
    var ctx = document.getElementById("myChart");
    var myChart = new chart(ctx, {
      type: "line",
      data: {
        labels: this.routeChart(route),

        datasets: [
          {
            label: "Höhenmeter",
            data: this.altitudeGeber(route),
            fill: true,
            backgroundColor: ["rgba(0,0,0,0.5)"],
            borderColor: ["rgba(0,0,0,0.5)"]

            // borderWidth: 1
          },
          {
            label: "Persönlicher Akkuverbrauch",
            fill: false,
            //200 keine motorleistung 500 volle motorleistung
            data: [200, 250, 400, 250, 500, 500, 250, 300, 300, 300, 300],
            backgroundColor: ["rgba(255, 99, 132, 1)"],
            borderColor: ["rgba(255, 99, 132, 1)"]
            //borderWidth: 1
          }
        ]
      },

      options: {
        onClick: function(event) {
          var item = myChart.getElementAtEvent(event);
          console.log(item[0]._index);
          //myChart.data.datasets[item._datasetIndex].data[item._index
          console.log(myChart.data.datasets[1].data[item[0]._index]);
          //Angeklickte Information (Akkuverbrauch) an Backend schicken
          fetch("http://localhost:3000/akkuverbrauch", {
            method: "POST",
            //myChart.data.datasets[1].data[item[0]._index]
            body: JSON.stringify({
              motorleistung: myChart.data.datasets[1].data[item[0]._index]
            }),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(res => res.json())
            .then(response => console.log("Success:", response))
            .catch(error => console.error("Error:", error));
        },

        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true
                //labelString: "km"
              }
            }
          ],
          yAxes: [
            {
              display: false,
              scaleLabel: {
                display: true
              }
            }
          ]
        },

         legend: {
           responsive:true,
            display: true,
            position: 'bottom',

        }
      }
    });
  }
};
</script>

<style scoped>
#myChart {
  width: 100%;
  height: 60%;
  margin-top: 10%;
}
</style>



		// var color = Chart.helpers.color;
		// function createConfig(legendPosition, colorName) {
		// 	return {
		// 		type: 'line',
		// 		data: {
		// 			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		// 			datasets: [{
		// 				label: 'My First dataset',
		// 				data: [
		// 					randomScalingFactor(),
		// 					randomScalingFactor(),
		// 					randomScalingFactor(),
		// 					randomScalingFactor(),
		// 					randomScalingFactor(),
		// 					randomScalingFactor(),
		// 					randomScalingFactor()
		// 				],
		// 				backgroundColor: color(window.chartColors[colorName]).alpha(0.5).rgbString(),
		// 				borderColor: window.chartColors[colorName],
		// 				borderWidth: 1
		// 			}]
		// 		},
		// 		options: {
		// 			responsive: true,
		// 			legend: {
		// 				position: legendPosition,
		// 			},
		// 			scales: {
		// 				xAxes: [{
		// 					display: true,
		// 					scaleLabel: {
		// 						display: true,
		// 						labelString: 'Month'
		// 					}
		// 				}],
		// 				yAxes: [{
		// 					display: true,
		// 					scaleLabel: {
		// 						display: true,
		// 						labelString: 'Value'
		// 					}
		// 				}]
		// 			},
		// 			title: {
		// 				display: true,
		// 				text: 'Legend Position: ' + legendPosition
		// 			}
		// 		}
		// 	};
		// }

		// window.onload = function() {
		// 	[{
		// 		id: 'chart-legend-top',
		// 		legendPosition: 'top',
		// 		color: 'red'
		// 	}, {
		// 		id: 'chart-legend-right',
		// 		legendPosition: 'right',
		// 		color: 'blue'
		// 	}, {
		// 		id: 'chart-legend-bottom',
		// 		legendPosition: 'bottom',
		// 		color: 'green'
		// 	}, {
		// 		id: 'chart-legend-left',
		// 		legendPosition: 'left',
		// 		color: 'yellow'
		// 	}].forEach(function(details) {
		// 		var ctx = document.getElementById(details.id).getContext('2d');
		// 		var config = createConfig(details.legendPosition, details.color);
		// 		new Chart(ctx, config);
		// 	});
		// };
