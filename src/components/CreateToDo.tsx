import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  JosefinSans_400Regular,
  JosefinSans_700Bold,
  useFonts,
} from "@expo-google-fonts/josefin-sans";
import Ionicons from "@expo/vector-icons/Ionicons";
interface CreateToDoProps {
  text: string;
  onChange: (e: string) => void;
  onPress: () => void;
}

export default function CreateToDo({
  text,
  onChange,
  onPress,
}: CreateToDoProps) {
  useFonts({
    JosefinSans_700Bold,
    JosefinSans_400Regular,
  });

  return (
    <View className="flex flex-row items-center bg-white px-5 py-3 rounded-md justify-between mb-5 shadow-lg">
      <TextInput
        value={text}
        className="font-body w-[85%]"
        placeholder="Create a new todo..."
        placeholderTextColor="#94a3b8"
        onChangeText={(e) => onChange(e)}
      />
      <LinearGradient colors={["#a855f7", "#6366f1"]} className="rounded-full">
        <Pressable
          onPress={onPress}
          className=" w-8 h-8 flex flex-row justify-center px-1 py-[6px]"
        >
          <Ionicons name="add-outline" size={20} color="#f8fafc" />
        </Pressable>
      </LinearGradient>
    </View>
  );
}
