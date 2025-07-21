import GetClientByName from '../../GetClientByName/delivery';
import SearchForm from '../../../pages/SearchForm';

interface Props {
  searchParams: { type?: string; value?: string  };
}

export default async function SearchingClients({ searchParams }: Props) {
  return (
    <div>
      <SearchForm />
      <GetClientByName searchParams={searchParams} />
    </div>
  );
}