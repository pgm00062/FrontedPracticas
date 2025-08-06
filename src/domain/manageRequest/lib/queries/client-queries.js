export const CLIENT_QUERIES = {
  loginClient: () => '/api/login-client',
  registerClient: () => '/api/register-client',
  createClient: () => '/api/create-client',
  getClientById: (params) => `http://localhost:8080/clients/${params}`,
  getClientByEmail: (email) => `http://localhost:8080/clients/email?email=${email}`,
  getClientByName: (name) => `http://localhost:8080/clients/name?name=${encodeURIComponent(name)}`,
  updateClient: () => '/api/update-client',  
  deleteClient: () => `/api/delete-client`,
};

export const CLIENT_ERROR_MESSAGES = {
  loginClient: 'Error al iniciar sesión',
  registerClient: 'Error al registrar cliente',
  createClient: 'Error al crear cliente',
  getClientById: 'Error al buscar cliente por ID',
  getClientByEmail: 'Error al buscar cliente por Email',
  getClientByName: 'Error al buscar cliente por Nombre',
  updateClient: 'Error al actualizar cliente',
  deleteClient: 'Error al eliminar cliente',
};