
import {useDeleteClient } from '../infrastructure/handleOperations'
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import { ClientDeleteData } from './interface';

interface ButtonDeleteClientProps {
  client: ClientDeleteData;
}

const ButtonDeleteClient: React.FC<ButtonDeleteClientProps> = ({ client }) => {
  const {
    state,
    showConfirmModal,
    handleDeleteRequest,
    handleCancelDelete,
    handleConfirmDelete,
    handleReset
  } = useDeleteClient();

  return (
    <div className="space-y-6">
      <button
        onClick={() => handleDeleteRequest(client)}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        disabled={state.isDeleting}
      >
        🗑️ Eliminar Cliente
      </button>
      {state.clientToDelete && (
        <ConfirmDeleteModal
          isOpen={showConfirmModal}
          client={state.clientToDelete}
          isDeleting={state.isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default ButtonDeleteClient;