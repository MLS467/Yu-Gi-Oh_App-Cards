import { db } from "@/context/FireBaseContext/firebase.config/Auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import React from "react";
import { AuthProviderProps } from "../FireBaseContext/context";
import { CrudContext } from "./CrudContext";

const CrudProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Adicionar carta aos favoritos - versão simplificada
  async function favoriteCard(userId: string, carta: any) {
    try {
      const docRef = await addDoc(collection(db, "favoriteCards"), {
        userId: userId,
        cardId: carta.id,
        cardName: carta.name,
        cardImage: carta.card_images[0].image_url,
        favoritadoEm: Timestamp.now(),
      });

      console.log("Documento criado com ID:", docRef.id);
      return { success: true, docId: docRef.id };
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error);
      return { success: false };
    }
  }

  // Verificar se carta já está nos favoritos - versão simplificada
  async function isCardFavorite(userId: string, cardId: string) {
    try {
      const q = query(
        collection(db, "favoriteCards"),
        where("userId", "==", userId),
        where("cardId", "==", cardId)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        return { isFavorite: true, docId };
      }

      return { isFavorite: false };
    } catch (error) {
      console.error("Erro ao verificar favorito:", error);
      return { isFavorite: false };
    }
  }

  // Remover carta dos favoritos - versão simplificada
  async function removeFavorite(docId: string) {
    try {
      await deleteDoc(doc(db, "favoriteCards", docId));
      return { success: true };
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      return { success: false };
    }
  }

  // Obter todas as cartas favoritas de um usuário
  async function getUserFavoriteCards(userId: string) {
    try {
      const q = query(
        collection(db, "favoriteCards"),
        where("userId", "==", userId)
      );

      const querySnapshot = await getDocs(q);
      const favoriteCards: any[] = [];

      querySnapshot.forEach((doc) => {
        favoriteCards.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return { success: true, favoriteCards };
    } catch (error) {
      console.error("Erro ao buscar cartas favoritas:", error);
      return { success: false, favoriteCards: [] };
    }
  }

  const crud = {
    favoriteCard,
    isCardFavorite,
    removeFavorite,
    getUserFavoriteCards,
  };

  return (
    <CrudContext.Provider value={{ crud }}>{children}</CrudContext.Provider>
  );
};

export default CrudProvider;
