import { searchClientByIdServer } from '../infrastructure/clientSearchOperations';
import ClientResultById from '../../../pages/ClientSearchById';
import { Suspense } from 'react';
import { Skeleton } from 'antd';
import type {Props} from './interface';

export default async function GetByIdClientId({ searchParams }: Props) {
  const clientId = searchParams.value?.trim() ?? '';
  
  let result = null;
  if (clientId) {
    const searchResult = await searchClientByIdServer(clientId);
    result = searchResult || null; 
    console.log('Resultado en Server Component:', { clientId, result });
  }

  return (
    <Suspense fallback={<Skeleton active paragraph={{ rows: 2 }} />}>
      <ClientResultById result={result} clientId={clientId} />
    </Suspense>
  );
}