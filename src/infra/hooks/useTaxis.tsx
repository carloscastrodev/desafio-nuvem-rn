import mockTaxis from 'infra/mock/mockTaxis.json';
import store from 'infra/store';
import {Taxi} from 'infra/types/Taxi';
import prepareMockJson from 'infra/utils/prepareMockJson';
import {useRef} from 'react';
import {useCallback} from 'react';
import {useEffect, useState} from 'react';

function useTaxis() {
  const [data, setData] = useState<Taxi[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const initRef = useRef(false);

  const init = useCallback(async () => {
    const isDataInStore = await store.taxis.exists();

    if (isDataInStore) {
      const storeData = await store.taxis.findAll();
      setData(storeData);
    } else {
      const preparedData = prepareMockJson(mockTaxis);
      setData(preparedData);
      store.taxis.save(preparedData);
    }
    setIsLoading(false);
  }, []);

  const handleRefresh = useCallback(async () => {
    const preparedData = prepareMockJson(mockTaxis);
    if (!initRef.current) {
      store.taxis.save(preparedData);
    }
    setData(preparedData);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (!Array.isArray(data)) {
      return;
    }
    if (!initRef.current) {
      initRef.current = true;
    } else {
      store.taxis.save(data);
    }
  }, [data]);

  return {
    data,
    isLoading,
    handleRefresh,
  };
}

export default useTaxis;
