// Entrada de log
export interface LogEntry {
  id: string;
  message: string;
}

export interface FeignMerchantData{
    id: string;
    name: string;
    address: string;
    merchantType: string; 
}

export interface FeignMerchantExistState {
    logs: LogEntry[];
    isSearching: boolean;
    lastResult: FeignMerchantData | null;
    merchantId: string;
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