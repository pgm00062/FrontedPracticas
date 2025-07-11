'use client'

import React, { useState } from 'react';

const HeaderComponent: React.FC = () => {

    return (
    <div className="navbar bg-white shadow-sm py-4 px-20">
      <h1 className="heading-1 mb-0">Panel de Control</h1>
      <p className="text-muted">Gestión de clientes y comerciantes</p>
    </div>
    );
}
export default HeaderComponent;
