'use client';

import { useSidebar } from '@/common/components/SharedComponents/SideBarNavegation/delivery/components/sideBarContext';
import Sidebar from '@/common/components/SharedComponents/SideBarNavegation/delivery';

export default function LayoutWithSidebar({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <>
      <Sidebar />
      <main
        className={`transition-all duration-300 px-4 
          ${isOpen ? 'md:ml-64' : 'mx-auto max-w-5xl'
        }`}
      >
        {children}
      </main>
    </>
  );
}
