import React, { useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import theme from '../../theme';
import { dateFormatValidation, maskDate } from '../../utils/format';
import { isValidBRLDayDate, isValidBRLMonthDate } from '../../utils/validations';

import { styles } from './styles';
interface ITitleFormModalProps {
  eventDate: string;
  eventName: string;
  setEventDate: (date: string) => void;
  setEventName: (name: string) => void;
  onCloseModal(): void;
  onSubmit: () => void;
}

export function TitleFormModal({
  eventDate,
  eventName,
  setEventDate,
  setEventName,
  onCloseModal,
  onSubmit
}: ITitleFormModalProps) {
  const [dateInvalidMessage, setDateInvalidMessage] = useState("");
  const [eventNameInvalidMessage, setEventNameInvalidMessage] = useState("");
  const dateInputRef = useRef<TextInput>(null);

  const dateInputBottomBorderColor = dateInvalidMessage ? theme.COLORS.TEXT_INVALID_MESSAGE : theme.COLORS.HIGHLIGHT_SECONDARY
  const eventNameInputBottomBorderColor = eventNameInvalidMessage ? theme.COLORS.TEXT_INVALID_MESSAGE : theme.COLORS.HIGHLIGHT_SECONDARY

  function validateDate(value?: string) {
    setDateInvalidMessage("");

    if (!value) {
      setDateInvalidMessage("É necessário informar uma data.");
      return false
    }

    if (!value.trim()) {
      setDateInvalidMessage("É necessário informar uma data.");
      return false
    }
    if (!dateFormatValidation.format.test(value as string)) {
      setDateInvalidMessage("Data inválida, por favor, siga o formato dd/mm/aaaa");
      return false;
    }

    const isBRLValidDay = isValidBRLDayDate(value);
    const isBRLValidMonth = isValidBRLMonthDate(value);
    if (!isBRLValidDay) {
      setDateInvalidMessage("Dia inválido.");
      return false
    }
    if (!isBRLValidMonth) {
      setDateInvalidMessage("Mês inválido. Utilize um mês entre 01 e 12.");
      return false
    }

    return true
  }
  function validateRequiredEventName(value?: string) {
    setEventNameInvalidMessage("");
    if (!value || !value.trim()) {
      setEventNameInvalidMessage("É necessário informar um nome para o evento.");
      return false;
    }
    return true;
  }

  function handleSubmit() {
    const isDateValid = validateDate(eventDate);
    const isEventNameValid = validateRequiredEventName(eventName);

    if (!isDateValid || !isEventNameValid) {
      return;
    }

    onSubmit();
    onCloseModal();
  }
  return (
    <View style={styles.modalContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Qual nome do evento?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { borderBottomColor: eventNameInputBottomBorderColor }]}
            autoCorrect
            autoCapitalize='sentences'
            returnKeyType="send"
            placeholder='Nome do evento'
            onChangeText={setEventName}
            placeholderTextColor={theme.COLORS.TEXT_SECONDARY}
            value={eventName}
            onSubmitEditing={() => dateInputRef.current?.focus()}
          />
          {!!eventNameInvalidMessage && <Text style={styles.invalidMessage} >{eventNameInvalidMessage}</Text>}
        </View>
        <Text style={styles.title}>Qual a data do evento?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            ref={dateInputRef}
            style={[styles.input, { borderBottomColor: dateInputBottomBorderColor }]}
            returnKeyType="send"
            keyboardType="numeric"
            placeholder='Data do evento'
            maxLength={10}
            onChangeText={(text) => setEventDate(maskDate(text))}
            placeholderTextColor={theme.COLORS.TEXT_SECONDARY}
            value={eventDate}
            onSubmitEditing={handleSubmit}
          />
          {!!dateInvalidMessage && <Text style={styles.invalidMessage} >{dateInvalidMessage}</Text>}
        </View>

        <View style={styles.Footer}>
          <TouchableOpacity onPress={onCloseModal} style={styles.button}>
            <Text style={[styles.buttonText, { color: theme.COLORS.DELETE }]}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={[styles.buttonText, { color: theme.COLORS.SUCCESS }]}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
