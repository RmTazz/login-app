import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ActionCard  from '../../../components/core/ActionCard';
import RouteCard from '../../../components/core/RouteCard';
import TripCard from '../../../components/core/TripCard';
import { router } from 'expo-router';
import AppLoyOut from '../_layout';

const BusReservationSystem = () => {
  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar style="dark" />
      
   
      <View className="bg-blue-600 p-4">
        <Text className="text-white text-2xl font-bold mt-4">Welcome</Text>
      </View>


      <ScrollView className="mt-4 px-4">

        <View className="mb-6">
          <Text className="text-xl font-bold mb-4">Quick Actions</Text>
          <View className="flex-row flex-wrap justify-between">

            <ActionCard 
              title="Book a bus" 
              desc="Find and book your next bus journey" 
              icon="🚌"
              onPress={() => router.push('../SearchBuses')}
            />
            <ActionCard 
              title="My Tickets" 
              desc="View your upcoming and past trips" 
              icon="🎫"
              onPress={()=>router.push('/tickets')}
            />
            <ActionCard 
              title="Announcement" 
              desc="Check for updates and alerts" 
              icon="🧰"
              onPress={()=>router.push('/Announcements')}
            />
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-xl font-bold mb-4">Recent Bookings</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <RouteCard 
              from="Lilongwe" 
              to="Mzuzu" 
              price="mkw 50000" 
              duration='5hr'
            />
           
          </ScrollView>
        </View>

      </ScrollView>
    </View>
  );
};

export default BusReservationSystem;