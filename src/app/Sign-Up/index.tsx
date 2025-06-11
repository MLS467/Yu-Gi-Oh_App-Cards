import { styles as homeStyle } from "@/app/Home/styles";
import { colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { styles } from "./styles";

const SignUp = () => {
  return (
    <View style={styles.container}>
      <View style={homeStyle.header}>
        <View>
          <Image style={styles.logo} source={require("@/assets/folha.png")} />
          <Text style={styles.title}>Cadastrar</Text>
        </View>
        <View style={homeStyle.arrowBack}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colors.light[200]}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Nome"
          value={""}
          onChangeText={() => alert("Nome Changed")}
          mode="outlined"
        />
        <TextInput
          label="Email"
          value={""}
          onChangeText={() => alert("Email Changed")}
          mode="outlined"
        />
        <TextInput
          label="Senha"
          value={""}
          onChangeText={() => alert("Password Changed")}
          mode="outlined"
        />
        <TextInput
          label="Confirmar Senha"
          value={""}
          onChangeText={() => alert("confirm password Changed")}
          mode="outlined"
        />

        <Button
          mode="contained"
          onPress={() => console.log("Button Pressed")}
          style={{ ...styles.button, margin: 16 }}
        >
          <Text style={styles.textBtn}>Cadastrar</Text>
        </Button>
      </View>
    </View>
  );
};

export default SignUp;
