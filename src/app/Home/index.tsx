import CardComponent from "@/components/Card";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { styles } from "./styles";

const Home = () => {
  const [data_cards, setDataCards] = useState<any>([]);

  useEffect(() => {
    fetchYuGiOhCards();
  }, []);

  async function fetchYuGiOhCards(limit = 10) {
    try {
      const response = await fetch(
        "https://db.ygoprodeck.com/api/v7/cardinfo.php"
      );
      const data = await response.json();
      // Retorna apenas as primeiras 10 cartas
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
      {/* <TouchableOpacity onPress={signOut}>
        <MaterialIcons name="logout" size={24} color={colors.light[200]} />
      </TouchableOpacity> */}
      <View style={styles.cardContainer}>
        <FlatList
          data={data_cards}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <CardComponent
              item={item.name}
              id={item.id.toString()}
              img={{ uri: item.card_images[0].image_url_small }}
            >
              {item.name}
            </CardComponent>
          )}
          contentContainerStyle={styles.cardList}
          columnWrapperStyle={{ justifyContent: "space-around" }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Home;
