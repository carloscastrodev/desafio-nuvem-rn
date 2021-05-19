import 'react-native';
import useTaxis from 'infra/hooks/useTaxis';
import {
  Renderer,
  renderHook,
  RenderHookResult,
} from '@testing-library/react-hooks';
import {Taxi} from 'infra/types/Taxi';
import {waitFor} from '@testing-library/react-native';

// Note: test renderer must be required after react-native.

describe('useTaxis()', () => {
  let hookResult: RenderHookResult<
    unknown,
    {
      data: Taxi[];
      isLoading: boolean;
      handleRefresh: () => Promise<void>;
      handleUpdateId: (id: number, payload: Taxi) => Promise<void>;
    },
    Renderer<unknown>
  >;
  let mockTaxi: Taxi;

  beforeEach(() => {
    hookResult = renderHook(() => useTaxis());
    mockTaxi = {
      id: 1,
      latitude: Math.random(),
      longitude: Math.random(),
      nome: 'Taxi',
    };
  });

  it('Retorna uma lista de elementos.', async () => {
    const {data} = hookResult.result.current;
    expect(data).toHaveLength(0);
    await waitFor(() =>
      expect(hookResult.result.current.data.length).toBeGreaterThan(0),
    );
  });

  it('Retorna o estado de carregamento.', async () => {
    const {isLoading} = hookResult.result.current;
    expect(isLoading).toBeTruthy();
    await waitFor(() =>
      expect(hookResult.result.current.isLoading).toBeFalsy(),
    );
  });

  describe('handleRefresh()', () => {
    it('reinicializa a lista de elementos corretamente.', async () => {
      await waitFor(() =>
        expect(hookResult.result.current.data.length).toBeGreaterThan(0),
      );
      await waitFor(
        async () =>
          await hookResult.result.current.handleUpdateId(mockTaxi.id, mockTaxi),
      );
      const {data: dataBefore} = hookResult.result.current;
      await waitFor(
        async () => await hookResult.result.current.handleRefresh(),
      );
      await waitFor(async () =>
        expect(dataBefore.find(e => e.id === mockTaxi.id)).not.toEqual(
          hookResult.result.current.data.find(e => e.id === mockTaxi.id),
        ),
      );
    });
  });

  describe('handleUpdateId', () => {
    it('atualiza o elemento com ID corretamente.', async () => {
      await waitFor(() =>
        expect(hookResult.result.current.data.length).toBeGreaterThan(0),
      );
      const {data: dataBefore} = hookResult.result.current;
      await waitFor(
        async () =>
          await hookResult.result.current.handleUpdateId(mockTaxi.id, mockTaxi),
      );
      await waitFor(async () =>
        expect(dataBefore).not.toEqual(hookResult.result.current.data),
      );
      expect(dataBefore.find(e => e.id === mockTaxi.id)?.id).toEqual(
        mockTaxi.id,
      );
    });
  });
});
