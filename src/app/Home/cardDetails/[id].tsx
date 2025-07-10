import { UseCrud } from "@/Hook/useCrud";
import { auth } from "@/context/FireBaseContext/firebase.config/Auth";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "./style";

export default function CardDetailScreen() {
  const { id } = useLocalSearchParams();
  const user = auth.currentUser;

  const { crud }: any = UseCrud();

  const [carta, setCarta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checkingFavorite, setCheckingFavorite] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteDocId, setFavoriteDocId] = useState<string | null>(null);

  // Verificar se a carta já está nos favoritos - versão simples
  async function checkIfFavorite() {
    if (!user?.uid || !carta) return;

    setCheckingFavorite(true);

    try {
      const result = await crud.isCardFavorite(user.uid, carta.id.toString());

      setIsFavorite(result.isFavorite);
      if (result.isFavorite) {
        setFavoriteDocId(result.docId);
      }
    } catch (error) {
      console.error("Erro ao verificar favorito:", error);
    } finally {
      setCheckingFavorite(false);
    }
  }

  // Gerenciar favorito (adicionar ou remover) - versão simplificada
  const handleFavoritePress = async () => {
    if (!user?.uid || !carta) {
      Alert.alert("Erro", "Você precisa estar logado para favoritar cartas.");
      return;
    }

    try {
      setCheckingFavorite(true);

      if (!isFavorite) {
        // Adicionar aos favoritos
        const result = await crud.favoriteCard(user.uid, carta);

        if (result.success) {
          setFavoriteDocId(result.docId);
          setIsFavorite(true);
          Alert.alert("Sucesso", "Carta adicionada aos favoritos!");
        } else {
          Alert.alert("Erro", "Falha ao adicionar aos favoritos.");
        }
      } else if (favoriteDocId) {
        // Remover dos favoritos
        const result = await crud.removeFavorite(favoriteDocId);

        if (result.success) {
          setFavoriteDocId(null);
          setIsFavorite(false);
          Alert.alert("Sucesso", "Carta removida dos favoritos!");
        } else {
          Alert.alert("Erro", "Falha ao remover dos favoritos.");
        }
      }
    } catch (error) {
      console.error("Erro ao processar favorito:", error);
      Alert.alert("Erro", "Não foi possível processar a operação de favorito.");
    } finally {
      setCheckingFavorite(false);
    }
  };

  // Carregar dados da carta - versão simples
  useEffect(() => {
    fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCarta(data.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar carta:", err);
        setLoading(false);
        Alert.alert("Erro", "Não foi possível carregar os detalhes da carta.");
      });
  }, [id]);

  // Verificar status de favorito quando a carta for carregada - versão simples
  useEffect(() => {
    if (carta && user?.uid) {
      checkIfFavorite();
    }
  }, [carta, user?.uid]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffcc00" />
        <Text style={styles.loadingText}>Carregando carta...</Text>
      </View>
    );
  }

  if (!carta) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Carta não encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.cardTitle}>{carta.name}</Text>

        <View style={styles.cardImageContainer}>
          <Image
            source={{ uri: carta.card_images[0].image_url }}
            style={styles.cardImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tipo:</Text>
            <Text style={styles.infoText}>{carta.type}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Descrição:</Text>
            <Text style={styles.descriptionText}>{carta.desc}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Arquétipo:</Text>
            <Text style={styles.infoText}>{carta.archetype || "N/A"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tipo de Carta:</Text>
            <Text style={styles.infoText}>{carta.humanReadableCardType}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Frame Type:</Text>
            <Text style={styles.infoText}>{carta.frameType}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Raça:</Text>
            <Text style={styles.infoText}>{carta.race}</Text>
          </View>
        </View>

        <View style={styles.priceSection}>
          <Text style={styles.sectionTitle}>Preços</Text>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>CardMarket:</Text>
            <Text style={styles.priceValue}>
              ${carta.card_prices[0].cardmarket_price}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>TCGPlayer:</Text>
            <Text style={styles.priceValue}>
              ${carta.card_prices[0].tcgplayer_price}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>eBay:</Text>
            <Text style={styles.priceValue}>
              ${carta.card_prices[0].ebay_price}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Amazon:</Text>
            <Text style={styles.priceValue}>
              ${carta.card_prices[0].amazon_price}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>CoolStuffInc:</Text>
            <Text style={styles.priceValue}>
              ${carta.card_prices[0].coolstuffinc_price}
            </Text>
          </View>
        </View>

        {carta.card_sets && (
          <View style={styles.setsSection}>
            <Text style={styles.sectionTitle}>Conjuntos</Text>
            {carta.card_sets.map((set: any, index: number) => (
              <View key={index} style={styles.setItem}>
                <Text style={styles.setText}>
                  🔹 {set.set_name} ({set.set_code}) - {set.set_rarity}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              isFavorite && styles.favoriteButtonActive,
            ]}
            onPress={handleFavoritePress}
            disabled={checkingFavorite}
          >
            {checkingFavorite ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Text style={styles.favoriteIcon}>
                  {isFavorite ? "⭐" : "☆"}
                </Text>
                <Text style={styles.favoriteText}>
                  {isFavorite
                    ? "Remover dos Favoritos"
                    : "Adicionar aos Favoritos"}
                </Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => Linking.openURL(carta.ygoprodeck_url)}
          >
            <Text style={styles.linkText}>Ver no site YGOPRODeck</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
