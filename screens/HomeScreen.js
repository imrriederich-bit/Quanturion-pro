import { View, Text, TouchableOpacity } from "react-native";
import Card from "../components/Card";
import colors from "../styles/colors";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>

      <Text style={{ color: colors.text, fontSize: 22, marginBottom: 20 }}>
        Hallo 👋
      </Text>

      <Card title="Gesamtes Sparpotenzial" value="2.450€ / Monat" />
      <Card title="Steuer" value="980€" />
      <Card title="Hypothek" value="1.200€" />
      <Card title="Versicherung" value="100€" />

      <TouchableOpacity
        onPress={() => navigation.navigate("Input")}
        style={{
          backgroundColor: colors.gold,
          padding: 16,
          borderRadius: 12,
          marginTop: 20
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          Analyse starten
        </Text>
      </TouchableOpacity>

    </View>
  );
}
