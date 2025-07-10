import { StyleSheet } from "react-native";
import { colors } from "../../../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark[900],
    padding: 16,
  },

  scrollContainer: {
    paddingBottom: 40,
  },

  cardTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary.alt1,
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: colors.dark[800],
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  cardImageContainer: {
    alignItems: "center",
    marginBottom: 30,
    shadowColor: colors.primary.default,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  cardImage: {
    width: 280,
    height: 400,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: colors.primary.alt1,
  },

  infoSection: {
    backgroundColor: colors.dark[800],
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.default,
    shadowColor: colors.dark[950],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  infoRow: {
    marginBottom: 12,
  },

  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary.alt1,
    marginBottom: 4,
  },

  infoText: {
    fontSize: 15,
    color: colors.dark[100],
    lineHeight: 22,
  },

  descriptionText: {
    fontSize: 15,
    color: colors.dark[200],
    lineHeight: 24,
    fontStyle: "italic",
  },

  priceSection: {
    backgroundColor: colors.dark[700],
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.primary.alt2,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary.alt1,
    marginBottom: 12,
    textAlign: "center",
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark[600],
  },

  priceLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.dark[100],
  },

  priceValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary.alt1,
  },

  setsSection: {
    backgroundColor: colors.dark[800],
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.dark[600],
  },

  setItem: {
    backgroundColor: colors.dark[700],
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary.alt2,
  },

  setText: {
    fontSize: 14,
    color: colors.dark[200],
    lineHeight: 20,
  },

  linkButton: {
    backgroundColor: colors.primary.default,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: colors.primary.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },

  linkText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.light[100],
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.dark[900],
  },

  loadingText: {
    fontSize: 18,
    color: colors.dark[100],
    marginTop: 16,
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.dark[900],
    padding: 20,
  },

  errorText: {
    fontSize: 18,
    color: colors.primary.default,
    textAlign: "center",
    fontWeight: "bold",
  },

  favoriteButton: {
    backgroundColor: colors.primary.alt2,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: colors.primary.alt2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },

  favoriteButtonActive: {
    backgroundColor: colors.primary.alt1,
  },

  favoriteText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.light[100],
    marginLeft: 8,
  },

  favoriteIcon: {
    fontSize: 20,
  },

  buttonsContainer: {
    gap: 10,
  },
});
