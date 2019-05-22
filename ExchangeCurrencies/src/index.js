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
        
        var optionElement = document.createElement('option');
        var optionElementTo = document.createElement('option');
        optionElement.text = row;
        optionElementTo.text = row;
        select.appendChild(optionElement);
        selectTo.appendChild(optionElementTo);
        
}

const convertCurrency = async () => {
    var amountInput = document.getElementById('amount').value;

    var CurrencyInputFrom = document.getElementById('currencyFrom').value;
    var CurrencyInputTo = document.getElementById('currencyTo').value;
    
    var calculateButton = document.querySelector('.calculateBtn');
    var switchButton = document.querySelector('.switchBtn');

    var request = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=' + CurrencyInputFrom + '&to_currency=' + CurrencyInputTo + '&apikey=EQGG2IE4E1FDHPS6';
    console.log(request);

    const result = await fetch('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=' + CurrencyInputFrom + '&to_currency=' + CurrencyInputTo + '&apikey=EQGG2IE4E1FDHPS6').then(data => data.json());
    var exchangeValue = result['Realtime Currency Exchange Rate']['5. Exchange Rate'];
    console.log(exchangeValue);

    document.getElementById('resultExchange').innerHTML = exchangeValue;
  
    console.log(result);
}
// calculateButton.addEventListener('click', convertCurrency);


fetchCurrencies()
