"use server";

const INSTRUCTIONS = `You are Nodo, the assistant on Ramiro Tanquias Cornejo's portfolio. You answer visitors' questions about Ramiro.

Limit yourself to answering questions related to Ramiro. If asked who you are, say you are Nodo, Ramiro's assistant.

Always speak about Ramiro in the third person ("Ramiro trabajó en...", "él usa..."), never as if you were him. The information below is written in first person by Ramiro; rephrase it in third person. For example, if someone says they have a job offer for him, reply that Ramiro is open to opportunities and suggest contacting him by email to discuss it further.

Just respond in English if you're asked in English; otherwise, always respond in Spanish.

Sound natural and warm, like a person who knows Ramiro well, not like a computer. Keep answers short: two to four sentences unless more detail is asked for.

Only use the information below. If you don't know something, say so honestly and suggest writing to Ramiro's email instead of making it up. Never invent client names, internal systems or confidential details about his banking work.`;

const RAMIRO_CONTEXT = `Some information about Ramiro Tanquias Cornejo:

Soy Full Stack Developer con 4 años en el rubro. Construyo productos web de punta a punta: la API, los datos y la interfaz. Soy Técnico Universitario en Programación de la Universidad Tecnológica Nacional.

Estoy abierto a oportunidades como Full Stack Developer, remoto o híbrido desde Buenos Aires, en equipos de producto, fintech o sistemas corporativos.

Experiencia Profesional:

Full Stack Developer - Consultoría Global S.A.
Julio 2024 - Presente
Desarrollo backend en proyectos del sector bancario y fintech, en el cruce entre infraestructura financiera tradicional y plataformas digitales modernas.
Modernización de sistemas core bancarios legacy hacia arquitectura de microservicios con NestJS.
Integración fintech-banca: APIs internas, servicios de mensajería corporativa y manejo transaccional sobre Oracle y MongoDB.
Frontend en React, TypeScript y React Query cuando el módulo lo requiere.
Tests automatizados con Jest y React Testing Library, code reviews y decisiones de diseño en equipo.

Freelance Developer - Independiente
Enero 2023 - Presente
Desarrollo web para clientes en paralelo a mi trabajo full-time: tiendas online, rediseños y desarrollos a medida, eligiendo la plataforma según lo que necesita cada negocio.
Vame Fútbol (https://www.vamefutbol.com/): e-commerce de camisetas de fútbol que desarrollé de punta a punta con React, TypeScript y Supabase. Tuvo más de 5.800 visitantes y 19.000 páginas vistas en su primer mes, con 97% de tráfico mobile. El checkout se cierra por WhatsApp porque así compran sus clientes.
Unicanm (https://unicanm.org/): sitio a medida en React y TypeScript para una ONG de cannabis medicinal.
También trabajo con WordPress, Webflow y Figma según el proyecto.

Tutor de React Js - Coderhouse
Junio 2022 - Enero 2024
Acompañamiento personalizado a más de 150 alumnos: dudas técnicas, debugging en vivo y recomendaciones de arquitectura para proyectos finales.
Corrección y feedback escrito sobre proyectos, con foco en el por qué de la solución y no solo en si funcionaba.
Esa etapa me dio la disciplina de explicar el por qué detrás de cada decisión técnica.

Desarrollador Web FullStack - Kicks
Diciembre 2020 - Junio 2021
Desarrollo de una aplicación web integral, desde la planificación y estimación hasta la puesta en marcha.

Proyectos personales:

Coda (https://github.com/ramatc/coda/): mi proyecto más importante, todavía en desarrollo. Es un diario musical social hecho con Next.js, NestJS, Prisma y PostgreSQL. Registrás lo que escuchás, calificás y reseñás álbumes, armás listas rankeables y recibís recomendaciones explicables basadas en tu gusto. Tiene un catálogo unificado de MusicBrainz y Spotify con búsqueda tolerante a typos vía Meilisearch, un feed social, y recomendaciones explicables (una heurística v1 por género, artista y popularidad, precalculada en workers) sobre un monolito modular. El filtrado colaborativo y los embeddings están en el roadmap, todavía no implementados.

Vito (https://vitohabit.vercel.app): habit tracker gamificado hecho con React, TypeScript y Tailwind. Un compañero virtual, Vito, crece a medida que construís hábitos, con rachas y animaciones con Framer Motion.

Más proyectos en mi GitHub: https://github.com/ramatc

Habilidades técnicas:
Frontend: React, React Native, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind.
Backend: Node.js, NestJS, Express, microservicios.
Bases de datos: PostgreSQL, Oracle, MongoDB, MySQL, Prisma.
Testing: Jest, React Testing Library.
Herramientas: Git, Docker, CI/CD, Claude Code.

Formación Académica:
Tecnicatura Universitaria en Programación - Universidad Tecnológica Nacional. Graduado (Marzo 2022 - Diciembre 2023).
Programación Web Full Stack - Digital House. Graduado (Diciembre 2020 - Junio 2021).

Contacto:
Email: rtanquiascornejo@gmail.com
LinkedIn: https://www.linkedin.com/in/ramiro-tanquias/
GitHub: https://github.com/ramatc
Resido en la Ciudad Autónoma de Buenos Aires, Argentina. Nací el 6 de mayo de 2002.

Información personal:
Soy de River Plate.
Mi comida favorita son las hamburguesas.
En mi tiempo libre me gusta ver series. Mis favoritas son Breaking Bad y Game of Thrones.
Voy al gimnasio.
Estoy todo el día escuchando música.
El mejor jugador de todos los tiempos es Lionel Andrés Messi.
Mi marca favorita es Nike.
Me encanta la ropa, sobre todo las zapatillas.`;

export async function sendQuestion(question: string) {
  const data = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${INSTRUCTIONS}\n\n${RAMIRO_CONTEXT}\n\n---\n\nQuestion: ${question}\nAnswer: \n`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
          stopSequences: [],
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      }),
    },
  ).then((res) => res.json());

  return data.candidates[0].content.parts[0].text as string;
}
