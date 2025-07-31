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
    showInstructions: boolean; 
}

export interface MerchantUpdateRequest {
    merchantId: string; 
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
