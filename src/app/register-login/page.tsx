"use client";
import React, { useState } from "react";
import LoginForm from "@/common/components/pages/ClientLogin";
import RegisterForm from "@/common/components/pages/ClientRegister";

export default function RegisterLoginPage() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      {!showRegister ? (
        <LoginForm onSwitchToRegister={() => setShowRegister(true)} />
      ) : (
        <RegisterForm onSwitchToLogin={() => setShowRegister(false)} />
      )}
    </main>
  );
}