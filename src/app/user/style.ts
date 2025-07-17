import { colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark[800],
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    color: colors.light[200],
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.light[100],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderWidth: 2,
    borderColor: colors.light[200],
  },
  avatarImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarText: {
    fontSize: 40,
    color: colors.light[200],
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    backgroundColor: colors.light[100],
    borderRadius: 12,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.light[200],
    color: colors.dark[900],
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
  },
  button: {
    flex: 1,
    backgroundColor: colors.primary.default,
    borderRadius: 12,
    paddingVertical: 12,
    marginHorizontal: 8,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#D92626",
  },
  buttonText: {
    color: colors.light[100],
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
