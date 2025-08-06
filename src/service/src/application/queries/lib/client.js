import manageRequest from '../../../../../domain/manageRequest';

const clientUseCases = {
  loginClient: (signal, values, token) => {
    return manageRequest(
      signal,
      'loginClient',
      values,
      'body',
      'normal',
      'post',
      token,
      'no-store',
      { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    );
  },

  registerClient: (signal, values, token) => {
    return manageRequest(
      signal,
      'registerClient',
      values,
      'body',
      'normal',
      'post',
      token,
      'no-store',
      { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    );
  },

  createClient: (signal, values, token) => {
    return manageRequest(
      signal,
      'createClient',
      values,
      'body',
      'normal',
      'post',
      token,
      'no-store',
      { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    );
  },

  getClientById: (signal, values, token) => {
    return manageRequest(
        signal,
        'getClientById',
        values,
        'normal',
        'normal',
        'get',
        token,
        'no-store',
        { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    );
  },

  getClientByEmail:(signal, email, token) => {
    return manageRequest(
        signal,
        'getClientByEmail',
        email,
        'normal',
        'normal',
        'get',
        token,
        'no-store',
        { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    );
   },

   getClientByName: (signal, name, token) => {
    return manageRequest(
        signal,
        'getClientByName',
        name,
        'normal',
        'normal',
        'get',
        token,
        'no-store',
        { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    );
   },

    updateClient: (signal, endPointData, token, body) => {
      const dataToSend = body || endPointData;
      return manageRequest(
        signal,
        'updateClient',
        dataToSend,     // <-- enviar datos completos (con ID incluido)
        'body',
        'normal',
        'put',
        token,
        'no-store',
        { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        true
      );
    },

    deleteClient: (signal, endPointData, token, body) => {
      const dataToSend = body || endPointData;
      return manageRequest(
        signal,
        'deleteClient',
        dataToSend,
        'body',
        'normal',
        'delete',
        token,
        'no-store',
        { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        true
      );
    }
};
export default clientUseCases;