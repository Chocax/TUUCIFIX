# Bitácora de Configuración Inicial - TUCCIFIX

Este documento detalla los pasos ejecutados para la creación y configuración base del proyecto de Angular, estableciendo la arquitectura inicial requerida para el desarrollo.

## 1. Preparación y Creación del Proyecto (Angular + SSR)
Uso del CLI de Angular habilitando el Server-Side Rendering (SSR) para cumplir con los requerimientos de SEO.

**Comandos ejecutados:**
```bash
npm install -g @angular/cli
ng new tuucifix-app --ssr
```
*   **Stylesheet format:** CSS
*   **SSR/SSG:** Habilitado (El CLI lo omitió en la consola al pasar la flag `--ssr`).

## 2. Instalación y Configuración de Tailwind CSS
Instalación de Tailwind CSS para el manejo de la interfaz y estilos del proyecto.

**Comandos ejecutados:**
```bash
cd tuucifix-app
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```
*(Nota: En caso de error con npx, se forzó la creación manual del archivo de configuración).*

**Configuración en `tailwind.config.js`:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Directivas agregadas en `src/styles.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 3. Configuración de Internacionalización (i18n)
Instalación de la librería `ngx-translate` para el manejo dinámico del idioma (Inglés/Español) sin recargar la página.

**Comando ejecutado:**
```bash
npm install @ngx-translate/core @ngx-translate/http-loader
```
**Estructura creada:** Se configuró una carpeta `i18n` dentro de `src/assets/` con los archivos `es.json` y `en.json` para el almacenamiento de textos y variables.

## 4. Generación de Componentes y Servicios Core
Creación de la estructura base a través del CLI para mantener el proyecto organizado.

**Comandos ejecutados:**
```bash
ng generate component components/home
ng generate component components/repair-form
ng generate component components/floating-whatsapp
ng generate service services/whatsapp
ng generate service services/seo
```

## 5. Configuración de Módulos Clave (Reactive Forms y Meta)
**[ESTADO: PENDIENTE ACTUALMENTE]**

*   **Formularios:** En el componente `repair-form.component.ts`, está pendiente importar `ReactiveFormsModule` de `@angular/forms` para habilitar la lógica condicional del mantenimiento.
*   **SEO:** En el servicio `seo.service.ts`, está pendiente inyectar `Meta` y `Title` de `@angular/platform-browser` para gestionar las etiquetas locales dinámicamente.

## 6. Control de Versiones y Despliegue (Git + Vercel)
**[ESTADO: PENDIENTE PARA PROXIMA SESION]**

*   Inicialización del repositorio Git local y vinculación remota.
*   Conexión de la rama de producción con la plataforma Vercel para el despliegue Serverless y configuración de DNS.