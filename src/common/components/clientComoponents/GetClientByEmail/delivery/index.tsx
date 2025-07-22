import { searchClientByEmailServer } from '../infrastructure/clientSearchOperations';
import ClientResultEmail from '../../../pages/ClientSearchByEmail';

interface Props {
  searchParams: { type?: string; value?: string };
}

export default async function GetClientByEmail({ searchParams }: Props) {
  const email = searchParams.value?.trim() ?? '';
  const result = email ? await searchClientByEmailServer(email) : null;

  return <ClientResultEmail result={result} email={email} />;
}