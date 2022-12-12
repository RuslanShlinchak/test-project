import { exchangeService } from "../services" 

export const PostExchangeController = async (req, res, next) => {
  try {
    const result = await exchangeService.convert(req.body);
    res.res(result);
  } catch (error) {
    next(error);
  }
}