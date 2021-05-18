import 'react-native';
import React from 'react';
import Mapa from 'ui/screens/Mapa';
import {act, fireEvent, render} from '@testing-library/react-native';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

const mockData = [
  {
    id: 1,
    nome: 'Taxi',
    latitude: 1,
    longitude: 1,
    kmRodado: 0,
    limiteKm: 100,
    precoKm: 0.5,
  },
  {
    id: 2,
    nome: 'Taxi',
    latitude: 1,
    longitude: 1,
    kmRodado: 0,
    limiteKm: 100,
    precoKm: 0.5,
  },
  {
    id: 3,
    nome: 'Taxi',
    latitude: 1,
    longitude: 1,
    kmRodado: 0,
    limiteKm: 100,
    precoKm: 0.5,
  },
];

jest.mock(
  'infra/hooks/useTaxis',
  () =>
    function useTaxis() {
      return {
        handleRefresh: () => null,
        data: mockData,
      };
    },
);

describe('<Mapa />', () => {
  it('A tela renderiza corretamente.', async () => {
    const {findByTestId, findAllByTestId} = render(<Mapa />);
    await act(async () => expect(await findByTestId('taxi-map')).toBeTruthy());
    await act(
      async () => expect(await findAllByTestId('map-taxi-marker')).toBeDefined,
    );
  });

  it('Ao pressionar um marcador no mapa, o modal de detalhes deve ficar visível', async () => {
    const {queryAllByTestId, findByTestId, findAllByTestId} = render(<Mapa />);
    await act(
      async () => expect(await findAllByTestId('map-taxi-marker')).toBeDefined,
    );
    const markers = queryAllByTestId('map-taxi-marker');
    const marker = markers[0];
    fireEvent(marker, 'press');
    await act(async () =>
      expect(await findByTestId('taxi-detail-modal')).toBeDefined(),
    );
    expect(
      (await findByTestId('taxi-detail-modal')).props.visible,
    ).toBeTruthy();
  });
});
