import { colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark[950],
  },
  header: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 30,
    justifyContent: "space-between",
    // borderWidth: 1,
    // borderColor: "red",
  },
  arrowBack: {
    position: "absolute",
    left: 20,
  },
  title: {
    width: "100%",
    textAlign: "center",
    color: colors.light[200],
    fontSize: 24,
    fontWeight: "bold",
  },
  cardList: {
    paddingHorizontal: 20,
    gap: 50,
  },
  cardContainer: {
    height: "auto",
    justifyContent: "space-between",
    gap: 16,
  },
});

export { styles };
