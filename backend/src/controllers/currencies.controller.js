import { currenciesService } from "../services"

export const GetCurrenciesController = async (req, res, next) => {
  try {
    const data = await currenciesService.getCodesList();
    res.send(data); 
  } catch (error) {
    next(error);
  }
}