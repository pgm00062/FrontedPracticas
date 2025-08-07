export const MERCHANT_QUERIES = {
  createMerchant: () => '/api/create-merchant',
  getMerchantById: (id) => `http://localhost:8081/clients/${id}`,
  getMerchantByName: (name) => `http://localhost:8081/clients/name?name=${encodeURIComponent(name)}`,
  updateMerchant: () => '/api/update-merchant',
};

export const MERCHANT_ERROR_MESSAGES = {
  createMerchant: 'Error al crear merchant',
  getMerchantById: 'Error al buscar merchant por ID',
  getMerchantByName: 'Error al buscar merchant por Nombre',
  updateMerchant: 'Error al actualizar merchant',
};