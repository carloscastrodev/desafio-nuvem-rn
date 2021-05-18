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
    },
    Renderer<unknown>
  >;

  beforeEach(() => {
    hookResult = renderHook(() => useTaxis());
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
});
