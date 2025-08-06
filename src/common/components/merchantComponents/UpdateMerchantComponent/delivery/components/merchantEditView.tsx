import React from "react";
import type { UpdateMerchantData } from '../interface';
import CurrentDataForm from './currentDataForm';
import EditableDataForm from './editableDataForm';

interface MerchantEditViewProps {
    currentMerchant: UpdateMerchantData;
    updatedMerchant: UpdateMerchantData;
    isUpdating: boolean;
    showInstructions: boolean; // Para mostrar u ocultar instrucciones
    onInputChange: (field: keyof UpdateMerchantData, value: string | number)
        => void;
    onUpdate: () => void;
    onReset: () => void;
}

const MerchantEditView: React.FC<MerchantEditViewProps> = ({
    currentMerchant,
    updatedMerchant,
    isUpdating,
    showInstructions,
    onInputChange,
    onUpdate,
    onReset
}) => {
    return (
        <div className="space-y-6">
            {/* ✅ Header con botón volver */}
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <button
                    onClick={onReset}
                    className="btn btn-secondary"
                    disabled={isUpdating}
                >
                    ← Buscar otro merchant
                </button>
                <div className="text-sm text-blue-700 font-medium">
                    Merchant ID: {currentMerchant.id}
                </div>
            </div>

            {/* ✅ Split view: Datos actuales vs Nuevos datos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* ✅ IZQUIERDA: Datos actuales (readonly) */}
                <CurrentDataForm currentMerchant={currentMerchant} />

                {/* ✅ DERECHA: Nuevos datos (editable) */}
                <EditableDataForm
                    updatedMerchant={updatedMerchant}
                    isUpdating={isUpdating}
                    onInputChange={onInputChange}
                    onUpdate={onUpdate}
                />
            </div>

            {/* ✅ CONDICIONAL: Mostrar instrucciones solo cuando showInstructions es true */}
            <div className={`transition-all duration-500 ${
                showInstructions 
                    ? 'opacity-100 max-h-40' 
                    : 'opacity-0 max-h-0 overflow-hidden'
            }`}>
                <p className="text-sm text-gray-600">
                    Instrucciones para actualizar el merchant...
                </p>
            </div>
        </div>
    );
};
export default MerchantEditView;