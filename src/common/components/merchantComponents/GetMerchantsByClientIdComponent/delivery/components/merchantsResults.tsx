import React from "react";
import type { MerchantData } from "../interface";

interface MerchantsResultsProps {
  merchants: MerchantData[] | null;
}

const MerchantsResulsts: React.FC<MerchantsResultsProps> = ({ merchants }) => {
    if (!merchants || merchants.length == 0) return null;

    return (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
            <h3 className="text-blue-800 font-medium mb-3">✅ Comercios encontrados</h3>
            <div className="bg-white p-4 rounded border">
                {merchants.map((merchant) => (
                    <div key={merchant.merchantId} className="mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <p className="text-sm text-gray-600">ID del Comerciante</p>
                                <p className="font-medium">{merchant.merchantId ?? '⚠ No disponible'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Nombre del Comerciante</p>
                                <p className="font-medium">{merchant.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Dirección del Comerciante</p>
                                <p className="font-medium">{merchant.address}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Tipo de comerciante</p>
                                <p className="font-medium">{merchant.merchantType}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Cliente asociado</p>
                                <p className="font-medium">{merchant.clientId}</p>
                            </div>
                        </div>

                        {/* Datos técnicos expandibles */}
                        <details className="mt-3">
                            <summary className="cursor-pointer text-sm text-blue-700 hover:text-blue-800">
                                📄 Ver datos técnicos completos
                            </summary>
                            <pre className="text-xs text-blue-700 bg-blue-100 p-3 rounded overflow-x-auto mt-2">
                                {JSON.stringify(merchant, null, 2)}
                            </pre>
                        </details>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default MerchantsResulsts;