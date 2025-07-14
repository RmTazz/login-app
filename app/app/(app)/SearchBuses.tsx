import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const mockBuses = [
  { id: '1', name: 'Sososo', time: '07:00 AM', price: 50000 ,route: 'zalewa'},
  
];

const SearchBuses = () => {
  const { origin, destination, date } = useLocalSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBuses, setFilteredBuses] = useState(mockBuses);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBuses(mockBuses);
    } else {
      const lower = searchQuery.toLowerCase();
      setFilteredBuses(
        mockBuses.filter((bus) => bus.name.toLowerCase().includes(lower))
      );
    }
  }, [searchQuery]);

  const handleSelect = (busId: string) => {
    router.push({
      pathname: '/SelectSeats',
      params: {
        busId,
        origin,
        destination,
        date,
      },
    });
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-2">
        Buses
      </Text>
     
      <TextInput
        placeholder="Search by bus name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        className="border border-gray-300 rounded-md px-4 py-2 mb-4"
      />

      <FlatList
        data={filteredBuses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="border border-gray-200 rounded-md p-4 mb-3 shadow-sm bg-white"
            onPress={() => handleSelect(item.id)}
          >
            <Text className="text-lg font-semibold">{item.name}</Text>
            <Text className="text-gray-600">Departure: {item.time}</Text>
            <Text className="text-gray-600">Route: {item.route}</Text>
            <Text className="text-blue-600 font-bold mt-1">Mkw {item.price}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-10">No buses found</Text>
        }
      />
    </View>
  );
};

export default SearchBuses;
