import { searchClientByEmailServer } from '../infrastructure/clientSearchOperations';
import ClientResultEmail from '../../../pages/ClientSearchByEmail';
import { Suspense } from 'react';
import { Skeleton } from 'antd';

interface Props {
  searchParams: { type?: string; value?: string };
}

export default async function GetClientByEmail({ searchParams }: Props) {
  const email = searchParams.value?.trim() ?? '';
  const result = email ? await searchClientByEmailServer(email) : null;

  return (
    <Suspense fallback={<Skeleton active paragraph={{ rows: 2 }} />}>
      <ClientResultEmail result={result} email={email} />
    </Suspense>
  );
}