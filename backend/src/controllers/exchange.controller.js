import { exchangeService } from "../services" 

export const ExchangeController = async (req, res, next) => {
  const handlersMap = {
    post: async () => {
      try {
        const result = await exchangeService.convert(req.body);
        res.send(result);
      } catch (error) {
        next(error);
      }
    }
  };
  return handlersMap[req.method];
}