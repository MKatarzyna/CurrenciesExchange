var mode = 0;

const setMode = function (selectedMode) {
	mode = selectedMode;
}

const renderChart = async (currencyFrom, currencyTo) => {
	
	var dps = []; // dataPoints
	var xVal = 0;
	var yVal = 10; 

	var amount = 12;
	var interval = 'Time Series FX (60min)';
	var apiRequest = 'https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=' + currencyFrom + '&to_symbol=' + currencyTo + '&interval=60min&apikey=EQGG2IE4E1FDHPS6';
	
	var intervalTypeChange = 'hour';
	var valueFormatStringChange = "YY-MMM-DD hh:mm";
	var textChange = '12 hour historical exchange chart [hours]';
	
	if(mode == 0) {
		intervalTypeChange = 'hour';
		valueFormatStringChange = "YY-MMM-DD hh:mm";
		textChange = '12 hour historical exchange chart [hours]';
	} else if (mode == 1) {
		intervalTypeChange = 'hour';
		valueFormatStringChange = "YY-MMM-DD hh:mm";
		textChange = '1 day historical exchange chart [hours]';
	} else if(mode == 2) {
		intervalTypeChange = 'day';
		valueFormatStringChange = "YY-MMM-DD";
		textChange = '1 week historical exchange chart [days]';
	} else if (mode == 3) {
		intervalTypeChange = 'day';
		valueFormatStringChange = "YY-MMM-DD";
		textChange = '1 month historical exchange chart [days]';
	} else if(mode == 4) {
		intervalTypeChange = 'week';
		valueFormatStringChange = "YY-MMM-DD";
		textChange = '1 year historical exchange chart [weeks]';
	} else {
		intervalTypeChange = 'month';
		valueFormatStringChange = "YY-MMM";
		textChange = 'Historical exchange chart [years]';
	}

	var chart = new CanvasJS.Chart("chartContainer", {
		title :{
			text: textChange
		},
		axisY: {
			includeZero: false
		},
		axisX:{
			interval: 1,
			intervalType: intervalTypeChange,
			valueFormatString: valueFormatStringChange,
			labelAngle: -80
		}, 
		data: [{
			type: "line",
			dataPoints: dps
		}]
	});

	switch (mode) {
		case 0:
			// 12 hours
			amount = 12;
			interval = 'Time Series FX (60min)';
			apiRequest = 'https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=' + currencyFrom + '&to_symbol=' + currencyTo + '&interval=60min&apikey=EQGG2IE4E1FDHPS6';
			break;
		case 1:
			//  1 Day = 24 hours
			amount = 24;
			interval = 'Time Series FX (60min)';
			apiRequest = 'https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=' + currencyFrom + '&to_symbol=' + currencyTo + '&interval=60min&apikey=EQGG2IE4E1FDHPS6';
			break;
		case 2:
			//  1 week = 7 days
			amount = 7;
			interval = 'Time Series FX (Daily)';
			apiRequest = 'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=' + currencyFrom + '&to_symbol=' + currencyTo + '&apikey=EQGG2IE4E1FDHPS6';
			break;
		case 3:
			//  1 month = 31 days
			amount = 31;
			interval = 'Time Series FX (Daily)';
			apiRequest = 'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=' + currencyFrom + '&to_symbol=' + currencyTo + '&apikey=EQGG2IE4E1FDHPS6';
			break;
		case 4:
			// 1 year = 52 weeks
			amount = 52;
			interval = 'Time Series FX (Weekly)';
			apiRequest = 'https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=' + currencyFrom + '&to_symbol=' + currencyTo + '&apikey=EQGG2IE4E1FDHPS6';
			break;
		case 5:
			//  2 years = 24 months
			amount = 24;
			interval = 'Time Series FX (Monthly)';
			apiRequest = 'https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=' + currencyFrom + '&to_symbol=' + currencyTo + '&apikey=EQGG2IE4E1FDHPS6';
			break;
		case 6:
			//  5 years = 60 months
			amount = 60;
			interval = 'Time Series FX (Monthly)';
			apiRequest = 'https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=' + currencyFrom + '&to_symbol=' + currencyTo + '&apikey=EQGG2IE4E1FDHPS6';
			break;
		case 7:
			//  10 years
			amount = 120;
			interval = 'Time Series FX (Monthly)';
			apiRequest = 'https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=' + currencyFrom + '&to_symbol=' + currencyTo + '&apikey=EQGG2IE4E1FDHPS6';
			break;
	}
	
	// console.log(interval);
	// console.log(apiRequest);
	var dataChartValueFX = await fetch(apiRequest).then(data => data.json());

	// 'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=EQGG2IE4E1FDHPS6'

	const updateChart = function () {
		// console.log(dataChartValueFX[interval]);
		// console.log(amount);
		
		// var xAxisDate = dataChartValueFX[interval][0];
		// console.log(xAxisDate);
		var year = '';
		var month = '';
		var day = '';
		var hour = '';
		var minutes = '';
		var i;

		for(i = 0; i < amount; i++) {
			var date = Object.keys(dataChartValueFX[interval])[i];
			// console.log(dataChartValueFX['Time Series FX (5min)'][date]['1. open']);
			// console.log(date);
			yVal = parseFloat(dataChartValueFX[interval][date]['1. open']);

			if(mode == 0 || mode == 1) {
				year = date.substring(0, 4);
				month = date.substring(5, 7);
				day = date.substring(8, 10);
				hour = date.substring(11, 13);
				minutes = date.substring(14, 16);
				xVal = new Date(year,month,day,hour,minutes);
			} else {
				year = date.substring(0, 4);
				month = date.substring(5, 7);
				day = date.substring(8, 10);
				xVal = new Date(year,month,day);
			}
			// console.log(year, month, day, hour, minutes);
			
			// new Date(2014,02,09,i,20)
			console.log(yVal);
			console.log(xVal);
			
			dps.push({
				x: xVal,
				y: yVal
			});
			// xVal++;
			
			if (dps.length > amount) {
				dps.shift();
			}
			
			chart.render();
		}
	}
	
	// const updateData = async (currencyFrom, currencyTo) => {
	// 	dataChartValueFX = await fetch('https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=' + currencyFrom + '&to_symbol=' + currencyTo + '&interval=60min&apikey=EQGG2IE4E1FDHPS6').then(data => data.json());
		
	// 	console.log(dataChartValueFX[interval]);
	// }
	
	updateChart();
}

