import React from 'react';
import type { ClientUpadateData } from '../interface';

interface EditableDataFormProps {
  updatedClient: ClientUpadateData;
  isUpdating: boolean;
  onInputChange: (field: keyof ClientUpadateData, value: string | number) => void;
  onUpdate: () => void;
}

const EditableDataForm: React.FC<EditableDataFormProps> = ({
  updatedClient,
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
            value={updatedClient.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            className="form-input w-full"
            disabled={isUpdating}
            placeholder="Introduce el nombre"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-blue-700">Apellido *</label>
          <input
            type="text"
            value={updatedClient.surname}
            onChange={(e) => onInputChange('surname', e.target.value)}
            className="form-input w-full"
            disabled={isUpdating}
            placeholder="Introduce el apellido"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-blue-700">Email *</label>
          <input
            type="email"
            value={updatedClient.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            className="form-input w-full"
            disabled={isUpdating}
            placeholder="ejemplo@correo.com"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-blue-700">Teléfono</label>
          <input
            type="text"
            value={updatedClient.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            className="form-input w-full"
            disabled={isUpdating}
            placeholder="123456789"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-blue-700">CIF/NIF/NIE</label>
          <input
            type="text"
            value={updatedClient.cifNifNie}
            onChange={(e) => onInputChange('cifNifNie', e.target.value)}
            className="form-input w-full"
            disabled={isUpdating}
            placeholder="12345678A"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-blue-700">Edad</label>
          <input
            type="number"
            min="18"
            max="120"
            value={updatedClient.age}
            onChange={(e) => onInputChange('age', parseInt(e.target.value) || 18)}
            className="form-input w-full"
            disabled={isUpdating}
          />
        </div>

        {/* ✅ Botón actualizar */}
        <button
          onClick={onUpdate}
          disabled={isUpdating || !updatedClient.name.trim() || !updatedClient.email.trim()}
          className="btn btn-primary w-full mt-4"
        >
          {isUpdating ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">🔄</span>
              Actualizando...
            </span>
          ) : (
            '💾 Actualizar Cliente'
          )}
        </button>
      </div>
    </div>
  );
};

export default EditableDataForm;