import { colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Card, CardProps, Text } from "react-native-paper";

type CardComponentProps = CardProps & {
  item: any;
  img: any;
  id: string;
  handleCard?: (id?: string) => void;
};

const CardComponent = ({
  item,
  id,
  img,
  handleCard,
  ...rest
}: CardComponentProps) => {
  const route = useRouter();

  return (
    <Card style={styles.card} mode="contained">
      <View style={styles.imageContainer}>
        <Image source={img} style={styles.img} resizeMode="contain" />
        <View style={styles.textOverlay}>
          <Text style={styles.cardText} numberOfLines={2}>
            {item}
          </Text>
        </View>
        <View style={styles.cardActions}>
          <Button
            mode="contained"
            onPress={() =>
              route.push({ pathname: "/Home/cardDetails/[id]", params: { id } })
            }
            style={styles.buttonContainer}
            labelStyle={styles.buttonLabel}
          >
            Detalhes
          </Button>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    backgroundColor: colors.dark[700],
    width: 160,
    height: 300,
    borderRadius: 12,
    margin: 8,
    elevation: 4,
  },
  imageContainer: {
    position: "relative",
    width: 160,
    height: 200,
  },
  img: {
    width: 160,
    height: 200,
    marginTop: 60,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  textOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.dark[700],
    padding: 5,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardText: {
    color: colors.light[200],
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardActions: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark[800],
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: colors.light[200],
  },
  buttonLabel: {
    fontSize: 10,
    color: colors.dark[950],
    fontWeight: "bold",
  },
});

export default CardComponent;
