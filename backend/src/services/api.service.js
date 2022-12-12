import axios from "axios";
import { EXCHANGE_RATE_API_ENDPOINT, EXCHANGE_RATE_API_KEY } from "../constants";

class ApiService {
  makeRequest(options) {
    return axios.request({
      baseURL: `${EXCHANGE_RATE_API_ENDPOINT}/${EXCHANGE_RATE_API_KEY}`,
      ...options,
    });
  }
};

export const apiService = new ApiService();