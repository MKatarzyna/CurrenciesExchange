console.log('Show the Exchange Currency! :D');

const fetchCurrencies = async () => {
    const currencyData = await fetch('https://openexchangerates.org/api/currencies.json?app_id=a0320887920d41d0b1d5013d90770f9c').then(data => data.json());
    // console.log(currencyData);

    populateCurrencySelect(currencyData);
}

const populateCurrencySelect = (currencies) => {
    //console.log(currencies);
    var select = document.getElementById('currencyFrom');
    var selectTo = document.getElementById('currencyTo');

    for(row in currencies) {
        //console.log(row);
        
        var optionElement = document.createElement('option');
        var optionElementTo = document.createElement('option');
        optionElement.text = row;
        optionElementTo.text = row;
        select.appendChild(optionElement);
        selectTo.appendChild(optionElementTo);
        
        // querySelector('.currency-select');
        // const optionElement = document.createElement('option');
        // document.getElementById("demo").innerHTML += myObj[x];
    }

    
    // select = document.querySelector('.currency-select');
    // const currencyOptions = currencies.map(currency => {
    //     const optionElement = document.createElement('option');
    //     console.log(currency);
    //     // optionElement.value = currency.id;
    //     // optionElement.text =
    //     return optionElement;
    // })  
    
    // currencyOptions.forEach(currencyOptions => {
    //     console.log(currencyOptions);
    //     select.appendChild(currencyOptions);
    // })
}

const convertCurrency = async () => {
    var amountInput = document.getElementById('amount').value;
    // var resultLabel = document.getElementById('resultRealTime');

    var CurrencyInputFrom = document.getElementById('currencyFrom').value;
    var CurrencyInputTo = document.getElementById('currencyTo').value;
    
    var calculateButton = document.querySelector('.calculateBtn');
    var switchButton = document.querySelector('.switchBtn');

    var request = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=' + CurrencyInputFrom + '&to_currency=' + CurrencyInputTo + '&apikey=EQGG2IE4E1FDHPS6';
    console.log(request);

    const result = await fetch('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=' + CurrencyInputFrom + '&to_currency=' + CurrencyInputTo + '&apikey=EQGG2IE4E1FDHPS6').then(data => data.json());
    var exchangeValue = result['Realtime Currency Exchange Rate']['5. Exchange Rate'];
    console.log(exchangeValue);

    document.getElementById('resultRealTime').innerHTML = exchangeValue;
    // resultLabel = exchangeValue;

    // [""Realtime Currency Exchange Rate""][""5. Exchange Rate""]
    // const {url} = result;
    console.log(result);
    renderChart(CurrencyInputFrom, CurrencyInputTo);
}

const swapSelectedIndexBtn = (currencyFrom, currencyTo) => {
    var indexFrom = document.getElementById('currencyFrom').selectedIndex;
    var indexTo = document.getElementById('currencyTo').selectedIndex;
    document.getElementById('currencyFrom').selectedIndex = indexTo;
    document.getElementById('currencyTo').selectedIndex = indexFrom;
}


// const changeCurrencyFrom = () => {
//     // console.log("I will change currency")
//     // console.log(event.target.value);
//     var currency = document.getElementById('currencyFrom').value;
//     console.log(currency);
//     convertCurrency(currency);
// }

// const changeCurrencyTo = () => {
//     // console.log("I will change currency")
//     // console.log(event.target.value);
//     var currency = document.getElementById('currencyTo').value;
//     console.log(currency);
//     convertCurrency(currency);
// }

fetchCurrencies()
