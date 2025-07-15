import { MerchantType } from "../infrastructure/merchant.enum";

export interface MerchantData{
    name: string;
    address: string;
    merchantType: MerchantType;
}

export interface UpdateMerchantData {
    id: string;
    name: string;
    address: string;
    merchantType: MerchantType;
}

export interface UpdateMerchantState {
    searchClientId: string;
    searchMerchantId: string;
    isSearching: boolean;
    currentMerchant: UpdateMerchantData | null;
    updatedMerchant: UpdateMerchantData | null;
    isUpdating: boolean;
    logs: string[];
    result: any; 
    showInstructions: boolean; // Para mostrar u ocultar instrucciones
}

export interface MerchantUpdateRequest {
    merchantId: string; // No se modifica, solo datos del merchant
    merchantData: {
        name: string;
        address: string;
        merchantType: MerchantType;
    }
}

export interface MerchantUpdateResult {
    success: boolean;
    merchant?: MerchantData;
    message?: string;
    error?: string;
}
