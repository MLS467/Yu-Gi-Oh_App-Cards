import { colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

const SeparatorWithText = () => (
  <View style={styles.container}>
    <View style={styles.line} />
    <Text style={styles.text}>OU</Text>
    <View style={styles.line} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    backgroundColor: colors.dark[800], // fundo escuro para contraste
  },
  line: {
    flex: 2,
    height: StyleSheet.hairlineWidth, // linha fina adaptada
    backgroundColor: colors.borderYU[100],
  },
  text: {
    color: colors.light[200],
    marginHorizontal: 10,
    fontWeight: "bold",
  },
});

export default SeparatorWithText;
