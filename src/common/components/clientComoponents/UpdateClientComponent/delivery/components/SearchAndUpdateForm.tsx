'use client';

import React from 'react';
import { Card, Input, Button, Typography, Alert, Space } from 'antd';
import type { ClientUpadateData } from '../interface';

const { Title, Text } = Typography;

interface SearchAndUpdateFormProps {
  searchId: string;
  isSearching: boolean;
  currentClient: ClientUpadateData | null;
  onSearchIdChange: (id: string) => void;
  onSearch: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchAndUpdateForm: React.FC<SearchAndUpdateFormProps> = ({
  searchId,
  isSearching,
  currentClient,
  onSearchIdChange,
  onSearch,
  onKeyPress,
}) => {
  return (
    <div>
      {!currentClient && (
        <Space direction="vertical" size="middle" style={{ marginTop: 16, width: '100%' }}>
          <Space.Compact style={{ width: '100%' }}>
            <Input
              value={searchId}
              onChange={(e) => onSearchIdChange(e.target.value)}
              onKeyDown={onKeyPress}
              placeholder="Introduce el ID del cliente (ej: 1751879096509)"
              disabled={isSearching}
            />
            <Button
              type="primary"
              onClick={onSearch}
              disabled={isSearching || !searchId.trim()}
              loading={isSearching}
            >
              🔍 Buscar
            </Button>
          </Space.Compact>

          <Alert
            message="💡 Instrucciones:"
            description={
              <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
                <li>- Introduce el ID numérico del cliente que quieres actualizar</li>
                <li>- Puedes usar Enter para buscar rápidamente</li>
                <li>- Una vez encontrado, podrás editar sus datos</li>
              </ul>
            }
            type="info"
            showIcon
          />
        </Space>
      )}
    </div>
  );
};
export default SearchAndUpdateForm;