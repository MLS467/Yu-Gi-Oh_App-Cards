import { colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  title: {
    color: colors.light[200],
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    width: "100%",
    gap: 5,
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
    alignSelf: "center",
    marginBottom: 10,
  },
  button: {
    borderRadius: 10,
    marginTop: 16,
  },
  textBtn: {
    color: colors.light[950], // texto escuro no botão claro
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
