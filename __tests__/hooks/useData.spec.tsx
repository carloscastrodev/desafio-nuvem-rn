import 'react-native';
import useData from 'infra/hooks/useData';
import {
  Renderer,
  renderHook,
  RenderHookResult,
} from '@testing-library/react-hooks';
import {Taxi} from 'infra/types/Taxi';

// Note: test renderer must be required after react-native.

describe('useData()', () => {
  let hookResult: RenderHookResult<
    unknown,
    {
      data: Taxi[];
      isLoading: boolean;
    },
    Renderer<unknown>
  >;

  beforeEach(() => {
    hookResult = renderHook(() => useData());
  });

  it('Retorna uma lista vazia inicialmente', () => {
    const {data} = hookResult.result.current;
    expect(data).toHaveLength(0);
  });

  it('Retorna o estado de carregamento', () => {
    const {isLoading} = hookResult.result.current;
    expect(isLoading).toBeTruthy();
  });
});
