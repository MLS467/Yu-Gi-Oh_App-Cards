import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import HomeCard from "./HomeCard";
import { styles } from "./styles";

const Home = () => {
  const [data_cards, setDataCards] = useState<any>([]);

  useEffect(() => {
    fetchYuGiOhCards();
  }, []);

  async function fetchYuGiOhCards(limit = 100) {
    try {
      const response = await fetch(
        "https://db.ygoprodeck.com/api/v7/cardinfo.php"
      );
      const data = await response.json();
      setDataCards(data.data.slice(0, limit));
    } catch (error) {
      console.error("Erro ao buscar cartas:", error);
      return [];
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Cartas Yu-Gi-Oh</Text>
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          data={data_cards}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <HomeCard
              id={item.id.toString()}
              name={item.name}
              image={item.card_images[0].image_url}
            />
          )}
          contentContainerStyle={styles.cardList}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Home;
