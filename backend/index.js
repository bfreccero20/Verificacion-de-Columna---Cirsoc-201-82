const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

const verificarColumna = require("./verificarColumna");
app.post("/api/verificar", verificarColumna);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
