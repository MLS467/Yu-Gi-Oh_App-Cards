import { colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.dark[800],
  },
  title: {
    color: colors.light[200],
    fontSize: 28,
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "bold",
    fontFamily: "YugiOh",
  },
  form: {
    width: "90%",
    gap: 16,
    marginTop: 20,
  },
  text: {
    color: colors.light[200],
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 60, // avatar circular
    borderWidth: 2,
    borderColor: colors.light[200],
    backgroundColor: colors.light[100],
  },
  input: {
    backgroundColor: colors.light[100],
    borderRadius: 12,
    fontSize: 16,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.light[200],
  },
  button: {
    borderRadius: 10,
    backgroundColor: colors.primary.default,
    elevation: 2,
  },
  textBtn: {
    color: colors.light[100],
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
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
