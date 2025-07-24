import { UseCrud } from "@/Hook/useCrud";
import YugiohLoading from "@/components/YugiohLoading";
import { colors } from "@/constants/Colors";
import { auth } from "@/context/FireBaseContext/firebase.config/Auth";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "./style";

export default function DetailMyDeckScreen() {
  const { crud }: any = UseCrud();
  const navigate = useRouter();
  const params = useLocalSearchParams();
  const id = params.id as string;
  const user = auth.currentUser;
  const [carta, setCarta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [favoriteDocId, setFavoriteDocId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

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

  useEffect(() => {
    async function carregarAnotacoes() {
      if (!user?.uid || !id) return;

      try {
        const result = await crud.getUserFavoriteCards(user.uid);

        if (result.success && result.favoriteCards.length > 0) {
          const cartaEncontrada = result.favoriteCards.find(
            (card: any) => card.cardId.toString() === id.toString()
          );

          if (cartaEncontrada) {
            setFavoriteDocId(cartaEncontrada.id);
            setNotes(cartaEncontrada.notes || "");
          } else {
            console.log("Carta específica não encontrada no deck do usuário");
            setFavoriteDocId(null);
            setNotes("");
          }
        } else {
          console.log("Nenhuma carta encontrada no deck do usuário");
          setFavoriteDocId(null);
          setNotes("");
        }
      } catch (error) {
        console.error("Erro ao carregar anotações:", error);
      }
    }

    carregarAnotacoes();
  }, [id, user?.uid, crud]);

  const handleUpdate = async (docId: string, notes: string) => {
    try {
      setLoading(true);
      const result = await crud.updateCardNotes(docId, notes);
      setLoading(false);

      if (result.success) {
        Alert.alert("Sucesso", "Anotações salvas com sucesso!");
      } else {
        Alert.alert("Erro", "Falha ao salvar anotações.");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", "Não foi possível salvar as anotações.");
    }
  };

  if (loading) {
    return <YugiohLoading />;
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

        <View style={styles.notesSection}>
          <Text style={styles.sectionTitle}>Anotações</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Adicione suas anotações sobre esta carta..."
            placeholderTextColor={colors.dark[500]}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={notes}
            onChangeText={setNotes}
          />

          <View
            style={styles.saveButton}
            onTouchEnd={() => {
              if (!favoriteDocId) {
                Alert.alert(
                  "Erro",
                  "Você precisa estar logado para salvar anotações."
                );
                return;
              }
              handleUpdate(favoriteDocId, notes);
            }}
          >
            <Text style={styles.saveButtonText}>Salvar Anotações</Text>
          </View>
        </View>

        <View style={styles.backButtonContainer}>
          <View
            style={styles.backButton}
            onTouchEnd={() => {
              navigate.push("/Home/myDeck");
            }}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
