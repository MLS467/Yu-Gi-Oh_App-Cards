import { colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark[800],
    padding: 12,
    paddingTop: 16,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.dark[600],
    paddingBottom: 12,
  },
  arrowBack: {
    position: "absolute",
    left: 20,
  },
  title: {
    color: colors.light[200],
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardList: {
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    paddingBottom: 20,
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
  },
  columnWrapper: {
    marginRight: 35,
    justifyContent: "center",
    alignItems: "center",
    gap: 0,
  },
});

export { styles };
