import { useEffect, useRef, useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

import DraggableFlatList, {
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
  useOnCellActiveAnimation,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import {
  GestureHandlerGestureEvent,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import uuid from "react-native-uuid";

import {
  JosefinSans_400Regular,
  JosefinSans_700Bold,
  useFonts,
} from "@expo-google-fonts/josefin-sans";

import CreateToDo from "../components/CreateToDo";
import { ToDo } from "../components/ToDo";

import Ionicons from "@expo/vector-icons/Ionicons";

export interface ToDoType {
  id: string;
  title: string;
  checked: boolean;
}

enum ToDoStatus {
  All,
  Active,
  Completed,
}

export enum Modes {
  Light,
  Dark,
}

export default function Home() {
  useFonts({
    JosefinSans_700Bold,
    JosefinSans_400Regular,
  });

  const toDoListExample = [
    { id: "1", title: "Sleep for a long time", checked: false },
    { id: "2", title: "Start new project", checked: false },
    {
      id: "3",
      title: "Bake all the most delicious cakes in the world",
      checked: false,
    },
    { id: "4", title: "Kiss and hug my cat", checked: false },
    { id: "5", title: "Buy new plants", checked: false },
  ];

  const [toDoText, setToDoText] = useState<string>("");
  const [toDoList, setToDoList] = useState<ToDoType[]>(toDoListExample);
  const [toDoChecked, setToDoChecked] = useState(toDoList.length);
  const [toDoFilter, setToDoFilter] = useState(ToDoStatus.All);
  const [toDoListBackup, setToDoListBackup] = useState<ToDoType[]>(toDoList);
  const [currentMode, setCurrentMode] = useState<Modes>(Modes.Light);

  const ref = useRef(null);

  useEffect(() => {
    const completedCount = toDoListBackup.filter((obj) => obj.checked).length;
    setToDoChecked(toDoListBackup.length - completedCount);
  }, [toDoList, toDoFilter]);

  function handleCreateToDo() {
    if (toDoText && toDoText.length !== 0) {
      const toDoObj = {
        id: uuid.v4() as string,
        title: toDoText,
        checked: false,
      };

      setToDoList([...toDoList, toDoObj]);
      setToDoListBackup([...toDoList, toDoObj]);
      setToDoText("");
    }
  }

  function handleToUpdateCheck(id: string) {
    const updatedToDoList = toDoList.map((obj) => {
      if (obj.id === id) {
        return { ...obj, checked: !obj.checked };
      }
      return obj;
    });

    setToDoList(updatedToDoList);
    setToDoListBackup(updatedToDoList);
  }

  function clearAllTheCheckbox() {
    const updatedToDoList = toDoList.map((obj) => {
      if (obj.checked) {
        return { ...obj, checked: false };
      }
      return obj;
    });

    setToDoList(updatedToDoList);
    setToDoListBackup(updatedToDoList);
  }

  function updateToDoStatus(type: ToDoStatus) {
    setToDoFilter(type);
    if (type === ToDoStatus.Active) {
      const filtered = toDoListBackup.filter((obj) => !obj.checked);
      setToDoList(filtered);
    } else if (type === ToDoStatus.Completed) {
      const filtered = toDoListBackup.filter((obj) => obj.checked);
      setToDoList(filtered);
    } else {
      setToDoList(toDoListBackup);
    }
  }

  function deleteToDo(id: string) {
    const updatedToDoList = toDoList.filter((obj) => {
      if (obj.id !== id) {
        return obj;
      }
    });

    setToDoList(updatedToDoList);
    setToDoListBackup(updatedToDoList);
  }

  const renderItem = ({ item, drag }: RenderItemParams<ToDoType>) => {
    return (
      <ScaleDecorator>
        <OpacityDecorator activeOpacity={0.5}>
          <ShadowDecorator>
            <TouchableOpacity activeOpacity={1.0} onLongPress={drag}>
              <ToDo
                currentMode={currentMode}
                key={item.id}
                id={item.id}
                title={item.title}
                checked={item.checked}
                updateCheck={handleToUpdateCheck}
                deleteToDo={deleteToDo}
              />
            </TouchableOpacity>
          </ShadowDecorator>
        </OpacityDecorator>
      </ScaleDecorator>
    );
  };

  return (
    <View
      className={`flex-1 h-screen ${
        currentMode === Modes.Light ? "bg-gray-200" : "bg-gray-950"
      }`}
    >
      <Image
        source={
          currentMode === Modes.Light
            ? require("../images/bg-mobile-light.jpg")
            : require("../images/bg-mobile-dark.jpg")
        }
        width={500}
        height={400}
        className="w-full h-[28vh] absolute"
      />
      <View className="px-6 py-12 font-body">
        <View className="flex flex-row items-center mb-6 justify-between">
          <Text className="text-3xl tracking-widest text-white  font-title">
            TODO
          </Text>
          {currentMode === Modes.Light ? (
            <Pressable onPress={() => setCurrentMode(Modes.Dark)}>
              <Ionicons name="moon" size={20} color="white" />
            </Pressable>
          ) : (
            <Pressable onPress={() => setCurrentMode(Modes.Light)}>
              <Ionicons name="sunny" size={20} color="white" />
            </Pressable>
          )}
        </View>
        <CreateToDo
          currentMode={currentMode}
          text={toDoText}
          onChange={setToDoText}
          onPress={handleCreateToDo}
        />
        <View
          className={`rounded-md shadow-lg ${
            currentMode === Modes.Light ? "bg-white" : "bg-gray-800"
          }`}
        >
          <GestureHandlerRootView>
            <DraggableFlatList
              data={toDoList}
              ref={ref}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              onDragEnd={({ data }) => {
                setToDoList(data);
                setToDoListBackup(data);
              }}
            />
          </GestureHandlerRootView>
          <View className="flex flex-row items-center justify-between px-5 py-4">
            <Text
              className={`font-body ${
                currentMode === Modes.Light
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              {toDoChecked} items left
            </Text>
            <Pressable onPress={() => clearAllTheCheckbox()}>
              <Text
                className={`font-body ${
                  currentMode === Modes.Light
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                Clear completed
              </Text>
            </Pressable>
          </View>
        </View>
        <View
          className={`flex flex-row items-center justify-center space-x-4 py-4 mt-4 rounded-md shadow-2xl ${
            currentMode === Modes.Light ? "bg-white" : "bg-gray-800"
          }`}
        >
          <Pressable onPress={() => updateToDoStatus(ToDoStatus.All)}>
            <Text
              className={`font-title ${
                toDoFilter === ToDoStatus.All
                  ? "text-cyan-600"
                  : currentMode === Modes.Light
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              All
            </Text>
          </Pressable>
          <Pressable onPress={() => updateToDoStatus(ToDoStatus.Active)}>
            <Text
              className={`font-title ${
                toDoFilter === ToDoStatus.Active
                  ? "text-cyan-500"
                  : currentMode === Modes.Light
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              Active
            </Text>
          </Pressable>
          <Pressable onPress={() => updateToDoStatus(ToDoStatus.Completed)}>
            <Text
              className={`font-title ${
                toDoFilter === ToDoStatus.Completed
                  ? "text-cyan-500"
                  : currentMode === Modes.Light
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              Completed
            </Text>
          </Pressable>
        </View>
        <Text
          className={`text-center font-body my-8 ${
            currentMode === Modes.Light ? "text-slate-400" : "text-slate-600"
          }`}
        >
          Drag and drop to reorder list
        </Text>
      </View>
    </View>
  );
}
