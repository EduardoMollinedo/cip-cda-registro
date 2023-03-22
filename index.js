import express from "express";
import { db } from './db.js'

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

app.get("/pagos/:id", (req, res) => {
	const bookId = req.params.id;
	const q = `SELECT vserdoc, vnumdoc, nvaltot, ncodcli FROM movimientoscab WHERE vnumdoc LIKE '%${bookId}'`;
  
	db.query(q, [bookId], (err, data) => {
	  if (err) {
		console.log(err);
		return ("nro de serie no encontrado");
	  }
	  return res.json(data);
	});
  });


app.listen(PORT, () => {
  console.log("Connected to backend.");
});
