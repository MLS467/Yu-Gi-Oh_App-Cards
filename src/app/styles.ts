import { colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
    // borderWidth: 1,
    // borderColor: "red",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
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
    width: 300,
    height: 100,
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

export default styles;
export { styles };
