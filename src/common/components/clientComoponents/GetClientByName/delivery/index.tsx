import { searchClientByNameServer } from '../infrastructure/clientSearchOperations';
import ClientResultsClient from '../../../pages/ClientSearchByName';
import type { ClientData } from '../../../../utils/commonInterface';
import type { Props } from './interface';

export default async function GetClientByName({ searchParams }: Props) {
  const name = searchParams.value?.trim() ?? '';
  let clients: ClientData[] = []; // <-- tipo explícito

  if (name) {
    const searchResult = await searchClientByNameServer(name);
    clients = searchResult || [];
    console.log('Resultado en Server Component:', { name, clients });
    if (clients.length === 0) {
      clients = await searchClientByNameServer(name.toLowerCase()) || [];
    }
  }

  return (
    <ClientResultsClient initialClients={clients} initialQuery={name} />
  );
}