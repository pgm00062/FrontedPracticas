import { get } from 'http';
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
  getMerchantById: (signal, values, token) => {
    return manageRequest(
      signal,
      'getMerchantById',
      values,
      'params',
      'normal',
      'get',
      token,
      'no-store',
      { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    );
  },

  getMerchantByName: (signal, name, token) => {
    return manageRequest(
      signal,
      'getMerchantByName',
      { name },
      'params',
      'normal',
      'get',
      token,
      'no-store',
      { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    );
  },
  updateMerchant: (signal, values, token) => {
    return manageRequest(
      signal,
      'updateMerchant',
      values,
      'body',
      'normal',
      'put',
      token,
      'no-store',
      { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    );
  }
};
export default merchantUseCases;