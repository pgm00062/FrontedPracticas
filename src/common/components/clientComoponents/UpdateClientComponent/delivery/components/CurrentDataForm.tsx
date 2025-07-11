import React from "react";
import type { ClientUpadateData } from "../interface";

interface CurrentDataFormProps {
  currentClient: ClientUpadateData;
}

const CurrentDataForm: React.FC<CurrentDataFormProps> = ({ currentClient }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
        📋 Datos Actuales
      </h3>
      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-600">Nombre</label>
          <div className="bg-white p-2 rounded border text-gray-800">
            {currentClient.name}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Apellido</label>
          <div className="bg-white p-2 rounded border text-gray-800">
            {currentClient.surname}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Email</label>
          <div className="bg-white p-2 rounded border text-gray-800">
            {currentClient.email}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Teléfono</label>
          <div className="bg-white p-2 rounded border text-gray-800">
            {currentClient.phone}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">CIF/NIF/NIE</label>
          <div className="bg-white p-2 rounded border text-gray-800">
            {currentClient.cifNifNie}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Edad</label>
          <div className="bg-white p-2 rounded border text-gray-800">
            {currentClient.age} años
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentDataForm;