import { View, Text, TouchableOpacity } from "react-native";
import colors from "../styles/colors";

export default function InputScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>

      <Text style={{ color: "white", fontSize: 20, marginBottom: 20 }}>
        Eingaben
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Result")}
        style={{
          backgroundColor: colors.gold,
          padding: 16,
          borderRadius: 12
        }}
      >
        <Text style={{ textAlign: "center" }}>Weiter</Text>
      </TouchableOpacity>

    </View>
  );
}