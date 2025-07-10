import { UseCrud } from "@/Hook/useCrud";
import { colors } from "@/constants/Colors";
import { auth } from "@/context/FireBaseContext/firebase.config/Auth";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import DeckCard from "./DeckCard";
import { styles } from "./style";

// Definindo o tipo para as cartas favoritas
interface FavoriteCard {
  id: string;
  userId: string;
  cardId: string;
  cardName: string;
  cardImage: string;
  favoritadoEm: any;
}

const MyDeck = () => {
  const { crud }: any = UseCrud();
  const user = auth.currentUser;

  const [loading, setLoading] = useState(true);
  const [favoriteCards, setFavoriteCards] = useState<FavoriteCard[]>([]);

  // Função para buscar as cartas favoritas do usuário usando o CrudContext
  const fetchFavoriteCards = async () => {
    if (!user?.uid) return;

    setLoading(true);
    try {
      const result = await crud.getUserFavoriteCards(user.uid);

      if (result.success) {
        setFavoriteCards(result.favoriteCards);
      }
    } catch (error) {
      console.error("Erro ao buscar cartas favoritas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Buscar favoritos quando o componente montar
  useEffect(() => {
    fetchFavoriteCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  // Função para remover uma carta dos favoritos
  const handleRemoveCard = async (docId: string) => {
    try {
      Alert.alert(
        "Remover carta",
        "Deseja realmente remover esta carta do seu deck?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Remover",
            onPress: async () => {
              setLoading(true);
              const result = await crud.removeFavorite(docId);

              if (result.success) {
                setFavoriteCards((prevCards) =>
                  prevCards.filter((card) => card.id !== docId)
                );
                Alert.alert("Sucesso", "Carta removida do seu deck!");
              } else {
                Alert.alert("Erro", "Não foi possível remover a carta.");
              }
              setLoading(false);
            },
            style: "destructive",
          },
        ]
      );
    } catch (error) {
      console.error("Erro ao remover carta:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar remover a carta.");
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: FavoriteCard }) => (
    <DeckCard
      id={item.cardId}
      docId={item.id}
      name={item.cardName}
      image={item.cardImage}
      onRemove={handleRemoveCard}
    />
  );

  // Mostrar loading
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.default} />
        <Text style={styles.loadingText}>Carregando seu deck...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.headerContainer}>
        <Text style={styles.title}>Meu Deck</Text>
        <Button
          mode="text"
          onPress={fetchFavoriteCards}
          icon={({ size, color }) => (
            <MaterialIcons name="refresh" size={24} color={colors.light[200]} />
          )}
          style={{ marginRight: -10 }}
        />
      </View> */}

      {favoriteCards.length > 0 ? (
        <FlatList
          data={favoriteCards}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.cardsContainer}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="deck" size={60} color={colors.light[400]} />
          <Text style={styles.emptyText}>
            Você ainda não adicionou cartas ao seu deck.{"\n"}
            Adicione cartas aos favoritos para vê-las aqui!
          </Text>
          <Button
            mode="contained"
            onPress={fetchFavoriteCards}
            style={styles.refreshButton}
            icon={({ size, color }) => (
              <MaterialIcons name="refresh" size={size} color={color} />
            )}
          >
            Atualizar
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MyDeck;
