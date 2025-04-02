import React, { ReactNode } from 'react';
import { View, StyleSheet, Modal as RNModal, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import Type from './Type';
import Button from './button';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  showCloseButton?: boolean;
}

export default function Modal({ 
  visible, 
  onClose, 
  title, 
  children,
  showCloseButton = true
}: ModalProps) {
  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={e => e.stopPropagation()}>
          {title && (
            <View style={styles.modalHeader}>
              <Type type="themeTitle">{title}</Type>
            </View>
          )}
          
          <View style={styles.modalBody}>
            {children}
          </View>
          
          {showCloseButton && (
            <View style={styles.modalFooter}>
              <Button onPress={onClose}>
                <Type style={{ color: Colors.light.white }}>Close</Type>
              </Button>
            </View>
          )}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.gray,
  },
  modalBody: {
    padding: 15,
  },
  modalFooter: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.light.gray,
  },
}); 