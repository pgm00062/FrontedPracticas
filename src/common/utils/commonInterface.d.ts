import { MerchantType } from "./enums/merchant.enum";

//=============================
//===========CLIENT============
//=============================
//BUSQUEDAS: ID, EMAIL, NOMBRE
export interface LogEntry {
  id: string;
  message: string;
}
export interface ClientData {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  age: number;
  cifNifNie: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface JWTClientData {
  name: string;
  surname: string;
  age: number;
  cifNifNie: string;
  email: string;
  phone: string;
  merchantType: null;
}
//CREACION CLIENTES
export interface ClientFormData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  cifNifNie: string;
  age: number;
  merchantType: null;
}
export interface CreateClientResult {
  success: boolean;
  client?: any;
  jwt?: string;
  error?: string;
}

//=============================
//==========MERCHANT===========
//=============================
export interface MerchantFormData {
    clientId: string; 
    name: string;
    address: string;
    merchantType: MerchantType; 
}
export interface CreateMerchantResult {
    success: boolean;
    merchant?: any;
    jwt?: string;
    error?: string;
}
export interface MerchantData {
    merchantId: string;
    clientId: string; 
    name: string;
    address: string;
    merchantType: MerchantType; 
}
export interface JWTMerchantData {
    name: string;
    address: string;
    merchantType: MerchantType;
}