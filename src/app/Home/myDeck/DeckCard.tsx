import { colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

interface DeckCardProps {
  id: string;
  docId: string;
  name: string;
  image: string;
  notes?: string;
  onRemove: (docId: string) => void;
}

const DeckCard = ({
  id,
  docId,
  name,
  image,
  notes = "",
  onRemove,
}: DeckCardProps) => {
  const route = useRouter();

  return (
    <Card style={styles.card} mode="contained">
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.img}
          resizeMode="contain"
        />

        <View style={styles.textOverlay}>
          <Text style={styles.cardText} numberOfLines={2}>
            {name}
          </Text>
          {notes && notes.trim() !== "" && (
            <View style={styles.noteBadge}>
              <MaterialIcons name="note" size={12} color={colors.light[200]} />
            </View>
          )}
        </View>
      </View>

      <View style={styles.cardActions}>
        <Button
          mode="contained"
          onPress={() => {
            route.push(`/Home/myDeck/detailsMyDeck/${id}?fromDeck=true`);
          }}
          style={styles.detailsButton}
          labelStyle={styles.buttonLabel}
          icon={({ size, color }) => (
            <MaterialIcons name="info" size={16} color={color} />
          )}
        >
          Detalhes
        </Button>

        <Button
          mode="contained"
          onPress={() => onRemove(docId)}
          style={styles.removeButton}
          labelStyle={styles.buttonLabel}
          icon={({ size, color }) => (
            <MaterialIcons name="delete" size={16} color={color} />
          )}
        >
          Remover
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.dark[700],
    width: 165,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 4,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.dark[600],
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 220,
  },
  img: {
    width: "100%",
    height: 220,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  textOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(34, 34, 34, 0.75)",
    padding: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary.default,
  },
  cardText: {
    color: colors.light[200],
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  cardActions: {
    backgroundColor: colors.dark[800],
    padding: 10,
    paddingHorizontal: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  detailsButton: {
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: colors.primary.default,
  },
  removeButton: {
    borderRadius: 8,
    backgroundColor: "#d32f2f",
  },
  buttonLabel: {
    fontSize: 12,
    color: colors.light[200],
    fontWeight: "bold",
  },
  noteBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: colors.primary.default,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DeckCard;
