import manageRequest from '../../../../../domain/manageRequest';

const merchantUseCases = {
  createMerchant: (signal, values, token) => {
    return manageRequest(
      signal,
      'createMerchant',
      values,
      'body',
      'normal',
      'post',
      token,
      'no-store',
      { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    );
  },
};

export default merchantUseCases;
