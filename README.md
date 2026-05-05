# Mi Planilla

Frontend estático para consulta y descarga de planilla en PDF.

Este proyecto está pensado para publicarse en **GitHub Pages** y conectarse a un **backend externo** que procesa la consulta, consume la API correspondiente y devuelve el PDF al navegador.

## Objetivo

Permitir que un usuario:

- abra un enlace público,
- diligencie un formulario,
- consulte su planilla,
- y descargue el PDF.

## Arquitectura

Este repositorio contiene solo el **frontend**.

### Flujo esperado

1. El usuario abre la interfaz web.
2. Ingresa tipo de documento, número de documento y período.
3. El frontend envía los datos a un backend externo.
4. El backend:
   - valida la solicitud,
   - consume la API,
   - obtiene el PDF,
   - y devuelve el archivo al navegador.
5. El frontend descarga el PDF.

## Importante

- Este frontend **no debe** consumir directamente APIs sensibles desde el navegador.
- **No** se deben exponer credenciales, tokens o llaves secretas aquí.
- Toda la lógica segura debe vivir en el backend.

## Estructura

```text
practicas/
  docs/
    index.html
    styles.css
    app.js
  README.md