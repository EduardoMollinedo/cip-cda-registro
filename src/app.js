import express from "express";
import { pool } from "./db.js";
import { PORT } from "./config.js";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Bienvenido al servidor");
});


app.get("/buscarIngeniero/:id", async (req, res) => {
	const bookId = req.params.id;
	const q = "SELECT vapecol, vnomcol,ncodcol,nestcol FROM colegiados where ndnicol  = ?";
	const [result] = await pool.query(q, [bookId]);
	res.json(result);
  });

app.get("/colegiados/:id", async (req, res) => {
  const bookId = req.params.id;
  const q = "SELECT vapecol, vnomcol,ncodcol,ndnicol,nestcol  FROM colegiados where ncodcol = ?";
  const [result] = await pool.query(q, [bookId]);
  res.json(result);
});

app.get("/buscarByName/:name", async (req, res) => {
	const name = req.params.name;

	const q = `SELECT vapecol, vnomcol,ncodcol,nestcol, vnumdoc FROM colegiados WHERE (CONCAT(vnomcol, ' ', vapecol) LIKE '%${name}%') OR (CONCAT(vapecol, ' ', vnomcol) LIKE '%${name}%') ORDER BY vapecol ASC`;
	const [result] = await pool.query(q, [name]);
	res.json(result);
  });
  

app.get("/pagos/:id/:id2/:id3", async (req, res) => {
  const correlativo = req.params.id;
  const nroSerie = req.params.id2;
  const monto = req.params.id3;

  const q = `SELECT vserdoc, vnumdoc, nvaltot, ncodcli FROM movimientoscab WHERE vnumdoc LIKE '%${correlativo}' and vserdoc LIKE '%${nroSerie}' and nvaltot = ${monto} `;
  const [result] = await pool.query(q, [correlativo, nroSerie, monto]);
  res.json(result); 
});

app.get("/listaPagos/:correlativo/:nroSerie", async (req, res) => {
	const correlativo2 = req.params.correlativo;
	const nroSerie2 = req.params.nroSerie;
	const q = `SELECT vserdoc, vnumdoc, ncodcli ,vtipope, nvaluni , vdesope, ncan  FROM movimientodetalle WHERE vnumdoc LIKE '%${correlativo2}' and vserdoc LIKE '%${nroSerie2}'`;
    const [result] = await pool.query(q, [correlativo2, nroSerie2]);
	res.json(result); 

	
  });
  app.listen(PORT, () => {
	console.log("Connected to backend at PORT  ---> " + PORT);
  });console.log("Server on port", PORT);
