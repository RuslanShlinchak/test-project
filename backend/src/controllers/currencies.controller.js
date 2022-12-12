import { currenciesService } from "../services"

export const CurrenciesController = (req, res, next) => {
  const handlersMap = {
    'GET': async () => {
      try {
        const data = await currenciesService.getCodesList();
        res.send(data); 
      } catch (error) {
        next(error);
      }
    }
  }
  return handlersMap[req.method];
}