# Documento de Arquitectura y Requerimientos - TUCCIFIX (V2)

## 1. Visión General del Proyecto
Plataforma web enfocada en el mantenimiento preventivo y protección de la inversión para sombrillas de lujo (marca TUUCI) en el mercado de Miami. El enfoque principal es B2B (hoteles, beach clubs, restaurantes) y B2C (residencias de lujo), destacando un servicio premium estilo "White Glove".

## 2. Arquitectura y Stack Tecnológico (No Negociables)
*   **Enfoque del Sistema:** Single Page Application (SPA) complementada con renderizado de servidor a través de funciones Serverless. No se requiere Base de Datos relacional ni Backend monolítico en esta fase.
*   **Framework Principal:** Angular. Se establece por su solidez con TypeScript, arquitectura basada en componentes y robustez para escalabilidad a futuro.
*   **Renderizado (Crítico para SEO):** Server-Side Rendering (SSR) activo. Es **obligatorio** para garantizar que los rastreadores de motores de búsqueda indexen el contenido orgánicamente desde el primer momento, mejorando el First Contentful Paint (FCP).
*   **Estilos y Maquetación:** Tailwind CSS. Utilizado para construir una interfaz limpia, crear un sistema de diseño estandarizado y mantener un enfoque estricto de *Mobile First*.

## 3. Interfaz de Usuario (UI) y Experiencia (UX)
*   **Estética y Diseño:** Debe transmitir exclusividad, elegancia y claridad, alineado con el estándar de marcas de muebles y exteriores de lujo (similar a la página de referencia de TUUCI).
*   **Paleta de Colores:** 
    *   Dominancia de tonos limpios y neutros (blanco puro, escala de grises para textos).
    *   Acentos sutiles en colores de inspiración marina para botones interactivos o llamados a la acción (Call to Action).
*   **Fondo (Background):** Temática oceánica/marina. Para no perder la estética elegante, se debe implementar mediante texturas visuales muy tenues, gradientes suaves o fotografías con un alto nivel de opacidad (superposición de color sólido) para no entorpecer la lectura. No usar imágenes saturadas o ruidosas.
*   **Tipografía:** Fuentes Sans-serif modernas, delgadas y minimalistas. Jerarquía visual bien definida a través de los pesos de la fuente (bold para títulos, light/regular para cuerpos de texto).

## 4. Funcionalidades Core
*   **Internacionalización (i18n):** Sistema bilingüe (Inglés / Español) gestionado a nivel de estado en el Front-end.
*   **Formulario Dinámico Interactivo (Angular Reactive Forms):**
    *   Desarrollo de lógica condicional (Campos discriminatorios): El recorrido cambia si el usuario selecciona "Mantenimiento preventivo" vs. "Cambio de pieza o Daño específico", contemplando todas las posibilidades de daño estructural o estético de las sombrillas de gama alta.
    *   Al concluir, el formulario consolida la información técnica suministrada por el cliente.
*   **Integración y Enrutamiento a WhatsApp (Conversión):**
    *   *Flujo desde Formulario:* El botón de "Enviar" compila un mensaje preconfigurado (ej. "Hola, necesito servicio para mi sombrilla. Detalles: [Datos del form]") usando `encodeURIComponent()` de JavaScript y redirige a la API de WhatsApp Web/App.
    *   *Flujo Directo (Bypass):* Botón flotante global (Floating Action Button) para contacto inmediato y limpio, sin necesidad de llenar formulario.
    *   *Enrutamiento de Números:* La lógica asigna dinámicamente el número según el idioma de la interfaz:
        *   Español: +1 (786) 697-7035
        *   Inglés: +1 (305) 298-3125

## 5. Infraestructura, Optimización y Despliegue (Híbrido Vercel/GoDaddy)
*   **Despliegue de Aplicación (Hosting):** La aplicación Front-end (Angular SSR) será alojada en **Vercel** mediante integración continua (CI/CD) conectada al repositorio de GitHub. Esto garantiza tiempos de respuesta mínimos (TTFB) gracias a su red Edge global.
*   **Gestión de Dominio y DNS:** El dominio (`tuucifix.com`) continuará bajo la administración de GoDaddy. Se configurarán los registros A y CNAME en el panel de GoDaddy para apuntar a los servidores de Vercel.
*   **Correo Corporativo (B2B):** Se utilizará la suite de Microsoft 365 (adquirida vía GoDaddy) para habilitar correos corporativos (ej. `contacto@tuucifix.com`), configurando los registros MX respectivos. Esto es vital para transmitir confianza al sector B2B (hoteles).
*   **Seguridad (SSL):** Se delegará la gestión del certificado SSL a Vercel, el cual provee encriptación HTTPS automática y renovaciones gratuitas.
*   **SEO Técnico y Local:** 
    *   Uso estricto de HTML5 semántico y manipulación dinámica de metaetiquetas (`MetaService` y `TitleService`).
    *   Implementación de metadatos Schema.org (JSON-LD) en el footer (NAP: Name, Address, Phone) para geolocalización en el área de Miami.
    *   Assets en formatos de próxima generación (WebP/AVIF) con *Lazy Loading* para optimizar Core Web Vitals.