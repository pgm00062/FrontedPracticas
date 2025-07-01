'use client'

import { FC } from "react"
import { TableComponentProps } from "./interface"

const TableComponent: FC<TableComponentProps> = ({ data }) => {
    // Ejemplo de cómo usar los datos pasados como props
    const renderTableContent = () => {
        if (!data || Object.keys(data).length === 0) {
            return <p className="text-gray-500 text-center py-4">No hay datos disponibles</p>;
        }

        // Si los datos son un array
        if (Array.isArray(data)) {
            return (
                <div className="space-y-2">
                    {data.map((item, index) => (
                        <div key={item.id ?? item.key ?? `item-${index}`} className="p-2 border rounded">
                            {JSON.stringify(item)}
                        </div>
                    ))}
                </div>
            );
        }

        // Si los datos son un objeto
        return (
            <div className="p-4 border rounded">
                <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
            </div>
        );
    };

    return (
        <div className="w-full">
            <h3 className="text-lg font-semibold mb-4">Datos de la Tabla</h3>
            {renderTableContent()}
        </div>
    );
}

export default TableComponent