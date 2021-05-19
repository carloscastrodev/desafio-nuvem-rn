import {useIsFocused} from '@react-navigation/native';
import constants from 'infra/enums/constants';
import useTaxis from 'infra/hooks/useTaxis';
import {Taxi} from 'infra/types/Taxi';
import boundingBox from 'infra/utils/boundingBox';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import HeaderMenu from 'ui/components/HeaderMenu';
import ModalLoading from 'ui/components/ModalLoading';
import TaxiDetail from 'ui/components/TaxiDetail';
import TaxiMap from 'ui/components/TaxiMap';
import styles from './styles';

function Mapa() {
  const {
    data: taxis,
    isLoading: loadingTaxis,
    handleRefresh: refreshJourney,
    handleUpdateId: updateTaxiById,
  } = useTaxis();
  const [selectedTaxi, setSelectedTaxi] = useState<Taxi | null>(null);
  const [mapRefreshKey, setMapRefreshKey] = useState(new Date().getTime());
  const [taxiDetailVisible, setTaxiDetailVisible] = useState<boolean>(false);
  const [_boundingBox, setBoundingBox] = useState<BoundingBox>({
    center: [0, 0],
    minLat: 0,
    minLong: 0,
    maxLat: 0,
    maxLong: 0,
  });
  const isFocused = useIsFocused();

  const handleMarkerPress = useCallback((taxi: Taxi) => {
    setSelectedTaxi({...taxi});
  }, []);

  const handleTripSubmit = useCallback(
    (taxi: Taxi, km: number) => {
      const copy = {...taxi};
      if (Number.isFinite(copy.kmRodado)) {
        copy.kmRodado = (copy.kmRodado as number) + km;
      } else {
        copy.kmRodado = km;
      }
      updateTaxiById(taxi.id, copy);
      setTaxiDetailVisible(false);
    },
    [updateTaxiById],
  );

  const isTaxiVisible = useCallback((taxi: Taxi): boolean => {
    let _isTaxiVisible = false;

    const sanityCheck =
      Number.isFinite(taxi.kmRodado) &&
      Number.isFinite(taxi.limiteKm) &&
      Number.isFinite(taxi.precoKm);

    if (sanityCheck) {
      const kmCondition = (taxi.kmRodado as number) < (taxi.limiteKm as number);
      const earningCondition =
        (taxi.precoKm as number) * (taxi.kmRodado as number) <
        constants.JOURNEY_EARNING_LIMIT;

      _isTaxiVisible = kmCondition && earningCondition;
    }
    return _isTaxiVisible;
  }, []);

  const notificationCount = useCallback((): number => {
    const visibleTaxis = taxis.filter(isTaxiVisible);
    const count = taxis.length - visibleTaxis.length;
    return count;
  }, [taxis, isTaxiVisible]);

  useEffect(() => {
    if (selectedTaxi) {
      setTaxiDetailVisible(true);
    }
  }, [selectedTaxi]);

  useEffect(() => {
    setMapRefreshKey(new Date().getTime());
  }, [isFocused]);

  useEffect(() => {
    if (taxis.length) {
      setBoundingBox(
        boundingBox(taxis.map(taxi => [taxi.latitude, taxi.longitude])),
      );
    }
  }, [taxis]);

  return (
    <SafeAreaView style={styles.container}>
      <ModalLoading isVisible={loadingTaxis} />
      {!taxiDetailVisible ? (
        <HeaderMenu
          notificationCount={notificationCount()}
          onPressRefresh={refreshJourney}
        />
      ) : null}
      <TaxiMap
        key={mapRefreshKey}
        taxis={taxis.filter(isTaxiVisible)}
        mapRegion={{
          latitude: _boundingBox.center[0],
          longitude: _boundingBox.center[1],
          latitudeDelta:
            _boundingBox.maxLat -
            _boundingBox.minLat +
            constants.MAP_COORD_DELTA_THRESHOLD,
          longitudeDelta:
            _boundingBox.maxLong -
            _boundingBox.minLong +
            constants.MAP_COORD_DELTA_THRESHOLD,
        }}
        onPressMarker={handleMarkerPress}
      />
      {selectedTaxi ? (
        <TaxiDetail
          taxi={selectedTaxi}
          isVisible={taxiDetailVisible}
          onSubmit={handleTripSubmit}
          onClose={() => setTaxiDetailVisible(false)}
        />
      ) : null}
    </SafeAreaView>
  );
}

export default Mapa;
