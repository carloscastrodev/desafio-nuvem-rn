import React, {useEffect} from 'react';
import {Avatar, Button} from 'react-native-paper';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import NumericInput from 'react-native-numeric-input';
import {Taxi} from 'infra/types/Taxi';
import carIcon from 'assets/images/car_icon.png';
import styles from './styles';
import {useState} from 'react';
import {actionButtonTheme} from 'infra/theme';
import formatCoin from 'infra/utils/formatCoin';

interface ComponentProps {
  isVisible: boolean;
  taxi: Taxi;
  onSubmit: (taxi: Taxi, distance: number) => void;
  onClose: () => void;
}

function TaxiDetail({isVisible, taxi, onClose, onSubmit}: ComponentProps) {
  const [distance, setDistance] = useState<number>(0);

  useEffect(() => {
    setDistance(0);
  }, [taxi]);

  const remainingKM = () => {
    if (Number.isFinite(taxi.limiteKm) && Number.isFinite(taxi.kmRodado)) {
      return (taxi.limiteKm as number) - (taxi.kmRodado as number);
    }
    return 0;
  };

  const updateDistance = (d: number) => {
    if (d <= remainingKM() && d >= 0) {
      setDistance(d);
    } else {
      setDistance(remainingKM());
      Alert.alert(
        'Erro',
        'Escolha uma distância maior que 0 e menor que o limite restante.',
      );
    }
  };

  return (
    <Modal
      testID="taxi-detail-modal"
      isVisible={isVisible}
      style={styles.wrapper}
      hasBackdrop={true}
      onDismiss={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      backdropOpacity={0}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.headerMenu}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            testID="modal-close-button">
            <Avatar.Icon icon="close-circle" size={48} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.infoHeader}>
            <View style={styles.personInfo}>
              <View style={styles.avatarImageWrapper}>
                {taxi.imageUri ? (
                  <Image source={taxi.imageUri} style={styles.avatar} />
                ) : null}
              </View>
              <Text style={[styles.importantText, styles.personName]}>
                {taxi.nome}
              </Text>
            </View>

            {taxi.precoKm ? (
              <Text style={styles.priceInfo} testID="price-km">
                {formatCoin(taxi.precoKm)}
                /km
              </Text>
            ) : (
              <View />
            )}

            <Image source={carIcon} style={styles.carIcon} />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Distância da Viagem em KM</Text>
            <NumericInput
              minValue={0}
              maxValue={remainingKM()}
              rounded
              totalWidth={180}
              totalHeight={45}
              step={0.1}
              valueType="real"
              initValue={distance}
              containerStyle={styles.kmInput}
              editable={remainingKM() > 0}
              type={undefined}
              onChange={updateDistance}
              extraTextInputProps={{
                testID: 'input-km',
              }}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>KM ainda disponível</Text>
            {Number.isFinite(taxi.limiteKm) &&
            Number.isFinite(taxi.kmRodado) ? (
              <Text style={styles.importantText} testID="remaining-km">
                {remainingKM() - distance} KM
              </Text>
            ) : null}
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Total</Text>
            {Number.isFinite(taxi.precoKm) ? (
              <Text style={styles.importantText} testID="total-price">
                {formatCoin((taxi.precoKm as number) * distance)}
              </Text>
            ) : null}
          </View>

          <Button
            mode="contained"
            testID="submit-button"
            uppercase={false}
            compact
            labelStyle={styles.submitButtonLabel}
            theme={actionButtonTheme}
            style={styles.submitButton}
            onPress={() => onSubmit(taxi, distance)}>
            Fazer viagem
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default TaxiDetail;
