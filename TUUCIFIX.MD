# Proyecto Web TUUCIFIX - Plataforma de Mantenimiento

## 1. Visión General
Plataforma web de alto rendimiento orientada al mantenimiento preventivo y servicio técnico (White Glove) de sombrillas de lujo en el área de Miami, Florida. El sistema está diseñado con un enfoque Mobile-First, priorizando el SEO local y la conversión rápida a través de canales de mensajería (WhatsApp y SMS).

## 2. Stack Tecnológico
*   **Framework:** Angular 17+ (Standalone Components).
*   **Renderizado:** Server-Side Rendering (SSR) habilitado para optimización SEO técnica.
*   **Estilos:** Tailwind CSS.
*   **Internacionalización (i18n):** Implementación nativa basada en archivos JSON (Inglés y Español).
*   **Lógica de Formularios:** Angular Reactive Forms.
*   **Gestión de Estado y Enrutamiento:** Angular Router.

## 3. Arquitectura del Repositorio
El proyecto sigue una estructura modular para separar responsabilidades (Componentes de UI vs. Lógica de Servicios).

```text
TUUCIFIX/
├── Documentación/ (Archivos .md con bitácoras, requerimientos y tareas)
└── tuucifix-app/
    ├── public/
    │   └── assets/
    │       ├── flags/ (es.svg, us.svg para selector de idioma)
    │       ├── i18n/ (en.json, es.json para traducciones)
    │       └── Imágenes y logos (logo-header, logo-footer, favicons)
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── floating-whatsapp/ (Botón de contacto rápido global)
    │   │   │   ├── home/ (Landing page principal y UI)
    │   │   │   └── repair-form/ (Formulario reactivo con lógica condicional)
    │   │   └── services/
    │   │       ├── seo.ts (Inyección dinámica de meta-etiquetas locales)
    │   │       ├── sms.ts (Lógica de redirección a mensajería de texto)
    │   │       └── whatsapp.ts (Procesamiento y codificación de URL para WhatsApp)
    │   ├── app.ts / app.routes.ts (Configuración de rutas y bootstraping)
    │   └── styles.css (Importaciones globales y directivas de Tailwind)
    └── Archivos de Configuración (angular.json, tailwind.config.js, tsconfig.json)
```

## 4. Instrucciones de Desarrollo y Despliegue

### Requisitos Previos
*   Node.js instalado en el entorno local.
*   Angular CLI instalado globalmente (`npm install -g @angular/cli`).

### Instalación
Para levantar este proyecto en una nueva máquina, ejecutar los siguientes comandos desde la carpeta `tuucifix-app`:
```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo local
ng serve
```

### Compilación para Producción (SSR/SSG)
```bash
# Genera la carpeta dist/ lista para el despliegue
ng build
```

## 5. Mantenimiento Futuro
*   **Nuevos Idiomas:** Añadir un nuevo archivo JSON en `public/assets/i18n/` y actualizar el selector en la interfaz.
*   **Nuevos Campos en el Formulario:** Actualizar el `FormGroup` dentro de `repair-form.ts` para mapear las nuevas variables.