/* eslint-disable no-undef */
jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-maps', () => {
  const {View} = require('react-native');
  const React = require('react');
  class MockMapView extends React.Component {
    render() {
      return <View>{this.props.children}</View>;
    }
  }
  class MockMarker extends React.Component {
    render() {
      return <View>{this.props.children}</View>;
    }
  }
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
  };
});
