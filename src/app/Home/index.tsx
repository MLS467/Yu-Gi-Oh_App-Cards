import YugiohLoading from "@/components/YugiohLoading";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { useHomeContext } from "../../Hook/useHomeContext";
import HomeCard from "./HomeCard";
import { styles } from "./styles";

const Home = () => {
  const { dataCards, loading } = useHomeContext();

  // Mostrar tela de loading enquanto as cartas estão sendo carregadas
  if (loading) {
    return <YugiohLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Cartas Yu-Gi-Oh</Text>
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          data={dataCards}
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
