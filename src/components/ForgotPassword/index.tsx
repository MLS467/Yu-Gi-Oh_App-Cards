import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";

interface ForgotPasswordModalProps {
  visible: boolean;
  onClose: () => void;
  sendEmail: (email: string) => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  visible,
  onClose,
  sendEmail,
}) => {
  const [email, setEmail] = useState("");

  const handleSend = () => {
    sendEmail(email);
    setEmail("");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text>×</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Recuperar Senha</Text>
          <Text style={styles.subtitle}>
            Digite seu email e enviaremos instruções para redefinir sua senha.
          </Text>

          <Text style={styles.emailLabel}>Email</Text>
          <View style={styles.emailInputWrapper}>
            <Text style={styles.emailIcon}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="#ffd600"
                style={styles.emailIcon}
              />
            </Text>
            <TextInput
              style={styles.emailInput}
              placeholder="Digite seu email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ForgotPasswordModal;
