import express from "express";
import { pool } from "./db.js";
import { PORT } from "./config.js";
import cors from "cors";

const app = express();
app.use(cors());

// Endpoint para el healthy check
app.get("/api/v1/conectividades", async (req, res) => {
  // Aquí puedes realizar cualquier verificación necesaria para el estado de tu API
  res.send("API is healthy");
});

// Agregando subpath cip-cda-registro
const router = express.Router();
router.get("/api/v1/conectividades", async (req, res) => {
  // Implementa cualquier lógica específica para este subpath si es necesario
  res.send("Welcome to cip-cda-registro API");
});
app.use("/cip-cda-registro", router);

// Rutas existentes
app.get("/", async (req, res) => {
  res.send("Bienvenido al servidor");
});

app.get("/buscarIngeniero/:id", async (req, res) => {
  // Código existente
});

app.get("/colegiados/:id", async (req, res) => {
  // Código existente
});

app.get("/buscarByName/:name", async (req, res) => {
  // Código existente
});

app.get("/pagos/:id/:id2/:id3", async (req, res) => {
  // Código existente
});

app.get("/listaPagos/:correlativo/:nroSerie", async (req, res) => {
  // Código existente
});

app.listen(PORT, () => {
  console.log("Connected to backend at PORT ---> " + PORT);
});