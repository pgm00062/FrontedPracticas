import { getRecentClientsServer, searchClientByNameServer } from '../infrastructure/clientSearchOperations';
import ClientResultsClient from '../../../pages/ClientSearchByName';

interface Props {
  searchParams: { type?: string; value?: string };
}

export default async function GetClientByName({ searchParams }: Props) {
  const initialQuery = searchParams.value?.trim() ?? '';
  let clients;
  if (initialQuery) {
    clients = await searchClientByNameServer(initialQuery);
    if (!clients || clients.length === 0) {
      clients = await getRecentClientsServer();
    }
  } else {
    clients = await getRecentClientsServer();
  }

  return (
    <ClientResultsClient initialClients={clients} initialQuery={initialQuery} />
  );
} 