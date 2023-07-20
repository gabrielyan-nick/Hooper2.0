import AuthForm from "@/components/authForm/AuthForm";
import Header from "@/components/ui/Header";
import Overlay from "@/components/ui/Overlay";

export default function LoginPage() {
  return (
    <Overlay>
      <Header />
      <AuthForm />
    </Overlay>
  );
}
