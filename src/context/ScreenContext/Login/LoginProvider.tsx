import { useAuth } from "@/Hook/useAuth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import LoginContext from "./LoginContext";

const LoginProvider = ({ children }: any) => {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
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
        email,
        password,
        setEmail,
        setPassword,
        handleSubmit,
        router,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
