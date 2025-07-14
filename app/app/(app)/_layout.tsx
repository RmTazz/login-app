import { Stack,  } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';


const AppLoyOut = () => {


    return(
     <SafeAreaProvider>
       <Stack>
           <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
           <Stack.Screen name="BookBus" options={{headerTitle: "Book Bus"}}/>
           <Stack.Screen name="SearchBuses" options={{headerTitle: "Search buses" }}/>
           <Stack.Screen name="Announcements" options={{headerTitle: "Announcements"}}/>
           <Stack.Screen name="tickets" options={{headerTitle: "Tickets"}}/>
           <Stack.Screen name="SelectSeats" options={{headerTitle: "Select Seats"}}/>
       </Stack>
       </SafeAreaProvider>
    );
}

export default AppLoyOut