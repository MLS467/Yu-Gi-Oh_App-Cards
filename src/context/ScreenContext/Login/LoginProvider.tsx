import { useAuth } from "@/Hook/useAuth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import LoginContext from "./LoginContext";

const LoginProvider = ({ children }: any) => {
  const router = useRouter();
  const { signIn } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);

  type LoginProps = {
    email: string;
    password: string;
  };

  const handleLogin = async ({ email, password }: LoginProps) => {
    try {
      await signIn(email, password);

      router.replace("/Home");
    } catch (error) {
      console.error("Error during sign-in:", error);
      Alert.alert("Login", "Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <LoginContext.Provider
      value={{
        handleLogin,
        router,
        passwordVisible,
        setPasswordVisible,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
