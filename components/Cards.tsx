import icons from "@/constants/icons";
import images from "@/constants/images";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface CardProps {
  onPress?: () => void;
}

export const FeaturedCard = ({ onPress }: CardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='flex flex-col items-start w-60 h-80 relative'
    >
      <Image
        source={images.japan}
        className='size-full rounded-2xl'
      />
      <Image
        source={images.cardGradient}
        className='size-full rounded-2xl absolute bottom-0'
      />
      <View className='flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5'>
        <Image
          source={icons.star}
          className='size-3.5'
        />
        <Text className='text-xs font-rubik-bold text-primary-300 ml-1'>
          4.4
        </Text>
      </View>
      <View className='flex flex-col items-start absolute bottom-5 inset-x-5'>
        <Text
          className='text-xl font-rubik-extra-bold text-white'
          numberOfLines={1}
        >
          Modern Apartment
        </Text>
        <Text className='text-base font-rubik text-white'>Atlanta, GA</Text>
        <View className='flex flex-row items-center justify-between w-full mt-2'>
          <Text className='font-rubik-extra-bold text-white text-xl'>
            $22452
          </Text>
          <Image
            source={icons.heart}
            className='size-5'
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = () => {
  return (
    <View>
      <Text>Regular Card</Text>
    </View>
  );
};
