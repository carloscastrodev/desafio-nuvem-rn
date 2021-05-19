import 'react-native';
import React from 'react';
import TaxiDetail from 'ui/components/TaxiDetail';
import {act, fireEvent, render} from '@testing-library/react-native';
import {Taxi} from 'infra/types/Taxi';
import 'number-to-locale-string-polyfill';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR.js';
import {Alert} from 'react-native';

describe('<TaxiDetail />', () => {
  let mockData: Taxi;
  let onSubmit: () => void;
  beforeEach(() => {
    mockData = {
      id: 1,
      nome: 'Taxi',
      latitude: 1,
      longitude: 1,
      kmRodado: 0,
      limiteKm: 1000,
      precoKm: 2.5,
    };
    onSubmit = jest.fn();
  });

  it('A tela renderiza corretamente.', async () => {
    const {findByTestId} = render(
      <TaxiDetail
        isVisible={true}
        onClose={() => null}
        onSubmit={onSubmit}
        taxi={mockData}
      />,
    );
    const totalPrice = await findByTestId('total-price');
    expect(totalPrice.children[0] as string).toEqual('R$0');
  });

  it('Ao digitar uma distância, o preço deve atualizar corretamente.', async () => {
    const {findByTestId, getByTestId} = render(
      <TaxiDetail
        isVisible={true}
        onClose={() => null}
        onSubmit={onSubmit}
        taxi={mockData}
      />,
    );

    const distance = 493.3;

    const price = mockData.precoKm as number;
    const input = await findByTestId('input-km');
    fireEvent.changeText(input, `${distance}`);

    await act(async () =>
      expect((await findByTestId('total-price')).children).not.toEqual('R$0'),
    );

    const totalPrice = getByTestId('total-price').children[0] as string;
    const parsed = totalPrice.replace('R$', '').replace(',', '');
    expect(Number.parseFloat(parsed)).toEqual(price * distance);
  });

  it('Ao digitar uma distância, o restante de KM deve atualizar corretamente.', async () => {
    const {findByTestId, findByText} = render(
      <TaxiDetail
        isVisible={true}
        onClose={() => null}
        onSubmit={onSubmit}
        taxi={mockData}
      />,
    );

    const distance = 250;

    const input = await findByTestId('input-km');
    fireEvent.changeText(input, `${distance}`);
    const remainingKM =
      (mockData.limiteKm as number) - (mockData.kmRodado as number);

    await act(async () =>
      expect(await findByText(`${remainingKM - distance} KM`)).toBeDefined(),
    );
  });

  it('Ao digitar uma distância maior que o limite, deve mostrar um alerta.', async () => {
    const Component = (
      <TaxiDetail
        isVisible={true}
        onClose={() => null}
        onSubmit={onSubmit}
        taxi={mockData}
      />
    );
    const {findByTestId} = render(Component);

    jest.spyOn(Alert, 'alert');

    const remainingKM =
      (mockData.limiteKm as number) - (mockData.kmRodado as number);

    const distanceMinus = remainingKM - 0.1;
    const distance = remainingKM;
    const distancePlus = remainingKM + 0.1;

    const input = await findByTestId('input-km');
    fireEvent.changeText(input, `${distancePlus}`);
    fireEvent.changeText(input, `${distanceMinus}`);
    fireEvent.changeText(input, `${distance}`);
    fireEvent.changeText(input, `${distancePlus}`);

    expect(Alert.alert).toHaveBeenCalledTimes(2);
  });

  it('Ao pressionar o botão de enviar, deve chamar onSubmit() passando o taxi e a distância.', async () => {
    const {findByTestId, findByText} = render(
      <TaxiDetail
        isVisible={true}
        onClose={() => null}
        onSubmit={onSubmit}
        taxi={mockData}
      />,
    );

    const distance = 250;

    const input = await findByTestId('input-km');
    fireEvent.changeText(input, `${distance}`);
    const remainingKM =
      (mockData.limiteKm as number) - (mockData.kmRodado as number);

    await act(async () =>
      expect(await findByText(`${remainingKM - distance} KM`)).toBeDefined(),
    );

    const submitButton = await findByTestId('submit-button');
    fireEvent.press(submitButton);
    expect(onSubmit).toHaveBeenCalledWith(mockData, distance);
  });
});
