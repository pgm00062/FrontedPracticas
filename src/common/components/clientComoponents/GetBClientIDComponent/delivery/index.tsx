import { searchClientByIdServer } from '../infrastructure/clientSearchOperations';
import ClientResultById from '../../../pages/ClientSearchById';

interface Props {
  searchParams: { value?: string };
}

export default async function GetByIdClientId({ searchParams }: Props) {
  const clientId = searchParams.value?.trim() ?? '';
  const result = clientId ? await searchClientByIdServer(clientId) : null;

  return <ClientResultById result={result} clientId={clientId} />;
}