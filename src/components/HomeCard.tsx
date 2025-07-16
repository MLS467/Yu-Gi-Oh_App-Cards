import { colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

interface HomeCardProps {
  id: string;
  name: string;
  image: string;
}

const HomeCard = ({ id, name, image }: HomeCardProps) => {
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
          <Text style={styles.cardText} numberOfLines={1}>
            {name}
          </Text>
        </View>
      </View>

      <View style={styles.cardActions}>
        <Button
          mode="contained"
          onPress={() =>
            route.push({ pathname: "/Home/cardDetails/[id]", params: { id } })
          }
          style={styles.detailsButton}
          labelStyle={styles.buttonLabel}
          icon={({ size, color }) => (
            <MaterialIcons name="info" size={16} color={color} />
          )}
        >
          Detalhes
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.dark[700],
    width: 300,
    borderRadius: 12,
    elevation: 4,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.dark[600],
  },
  imageContainer: {
    backgroundColor: colors.dark[800],
    paddingTop: 15,
    position: "relative",
    width: "100%",
    height: 500,
  },
  img: {
    width: "100%",
    height: "100%",
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
    // borderBottomColor: colors.primary.default,
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
    padding: 5,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  detailsButton: {
    borderRadius: 8,
    backgroundColor: colors.primary.default,
  },
  buttonLabel: {
    fontSize: 12,
    color: colors.light[200],
    fontWeight: "bold",
  },
});

export default HomeCard;
