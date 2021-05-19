import 'react-native';
import React from 'react';
import Notificacoes from 'ui/screens/Notificacoes';
import {render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Taxi} from 'infra/types/Taxi';

describe('<Notificacoes />', () => {
  const taxisWithNotification: Taxi[] = [
    {
      id: 1,
      latitude: 0,
      longitude: 0,
      nome: 'Taxi',
      kmRodado: 400,
      limiteKm: 400,
      precoKm: 2.03,
    },
    {
      id: 2,
      latitude: 0,
      longitude: 0,
      nome: 'Taxi',
      kmRodado: 301,
      limiteKm: 600,
      precoKm: 4.02,
    },
    {
      id: 3,
      latitude: 0,
      longitude: 0,
      nome: 'Taxi',
      kmRodado: 501,
      limiteKm: 600,
      precoKm: 2.02,
    },
  ];
  const taxisWithoutNotification: Taxi[] = [
    {
      id: 4,
      latitude: 0,
      longitude: 0,
      nome: 'Taxi',
      kmRodado: 300,
      limiteKm: 450,
      precoKm: 1.02,
    },
    {
      id: 5,
      latitude: 0,
      longitude: 0,
      nome: 'Taxi',
      kmRodado: 649.9,
      limiteKm: 650,
      precoKm: 1.02,
    },
    {
      id: 6,
      latitude: 0,
      longitude: 0,
      nome: 'Taxi',
      kmRodado: 0,
      limiteKm: 450,
      precoKm: 1.02,
    },
  ];
  const mockData: Taxi[] = taxisWithNotification.concat(
    taxisWithoutNotification,
  );

  beforeAll(async () => {
    await AsyncStorage.setItem('@taxis', JSON.stringify(mockData));
  });

  it('A tela renderiza corretamente.', async () => {
    const {findAllByTestId} = render(<Notificacoes />);
    const cards = await findAllByTestId('notification-card');
    expect(cards).toHaveLength(taxisWithNotification.length);
  });

  it('A lista de notificações está em ordem decrescente de faturamento.', async () => {
    const {findAllByTestId} = render(<Notificacoes />);
    const earnings = await findAllByTestId('taxi-earning');
    expect(earnings).toHaveLength(taxisWithNotification.length);
    const earningStrings = earnings.map(
      earning => earning.children[0] as string,
    );

    const earningParsedStrings = earningStrings.map(earning =>
      earning.replace('R$', '').replace(',', ''),
    );

    const earningAmmounts = earningParsedStrings.map(Number.parseFloat);

    earningAmmounts.reduce((curr, next) => {
      expect(curr).toBeGreaterThanOrEqual(next);
      return next;
    });
  });
});
