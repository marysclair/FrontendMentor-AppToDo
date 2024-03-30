import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  JosefinSans_400Regular,
  JosefinSans_700Bold,
  useFonts,
} from "@expo-google-fonts/josefin-sans";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Modes } from "../screens/Home";
interface CreateToDoProps {
  text: string;
  onChange: (e: string) => void;
  onPress: () => void;
  currentMode: Modes;
}

export default function CreateToDo({
  text,
  onChange,
  onPress,
  currentMode,
}: CreateToDoProps) {
  useFonts({
    JosefinSans_700Bold,
    JosefinSans_400Regular,
  });

  return (
    <View
      className={`flex flex-row items-center px-5 py-3 rounded-md justify-between mb-5 shadow-lg ${
        currentMode === Modes.Light ? "bg-white" : "bg-gray-800"
      }`}
    >
      <TextInput
        value={text}
        className={`w-[85%] font-body ${
          currentMode === Modes.Light ? "text-slate-500" : "text-slate-400"
        }`}
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
