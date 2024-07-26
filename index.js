import 'dotenv/config';
import express from 'express';
const app = express();
import { router } from './src/routers/index.js';

/**
 * Express application instance.
 * @type {Object}
 */

app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.BASE_URL}:${process.env.PORT}`);
});
