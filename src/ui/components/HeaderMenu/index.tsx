import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Avatar, Badge} from 'react-native-paper';
import styles from './styles';

interface ComponentProps {
  notificationCount: number;
}
function HeaderMenu({notificationCount}: ComponentProps) {
  const {navigate} = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => null}
        testID="db-taxi-refresh">
        <Avatar.Icon icon="refresh" size={36} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigate('Notificacoes')}
        testID="notifications">
        <Avatar.Icon icon="bell-outline" size={36} />
        {notificationCount > 0 ? (
          <Badge style={styles.notificationsBadge} testID="notification-count">
            {notificationCount}
          </Badge>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

export default HeaderMenu;
