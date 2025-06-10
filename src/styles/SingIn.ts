import { colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  form: {
    width: "100%",
    marginTop: 25,
  },
  text: {
    color: colors.light[200],
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  logo: {
    width: 150,
    height: 150,
  },
  button: {
    borderRadius: 10,
  },
  textBtn: {
    color: colors.light[200],
    fontSize: 20,
    textAlign: "center",
  },
  btnRegister: {
    marginTop: 30,
  },
  textRegister: {
    color: colors.light[100],
    textAlign: "center",
  },
});
