import { storage } from "@/context/FireBaseContext/firebase.config/Auth";
import * as ImageManipulator from "expo-image-manipulator";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<any>({});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<{
    nome?: string;
    fotoUrl?: string;
    uid?: string;
  }>({});

  // Listener para mudanças de autenticação
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  const fetchUserData = async () => {
    if (user?.uid) {
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserData({ ...userSnap.data(), uid: user.uid } as {
          nome?: string;
          fotoUrl?: string;
          uid?: string;
        });
      } else {
        setUserData({});
      }
    } else {
      setUserData({});
    }
  };

  // Busca dados do usuário sempre que o user mudar
  useEffect(() => {
    fetchUserData();
  }, [user]);

  //Função utilitário para envio de imagens para o serviço de Storage
  //urlDevice: qual imagem que está no device que deve ser enviada via upload
  async function sendImageToStorage(
    urlDevice: string,
    uid: string
  ): Promise<string | null> {
    try {
      //1. Redimensiona, compacta a imagem, e a transforma em blob
      //ImageManipulator.ImageManipulator.manipulate será o substituto de ImageManipulator.manipulateAsync
      const imageRedimencionada = await ImageManipulator.manipulateAsync(
        urlDevice,
        [{ resize: { width: 150, height: 150 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.PNG }
      );
      const data = await fetch(imageRedimencionada?.uri);
      const blob = await data.blob();

      //2. e prepara o path onde ela deve ser salva no storage
      const storageReference = ref(storage, `imagens/usuarios/${uid}/foto.png`);

      //3. Envia para o storage
      await uploadBytes(storageReference, blob);

      //4. Retorna a URL da imagem
      const url = await getDownloadURL(storageReference);
      return url;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  return (
    <UserContext.Provider
      value={{
        sendImageToStorage,
        userData,
        refreshUserData: fetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
