# Prueba Técnica Desarrollador Fullstack - Parte Frontend

Frontend desarrollado en React para consumir los servicios del API y crear/visualizar la información del sistema 

## Requerimientos técnicos

- API configurado en local o desplegado en la nube
- Node 22
- pnpm 10.7 o npm 10.9 (se usó el primero para el desarrollo)

## Pasos para su ejecución

- Luego de verificado los requisitos técnicos, debemos clonar el repositorio
- Nos ubicamos en la carpeta del proyecto con la terminal
- Creamos un nuevo archivo `.env`
- Agregamos la configuración de la base de datos en el `.env` ya creado las siguientes variables
	- `VITE_API_BASE_URL=127.0.0.1:8000` (cambiar si la API esta en la nube)
- Ejecutamos `npm install` o `pnpm install` para instalar las dependencias
- Al terminar la instalación, corremos `npm run dev` o `pnpm run dev` para ejecutar el proyecto

## Vistas del proyecto
Se crearon 4 vistas:
- inicio (/): Vista de bienvenida
- Hoteles (/hotels): Vista para administrar hoteles, donde funciona todo el CRUD de hoteles.
- Detalle de hotel (/hotels/:hotelId): Vista del detalle de un hotel, muestra sus datos principales y el listado de acomodaciones propias de él. Permite Ver y Editar la información del hotel y hacer CRUD de las acomodaciones
- Acomodaciones (/rooms): Vista para administrar las acomodaciones por hotel. Tiene un selector de hoteles para poder visualizar las acomodaciones de este, permitiendo hacer CRUD de ellas.

## Tecnologías usadas

En este proyecto se usaron:
- React como tecnología base del proyecto
- Vite como herramienta de compilación
- Tailwind y shadcn para los estilos y componentes
- Axios para la comunicación con la API
- Tanstack Query para la gestión de los estados de las consultas
- Zustand para gestión de estados (ej. abrir o cerrar un formulario)
- Tanstack Router para el manejo de las rutas
- Zod para validacion de esquemas.


