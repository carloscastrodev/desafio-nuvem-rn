import {Taxi} from 'infra/types/Taxi';
import {useEffect} from 'react';
import {useState} from 'react';
import mockTaxis from 'infra/mock/mockTaxis.json';

function useData() {
  const [data, setData] = useState<Taxi[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setData(mockTaxis);
        setIsLoading(false);
      }, [1000]);
    };
    fetchData();
  }, []);

  return {
    data,
    isLoading,
  };
}

export default useData;
