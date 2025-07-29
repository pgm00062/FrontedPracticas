import { getRecentClientsServer, searchClientByNameServer } from '../infrastructure/clientSearchOperations';
import ClientResultsClient from '../../../pages/ClientSearchByName';

interface Props {
  searchParams: { type?: string; value?: string };
}

export default async function GetClientByName({ searchParams }: Props) {
  const initialQuery = searchParams.value?.trim() ?? '';
  const recentClients = await getRecentClientsServer();

  return (
    <ClientResultsClient initialClients={recentClients} initialQuery={initialQuery} />
  );
} 