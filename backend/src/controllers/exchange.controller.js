import { exchangeService } from "../services" 

export const ExchangeController = async (req, res, next) => {
  const handlersMap = async (req, res, next) => {
    try {
      const result = await exchangeService.convert(req.body);
      res.res(result);
    } catch (error) {
      next(error);
    }
  };
  return handlersMap[req.method];
}