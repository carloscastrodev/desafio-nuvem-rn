/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('<App />', () => {
  it('O componente renderiza corretamente.', () => {
    renderer.create(<App />);
  });
});
