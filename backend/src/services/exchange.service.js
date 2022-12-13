import { apiService } from "./api.service";

class ExchangeService {
  getConversionRates(currency) {
    return apiService.makeRequest({
      url: `/latest/${currency}`
    })
  }

  async convert({
    from,
    to,
    amount
  }) {
    const { data } = await this.getConversionRates(from);
    const rate = data.conversion_rates[to];
    const result = rate * amount;
    return {
      fromAmount: Number(amount),
      toAmount: Number(result)
    }
  }
}

export const exchangeService = new ExchangeService()