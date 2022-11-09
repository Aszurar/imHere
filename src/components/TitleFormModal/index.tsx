import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import theme from '../../theme';
import { styles } from './styles';

interface ITitleFormModalProps {
  onCloseModal(): void;
  onNewEventName(newEventName: string): void;
}

export function TitleFormModal({ onCloseModal, onNewEventName }: ITitleFormModalProps) {
  const [inputValue, setInputValue] = useState('');
  return (
    <View style={styles.modalContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Qual nome do evento?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            returnKeyType="send"
            keyboardType="email-address"
            placeholder='Nome do evento'
            onChangeText={setInputValue}
            placeholderTextColor={theme.COLORS.TEXT_SECONDARY}
          />
        </View>
        <View style={styles.Footer}>
          <TouchableOpacity onPress={onCloseModal} style={styles.button}>
            <Text style={[styles.buttonText, { color: theme.COLORS.DELETE }]}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { onNewEventName(inputValue); onCloseModal() }} style={styles.button}>
            <Text style={[styles.buttonText, { color: theme.COLORS.SUCCESS }]}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
