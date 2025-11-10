import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getFeaturedProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Property } from "@/lib/models";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: featuredProperties, loading: featuredPropertiesLoading } =
    useAppwrite({
      fn: getFeaturedProperties,
    });

  const {
    data: properties,
    loading: propertiesLoading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query, refetch]);

  return (
    <SafeAreaView className='bg-white h-full'>
      {/* <Button
        title='Seed'
        onPress={seed}
      /> */}
      <FlatList
        data={properties}
        renderItem={({ item }) => {
          return (
            <Card
              item={item as unknown as Property}
              onPress={() => handleCardPress(item.$id)}
            />
          );
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName='pb-32'
        columnWrapperClassName='flex gap-5 px-5'
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<NoResults />}
        ListHeaderComponent={() => (
          <View className='px-5'>
            <View className='flex flex-row items-center justify-between mt-5'>
              <View className='flex flex-row'>
                <Image
                  source={{ uri: user?.avatar }}
                  className='size-12 rounded-full'
                />
                <View className='flex flex-col items-start ml-2 justify-center'>
                  <Text className='text-xs font-rubik text-black-100'>
                    Good Morning
                  </Text>
                  <Text className='text-base font-rubik-medium text-black-300'>
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image
                source={icons.bell}
                className='size-6'
              />
            </View>
            <Search />
            <View className='my-5'>
              <View className='flex flex-row items-center justify-between'>
                <Text className='text-xl font-rubik-bold text-black-300'>
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className='text-base font-rubik-bold text-primary-300'>
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              {!featuredProperties || featuredProperties.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  data={featuredProperties}
                  renderItem={({ item }) => (
                    <FeaturedCard
                      item={item as unknown as Property}
                      onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName='flex gap-5 mt-5'
                />
              )}
            </View>

            <View className='my-5'>
              <View className='flex flex-row items-center justify-between'>
                <Text className='text-xl font-rubik-bold text-black-300'>
                  Our Recommendations
                </Text>
                <TouchableOpacity>
                  <Text className='text-base font-rubik-bold text-primary-300'>
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              <Filters />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
