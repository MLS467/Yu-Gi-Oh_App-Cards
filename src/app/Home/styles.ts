import { colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    gap: 10,
    paddingHorizontal: 20,
  },
});
