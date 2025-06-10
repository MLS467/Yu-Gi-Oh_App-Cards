import { colors } from "@/constants/Colors";
import { styles } from "@/styles/SingIn";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Validate email and password

    const data = { email, password };

    console.log("Submitted Data:", data);
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
          mode="outlined"
          style={{ margin: 16 }}
        />
        <TextInput
          label="Senha"
          value={password}
          onChangeText={(password) => setPassword(password)}
          mode="outlined"
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

      <TouchableOpacity activeOpacity={0.7} style={styles.btnRegister}>
        <Text style={styles.textRegister}>
          Não tem uma conta?{" "}
          <Text style={{ color: colors.light[200] }}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
