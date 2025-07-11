'use client';

import Link from 'next/link';
import { useSidebar } from '@/common/components/SharedComponents/SideBarNavegation/delivery/components/sideBarContext';

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <aside>
      {/* Botón de hamburguesa */}
    <button onClick={toggleSidebar} className="p-2 focus:outline-none">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    </button>


      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4 border-b font-bold text-lg">
          📋 Menú Principal
        </div>
        <nav className="p-4 space-y-3">
            <Link href="/" onClick={toggleSidebar} className="block text-gray-800 hover:text-blue-500">
            🏠 Inicio
            </Link>
            <Link href="/client-microservice" onClick={toggleSidebar} className="block text-gray-800 hover:text-blue-500">
            👤 Gestión Clientes
            </Link>
            <Link href="/merchant-microservice" onClick={toggleSidebar} className="block text-gray-800 hover:text-blue-500">
            💼 Gestión Merchants
            </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;



