import { useState } from "react";
import { Modal, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import type { ButtonUpdateClientProps } from "./interface";
import ClientFormFields from "./components/clientFormFields";
import { handleOperations } from "../infrastructure/handleOperations";
import { toast } from "sonner";


const ButtonUpdateClient: React.FC<ButtonUpdateClientProps> = ({ client, onBack }) => {
  const [visible, setVisible] = useState(false);
  const {
    state,
    handleUpdate,
    handleInputChange,
    handleReset,
    initializeUpdateClient
  } = handleOperations();

  // Inicializa el formulario con los datos del cliente al abrir el modal
  const handleOpen = () => {
    handleReset();
    initializeUpdateClient(client);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    if (onBack) onBack();
  };

  const handleSave = () => {
        console.log('Callback ejecutado: cerrando modal y mostrando toast');

    handleUpdate(() => {
      setVisible(false); // Cierra el modal
      toast.success('✅ Cambios guardados con éxito'); // Muestra el toast
    });
  };

  return (
    <>
      <Button 
        onClick={() => handleOpen()}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        type="default">
        ✏️ Actualizar Cliente
      </Button>
      <Modal
        open={visible}
        onCancel={handleClose}
        footer={null}
        destroyOnClose
        centered
        width={600}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={handleClose}
            style={{ marginRight: 8 }}
          >
            Volver a búsqueda
          </Button>
          <span style={{ fontWeight: 500, fontSize: 18 }}>Actualizar Cliente</span>
        </div>
        <ClientFormFields
          clientData={state.updatedClient || client}
          onInputChange={handleInputChange}
          isDisabled={state.isUpdating}
        />
        <div style={{ textAlign: "right", marginTop: 24 }}>
          <Button type="primary" onClick={handleSave} loading={state.isUpdating}>
            Guardar cambios
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default ButtonUpdateClient;