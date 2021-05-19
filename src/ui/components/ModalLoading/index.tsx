import colors from 'infra/theme/colors';
import React from 'react';
import Modal from 'react-native-modal';
import {ActivityIndicator} from 'react-native-paper';

interface ComponentProps {
  isVisible: boolean;
}
function ModalLoading({isVisible}: ComponentProps) {
  return (
    <Modal
      isVisible={isVisible}
      hasBackdrop
      backdropOpacity={0.75}
      animationIn="fadeIn"
      animationOut="fadeOut">
      <ActivityIndicator color={colors.blue} size={100} />
    </Modal>
  );
}

export default ModalLoading;
