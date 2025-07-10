import { useAuth } from "@/Hook/useAuth";

const SignOut = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  handleSignOut();
  return null; // Retorna null porque não há UI para renderizar neste componente
};

export default SignOut;
