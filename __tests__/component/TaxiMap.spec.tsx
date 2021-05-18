import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import TaxiMap from 'ui/components/TaxiMap';
import {Taxi} from 'infra/types/Taxi';
import {Region} from 'react-native-maps';

describe('<TaxiMap />', () => {
  let mockTaxis: Taxi[];
  let mockRegion: Region;
  beforeAll(() => {
    mockTaxis = [
      {id: 1, latitude: Math.random(), longitude: Math.random(), nome: 'Taxi'},
      {id: 2, latitude: Math.random(), longitude: Math.random(), nome: 'Taxi'},
      {id: 3, latitude: Math.random(), longitude: Math.random(), nome: 'Taxi'},
    ];
    mockRegion = {
      latitude: Math.random(),
      longitude: Math.random(),
      latitudeDelta: Math.random(),
      longitudeDelta: Math.random(),
    };
  });

  it('O componente renderiza corretamente', async () => {
    render(
      <TaxiMap
        taxis={mockTaxis}
        mapRegion={mockRegion}
        onPressMarker={() => null}
      />,
    );
  });

  it('O componente renderiza marcadores', async () => {
    const {queryAllByTestId} = render(
      <TaxiMap
        taxis={mockTaxis}
        mapRegion={mockRegion}
        onPressMarker={() => null}
      />,
    );
    const markers = queryAllByTestId('map-taxi-marker');
    expect(markers).toHaveLength(3);
  });

  it('Quando pressiona um marcador, deve chamar a callback passando um taxi como input', async () => {
    const mockOnPressMarker = jest.fn();
    const {queryAllByTestId} = render(
      <TaxiMap
        taxis={mockTaxis}
        mapRegion={mockRegion}
        onPressMarker={mockOnPressMarker}
      />,
    );
    const markers = queryAllByTestId('map-taxi-marker');
    const marker = markers[0];
    fireEvent(marker, 'press');
    expect(mockOnPressMarker).toHaveBeenCalledWith(mockTaxis[0]);
  });
});
