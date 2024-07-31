import "dotenv/config";
import express from "express";
import session from "express-session";
import SequelizeStoreFactory from "connect-session-sequelize";
import { Sequelize } from "sequelize";
import cors from "cors";
import csurf from "csurf";
import cookieParser from "cookie-parser";
import { router } from "./src/routers/router.js";

const app = express();
const sequelize = new Sequelize(process.env.PG_URL);

const SequelizeStore = SequelizeStoreFactory(session.Store);

const store = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 1000, // Nettoyage des sessions expirées toutes les 15 minutes
  expiration: 24 * 60 * 60 * 1000, // Durée de vie des sessions de 24 heures
});

const csrfProtection = csurf({ cookie: true });
/**
 * Express application instance.
 * @type {Object}
 */
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: "Le okanban c'est fanstatique !",
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

store.sync();




app.use(csrfProtection);

app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  res.status(403).send('Invalid CSRF Token');
});


app.use(router);

app.listen(process.env.PORT, () => {
  console.log(
    `Example app listening on port ${process.env.BASE_URL}:${process.env.PORT}`
  );
});
