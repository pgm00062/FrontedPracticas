import { FC } from 'react';
import {useDeleteClient } from '../infrastructure/handleOperations'
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import { ButtonDeleteClientProps } from './interface';
import {Button} from 'antd';


const ButtonDeleteClient: FC<ButtonDeleteClientProps> = ({ client, onDeleted }) => {
  const {
    state,
    showConfirmModal,
    handleDeleteRequest,
    handleCancelDelete,
    handleConfirmDelete,
    handleReset
  } = useDeleteClient();

    const handleConfirmDeleteAndNotify = async () => {
      const deleted = await handleConfirmDelete();
      if (deleted) {
        handleReset(); // Resetea el estado interno del hook
        if (onDeleted) onDeleted(); // Notifica al componente padre
      }
    };

  return (
    <div className="space-y-6">
      <Button
        onClick={() => handleDeleteRequest(client)}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        disabled={state.isDeleting}
      >
        🗑️ Eliminar Cliente
      </Button>
      {state.clientToDelete && (
        <ConfirmDeleteModal
          isOpen={showConfirmModal}
          client={state.clientToDelete}
          isDeleting={state.isDeleting}
          onConfirm={handleConfirmDeleteAndNotify}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};
export default ButtonDeleteClient;