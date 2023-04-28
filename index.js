import express from "express";
import { db } from "./db.js";

import mysql from "mysql";
import cors from "cors";
import { PORT } from "./config.js";
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hola mundo, estas conectado");
});

app.get("/colegiados/:id", (req, res) => {
  const bookId = req.params.id;
  db.connect();
  const q = "SELECT ncodcol,nestcol,ndnicol  FROM colegiados where ncodcol = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
  db.end();
});

app.get("/pagos/:id/:id2/:id3", (req, res) => {
  const correlativo = req.params.id;
  const nroSerie = req.params.id2;
  const monto = req.params.id3;
  db.connect();

  const q = `SELECT vserdoc, vnumdoc, nvaltot, ncodcli FROM movimientoscab WHERE vnumdoc LIKE '%${correlativo}' and vserdoc LIKE '%${nroSerie}' and nvaltot = ${monto} `;

  db.query(q, [correlativo, nroSerie, monto], (err, data) => {
    if (err) {
      console.log(err);
      return "nro de serie no encontrado";
    }
    return res.json(data);
  });
  db.end();
});
app.get("/listaPagos/:id/:id2", (req, res) => {
  const correlativo = req.params.id;
  const nroSerie = req.params.id2;
  db.connect();
  const q = `SELECT  vserdoc, vnumdoc,  ncodcli , vtipope, nvaluni , vdesope  FROM movimientodetalle WHERE vnumdoc LIKE '%${correlativo}' and vserdoc LIKE '%${nroSerie}'	 `;
  db.query(q, [correlativo, nroSerie], (err, data) => {
    if (err) {
      console.log(err);
      return "nro de serie no encontrado";
    }
    return res.json(data);
  });
  db.end();
});

app.listen(PORT, () => {
  console.log("Connected to backend.");
});
