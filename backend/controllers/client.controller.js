import { Client } from "../models/client.model.js";

// GET /clients
export const getClients = async (req, res) => {
  try {
    const clients = await Client.getAll();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener clientes" });
  }
};

// POST /clients
export const createClient = async (req, res) => {
  try {
    const id = await Client.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ message: "Error al crear cliente" });
  }
};

// PUT /clients/:id
export const updateClient = async (req, res) => {
  try {
    await Client.update(req.params.id, req.body);
    res.json({ message: "Cliente actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar cliente" });
  }
};

// DELETE /clients/:id
export const deleteClient = async (req, res) => {
  try {
    await Client.delete(req.params.id);
    res.json({ message: "Cliente eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar cliente" });
  }
};
