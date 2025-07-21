'use client';
import { useRouter } from 'next/navigation';
import { Input, Select } from 'antd';
import { useState } from 'react';

const { Option } = Select;

export default function SearchForm() {
  const [searchType, setSearchType] = useState<'id' | 'email' | 'name'>('name');
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    router.push(`/client-microservice?type=${searchType}&value=${encodeURIComponent(searchValue.trim())}`);
  };

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Select
        value={searchType}
        onChange={v => setSearchType(v)}
        style={{ width: 140 }}
      >
        <Option value="id">Buscar por ID</Option>
        <Option value="email">Buscar por Email</Option>
        <Option value="name">Buscar por Nombre</Option>
      </Select>
      <Input
        placeholder={
          searchType === 'id'
            ? 'Introduce el ID'
            : searchType === 'email'
            ? 'Introduce el email'
            : 'Introduce el nombre'
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
    </div>
  );
}