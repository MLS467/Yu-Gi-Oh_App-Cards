import { styles } from "@/app/styles";
import { colors } from "@/constants/Colors";
import { useLogin } from "@/Hook/useLogin";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

const Login = () => {
  const context = useLogin();
  const { email, password, setEmail, setPassword, handleSubmit, router }: any =
    context;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require("@/assets/folha.png")} />
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
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

export default Login;
