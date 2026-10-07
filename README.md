# Portfolio · Ramiro Tanquias
 
Portfolio personal de **Ramiro Tanquias**, Full Stack Developer con foco en backend para sistemas financieros. Reúne mi experiencia, mis proyectos con casos de estudio y el stack con el que trabajo hoy.
 
![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat&logo=nextdotjs&logoColor=fff)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript&logoColor=fff)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=fff)
![Vitest](https://img.shields.io/badge/-Vitest-6E9F18?style=flat&logo=vitest&logoColor=fff)
![Vercel](https://img.shields.io/badge/-Vercel-000000?style=flat&logo=vercel&logoColor=fff)
 
🔗 **Demo:** [ramatc.vercel.app](https://ramatc.vercel.app/)

 <img width="1773" height="1271" alt="image" src="https://github.com/user-attachments/assets/88cc9efb-08f9-417b-987a-6aefeeb25a17" />

---
 
## ✨ Qué incluye
 
- **Secciones**: experiencia, proyectos, habilidades, sobre mí y contacto.
- **Casos de estudio** en páginas propias (`/proyectos/coda`, `/proyectos/vame`): qué problema resuelve cada proyecto, qué decisiones técnicas se tomaron y qué demuestra.
- **Sección «Preguntame»** con sugerencias de consulta sobre mi perfil.
- **Formulario de contacto**.
- **SEO y preview de links**: metadata, sitemap e imagen Open Graph generada desde el propio proyecto, alineada con el hero.
- **Animaciones** con Framer Motion.
---
 
## 🧰 Stack
 
| Área          | Tecnología                                         |
| ------------- | -------------------------------------------------- |
| Framework     | Next.js (App Router)                               |
| Lenguaje      | TypeScript                                         |
| Estilos       | Tailwind CSS                                       |
| Animaciones   | Framer Motion                                      |
| Testing       | Vitest + React Testing Library                     |
| Calidad       | ESLint + Prettier (con orden de clases de Tailwind) |
| Runtime       | Node.js 22 (ver `.nvmrc`)                          |
| Deploy        | Vercel                                             |
 
---
 
## 📂 Estructura
 
```
portfolio/
├── app/                # Rutas y componentes (App Router)
├── public/             # Imágenes, capturas de proyectos y assets estáticos
├── odd/tasks/          # Tareas del proyecto
├── middleware.ts       # Middleware de Next.js
├── vitest.config.mts   # Configuración de tests
├── vitest.setup.ts     # Setup de tests
└── tailwind.config.ts  # Configuración de Tailwind
```
 
---
 
## 🚀 Cómo correrlo localmente
 
Requisitos: Node.js 22 y npm.
 
```bash
git clone https://github.com/ramatc/portfolio.git
cd portfolio
nvm use
npm install
npm run dev
```
 
La app queda disponible en [http://localhost:3000](http://localhost:3000).
 
Scripts útiles:
 
| Comando         | Qué hace                         |
| --------------- | -------------------------------- |
| `npm run dev`   | Servidor de desarrollo           |
| `npm run build` | Build de producción              |
| `npm run start` | Sirve el build de producción     |
| `npm run lint`  | Linter                           |
| `npm test`      | Tests con Vitest                 |
 
---
 
## 🧪 Tests
 
Los tests usan **Vitest** y **React Testing Library**. Las animaciones de Framer Motion se omiten en el setup de tests (`vitest.setup.ts`).
 
```bash
npm test
```
 
---
 
## 🧭 Decisiones técnicas
 
- **Casos de estudio dentro del mismo sitio**: cada proyecto principal tiene su página con problema, decisiones y resultado, en lugar de limitarse a un link al repositorio.
- **Open Graph generado desde el proyecto**: la imagen de preview se genera en el propio repo y acompaña al diseño del hero, así que no hay un archivo suelto que mantener aparte.
- **Orden de clases de Tailwind con Prettier**: el formato queda consistente sin tener que revisarlo a mano.
<!--
Opcional: si querés mostrar cómo lo construiste con SDD, descomentá y completá.
## 🤖 Cómo se construyó
Desarrollado con un flujo de Spec-Driven Development (SDD) asistido por agentes. Las tareas y especificaciones del proyecto viven en `odd/tasks/`.
-->
 
---
 
## 🔗 Otros proyectos
 
- **[Coda](https://github.com/ramatc/coda)**: red social de descubrimiento musical. Monorepo TypeScript con Next.js, NestJS y Prisma.
- **[Vito](https://github.com/ramatc/vito)**: habit tracker gamificado con React y TypeScript.
---
 
## 📫 Contacto
 
- 💼 [LinkedIn](https://www.linkedin.com/in/ramiro-tanquias/)
- 📧 [rtanquiascornejo@gmail.com](mailto:rtanquiascornejo@gmail.com)
- 🐙 [GitHub](https://github.com/ramatc)
