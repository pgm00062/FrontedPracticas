import { getRecentClientsServer } from '../infrastructure/clientSearchOperations';
import ClientResultsClient from '../../../pages/ClientSearchByName';

export default async function GetClientByName() {
  const recentClients = await getRecentClientsServer();

  return (
    <ClientResultsClient initialClients={recentClients} initialQuery={''} />
  );
}