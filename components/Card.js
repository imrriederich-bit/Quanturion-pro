import { View, Text } from "react-native";
import colors from "../styles/colors";

export default function Card({ title, value }) {
  return (
    <View style={{
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 14,
      marginBottom: 12
    }}>
      <Text style={{ color: colors.secondary }}>{title}</Text>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: "bold" }}>
        {value}
      </Text>
    </View>
  );
}
