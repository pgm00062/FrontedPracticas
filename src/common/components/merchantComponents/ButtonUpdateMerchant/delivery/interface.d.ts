import type {UpdateMerchantData} from '../../../../utils/commonInterface';
import type { MerchantFormData } from '@/common/utils/commonInterface';

export interface ButtonUpdateMerchantProps {
    merchant: UpdateMerchantData;
    onBack?: () => void;
}

export interface MerchantFormFieldsProps {
    merchantData: MerchantFormData;
    onInputChange: (field: keyof MerchantFormData, value: string | number) => void;
    isDisabled?: boolean;
}