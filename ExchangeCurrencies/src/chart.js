const renderChart = async (currencyFrom, currencyTo) => {

	var dps = []; // dataPoints

	var chart = new CanvasJS.Chart("chartContainer", {
		title :{
			text: "Historical exchange chart"
		},
		axisY: {
			includeZero: false
		},      
		data: [{
			type: "line",
			dataPoints: dps
		}]
	});
	
	var xVal = 0;
	var yVal = 10; 
	var updateInterval = 6000;
	var amount = 12;
	var dataChartValueFX = await fetch('https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=' + currencyFrom + '&to_symbol=' + currencyTo + '&interval=60min&apikey=EQGG2IE4E1FDHPS6').then(data => data.json());

	
	const updateChart = function () {
		console.log(dataChartValueFX['Time Series FX (60min)']);
		console.log(amount);
		
		var i;
		for(i = 0; i < amount; i++) {
			var date = Object.keys(dataChartValueFX['Time Series FX (60min)'])[i];
			// console.log(dataChartValueFX['Time Series FX (5min)'][date]['1. open']);
			
			yVal = parseFloat(dataChartValueFX['Time Series FX (60min)'][date]['1. open']);
			
			console.log(yVal);
			console.log(xVal);
			
			dps.push({
				x: xVal,
				y: yVal
			});
			xVal++;
			
			if (dps.length > amount) {
				dps.shift();
			}
			
			chart.render();
		}
	}
	
	const updateData = async (currencyFrom, currencyTo) => {
		dataChartValueFX = await fetch('https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=' + currencyFrom + '&to_symbol=' + currencyTo + '&interval=60min&apikey=EQGG2IE4E1FDHPS6').then(data => data.json());
		
		console.log(dataChartValueFX['Time Series FX (60min)']);
	}
	
	updateChart();
}

