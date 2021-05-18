import 'react-native';
import React from 'react';
import HeaderMenu from 'ui/components/HeaderMenu';
import {fireEvent, render} from '@testing-library/react-native';
import routes from 'infra/enums/routes';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const reactNavigation = jest.requireActual('@react-navigation/native');
  return {
    ...reactNavigation,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('<HeaderMenu />', () => {
  it('O componente renderiza corretamente.', () => {
    render(<HeaderMenu notificationCount={0} onPressRefresh={() => null} />);
  });

  it('Deve mostrar o número de notificações quando for maior que 0.', () => {
    const {getByTestId} = render(
      <HeaderMenu notificationCount={3} onPressRefresh={() => null} />,
    );
    const element = getByTestId('notification-count');
    expect(element).toBeDefined();
  });

  it('Não deve mostrar o número de notificações quando for menor ou igual a 0.', () => {
    const {queryByTestId} = render(
      <HeaderMenu notificationCount={0} onPressRefresh={() => null} />,
    );
    const element = queryByTestId('notification-count');
    expect(element).toBeNull();
  });

  it('O botão de atualizar deve existir.', () => {
    const {getByTestId} = render(
      <HeaderMenu notificationCount={0} onPressRefresh={() => null} />,
    );
    const element = getByTestId('db-taxi-refresh');
    expect(element).toBeDefined();
  });

  it('O botão de atualizar deve chamar o callback.', () => {
    const mockCallback = jest.fn();
    const {getByTestId} = render(
      <HeaderMenu notificationCount={0} onPressRefresh={mockCallback} />,
    );
    const element = getByTestId('db-taxi-refresh');
    fireEvent(element, 'press');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('O botão de notificações deve existir.', () => {
    const {getByTestId} = render(
      <HeaderMenu notificationCount={0} onPressRefresh={() => null} />,
    );
    const element = getByTestId('notifications');
    expect(element).toBeDefined();
  });

  it('O botão de notificações leva para a tela do ranking.', () => {
    const {getByTestId} = render(
      <HeaderMenu notificationCount={0} onPressRefresh={() => null} />,
    );
    const element = getByTestId('notifications');
    fireEvent(element, 'press');
    expect(mockedNavigate).toHaveBeenCalledWith(routes.notificacoes);
  });
});
