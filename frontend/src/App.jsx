function App() {
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
          <tr>
            <td>Juan Pérez</td>
            <td>juan@email.com</td>
            <td>123456789</td>
            <td>
              <button>Editar</button>
              <button>Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}

export default App;