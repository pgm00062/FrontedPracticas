'use client'

import React, { useState } from 'react';

const HeaderComponent: React.FC = () => {

    return (
    <div className="navbar bg-white dark:bg-gray-900 shadow-sm py-4 px-20">
      <h1 className="heading-1 mb-0 text-gray-900 dark:text-gray-100">Panel de Control</h1>
      <p className="text-muted text-gray-600 dark:text-gray-300">Gestión de clientes y comerciantes</p>
    </div>
    );
}
export default HeaderComponent;