import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NavigationConfirmationModal = ({ 
  visible, 
  onRequestClose, 
  onStay, 
  onLeave 
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Are you sure you want to leave this page? You will lose any unconfirmed changes.
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.stayButton]}
              onPress={onStay}
            >
              <Text style={[styles.modalButtonText, styles.stayButtonText]}>stay</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.leaveButton]}
              onPress={onLeave}
            >
              <Text style={[styles.modalButtonText, styles.leaveButtonText]}>leave</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  stayButton: {
    backgroundColor: "#E03616",
    borderRadius: 25,
  },
  leaveButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E03616",
    borderRadius: 25,
  },
  modalButtonText: {
    textAlign: "center",
    fontFamily: "RobotoMono-Bold",
    fontSize: 16,
  },
  stayButtonText: {
    color: "white",
  },
  leaveButtonText: {
    color: "#E03616",
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'RobotoMono-Bold',
    color: 'black',
  },
});

export default NavigationConfirmationModal;