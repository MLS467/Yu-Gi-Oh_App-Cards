import React, { createContext, ReactNode, useEffect, useState } from "react";

const qtdCards = 50;

interface Card {
  id: number;
  name: string;
  card_images: { image_url: string }[];
}

interface HomeContextData {
  dataCards: Card[];
  loading: boolean;
  fetchYuGiOhCards: (limit?: number) => Promise<void>;
}

const HomeContext = createContext<HomeContextData>({} as HomeContextData);

export const HomeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dataCards, setDataCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchYuGiOhCards();
  }, []);

  async function fetchYuGiOhCards(limit = qtdCards) {
    setLoading(true);
    try {
      console.log("Buscando cartas do Yu-Gi-Oh...");
      const response = await fetch(
        "https://db.ygoprodeck.com/api/v7/cardinfo.php"
      );
      const data = await response.json();
      setDataCards(data.data.slice(0, limit));
      console.log(`Carregadas ${limit} cartas com sucesso!`);
    } catch (error) {
      console.error("Erro ao buscar cartas:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <HomeContext.Provider value={{ dataCards, loading, fetchYuGiOhCards }}>
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContext;
