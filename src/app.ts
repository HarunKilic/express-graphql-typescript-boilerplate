require('dotenv').config();
import 'express-async-errors';
import express, { json, urlencoded } from 'express';
import compression from 'compression';
import { exampleRoute } from './routes/example/example';

const app = express();
app.use(compression());
app.use(json());
app.use(urlencoded({ extended: true }));

// // ROUTES
app.use('/example', exampleRoute);

export default app;
