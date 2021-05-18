import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal, {OnSwipeCompleteParams} from 'react-native-modal';

import {Taxi} from 'infra/types/Taxi';

import styles from './styles';
import {Avatar} from 'react-native-paper';
import {useCallback} from 'react';

interface ComponentProps {
  isVisible: boolean;
  taxi: Taxi;
  onClose: () => void;
}

function TaxiDetail({isVisible, taxi, onClose}: ComponentProps) {
  const handleSwipeBottom = useCallback(
    (ev: OnSwipeCompleteParams) => {
      if (ev.swipingDirection === 'down') {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <Modal
      isVisible={isVisible}
      style={styles.wrapper}
      hasBackdrop={true}
      onDismiss={onClose}
      onSwipeComplete={handleSwipeBottom}
      onBackdropPress={onClose}
      backdropOpacity={0}>
      <View style={styles.container}>
        <View style={styles.headerMenu}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            testID="modal-close-button">
            <Avatar.Icon icon="close-circle" size={48} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text>{taxi.nome}</Text>
        </View>
      </View>
    </Modal>
  );
}

export default TaxiDetail;
