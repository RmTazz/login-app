import React from 'react';
import { View, Text, FlatList } from 'react-native';

const mockTickets = [
  {
    id: '1',
    origin: 'Mzuzu',
    destination: 'Lilongwe',
    date: '2025-07-20',
    busName: 'Sososo',
    seat: '12A',
  }

];

const Tickets = () => {
  return (
    <View className="flex-1 bg-white p-4">

      <FlatList
        data={mockTickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm bg-white">
            <Text className="text-lg font-semibold text-blue-600">{item.busName}</Text>
            <Text className="text-gray-700">From: {item.origin}</Text>
            <Text className="text-gray-700">To: {item.destination}</Text>
            <Text className="text-gray-500">Date: {new Date(item.date).toDateString()}</Text>
            <Text className="text-gray-800 font-semibold mt-1">Seat: {item.seat}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-10">No tickets booked yet.</Text>
        }
      />
    </View>
  );
};

export default Tickets;
