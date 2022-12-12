import express from 'express';
import cors from 'cors';
import { handleGetCurrencies } from "./services";
import { errorMiddleware } from "./middlewares";

const app = express();

app.use(cors());
app.use(errorMiddleware);
app.get('/currencies', handleGetCurrencies);
app.post('/exchange', handleGetCurrencies);

export default app;
