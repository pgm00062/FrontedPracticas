import {MerchantType} from '../infrastructure/merchant.enum';

export interface CreateMerchantComponentProps {
    className?: string;
    onMerchantCreated?: (merchant: any) => void;
    onError?: (error: string) => void;
    defaultData?: Partial<MerchantFormData>;
}

export interface MerchantFormData {
    clientId: string; 
    name: string;
    address: string;
    merchantType: MerchantType; 
}

export interface ComponentState {
    logs: string[];
    isCreating: boolean;
    lastResult: CreateMerchantResult | null;
    merchantData: MerchantFormData;
}

export interface CreateMerchantResult {
    success: boolean;
    merchant?: any;
    jwt?: string;
    error?: string;
}

export interface MerchantCreationData {
    name: string;
    address: string;
    merchantType: MerchantType;
    status: 'ACTIVE';
}