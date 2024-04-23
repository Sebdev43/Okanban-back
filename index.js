// Par rapport à require avec dotenv : avec ESN on n'a qu'une ligne à écrire
import 'dotenv/config';
import express from 'express';
const app = express();

// Quandn on utilise ESM, on doit préciser l'extension de fichier
import { router } from './src/routers/index.js';

// * ce middleware sert à interpréter du json que l'on reçoit par req.body
app.use(express.json());

app.use(router);

app.listen(process.env.PORT, () => {
    console.log(
        `Example app listening on port ${process.env.BASE_URL}:${process.env.PORT}`
    );
});
