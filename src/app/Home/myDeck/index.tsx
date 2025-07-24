import { UseCrud } from "@/Hook/useCrud";
import Header from "@/components/Header";
import YugiohLoading from "@/components/YugiohLoading";
import { colors } from "@/constants/Colors";
import { auth } from "@/context/FireBaseContext/firebase.config/Auth";
import { sendNotification } from "@/utils/SendNotification";
import { MaterialIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  LogBox,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import DeckCard from "./DeckCard";
import { styles } from "./style";

interface FavoriteCard {
  id: string;
  userId: string;
  cardId: string;
  cardName: string;
  cardImage: string;
  notes: string;
  favoritadoEm: any;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

LogBox.ignoreLogs([
  "No Expo Push Token",
  "PushNotification",
  "Remote notifications",
]);

const MyDeck = () => {
  const { crud }: any = UseCrud();
  const user = auth.currentUser;

  const [loading, setLoading] = useState(false);
  const [favoriteCards, setFavoriteCards] = useState<FavoriteCard[]>([]);
  const isLoadingRef = useRef(false);

  async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão de notificação negada!");
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  useEffect(() => {
    if (favoriteCards.length === 0) {
      sendNotification();
    }
  }, [favoriteCards]);

  // Usando useRef para controlar o estado de loading sem causar re-renderização
  const fetchFavoriteCards = useCallback(async () => {
    if (!user?.uid) {
      console.log("Usuário não está logado, ignorando busca");
      return;
    }

    // Verifica se já está carregando usando a ref
    if (isLoadingRef.current) {
      console.log("Já está carregando, ignorando nova chamada");
      return;
    }

    if (loading) {
      return <YugiohLoading />;
    }

    // Define o estado de loading
    isLoadingRef.current = true;
    setLoading(true);

    try {
      console.log("Buscando cartas favoritas do usuário:", user.uid);
      const result = await crud.getUserFavoriteCards(user.uid);

      if (result.success) {
        // Atualiza o estado com as novas cartas
        setFavoriteCards(result.favoriteCards);
        console.log(
          "Cartas carregadas com sucesso:",
          result.favoriteCards.length
        );
      }
    } catch (error) {
      console.error("Erro ao buscar cartas favoritas:", error);
    } finally {
      // Reseta o estado de loading
      isLoadingRef.current = false;
      setLoading(false);
    }
  }, [crud, user?.uid]);

  // Efeito para carregar dados quando a tela receber foco
  useFocusEffect(
    // Não incluímos fetchFavoriteCards como dependência para evitar o loop infinito
    React.useCallback(() => {
      console.log(
        "MyDeck recebeu foco - verificando necessidade de recarregar"
      );

      // Função de carregamento específica para este efeito
      const loadData = async () => {
        if (!user?.uid || isLoadingRef.current) return;

        // Chama a função de busca diretamente
        isLoadingRef.current = true;
        setLoading(true);

        try {
          console.log("Buscando cartas no focus effect");
          const result = await crud.getUserFavoriteCards(user.uid);
          if (result.success) {
            setFavoriteCards(result.favoriteCards);
          }
        } catch (error) {
          console.error("Erro ao buscar cartas:", error);
        } finally {
          isLoadingRef.current = false;
          setLoading(false);
        }
      };

      loadData();

      return () => {
        console.log("MyDeck perdeu foco");
      };
    }, [crud, user?.uid]) // Dependências seguras que não causam loops
  );

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
              // Atualiza os estados de loading
              isLoadingRef.current = true;
              setLoading(true);

              const result = await crud.removeFavorite(docId);

              if (result.success) {
                // Atualizamos localmente o estado para melhor UX
                setFavoriteCards((prevCards) =>
                  prevCards.filter((card) => card.id !== docId)
                );
                Alert.alert("Sucesso", "Carta removida do seu deck!");
              } else {
                Alert.alert("Erro", "Não foi possível remover a carta.");
              }

              // Reseta os estados de loading
              isLoadingRef.current = false;
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
      notes={item.notes || ""}
      onRemove={handleRemoveCard}
    />
  );

  if (loading) {
    return <YugiohLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: colors.primary.alt1,
          textAlign: "center",
          marginTop: 65,
          letterSpacing: 1.2,
        }}
      >
        Meu Deck de Cartas
      </Text>

      {favoriteCards.length > 0 ? (
        <FlatList
          data={favoriteCards}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.cardsContainer}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          windowSize={7}
          removeClippedSubviews={true}
          legacyImplementation={true}
          scrollEventThrottle={16}
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
            onPress={() => {
              if (!isLoadingRef.current) {
                if (user?.uid) {
                  isLoadingRef.current = true;
                  setLoading(true);

                  crud
                    .getUserFavoriteCards(user.uid)
                    .then((result: any) => {
                      if (result.success) {
                        setFavoriteCards(result.favoriteCards);
                      }
                    })
                    .catch((error: any) =>
                      console.error("Erro ao atualizar:", error)
                    )
                    .finally(() => {
                      isLoadingRef.current = false;
                      setLoading(false);
                    });
                }
              }
            }}
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
