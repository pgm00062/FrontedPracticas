// Entrada de log
export interface LogEntry {
  id: string;
  message: string;
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
