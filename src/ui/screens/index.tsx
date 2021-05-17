import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Mapa from './Mapa';
import Notificacoes from './Notificacoes';

const Stack = createStackNavigator();

export default function Screens() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Mapa">
        <Stack.Screen name="Mapa" component={Mapa} />
        <Stack.Screen name="Notificacoes" component={Notificacoes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
