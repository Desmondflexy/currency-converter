function main() {
  const input = document.querySelector('#amount');
  const form = document.querySelector('form');
  const [fromCurrency, toCurrency] = document.querySelectorAll('select');

  async function getCurrencies() {
    const url = 'https://v6.exchangerate-api.com/v6/434ebfd638b0220f62b20d2d/latest/usd';
    let request = new Request(url);
    let response = await fetch(request);
    let data = await response.json();
    const rates = data.conversion_rates;

    const currencies = Object.keys(rates);
    for (const currency of currencies) {
      const option = document.createElement('option');
      option.value = currency;
      option.innerHTML = currency;
      fromCurrency.appendChild(option);
      toCurrency.appendChild(option.cloneNode(true));
    }

    fromCurrency.selectedIndex = currencies.indexOf('USD');
    toCurrency.selectedIndex = currencies.indexOf('NGN');

    document.querySelector('.result>p>span').innerHTML = data.time_last_update_utc.slice(0, -15);
  }

  getCurrencies();

  async function convertCurrency(from, to, amount) {
    const url = `https://v6.exchangerate-api.com/v6/434ebfd638b0220f62b20d2d/latest/${from}`;
    let request = new Request(url);
    let response = await fetch(request);
    let data = await response.json();
    const rate = data.conversion_rates[to];
    const result = amount * rate;
    document.querySelector('.result>h2').innerHTML = `${amount} <a href="${googleSearch(from)}">${from}</a> = ${result.toFixed(4)} <a href="${googleSearch(to)}">${to}</a>`;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const amount = input.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;
    convertCurrency(from, to, amount);
    input.value = '';
    input.focus();
  })

  function googleSearch(currency) {
    const query = `${currency}+currency wikipedia`;
    return 'https://www.google.com/search?q=' + query;
  }
}

main();