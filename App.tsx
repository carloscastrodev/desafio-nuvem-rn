import theme from 'infra/theme';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import Screens from 'ui/screens';

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Screens />
    </PaperProvider>
  );
};

export default App;
