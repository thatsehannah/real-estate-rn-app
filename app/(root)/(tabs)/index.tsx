import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Text className='font-bold my-10 text-blue-400 font-rubik text-3xl'>
        Welcome to ReState
      </Text>
    </View>
  );
}
