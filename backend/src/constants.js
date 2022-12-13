import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3001;
export const EXCHANGE_RATE_API_KEY = process.env.API_KEY;
export const EXCHANGE_RATE_API_ENDPOINT = "https://v6.exchangerate-api.com/v6";
