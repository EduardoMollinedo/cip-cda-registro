import express from "express";
import { pool } from "./db.js";
import { PORT } from "./config.js";

const app = express();

app.get("/", async (req, res) => {
  res.send("Bienvenido al servidor");
});



app.get("/colegiados/:id", async (req, res) => {
  const bookId = req.params.id;
  const q = "SELECT ncodcol,nestcol,ndnicol  FROM colegiados where ncodcol = ?";
  const [result] = await pool.query(q, [bookId]);
  res.json(result[0]);
});

app.get("/pagos/:id/:id2/:id3", async (req, res) => {
  const correlativo = req.params.id;
  const nroSerie = req.params.id2;
  const monto = req.params.id3;

  const q = `SELECT vserdoc, vnumdoc, nvaltot, ncodcli FROM movimientoscab WHERE vnumdoc LIKE '%${correlativo}' and vserdoc LIKE '%${nroSerie}' and nvaltot = ${monto} `;
  const [result] = await pool.query(q, [correlativo, nroSerie, monto]);
  res.json(result[0]); 
});

app.get("/listaPagos/:correlativo/:nroSerie", async (req, res) => {
	const correlativo2 = req.params.correlativo;
	const nroSerie2 = req.params.nroSerie;
	const q = `SELECT vserdoc, vnumdoc, ncodcli ,vtipope, nvaluni , vdesope, ncan  FROM movimientodetalle WHERE vnumdoc LIKE '%${correlativo2}' and vserdoc LIKE '%${nroSerie2}'`;
    const [result] = await pool.query(q, [correlativo2, nroSerie2]);
	res.json(result[0]); 

	
  });
  app.listen(PORT, () => {
	console.log("Connected to backend at PORT  ---> " + PORT);
  });console.log("Server on port", PORT);
