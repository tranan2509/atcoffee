import React from 'react';
import {Modal, View, Text, ActivityIndicator} from 'react-native';

export default LoadingModal = ({visible}) => (
  <Modal
    visible={visible}
    animationType="fade"
    transparent={true}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setModalVisible(!visible);
    }}>
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{borderRadius: 10, padding: 60, backgroundColor: 'white'}}>
        <Text style={{fontSize: 20, fontWeight: '200', marginBottom: 10}}>
          Đang tải...
        </Text>
        <ActivityIndicator color="#00ff00" size="large" />
      </View>
    </View>
  </Modal>
);
