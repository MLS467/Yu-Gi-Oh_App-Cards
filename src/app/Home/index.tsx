import CardComponent from "@/components/Card";
import { colors } from "@/constants/Colors";
import { data_list } from "@/utils/data";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

const Home = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.arrowBack}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colors.light[200]}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Lista de Itens</Text>
      </View>

      <FlatList
        data={data_list}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <CardComponent item={item.name} img={require("@/assets/folha.png")}>
            {item.name}
          </CardComponent>
        )}
        contentContainerStyle={styles.cardList}
        columnWrapperStyle={{ justifyContent: "space-evenly" }}
      />
    </View>
  );
};

export default Home;
