import { searchClientByEmailServer } from '../infrastructure/clientSearchOperations';
import ClientResultEmail from '../../../pages/ClientSearchByEmail';
import { Suspense } from 'react';
import { Skeleton } from 'antd';
import type {Props} from './interface';

export default async function GetClientByEmail({ searchParams }: Props) {
  const email = searchParams.value?.trim() ?? '';
  let result = null;
  if(email){
    const searchResult = await searchClientByEmailServer(email);
    result = searchResult || null;
    console.log('Resultado en Server Component:', { email, result });
  }

  return (
    <Suspense fallback={<Skeleton active paragraph={{ rows: 2 }} />}>
      <ClientResultEmail result={result} email={email} />
    </Suspense>
  );
}