import * as React from 'react';
import { Button, View, Text, Settings } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./pages/account/login"
import Profile from "./pages/personal/profile"
import Chat from "./pages/currentTask/tabs/message/chat"
import Setting from "./pages/personal/setting"

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Chat">
        <Stack.Screen name="Demo" component={Demo} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
