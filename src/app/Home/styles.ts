import { colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark[950],
  },
  header: {
    flexDirection: "row",
    marginVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  arrowBack: {
    position: "absolute",
    left: 20,
  },
  title: {
    color: colors.light[200],
    fontSize: 24,
    fontWeight: "bold",
  },
  cardList: {
    paddingHorizontal: 20,
    gap: 10,
  },
});

export default styles;
export { styles };
