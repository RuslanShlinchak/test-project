import { apiService } from "./api.service";

class ExchangeService {
  async getConversionRates(currency) {
    await apiService.makeRequest({
      url: `/latest/${currency}`
    })
  }

  async convert({
    from,
    to,
    amount
  }) {
    const { conversion_rates } = await this.getConversionRates(from);
    const rate = conversion_rates[to];
    const result = rate * amount;
    return {
      fromAmount: 1000,
      toAmount: result
    }
  }
}

export const exchangeService = new ExchangeService()