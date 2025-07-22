'use client';
import { useRouter } from 'next/navigation';
import { Input, Select } from 'antd';
import { useState } from 'react';

const { Option } = Select;

export default function SearchForm() {
  const [searchType, setSearchType] = useState<'none' | 'id' | 'email' | 'name'>('none');
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    router.push(`/client-microservice?type=${searchType}&value=${encodeURIComponent(searchValue.trim())}`);
  };

  const handleTypeChange = (v: 'none' | 'id' | 'email' | 'name') => {
    setSearchType(v);
    setSearchValue('');
    if (v === 'none') {
      router.push('/client-microservice'); // Navega a la ruta base sin parámetros
    } else {
      router.push('/client-microservice?type=' + v);
    }
  };

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Select
        value={searchType}
        onChange={handleTypeChange}
        style={{ width: 200 }}
      >
        <Option value="none">Selecciona una opción de búsqueda</Option>
        <Option value="id">Buscar por ID</Option>
        <Option value="email">Buscar por Email</Option>
        <Option value="name">Buscar por Nombre</Option>
      </Select>
      {searchType !== 'none' && searchType !== 'name' && (
        <>
          <Input
            placeholder={
              searchType === 'id'
                ? 'Introduce el ID'
                : 'Introduce el email'
            }
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onPressEnter={handleSearch}
            style={{ flex: 1 }}
          />
          <button
            onClick={handleSearch}
            disabled={!searchValue.trim()}
            className="btn-primary"
          >
            🔍 Buscar
          </button>
        </>
      )}
    </div>
  );
}