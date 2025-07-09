import { styles } from "@/app/styles";
import { colors } from "@/constants/Colors";
import { useAuth } from "@/Hook/useAuth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

const Index = () => {
  const router = useRouter();
  const { signIn } = useAuth();

  const user = {
    email: "teste@teste.com",
    password: "teste123",
  };

  // const user = {
  //   email: "test22e@teste.com",
  //   password: "tes22te123",
  // };

  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  const handleSubmit = async () => {
    try {
      const userCredential = await signIn(email, password);

      router.replace("/Home");
    } catch (error) {
      console.error("Error during sign-in:", error);
      Alert.alert("Login", "Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={require("@/assets/folha.png")} />
        <Text style={styles.title}>Login</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          mode="outlined"
          style={{ margin: 16 }}
        />
        <TextInput
          label="Senha"
          value={password}
          onChangeText={(password) => setPassword(password)}
          mode="outlined"
          autoCapitalize="none"
          style={{ margin: 16 }}
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={{ ...styles.button, margin: 16 }}
        >
          <Text style={styles.textBtn}>Entrar</Text>
        </Button>
      </View>

      <TouchableOpacity
        onPress={() => router.navigate("/Sign-Up")}
        activeOpacity={0.7}
        style={styles.btnRegister}
      >
        <Text style={styles.textRegister}>
          Não tem uma conta?{" "}
          <Text style={{ color: colors.light[200] }}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
