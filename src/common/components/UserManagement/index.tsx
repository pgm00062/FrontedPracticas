'use client';

import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'María García', email: 'maria@example.com', role: 'User', status: 'active' },
    { id: 3, name: 'Carlos López', email: 'carlos@example.com', role: 'Manager', status: 'inactive' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAddUser = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const UserForm = () => (
    <div className="card">
      <h3 className="heading-3">
        {editingUser ? '✏️ Editar Cliente' : '➕ Nuevo Cliente'}
      </h3>
      
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Nombre *</label>
            <input 
              type="text" 
              className="form-input" 
              defaultValue={editingUser?.name || ''}
              placeholder="Ingresa el nombre completo"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input 
              type="email" 
              className="form-input" 
              defaultValue={editingUser?.email || ''}
              placeholder="cliente@example.com"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Tipo de Cliente</label>
            <select className="form-select" defaultValue={editingUser?.role || ''}>
              <option value="">Selecciona un tipo</option>
              <option value="Premium">Premium</option>
              <option value="Standard">Standard</option>
              <option value="Basic">Básico</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Estado</label>
            <select className="form-select" defaultValue={editingUser?.status || 'active'}>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>
        </div>
        
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button type="submit" className="btn-primary">
            {editingUser ? '💾 Actualizar' : '➕ Crear'} Cliente
          </button>
          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => setShowForm(false)}
          >
            ❌ Cancelar
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h2 className="heading-2">👥 Gestión de Clientes</h2>
          <p className="text-muted">
            Administra clientes del sistema, roles y permisos
          </p>
        </div>
        <button 
          className="btn-primary"
          onClick={handleAddUser}
        >
          ➕ Nuevo Cliente
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="card-compact text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">{users.length}</div>
          <div className="text-sm text-muted">Total Clientes</div>
        </div>
        <div className="card-compact text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {users.filter(u => u.status === 'active').length}
          </div>
          <div className="text-sm text-muted">Clientes Activos</div>
        </div>
        <div className="card-compact text-center">
          <div className="text-2xl font-bold text-orange-600 mb-1">
            {users.filter(u => u.status === 'inactive').length}
          </div>
          <div className="text-sm text-muted">Clientes Inactivos</div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-6">
          <UserForm />
        </div>
      )}

      {/* Users Table */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="heading-3">📋 Lista de Clientes</h3>
          <div className="flex gap-2">
            <button className="btn-secondary btn-small">🔍 Filtrar</button>
            <button className="btn-outline btn-small">📊 Exportar</button>
          </div>
        </div>
        
      <div
        className="table-container"
        style={{ margin: "1rem 0", overflowX: "auto" }}
      >
        <table
          className="table"
          style={{
            borderCollapse: "separate",
            borderSpacing: "0 8px",
            width: "100%",
            tableLayout: "fixed" // Fuerza un ancho fijo y facilita alineación
          }}
        >
          <thead
            className="table-header"
            style={{
              backgroundColor: "#f2f2f2",
              textAlign: "center" 
            }}
          >
              <tr>
                <th className="table-th">ID</th>
                <th className="table-th">Nombre</th>
                <th className="table-th">Email</th>
                <th className="table-th">Rol</th>
                <th className="table-th">Estado</th>
                <th className="table-th">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="table-row-hover">
                <td className="table-td font-medium" style={{ textAlign: "center" }}>
                  {user.id}
                </td>
                <td className="table-td" style={{ textAlign: "center" }}>
                  {user.name}
                </td>
                <td className="table-td text-muted" style={{ textAlign: "center" }}>
                  {user.email}
                </td>
                <td className="table-td" style={{ textAlign: "center" }}>
                  <span
                    className={`badge ${
                      user.role === "Admin"
                        ? "badge-danger"
                        : user.role === "Manager"
                        ? "badge-warning"
                        : "badge-info"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="table-td" style={{ textAlign: "center" }}>
                  <span
                    className={`badge ${
                      user.status === "active" ? "badge-success" : "badge-danger"
                    }`}
                  >
                    {user.status === "active" ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="table-td" style={{ textAlign: "center" }}>
                  <div className="flex gap-3" style={{ justifyContent: "center" }}>
                      <button 
                        className="btn-primary btn-small"
                        onClick={() => handleEditUser(user)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn-outline-danger btn-small" 
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {users.length === 0 && (
          <div className="text-center py-8 text-muted">
            No hay usuarios registrados
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💼</div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Sistema de Gestión de Clientes</h4>
            <p className="text-sm text-gray-600 mb-3">
              Administra de forma eficiente todos los clientes de tu sistema. 
              Crea, edita y gestiona la información de tus clientes con una interfaz moderna y fácil de usar.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-info">CRUD Completo</span>
              <span className="badge badge-success">UI Moderna</span>
              <span className="badge badge-warning">En Desarrollo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
