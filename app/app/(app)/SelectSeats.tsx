import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';


const seatMap = [
  { id: '1A', booked: false },
  { id: '1B', booked: true },
  { id: '1C', booked: false },
  { id: '1D', booked: false },
  { id: '2A', booked: false },
  { id: '2B', booked: false },
  { id: '2C', booked: false },
  { id: '2D', booked: true },
  { id: '3A', booked: false },
  { id: '3B', booked: false },
  { id: '3C', booked: false },
  { id: '3D', booked: false },
];

const BusSeatSelectionScreen = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatPress = (seatId: string, booked: boolean) => {
    if (booked) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleConfirm = () => {
    Alert.alert('Seats Selected', selectedSeats.join(', '));
    router.push('/(app)/Payment');
  };

  const renderSeat = ({ item }: { item: { id: string; booked: boolean } }) => {
    const isSelected = selectedSeats.includes(item.id);
    let seatClasses = 'w-14 h-14 m-2 rounded items-center justify-center';

    if (item.booked) {
      seatClasses += ' bg-gray-400';
    } else if (isSelected) {
      seatClasses += ' bg-orange-500';
    } else {
      seatClasses += ' bg-green-500';
    }

    return (
      <TouchableOpacity
        disabled={item.booked}
        className={seatClasses}
        onPress={() => handleSeatPress(item.id, item.booked)}
      >
        <Text className="text-white font-bold">{item.id}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-center mb-4">Select Your Seat</Text>

      <FlatList
        data={seatMap}
        keyExtractor={(item) => item.id}
        numColumns={4}
        renderItem={renderSeat}
        contentContainerStyle={{ alignItems: 'center' }}
      />

      <TouchableOpacity
        onPress={handleConfirm}
        className="bg-blue-600 mt-6 p-4 rounded-lg items-center"
      >
        <Text className="text-white font-semibold text-base">Confirm Selection</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BusSeatSelectionScreen;
