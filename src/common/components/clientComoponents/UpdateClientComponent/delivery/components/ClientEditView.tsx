import React from 'react';
import type { ClientUpadateData } from '../interface';
import CurrentDataForm from './CurrentDataForm';
import EditableDataForm from './EditableDataForm';

interface ClientEditViewProps {
  currentClient: ClientUpadateData;
  updatedClient: ClientUpadateData;
  isUpdating: boolean;
  showInstructions: boolean;  // ✅ NUEVA PROP
  onInputChange: (field: keyof ClientUpadateData, value: string | number) => void;
  onUpdate: () => void;
  onReset: () => void;
}

const ClientEditView: React.FC<ClientEditViewProps> = ({
  currentClient,
  updatedClient,
  isUpdating,
  showInstructions,  // ✅ NUEVA PROP
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
          ← Buscar otro cliente
        </button>
        <div className="text-sm text-blue-700 font-medium">
          Cliente ID: {currentClient.id}
        </div>
      </div>

      {/* ✅ Split view: Datos actuales vs Nuevos datos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ✅ IZQUIERDA: Datos actuales (readonly) */}
        <CurrentDataForm currentClient={currentClient} />

        {/* ✅ DERECHA: Nuevos datos (editable) */}
        <EditableDataForm
          updatedClient={updatedClient}
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
        <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <p className="font-medium text-yellow-800 mb-1">💡 Instrucciones:</p>
          <ul className="text-yellow-700 space-y-1">
            <li>• <strong>Izquierda:</strong> Datos actuales del cliente (solo lectura)</li>
            <li>• <strong>Derecha:</strong> Modifica los campos que quieras actualizar</li>
            <li>• Los campos marcados con * son obligatorios</li>
            <li>• Haz clic en "Actualizar Cliente" para guardar los cambios</li>
          </ul>
        </div>
      </div>

      {/* ✅ OPCIONAL: Mostrar estado de actualización */}
      {isUpdating && (
        <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2">
            <span className="animate-spin">🔄</span>
            <p className="font-medium text-blue-800">
              Actualizando cliente...
            </p>
          </div>
          <p className="text-blue-700 mt-1">
            Por favor, espera mientras se guardan los cambios en la base de datos.
          </p>
        </div>
      )}
    </div>
  );
};

export default ClientEditView;