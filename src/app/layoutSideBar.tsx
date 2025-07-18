'use client';

import { useSidebar } from '@/common/components/SharedComponents/SideBarNavegation/delivery/components/sideBarContext';
import Sidebar from '@/common/components/SharedComponents/SideBarNavegation/delivery';

export default function LayoutWithSidebar({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main
        className={`transition-all duration-300 px-4`}
        style={{
          flex: 1,
          paddingTop: 32,
          paddingBottom: 32,
          background: "#f5f7fa",
          transition: "margin-left 0.3s",
          marginLeft: isOpen ? 256 : 0 
        }}
      >
        {children}
      </main>
    </div>
  );
}
