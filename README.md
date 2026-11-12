# Pasaporte para Cosas 🛂

**Pabellón:** 1 - Problemas cotidianos

**Ingrediente improbable:** Certificado oficial

## El problema

Las personas que viven solas, las familias y quienes comparten vivienda mueven objetos de una habitación a otra todo el tiempo: la taza termina en el dormitorio, el cargador aparece en el living. Después nadie recuerda dónde quedaron y se pierde tiempo buscándolos.

## La solución

**Pasaporte para Cosas** es la web de la *Dirección Nacional de Migraciones Objetuales*, una oficina de migraciones ficticia para los objetos de la casa. Cada objeto recibe un pasaporte con número único, lugar de origen y ubicación actual. Para cambiarlo de habitación se pide un traslado, que queda sellado con número de expediente en su historial migratorio y genera un **certificado oficial** imprimible. Un buscador responde al instante la pregunta de siempre: *¿dónde dejé…?*

Lo que lo vuelve distinto es que convierte un registro aburrido en un trámite divertido. El humor está en el tono, pero la estética es de organismo oficial serio: guilloché, sellos circulares, firmas y una zona de lectura mecánica como la de los pasaportes reales. Los datos se guardan en el navegador (`localStorage`), no necesita cuenta ni servidor, y funciona en computadora y celular.

## Cómo probarlo

Requisitos: Node.js 18 o superior y pnpm (`npm install -g pnpm`).

1. Instalar y abrir la app:
   ```bash
   pnpm install
   pnpm run dev
   ```
   Entrar a http://localhost:5173. Ya hay objetos de demostración cargados.
2. Ir a **Registrar objeto**, completar el formulario (nombre, categoría, emoji, origen) y tocar **Emitir pasaporte**. Se abre el pasaporte digital del objeto con su número `OBJ-XXXXX`.
3. Tocar **Solicitar traslado**, elegir un destino y un motivo, y tocar **Solicitar autorización**. Aparece el sello “TRASLADO AUTORIZADO” con fecha, destino y expediente `MIG-XXXXX`.
4. Tocar **Ver certificado oficial** para ver el certificado de traslado. Con **Imprimir o guardar PDF** se puede imprimir o guardar como PDF.
5. Volver a **Inicio** y escribir el nombre del objeto en **¿Dónde dejaste…?**.

**Qué debería verse al final:** el buscador muestra el objeto y la habitación donde está ahora. En su pasaporte, el historial migratorio muestra el traslado con su sello. Si se recarga la página, todo sigue guardado.

## Herramientas de IA utilizadas

- **Claude (Anthropic):** generó el código de la aplicación (React + Vite), los estilos, el diseño visual del pasaporte, los sellos y el certificado, y la documentación, a partir del enunciado del proyecto. También probó el flujo completo en un navegador automatizado y organizó el historial de commits por etapas de desarrollo.
