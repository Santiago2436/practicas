const API_URL = 'http://127.0.0.1:8000/api/mi-planilla/descargar';

const form = document.getElementById('planillaForm');
const tipoDocumentoInput = document.getElementById('tipoDocumento');
const numeroDocumentoInput = document.getElementById('numeroDocumento');
const periodoInput = document.getElementById('periodo');
const submitButton = document.getElementById('submitButton');
const messageBox = document.getElementById('messageBox');
const resultBox = document.getElementById('resultBox');
const downloadLink = document.getElementById('downloadLink');

let currentFileUrl = null;

function showMessage(text, type = 'info', withSpinner = false) {
  if (withSpinner) {
    messageBox.innerHTML = `
      <span class="message__content">
        <span class="spinner" aria-hidden="true"></span>
        <span>${text}</span>
      </span>
    `;
  } else {
    messageBox.textContent = text;
  }

  messageBox.className = `message message--${type}`;
}

function hideMessage() {
  messageBox.innerHTML = '';
  messageBox.className = 'message hidden';
}

function hideResult() {
  resultBox.classList.add('hidden');
  downloadLink.removeAttribute('href');
  downloadLink.removeAttribute('download');

  if (currentFileUrl) {
    URL.revokeObjectURL(currentFileUrl);
    currentFileUrl = null;
  }
}

function showResult(blob, fileName) {
  const fileUrl = window.URL.createObjectURL(blob);

  currentFileUrl = fileUrl;
  downloadLink.href = fileUrl;
  downloadLink.download = fileName;
  resultBox.classList.remove('hidden');

  return fileUrl;
}

function setLoadingState(isLoading) {
  submitButton.disabled = isLoading;
  submitButton.textContent = isLoading ? 'Buscando...' : 'Consultar planilla';
}

function validateForm() {
  const tipoDocumento = tipoDocumentoInput.value.trim();
  const numeroDocumento = numeroDocumentoInput.value.trim();
  const periodo = periodoInput.value.trim();

  if (!tipoDocumento) {
    showMessage('Debes seleccionar un tipo de documento.', 'error');
    return false;
  }

  if (!numeroDocumento) {
    showMessage('Debes ingresar el número de identificación.', 'error');
    return false;
  }

  if (periodo && !/^\d{6}$/.test(periodo)) {
    showMessage('El período debe tener formato AAAAMM, por ejemplo 202501.', 'error');
    return false;
  }

  return true;
}

function triggerDownload(url, fileName) {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  hideMessage();
  hideResult();

  if (!validateForm()) return;

  const payload = {
    tipoDocumento: tipoDocumentoInput.value.trim(),
    numeroDocumento: numeroDocumentoInput.value.trim(),
    periodo: periodoInput.value.trim(),
  };

  let generatedUrl = null;

  try {
    setLoadingState(true);
    showMessage('Buscando en el sistema, por favor espere...', 'info', true);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/pdf, application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let errorMessage = 'No fue posible generar la planilla.';

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (_) {
        // ignorar si no devuelve JSON
      }

      throw new Error(errorMessage);
    }

    const blob = await response.blob();

    if (!blob || blob.size === 0) {
      throw new Error('La respuesta no contiene un archivo válido.');
    }

    const fileName = `planilla-${payload.numeroDocumento}.pdf`;

    generatedUrl = showResult(blob, fileName);
    showMessage('La descarga iniciará en unos segundos...', 'success');
    triggerDownload(generatedUrl, fileName);
  } catch (error) {
    showMessage(error.message || 'Ocurrió un error inesperado.', 'error');
  } finally {
    setLoadingState(false);
  }
});

hideResult();
hideMessage();