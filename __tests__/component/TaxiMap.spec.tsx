import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
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
    render(<TaxiMap taxis={mockTaxis} mapRegion={mockRegion} />);
  });
});
