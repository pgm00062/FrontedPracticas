import { ClientFormData } from "@/common/utils/commonInterface";

export interface ClientFormFieldsProps {
  clientData: ClientFormData;
  onInputChange: (field: keyof ClientFormData, value: string | number) => void;
  onGenerateRandom: () => void;
  isDisabled: boolean;
}