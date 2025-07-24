// components/YugiohLoading.tsx
import { colors } from "@/constants/Colors";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

export default function YugiohLoading() {
  // Valor de rotação animado
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("@/assets/eye-of-anubis.png")}
        style={[styles.image, { transform: [{ rotate: spin }] }]}
        resizeMode="contain"
      />
      <Animated.Text style={styles.text}>Carregando...</Animated.Text>
    </View>
  );
}
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: colors.dark[800],
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    elevation: 20, // Para Android
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  text: {
    color: colors.primary.alt1, // Usando a cor pedida
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
    marginTop: 10,
  },
});
