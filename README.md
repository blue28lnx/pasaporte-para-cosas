# Pasaporte para Cosas 🛂

**Dirección Nacional de Migraciones Objetuales** — una oficina de migraciones ficticia que emite pasaportes a los objetos de tu casa, autoriza sus traslados entre habitaciones y lleva su historial migratorio. Así, cuando no encontrás algo, sabés dónde fue visto por última vez.

> “Controlamos las fronteras. Incluso las de tu habitación.”

Proyecto para la Hackathon 2026 — Feria de Soluciones Improbables.

| | |
|---|---|
| **Pabellón** | 1 · Problemas cotidianos |
| **Usuario objetivo** | Personas que viven solas, familias y personas que comparten habitación o vivienda |
| **Ingrediente improbable** | Certificado oficial |

## El problema

Movemos objetos de lugar todo el tiempo (la taza que termina en el dormitorio, el cargador que aparece en el living) y después no recordamos dónde los dejamos.

## La solución

Tratar cada movimiento como un trámite migratorio. Cada objeto tiene un pasaporte con su lugar de origen y su ubicación actual. Para cambiarlo de habitación se solicita un traslado, que queda sellado con número de expediente y genera un certificado oficial. El buscador responde en el momento la pregunta de siempre: **¿dónde dejé…?**

## Funcionalidades

- **Panel principal**: buscador “¿Dónde dejaste…?”, total de objetos, traslados realizados, objetos en circulación (fuera de su lugar de origen) y últimos movimientos.
- **Registro de objetos** (Formulario DNMO-01): nombre, categoría, emoji, lugar de origen, ubicación actual y fecha de emisión, con validación de cada campo. Asigna automáticamente un número de pasaporte (`OBJ-00001`) y el estado migratorio inicial.
- **Pasaporte digital**: página de datos con emblema de la República Doméstica, guilloché, microtexto, firma, sello de emisión y zona de lectura mecánica (MRZ) generada a partir de los datos del objeto. Se puede imprimir o guardar como PDF con `window.print()`.
- **Solicitud de traslado** (Formulario DNMO-02): objeto, origen, destino y motivo. Al confirmar actualiza la ubicación, registra el movimiento, genera el sello “TRASLADO AUTORIZADO” con fecha, destino y expediente (`MIG-00001`) y muestra la pantalla de autorización.
- **Historial migratorio**: línea de tiempo con fecha y hora, origen, destino, motivo, expediente y sello de cada traslado.
- **Certificado oficial de traslado**: documento con firma del Director, lacre y sello de aprobación, imprimible en una hoja A4 apaisada. Disponible al aprobar el traslado y desde cada entrada del historial.
- **Buscador** por nombre o número de pasaporte, en el panel principal y en el archivo de pasaportes, mostrando dónde está cada objeto.
- **Persistencia** en `localStorage`: los datos sobreviven al recargar la página.
- **Datos de demostración** para que la app no arranque vacía. Se pueden dar de baja pasaportes y restaurar la demo desde el pie de página.
- Diseño **responsive** para computadora y celular, foco visible con teclado y animaciones que respetan `prefers-reduced-motion`.

## Probalo en menos de un minuto

1. Entrá a **Registrar objeto**, completá el formulario y tocá **Emitir pasaporte**.
2. Se abre su pasaporte. Tocá **Solicitar traslado**.
3. Elegí destino y motivo, y tocá **Solicitar autorización**.
4. En la autorización, tocá **Ver certificado oficial** e imprimilo si querés.
5. Volvé a **Inicio** y buscá el objeto en “¿Dónde dejaste…?”.

## Tecnologías

- [React 18](https://react.dev/)
- [Vite](https://vite.dev/)
- JavaScript
- CSS puro (un archivo de estilos por área)
- `localStorage` para la persistencia
- pnpm como gestor de paquetes

Sin backend, sin base de datos externa y sin dependencias más allá de React y Vite.

## Instalación y ejecución

Requisitos: Node.js 18 o superior y pnpm.

```bash
# Instalar pnpm si no lo tenés
npm install -g pnpm

# Instalar dependencias
pnpm install

# Servidor de desarrollo (http://localhost:5173)
pnpm run dev

# Build de producción (genera la carpeta dist/)
pnpm run build

# Previsualizar el build
pnpm run preview
```

## Estructura del proyecto

```
src/
├── App.jsx                 # Rutas y ventanas modales
├── main.jsx
├── components/             # Piezas reutilizables: emblema, sellos, pasaporte, certificado, modal…
├── forms/                  # Formularios de registro y traslado
├── views/                  # Pantallas: inicio, archivo, detalle, registro, traslado
├── hooks/useRegistry.js    # Estado central: objetos, movimientos y acciones
├── lib/                    # Almacenamiento, datos demo, formatos, búsqueda, router e impresión
└── styles/                 # CSS por área + estilos de impresión
```

## Uso de herramientas de IA

Este proyecto se desarrolló con asistencia de **Claude** (Anthropic), que generó el código, los estilos y este README a partir del enunciado del proyecto. El historial de commits refleja las etapas de desarrollo en el orden de prioridades definido.

---

*Este software carece de validez legal, pero posee absoluta validez doméstica.*
