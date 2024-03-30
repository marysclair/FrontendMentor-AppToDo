import { View, Text, Pressable } from "react-native";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import { Modes, ToDoType } from "../screens/Home";
import {
  JosefinSans_400Regular,
  JosefinSans_700Bold,
  useFonts,
} from "@expo-google-fonts/josefin-sans";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ToDoProps extends ToDoType {
  updateCheck: (id: string) => void;
  deleteToDo: (id: string) => void;
  currentMode: Modes;
}

export function ToDo({
  id,
  checked,
  title,
  updateCheck,
  deleteToDo,
  currentMode,
}: ToDoProps) {
  useFonts({
    JosefinSans_700Bold,
    JosefinSans_400Regular,
  });
  const [isChecked, setChecked] = useState(checked);
  const handleCheck = (newValue: boolean) => {
    setChecked(newValue);
    updateCheck(id);
  };
  useEffect(() => {
    setChecked(checked);
  }, [checked]);
  return (
    <View
      className={`rounded-md py-4 px-5 flex flex-row items-center border-b last:border-0  ${
        currentMode === Modes.Light
          ? "bg-white border-slate-200"
          : "bg-slate-700 border-slate-600"
      }`}
    >
      <Checkbox
        className="rounded-full"
        value={isChecked}
        onValueChange={handleCheck}
        color={isChecked ? "#6366f1" : undefined}
      />
      <Text
        className={`font-body ml-2 w-[82%]  ${
          !isChecked
            ? currentMode === Modes.Light
              ? "text-slate-500"
              : "text-slate-400"
            : currentMode === Modes.Light
            ? "text-indigo-300 line-through"
            : "text-slate-500 line-through"
        }`}
      >
        {title}
      </Text>
      <Pressable className="ml-auto" onPress={() => deleteToDo(id)}>
        <Text className="text-slate-400 font-body">
          <Ionicons
            name="close-outline"
            size={20}
            color={currentMode === Modes.Light ? "#94a3b8" : "#475569"}
          />
        </Text>
      </Pressable>
    </View>
  );
}
