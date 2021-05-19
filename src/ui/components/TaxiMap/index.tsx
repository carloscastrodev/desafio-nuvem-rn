import {Taxi} from 'infra/types/Taxi';
import React from 'react';
import {Image} from 'react-native';
import {Region} from 'react-native-maps';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import carImg from 'assets/images/car_icon.png';
import styles from './styles';

interface ComponentProps {
  taxis: Taxi[];
  mapRegion: Region;
  onPressMarker: (taxi: Taxi) => any;
}

function TaxiMap({taxis, mapRegion, onPressMarker}: ComponentProps) {
  return (
    <MapView
      testID="taxi-map"
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      mapType="standard"
      initialRegion={{
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude,
        latitudeDelta: mapRegion.latitudeDelta,
        longitudeDelta: mapRegion.longitudeDelta,
      }}
      zoomEnabled
      moveOnMarkerPress={false}>
      {taxis.map(taxi => (
        <Marker
          accessibilityRole="button"
          accessibilityHint="Mostrar os dados para esse taxi"
          testID="map-taxi-marker"
          key={taxi.id}
          coordinate={{
            latitude: taxi.latitude,
            longitude: taxi.longitude,
          }}
          onPress={() => onPressMarker(taxi)}
          style={styles.icon}>
          <Image source={carImg} />
        </Marker>
      ))}
    </MapView>
  );
}

export default TaxiMap;
