import { useState, useEffect } from "react";

function App() {
  const [clients, setClients] = useState([]);

  // Estados para la lógica del formulario
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentClient, setCurrentClient] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/clients")
      .then((res) => res.json())
      .then((data) => setClients(data));
  }, []);

  const deleteClient = async (id) => {
    await fetch(`http://localhost:3000/clients/${id}`, { method: "DELETE" });
    setClients(clients.filter((client) => client.id !== id));
  };

  const openEditModal = (client) => {
    setIsEditing(true);
    setCurrentClient(client);
    setShowForm(true); // <--- IMPORTANTE: Abre el formulario al editar
  };

  const updateClient = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:3000/clients/${currentClient.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentClient),
      },
    );

    if (res.ok) {
      setClients(
        clients.map((c) => (c.id === currentClient.id ? currentClient : c)),
      );
      setShowForm(false); // <--- Cerramos formulario
      setIsEditing(false);
    }
  };

  const createClient = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentClient),
    });

    if (res.ok) {
      const newClient = await res.json();
      setClients([newClient, ...clients]);
      setCurrentClient({ name: "", email: "", phone: "" });
      setShowForm(false); // <--- Cerramos formulario
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">CRM Clientes</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded shadow"
            onClick={() => {
              setIsEditing(false);
              setCurrentClient({ name: "", email: "", phone: "" });
              setShowForm(true);
            }}
          >
            + Nuevo Cliente
          </button>
        </div>

        {/* Formulario de Edición Simple POR AHORA */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              {isEditing ? "Editar Cliente" : "Nuevo Cliente"}
            </h2>
            <form
              onSubmit={isEditing ? updateClient : createClient}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  placeholder="Nombre"
                  className="border border-gray-300 p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  value={currentClient.name}
                  onChange={(e) =>
                    setCurrentClient({ ...currentClient, name: e.target.value })
                  }
                />
                <input
                  placeholder="Email"
                  className="border border-gray-300 p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  value={currentClient.email}
                  onChange={(e) =>
                    setCurrentClient({
                      ...currentClient,
                      email: e.target.value,
                    })
                  }
                />
                <input
                  placeholder="Teléfono"
                  className="border border-gray-300 p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  value={currentClient.phone}
                  onChange={(e) =>
                    setCurrentClient({
                      ...currentClient,
                      phone: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-bold transition-colors"
                >
                  {isEditing ? "Actualizar" : "Guardar Cliente"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Contenedor de la tabla: da el fondo blanco, bordes redondeados y sombra */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            {/* Encabezado con fondo gris suave */}
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-700">Nombre</th>
                <th className="p-4 font-semibold text-gray-700">Email</th>
                <th className="p-4 font-semibold text-gray-700">Teléfono</th>
                <th className="p-4 font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>

            {/* Cuerpo de la tabla con líneas divisorias */}
            <tbody className="divide-y divide-gray-100">
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 text-gray-600">{client.name}</td>
                  <td className="p-4 text-gray-600">{client.email}</td>
                  <td className="p-4 text-gray-600">{client.phone}</td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => openEditModal(client)}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteClient(client.id)}
                        className="text-red-600 hover:text-red-800 font-medium transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
