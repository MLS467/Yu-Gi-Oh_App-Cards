import { colors } from "@/constants/Colors";
import { UserContext } from "@/context/ScreenContext/userContext";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const Header = () => {
  const { userData } = useContext(UserContext);
  const navigation = useRouter();
  const navUser = () => {
    navigation.navigate(`/user/${userData?.uid || "defaultUserId"}`);
  };
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
      <TouchableOpacity
        onPress={navUser}
        activeOpacity={0.7}
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
        {userData && userData.fotoUrl ? (
          <Image
            source={{ uri: userData.fotoUrl }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
            resizeMode="cover"
          />
        ) : (
          <MaterialIcons name="person" size={28} color={colors.light[100]} />
        )}
      </TouchableOpacity>
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
    paddingHorizontal: 10,
    zIndex: 1000,
  },
});

export default Header;
