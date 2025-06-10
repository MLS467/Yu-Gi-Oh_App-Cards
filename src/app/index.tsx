import { colors } from "@/constants/Colors";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Index = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Login</Text>
        <Image
          style={styles.logo}
          source={require("@/assets/placeholder.png")}
        />
      </View>
      <View>{/* Form aqui */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.light[200],
    fontSize: 30,
    textAlign: "center",
    margin: 10,
  },
  text: {
    color: colors.light[200],
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default Index;
