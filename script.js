class CryptoInfo {
  constructor() {
    this.apiUrl = "https://garantex.org/api/v2/depth?market=";
  }

  async fetchMarketData() {
    try {
      const response = await fetch(`${this.apiUrl}rubusdt`);
      const data = await response.json();

      if (!data.asks || !data.bids) {
        throw new Error("Не удалось получить данные по предложениям.");
      }

      //Заявки отсортированы в порядке возрастания цены для продажи и убывания цены для покупки.
      const bestAsk = data.asks[0].price;
      const bestBid = data.bids[0].price;

      return {
        usdtRub: {
          bestAsk: parseFloat(bestAsk), // Лучшая цена на продажу USDT
          bestBid: parseFloat(bestBid), // Лучшая цена на покупку USDT
        },
      };
    } catch (error) {
      return { error: `Ошибка при запросе данных: ${error.message}` };
    }
  }
}

(async () => {
  const market = new CryptoInfo();
  await market.fetchMarketData().then((prices) => {
    if (prices.error) {
      console.error(prices.error);
    } else {
      console.log("Лучшие цены на пару USDT/RUB:", prices);
    }
  });
})();
