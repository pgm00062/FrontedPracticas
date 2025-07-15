import React from "react";
import type { UpdateMerchantData } from '../interface';

interface EditableDataFormProps {
    updatedMerchant: UpdateMerchantData;
    isUpdating: boolean;
    onInputChange: (field: keyof UpdateMerchantData, value: string | number) => void;
    onUpdate: () => void;
}

const EditableDataForm: React.FC<EditableDataFormProps> = ({
    updatedMerchant,
    isUpdating,
    onInputChange,
    onUpdate
}) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-800 border-b pb-2">
                ✏️ Nuevos Datos
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                <div>
                    <label className="text-sm font-medium text-blue-700">Nombre *</label>
                    <input
                        type="text"
                        value={updatedMerchant.name}
                        onChange={(e) => onInputChange('name', e.target.value)}
                        className="form-input w-full"
                        disabled={isUpdating}
                        placeholder="Introduce el nombre"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-blue-700">Dirección *</label>
                    <input
                        type="text"
                        value={updatedMerchant.address}
                        onChange={(e) => onInputChange('address', e.target.value)}
                        className="form-input w-full"
                        disabled={isUpdating}
                        placeholder="Introduce la dirección"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-blue-700">Tipo de Comercio *</label>
                    <select
                        value={updatedMerchant.merchantType}
                        onChange={(e) => onInputChange('merchantType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        disabled={isUpdating}
                    >
                        <option value="">Selecciona un tipo</option>
                        <option value="MERCHANT_TYPE_PERSONAL_SERVICES">Personal</option>
                        <option value="MERCHANT_TYPE_FINANCIAL_SERVICES">Finanzas</option>
                    </select>
                </div>
            </div>
            <button
                onClick={onUpdate}
                disabled={isUpdating}
                className={`btn btn-primary ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isUpdating ? 'Actualizando...' : '💾 Actualizar Comercio'}
            </button>
        </div>
    );
};
export default EditableDataForm;