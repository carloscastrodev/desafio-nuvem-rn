import 'react-native';
import React from 'react';
import Mapa from 'ui/screens/Mapa';
import {act, fireEvent, render} from '@testing-library/react-native';
import constants from 'infra/enums/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
    useIsFocused: () => true,
  };
});

describe('<Mapa />', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('A tela renderiza corretamente.', async () => {
    const {findByTestId, findAllByTestId} = render(<Mapa />);
    await act(async () => expect(await findByTestId('taxi-map')).toBeTruthy());
    await act(
      async () => expect(await findAllByTestId('map-taxi-marker')).toBeDefined,
    );
  });

  it('Ao pressionar um marcador no mapa, o modal de detalhes deve ficar visível.', async () => {
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
      (await findByTestId('taxi-detail-modal')).props.isVisible,
    ).toBeTruthy();
  });

  it('O marcador deve ser removido do mapa quando o faturamento for maior que o limiar.', async () => {
    const earningLimit = constants.JOURNEY_EARNING_LIMIT;
    const Component = <Mapa />;
    const {queryAllByTestId, findByTestId, findAllByTestId} = render(Component);
    await act(async () =>
      expect(await findAllByTestId('map-taxi-marker')).toBeDefined(),
    );
    const markers = queryAllByTestId('map-taxi-marker');
    const marker = markers[0];
    fireEvent.press(marker);

    await findByTestId('taxi-detail-modal');
    const priceOnScreen = await findByTestId('price-km');
    const priceString = priceOnScreen.children[0] as string;
    const parsePriceString = priceString.replace('R$', '').replace(',', '');
    const price = Number.parseFloat(parsePriceString);
    const input = await findByTestId('input-km');
    fireEvent.changeText(input, `${Math.ceil(earningLimit / price)}`);

    await act(async () =>
      expect((await findByTestId('total-price')).children).not.toEqual('R$0'),
    );

    const submitButton = await findByTestId('submit-button');
    fireEvent.press(submitButton);

    await act(async () =>
      expect(await findAllByTestId('map-taxi-marker')).toHaveLength(
        markers.length - 1,
      ),
    );
  });

  it('O marcador deve ser removido do mapa quando o taxi viajar o limite.', async () => {
    const Component = <Mapa />;
    const {queryAllByTestId, findByTestId, findAllByTestId} = render(Component);
    await act(async () =>
      expect(await findAllByTestId('map-taxi-marker')).toBeDefined(),
    );
    const markers = queryAllByTestId('map-taxi-marker');
    const marker = markers[0];
    fireEvent.press(marker);

    await findByTestId('taxi-detail-modal');
    const limitOnScreen = await findByTestId('remaining-km');
    const limitString = limitOnScreen.children[0] as string;
    const parseLimitString = limitString.replace(' KM', '');
    const limit = Number.parseFloat(parseLimitString);
    const input = await findByTestId('input-km');
    fireEvent.changeText(input, `${limit}`);

    await act(async () =>
      expect((await findByTestId('total-price')).children).not.toEqual('R$0'),
    );

    const submitButton = await findByTestId('submit-button');
    fireEvent.press(submitButton);

    await act(async () =>
      expect(await findAllByTestId('map-taxi-marker')).toHaveLength(
        markers.length - 1,
      ),
    );
  });

  it('Deve contar uma notificação quando um marcador for removido do mapa.', async () => {
    const Component = <Mapa />;
    const {queryAllByTestId, findByTestId, findAllByTestId} = render(Component);
    await act(async () =>
      expect(await findAllByTestId('map-taxi-marker')).toBeDefined(),
    );
    const markers = queryAllByTestId('map-taxi-marker');
    const marker = markers[0];
    fireEvent.press(marker);

    await findByTestId('taxi-detail-modal');
    const limitOnScreen = await findByTestId('remaining-km');
    const limitString = limitOnScreen.children[0] as string;
    const parseLimitString = limitString.replace(' KM', '');
    const limit = Number.parseFloat(parseLimitString);
    const input = await findByTestId('input-km');
    fireEvent.changeText(input, `${limit}`);

    await act(async () =>
      expect((await findByTestId('total-price')).children).not.toEqual('R$0'),
    );

    const submitButton = await findByTestId('submit-button');
    fireEvent.press(submitButton);

    await act(async () =>
      expect(await findAllByTestId('map-taxi-marker')).toHaveLength(
        markers.length - 1,
      ),
    );

    await act(async () =>
      expect(await findByTestId('notification-count')).toBeDefined(),
    );

    const notificationCount = await findByTestId('notification-count');
    const notificationCountString = notificationCount.children[0];
    expect(notificationCountString).toEqual('1');
  });
});
