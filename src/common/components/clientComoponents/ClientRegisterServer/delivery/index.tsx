import RegisterForm from "@/common/components/pages/ClientRegister";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterLoginPage() {
  return <RegisterForm onSwitchToLogin={() => {}} />;
};