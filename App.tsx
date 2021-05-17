/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import theme from 'infra/theme';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import Screens from 'ui/screens';

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView>
        <Screens />
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;
