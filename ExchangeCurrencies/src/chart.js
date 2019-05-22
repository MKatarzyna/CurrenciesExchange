
const renderChart = async (currencyFrom, currencyTo) => {

// var CurrencyInputFrom = document.getElementById('currencyFrom').value;
// var CurrencyInputTo = document.getElementById('currencyTo').value;
// console.log(CurrencyInputFrom);

var dps = await fetch('https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=' + currencyFrom + '&to_symbol=' + currencyTo + '&interval=5min&apikey=EQGG2IE4E1FDHPS6').then(data => data.json());

console.log(dps);

// var chart = new CanvasJS.Chart("chartContainer", {
// 	// animationEnabled: true,
// 	theme: "light2",
// 	title:{
// 		text: "Historical exchange chart"
// 	},
// 	axisX:{
// 		includeZero: false
// 	},
// 	axisY:{
// 		includeZero: false
// 	},
// 	data: [{        
// 		type: "line",       
// 		dataPoints: dps
// 	}]
// });


// var xVal = 0;
// var yVal = 100; 
// var updateInterval = 1000;
// var dataLength = 20; // number of dataPoints visible at any point

// var updateChart = function (count) {

// 	count = count || 1;

// 	for (var j = 0; j < count; j++) {
// 		yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
// 		dps.push({
// 			x: xVal,
// 			y: yVal
// 		});
// 		xVal++;
// 	}

// 	if (dps.length > dataLength) {
// 		dps.shift();
// 	}

	// chart.render();
// };

// updateChart(dataLength);
// setInterval(function(){updateChart()}, updateInterval);


}
