import { searchClientByIdServer } from '../infrastructure/clientSearchOperations';
import ClientResultById from '../../../pages/ClientSearchById';

interface Props {
  searchParams: { value?: string };
}

export default async function GetByIdClientId({ searchParams }: Props) {
  const clientId = searchParams.value?.trim() ?? '';
  
  let result = null;
  if (clientId) {
    const searchResult = await searchClientByIdServer(clientId);
    result = searchResult || null; 
  }

  return <ClientResultById result={result} clientId={clientId} />;
}