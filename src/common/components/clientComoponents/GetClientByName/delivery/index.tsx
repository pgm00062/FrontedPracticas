import { searchClientByNameServer } from '../infrastructure/clientSearchOperations';
import ClientResultsClient from '../../../pages/ClientSearchByName';

interface Props {
  searchParams: { type?: string; value?: string };
}

export default async function GetClientByName({ searchParams }: Props) {
  const clientName = searchParams.value?.trim() || "";
  const searchResults = clientName ? await searchClientByNameServer(clientName) : [];

  return (
    <ClientResultsClient clients={searchResults} />
  );
}