import GetClientByName from '../../GetClientByName/delivery';
import GetClientByEmail from '../../GetClientByEmail/delivery';
import GetClientById from'../../GetBClientIDComponent/delivery';
import SearchForm from '../../../pages/SearchForm';

interface Props {
  searchParams: { type?: string; value?: string };
}

export default async function SearchingClients({ searchParams }: Props) {
  return (
    <div>
      <SearchForm />
      {!searchParams.type && <p>Por favor, selecciona un tipo de búsqueda.</p>}
      {searchParams.type === 'name' && <GetClientByName searchParams={searchParams} />}
      {searchParams.type === 'email' && <GetClientByEmail searchParams={searchParams} />}
      {searchParams.type === 'id' && <GetClientById searchParams={searchParams} />}
    </div>
  );
}