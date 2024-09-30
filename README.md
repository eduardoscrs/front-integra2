# React + Vite

## Requisitos

-Instalen Eslint y Prettier 
- Node.js y npm instalados
- Vite (se instala automáticamente con las dependencias)
- npm install (en el directorio del proyecto)

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```
nombre/
│
├── public/                # Archivos estáticos
├── src/
│   ├── assets/            # Recursos como imágenes, fuentes, etc.
│   ├── components/        # Componentes reutilizables de React
│   ├── pages/             # Páginas principales de la aplicación
│   ├── services/          # Lógica para interactuar con el backend (APIs)
│   ├── hooks/             # Custom hooks de React
│   ├── context/           # React Context API para manejo global de estados
│   ├── styles/            # Archivos de estilos (CSS, SCSS)
│   ├── App.jsx            # Componente raíz de la aplicación
│   ├── main.jsx           # Punto de entrada del proyecto
│   └── router.jsx         # Configuración de rutas
│
├── index.html             # Archivo HTML principal
├── package.json           # Dependencias y scripts del proyecto
└── vite.config.js         # Configuración de Vite


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
