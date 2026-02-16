import express from "express";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient
} from "../controllers/client.controller.js";

const router = express.Router();

// GET /clients
router.get("/", getClients);

// POST /clients
router.post("/", createClient);

// PUT /clients/:id
router.put("/:id", updateClient);

// DELETE /clients/:id
router.delete("/:id", deleteClient);

export default router;
