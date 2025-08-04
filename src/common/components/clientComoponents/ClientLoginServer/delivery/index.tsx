import LoginForm from "@/common/components/pages/ClientLogin";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export default function LoginPage() {
    return <LoginForm onSwitchToRegister={() => {}} />;
};