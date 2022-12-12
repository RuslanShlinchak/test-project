import express from 'express';
import cors from 'cors';
import { ExchangeController, CurrenciesController } from "./controllers";
import { errorMiddleware } from "./middlewares";

const app = express();

app.use(cors());
app.use(errorMiddleware);
app.get('/currencies', CurrenciesController);
app.post('/exchange', ExchangeController);

export default app;
