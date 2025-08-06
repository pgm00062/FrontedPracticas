/********************************************************************************************
 * Librería de todos los errores, queries y métodos de gestión de datos de las llamadas a API
 * *****************************************************************************************/

import { EXAMPLE_METHODS } from "./methods/example-methods";
import { CLIENT_METHODS } from "./methods/client-methods";
import { MERCHANT_METHODS } from "./methods/merchant-methods";
import { EXAMPLE_ERROR_MESSAGES, EXAMPLE_QUERIES } from "./queries/example-queries";
import { CLIENT_ERROR_MESSAGES, CLIENT_QUERIES } from "./queries/client-queries";
import { MERCHANT_ERROR_MESSAGES, MERCHANT_QUERIES } from "./queries/merchant-queries";

export const ERROR_MESSAGES = {
  ...EXAMPLE_ERROR_MESSAGES,
  ...CLIENT_ERROR_MESSAGES,
  ...MERCHANT_ERROR_MESSAGES,
};

export const QUERIES = {
  ...EXAMPLE_QUERIES,
  ...CLIENT_QUERIES,
  ...MERCHANT_QUERIES,
};

export const METHODS = {
  ...EXAMPLE_METHODS,
  ...CLIENT_METHODS,
  ...MERCHANT_METHODS,
};