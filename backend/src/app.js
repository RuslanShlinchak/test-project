import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ExchangeController, CurrenciesController } from "./controllers";
import { errorMiddleware } from "./middlewares";
import { PORT } from "./constants";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(errorMiddleware);
app.use(bodyParser.json({ type: 'application/json' }));
app.get('/currencies', CurrenciesController);
app.post('/exchange', ExchangeController);

server.listen(PORT);
