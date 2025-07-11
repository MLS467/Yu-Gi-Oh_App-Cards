import { colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark[800],
    padding: 12,
    paddingTop: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark[600],
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.light[200],
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    color: colors.light[200],
    marginBottom: 24,
    textAlign: "center",
  },
  cardsContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: colors.light[200],
    textAlign: "center",
    marginTop: 20,
    lineHeight: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.dark[800],
  },
  loadingText: {
    fontSize: 18,
    color: colors.light[200],
    marginTop: 16,
    fontWeight: "500",
  },
  refreshButton: {
    marginTop: 24,
    backgroundColor: colors.primary.default,
    paddingHorizontal: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    width: '100%',
  },
});
