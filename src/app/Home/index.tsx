import YugiohLoading from "@/components/YugiohLoading";
import { colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useHomeContext } from "../../Hook/useHomeContext";
import HomeCard from "../../components/HomeCard";
import { styles } from "./styles";

const Home = () => {
  const { dataCards, loading } = useHomeContext();
  const [search, setSearch] = React.useState("");

  if (loading) {
    return <YugiohLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={{ width: "90%", alignSelf: "center", marginTop: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Text style={styles.title}>Lista de Cartas</Text>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 24,
              color: colors.primary.alt1,
              fontFamily: "YugiOh",
            }}
          >
            Yu-Gi-Oh
          </Text>
        </View>
        <TextInput
          label="Pesquisar carta"
          value={search}
          onChangeText={setSearch}
          mode="outlined"
          style={{ marginVertical: 8 }}
          placeholder="Digite o nome da carta..."
          left={
            <TextInput.Icon
              icon={() => (
                <MaterialIcons name="search" size={22} color="#888" />
              )}
            />
          }
        />
      </View>
      <View style={[styles.cardContainer, { alignItems: "center" }]}>
        <FlatList
          data={dataCards}
          keyExtractor={(item) => item.id.toString()}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          windowSize={7}
          removeClippedSubviews={true}
          legacyImplementation={true}
          renderItem={({ item }) => (
            <View
              style={{
                width: "100%",
                alignSelf: "center",
                marginVertical: 16,
              }}
            >
              <HomeCard
                id={item.id.toString()}
                name={item.name}
                image={item.card_images[0].image_url}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Home;
