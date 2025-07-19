import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  modalContent: {
    backgroundColor: "#11131a",
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 300,
    maxWidth: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  title: {
    color: "#ffd600",
    fontSize: 24,
    marginBottom: 4,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  emailLabel: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  emailInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ff3c3c",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#181a23",
    marginBottom: 24,
  },
  emailIcon: {
    fontSize: 18,
    color: "#ffd600",
    marginRight: 8,
  },
  emailInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: "#181a23",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  sendButton: {
    flex: 1,
    backgroundColor: "#ff3c3c",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
