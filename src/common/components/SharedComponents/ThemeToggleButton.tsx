"use client";
import React from "react";
import { useTheme } from "@/common/providers/ThemeProvider";

const ThemeToggleButton: React.FC = () => {
  const { isDark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 100,
        background: isDark ? '#222' : '#fff',
        color: isDark ? '#fff' : '#222',
        border: '1px solid #ccc',
        borderRadius: 8,
        padding: '8px 16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      aria-label="Alternar modo oscuro"
    >
      {isDark ? '🌙 Modo claro' : '🌞 Modo oscuro'}
    </button>
  );
};
export default ThemeToggleButton;