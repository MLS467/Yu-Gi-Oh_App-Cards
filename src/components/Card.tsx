import { colors } from "@/constants/Colors";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { Button, Card, CardProps, Text } from "react-native-paper";

type CardComponentProps = CardProps & {
  item: any;
  img: any;
  handleCard?: (id?: string) => void;
};

const CardComponent = ({
  item,
  img,
  handleCard,
  ...rest
}: CardComponentProps) => {
  return (
    <Card style={styles.card} mode="contained">
      <Card.Content>
        <Text style={styles.cardText}>{item}</Text>
        <Image source={img} style={styles.img} />
        <Button
          mode="contained"
          onPress={() => console.log(`Card pressed: ${item}`)}
        >
          <Text style={styles.button}>Detalhes</Text>
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.dark[700],
    justifyContent: "center",
    width: 120,
    borderRadius: 12,
  },
  cardText: {
    textAlign: "center",
    color: colors.light[100],
    fontSize: 18,
    marginBottom: 8,
  },
  img: {
    width: 100,
    height: 100,
  },
  button: {
    fontSize: 10,
  },
});

export default CardComponent;
