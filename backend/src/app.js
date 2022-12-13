import http from 'http';
import express from 'express';
import cors from 'cors';
import { ExchangeController, CurrenciesController } from "./controllers";
import { errorMiddleware } from "./middlewares";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || '3001';

app.use(cors());
app.use(errorMiddleware);
app.get('/currencies', CurrenciesController);
app.post('/exchange', ExchangeController);

server.listen(port);
