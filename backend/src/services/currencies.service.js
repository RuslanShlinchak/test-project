import { apiService } from "./api.service";

class CurrenciesService {
  async getCodesList() {
    const result = await apiService.makeRequest({
      url: '/codes'
    });
    return result.data.supported_codes;
  }
}

export const currenciesService = new CurrenciesService()