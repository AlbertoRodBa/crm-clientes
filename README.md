# CRM de Clientes - Full Stack

Aplicación full stack para la gestión de clientes desarrollada con React, Node.js, Express y MySQL. Permite crear, editar y eliminar registros mediante una API REST.

## Stack Tecnológico

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- Base de datos: MySQL

## Instalación

1. Base de datos
   - Importar `database/schema.sql` en MySQL

2. Backend
   - cd backend
   - npm install
   - npm start

3. Frontend
   - cd frontend
   - npm install
   - npm run dev

4. Variables de entorno
   - Crear archivo `backend/.env`
   - Agregar:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=crm_clientes

5. Rutas del proyecto
   - API: http://localhost:3000
   - Frontend: http://localhost:5173