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
  const q = "SELECT ncodcol,nestcol,ndnicol  FROM colegiados where ncodcol = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/pagos/:id/:id2/:id3", (req, res) => {
  const correlativo = req.params.id;
  const nroSerie = req.params.id2;
  const monto = req.params.id3;

  const q = `SELECT vserdoc, vnumdoc, nvaltot, ncodcli FROM movimientoscab WHERE vnumdoc LIKE '%${correlativo}' and vserdoc LIKE '%${nroSerie}' and nvaltot = ${monto} `;

  db.query(q, [correlativo, nroSerie, monto], (err, data) => {
    if (err) {
      console.log(err);
      return "nro de serie no encontrado";
    }
    return res.json(data);
  });
});
app.get("/listaPagos/:correlativo/:nroSerie", (req, res) => {
  const correlativo2 = req.params.correlativo;
  const nroSerie2 = req.params.nroSerie;
  const q = `SELECT vserdoc, vnumdoc, ncodcli ,vtipope, nvaluni , vdesope  FROM movimientodetalle WHERE vnumdoc LIKE '%${correlativo2}' and vserdoc LIKE '%${nroSerie2}'`;
  db.query(q, [correlativo2, nroSerie2], (err, data) => {
    if (err) {
      console.log(err);
      return "nro de serie no encontrado";
    }
    return res.json(data);
  });
});

app.listen(PORT, () => {
  console.log("Connected to backend.");
});
