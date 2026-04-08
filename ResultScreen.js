import { View, Text } from "react-native";
import colors from "../styles/colors";

export default function ResultScreen() {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>

      <Text style={{ color: "white", fontSize: 22 }}>
        Ihr Ergebnis
      </Text>

      <Text style={{ color: colors.gold, fontSize: 30, marginTop: 20 }}>
        980€ / Monat
      </Text>

      <Text style={{ color: colors.secondary, marginTop: 10 }}>
        Sehr gute Datenlage – hohe Wahrscheinlichkeit
      </Text>

    </View>
  );
}