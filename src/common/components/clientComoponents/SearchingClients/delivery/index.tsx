import GetClientByName from '../../GetClientByName/delivery';
import GetClientByEmail from '../../GetClientByEmail/delivery';
import GetClientById from'../../GetBClientIDComponent/delivery';
import SearchForm from '../../../pages/SearchForm';

interface Props {
  searchParams: { type?: string; value?: string };
}

export default async function SearchingClients({ searchParams }: Props) {
  const { type, value } = searchParams;
  const isTypeValid = type === 'name' || type === 'email' || type === 'id';
  const hasValue = value && value.trim().length > 0;

  return (
    <div>
      <SearchForm />
      {!type && <p>Por favor, selecciona un tipo de búsqueda.</p>}
      {type && !isTypeValid && <p>Tipo de búsqueda no válido.</p>}
      {isTypeValid && !hasValue && <p>Por favor, introduce un valor para buscar.</p>}
      {isTypeValid && type === 'name' && <GetClientByName searchParams={searchParams} />}
      {isTypeValid && hasValue && type === 'email' && <GetClientByEmail searchParams={searchParams} />}
      {isTypeValid && hasValue && type === 'id' && <GetClientById searchParams={searchParams} />}
    </div>
  );
}