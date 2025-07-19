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
    marginTop: 40,
  },
  titleContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  gradientLine: {
    maxWidth: 100,
    height: 2,
    width: "100%",
    borderRadius: 2,
  },
  title: {
    color: colors.primary.alt1,
    fontSize: 30,
    textAlign: "center",
    fontFamily: "YugiOh",
    margin: 5,
  },
  form: {
    width: "100%",
    marginTop: 40,
  },
  text: {
    color: colors.light[200],
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  logo: {
    marginVertical: 0,
    marginHorizontal: "auto",
    width: "90%",
    height: 100,
    shadowColor: colors.primary.default, // cor base
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 30, // sombra no Android
  },
  btnContainer: {
    width: "90%",
    marginVertical: 10,
    marginHorizontal: "auto",
  },
  button: {
    borderRadius: 5,
    width: "100%",
    marginVertical: 10,
    marginHorizontal: "auto",
  },
  textBtn: {
    color: colors.light[200],
    fontSize: 20,
    textAlign: "center",
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  containerCheck: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxBaseCheck: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.primary.alt1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxCheckedCheck: {
    backgroundColor: colors.primary.default,
  },
  checkmarkCheck: {
    color: colors.primary.alt1,
    fontSize: 16,
    fontWeight: "bold",
  },
  labelCheck: {
    marginLeft: 8,
    fontSize: 15,
    color: colors.primary.alt1,
  },
  forgotPasswordText: {
    fontSize: 15,
    color: colors.primary.alt1,
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
