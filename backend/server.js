import express from "express";
import cors from "cors";
import { db } from "./config/db.js";
import clientRoutes from "./routes/client.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/clients", clientRoutes);

// test DB
app.get("/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ status: "OK" });
  } catch (error) {
    res.status(500).json({ error: "DB connection failed" });
  }
});

app.listen(3000, () => {
  console.log("API running on http://localhost:3000 - Api corriendo en http://localhost:3000");
});
