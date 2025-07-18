import { colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Image, StyleSheet, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View>
        <DrawerToggleButton tintColor={colors.light[100]} />
      </View>
      <View>
        <Image
          source={require("@/assets/millennium-history-clipart-yugioh-millenium-puzzle.png")}
          style={{ width: 40, height: 40, backgroundColor: colors.dark[700] }}
          resizeMode="cover"
        />
      </View>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "#eee",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Troque require pela sua imagem de perfil, se tiver */}
        <MaterialIcons name="person" size={28} color={colors.light[100]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.dark[700],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderYU[100],
    paddingHorizontal: 10, // evita encostar nas bordas
    zIndex: 1000, // para ficar acima dos outros
  },
});

export default Header;
