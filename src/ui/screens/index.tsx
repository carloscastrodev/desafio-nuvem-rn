import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Mapa from './Mapa';
import Notificacoes from './Notificacoes';
import routes from 'infra/enums/routes';

const Stack = createStackNavigator();

export default function Screens() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Mapa">
        <Stack.Screen
          name={routes.mapas}
          component={Mapa}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={routes.notificacoes}
          component={Notificacoes}
          options={{
            title: 'Ranking',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
