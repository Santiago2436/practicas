window.APP_CONFIG = {
  companyName: 'Nombre de la empresa',
  companySubtitle: 'Consulta y descarga de planillas',
  logoText: 'LOGO',
  pageTitle: 'Consulta tu planilla',
  pageDescription:
    'Ingresa tu tipo y número de documento para consultar y descargar tu planilla en formato PDF.',
  importantTitle: 'Importante',
  importantText:
    'El período de cotización es opcional. Si no lo diligencias, el sistema consultará la información asociada al número de identificación.',
  importantNote:
    'Los campos marcados con (*) son obligatorios.',
  footerText: '© 2026 Nombre de la empresa',
  primaryColor: '#1388de',
  primaryDarkColor: '#0f73bc',
  apiUrl: 'http://127.0.0.1:8000/api/mi-planilla/descargar',
  documentOptions: [
    { value: 'CC', label: 'Cédula de ciudadanía' },
    { value: 'CE', label: 'Cédula de extranjería' },
    { value: 'PA', label: 'Pasaporte' },
    { value: 'RC', label: 'Registro civil' },
    { value: 'CD', label: 'Carné diplomático' },
    { value: 'SC', label: 'Salvo conducto de permanencia' },
    { value: 'PEP', label: 'Permiso especial de permanencia' },
    { value: 'PPT', label: 'Permiso por protección temporal' }
  ]
};