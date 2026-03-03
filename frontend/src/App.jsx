import { useState } from "react";
import { useEffect } from "react";

function App() {
// 
  const [clients, setClients] = useState([]);

  const deleteClient = async (id) => {
    await fetch(`http://localhost:3000/clients/${id}`, {
      method: "DELETE"
    });
    setClients(clients.filter(client => client.id !== id));
  };

  useEffect(() => {
  fetch("http://localhost:3000/clients")
    .then(res => res.json())
    .then(data => setClients(data));
}, []);

  return (
    <div>
      <h1>CRM Clientes</h1>

      <button>+ Nuevo Cliente</button>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>
                <button>Editar</button>
                <button onClick={() => deleteClient(client.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default App;