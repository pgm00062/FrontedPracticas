export enum MerchantType {//cambiar a carpeta comun a todos los demas
    MERCHANT_TYPE_PERSONAL_SERVICES,
    MERCHANT_TYPE_FINANCIAL_SERVICES
}

export interface CreateMerchantComponentProps {
    className?: string;
    onMerchantCreated?: (merchant: any) => void;
    onError?: (error: string) => void;
    defaultData?: Partial<MerchantFormData>;
}

export interface MerchantFormData {
    idClient: string; // Optional, used for creating a new merchant
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