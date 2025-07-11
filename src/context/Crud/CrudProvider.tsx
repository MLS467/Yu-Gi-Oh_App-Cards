import { db } from "@/context/FireBaseContext/firebase.config/Auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { AuthProviderProps } from "../FireBaseContext/context";
import { CrudContext } from "./CrudContext";

const CrudProvider: React.FC<AuthProviderProps> = ({ children }) => {
  async function favoriteCard(userId: string, carta: any) {
    try {
      const docRef = await addDoc(collection(db, "favoriteCards"), {
        userId: userId,
        cardId: carta.id,
        cardName: carta.name,
        cardImage: carta.card_images[0].image_url,
        notes: "",
        favoritadoEm: Timestamp.now(),
      });

      console.log("Documento criado com ID:", docRef.id);
      return { success: true, docId: docRef.id };
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error);
      return { success: false };
    }
  }

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

  async function removeFavorite(docId: string) {
    try {
      await deleteDoc(doc(db, "favoriteCards", docId));
      return { success: true };
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      return { success: false };
    }
  }

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

  async function updateCardNotes(docId: string, notes: string) {
    try {
      await updateDoc(doc(db, "favoriteCards", docId), {
        notes: notes,
      });
      return { success: true };
    } catch (error) {
      console.error("Erro ao atualizar notas:", error);
      return { success: false };
    }
  }

  const crud = {
    favoriteCard,
    isCardFavorite,
    removeFavorite,
    getUserFavoriteCards,
    updateCardNotes,
  };

  return (
    <CrudContext.Provider value={{ crud }}>{children}</CrudContext.Provider>
  );
};

export default CrudProvider;
