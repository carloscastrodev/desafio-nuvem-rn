import constants from 'infra/enums/constants';
import useTaxis from 'infra/hooks/useTaxis';
import {Taxi} from 'infra/types/Taxi';
import formatCoin from 'infra/utils/formatCoin';
import getTaxiEarning from 'infra/utils/getTaxiEarning';
import sortTaxisByEarningsDesc from 'infra/utils/sortTaxisByEarningDesc';
import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {Card} from 'react-native-paper';
import ModalLoading from 'ui/components/ModalLoading';
import styles from './styles';

function Notificacoes() {
  const {data: taxis, isLoading: loadingTaxis} = useTaxis();

  const notificationCondition = (taxi: Taxi): boolean => {
    let _isTaxiVisible = false;

    const sanityCheck =
      Number.isFinite(taxi.kmRodado) &&
      Number.isFinite(taxi.limiteKm) &&
      Number.isFinite(taxi.precoKm);

    if (sanityCheck) {
      const kmCondition =
        (taxi.kmRodado as number) >= (taxi.limiteKm as number);
      const earningCondition =
        (taxi.precoKm as number) * (taxi.kmRodado as number) >=
        constants.JOURNEY_EARNING_LIMIT;

      _isTaxiVisible = kmCondition || earningCondition;
    }
    return _isTaxiVisible;
  };

  const taxisForNotifications = sortTaxisByEarningsDesc(
    taxis.filter(notificationCondition),
  );

  return (
    <View style={styles.container}>
      <ModalLoading isVisible={loadingTaxis} />
      {!loadingTaxis && !taxisForNotifications.length ? (
        <Text>Não há notificações</Text>
      ) : null}
      <FlatList
        testID="notification-list"
        data={taxisForNotifications}
        keyExtractor={taxi => taxi.id.toString()}
        bounces
        renderItem={({item: taxi}) => {
          return (
            <Card testID="notification-card" style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.cardImageWrapper}>
                  {taxi.imageUri ? (
                    <Image source={taxi.imageUri} style={styles.cardImage} />
                  ) : null}
                </View>
                <View style={styles.taxiInfoWrapper}>
                  <Text style={styles.taxiInfoName}>{taxi.nome}</Text>
                  <Text style={styles.taxiInfoKm}>
                    {taxi.kmRodado || '0'} km
                  </Text>
                  <Text style={styles.taxiInfoEarning} testID="taxi-earning">
                    {formatCoin(getTaxiEarning(taxi))}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          );
        }}
      />
    </View>
  );
}

export default Notificacoes;
