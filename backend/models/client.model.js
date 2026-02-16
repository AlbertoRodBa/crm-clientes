import { db } from "../config/db.js";

export const Client = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM clients ORDER BY created_at DESC");
    return rows;
  },

  create: async (client) => {
    const { name, email, phone } = client;
    const [result] = await db.query(
      "INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)",
      [name, email, phone]
    );
    return result.insertId;
  },

  update: async (id, client) => {
    const { name, email, phone } = client;
    await db.query(
      "UPDATE clients SET name = ?, email = ?, phone = ? WHERE id = ?",
      [name, email, phone, id]
    );
  },

  delete: async (id) => {
    await db.query("DELETE FROM clients WHERE id = ?", [id]);
  }
};
