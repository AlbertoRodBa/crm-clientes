import { useState, useEffect } from "react";

function App() {
  const [clients, setClients] = useState([]);
  
  // Estados para la lógica del formulario
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentClient, setCurrentClient] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    fetch("http://localhost:3000/clients")
      .then(res => res.json())
      .then(data => setClients(data));
  }, []);

  const deleteClient = async (id) => {
    await fetch(`http://localhost:3000/clients/${id}`, { method: "DELETE" });
    setClients(clients.filter(client => client.id !== id));
  };

const openEditModal = (client) => {
    setIsEditing(true);
    setCurrentClient(client);
    setShowForm(true); // <--- IMPORTANTE: Abre el formulario al editar
  };

const updateClient = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/clients/${currentClient.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentClient)
    });

    if (res.ok) {
      setClients(clients.map(c => c.id === currentClient.id ? currentClient : c));
      setShowForm(false); // <--- Cerramos formulario
      setIsEditing(false);
    }
  };

  const createClient = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentClient)
    });

    if (res.ok) {
      const newClient = await res.json();
      setClients([newClient, ...clients]);
      setCurrentClient({ name: '', email: '', phone: '' });
      setShowForm(false); // <--- Cerramos formulario
    }
  };

  return (
    <div>
      <h1>CRM Clientes</h1>
     <button onClick={() => {
  setIsEditing(false); 
  setCurrentClient({ name: '', email: '', phone: '' }); 
  setShowForm(true); // <-- Aparece formulario
}}>
  + Nuevo Cliente
</button>

      {/* Formulario de Edición Simple POR AHORA */}
      {showForm && (
<form onSubmit={isEditing ? updateClient : createClient}>          
          <input 
            value={currentClient.name} 
            onChange={(e) => setCurrentClient({...currentClient, name: e.target.value})} 
          />
          <input 
            value={currentClient.email} 
            onChange={(e) => setCurrentClient({...currentClient, email: e.target.value})} 
          />
          <input 
            value={currentClient.phone} 
            onChange={(e) => setCurrentClient({...currentClient, phone: e.target.value})} 
          />
          <button type="submit">Guardar</button>
          <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
        </form>
      )}

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
                <button onClick={() => openEditModal(client)}>Editar</button>
                <button onClick={() => deleteClient(client.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;