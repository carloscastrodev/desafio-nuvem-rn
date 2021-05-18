/* eslint-disable no-undef */
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-native-async-storage/async-storage', () => {
  const mockAsyncStorage = require('@react-native-async-storage/async-storage/jest/async-storage-mock');
  return mockAsyncStorage;
});

jest.mock('react-native-maps', () => {
  const {View} = require('react-native');
  const React = require('react');
  class MockMapView extends React.Component {
    render() {
      return <View {...this.props}>{this.props.children}</View>;
    }
  }
  class MockMarker extends React.Component {
    render() {
      return <View {...this.props}>{this.props.children}</View>;
    }
  }
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
  };
});
