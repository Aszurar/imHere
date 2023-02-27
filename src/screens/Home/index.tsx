import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Keyboard, Modal, Pressable, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidV4 } from "uuid";

import { Input } from '../../components/Input';
import { Participant } from '../../components/Participant';
import { WarningModal } from '../../components/WarningModal';
import { TitleFormModal } from '../../components/TitleFormModal';

import { IEventDetailsProps } from '../../dto/eventDetails';
import { IParticipantsProps } from '../../dto/participantDTO';

import { saveParticipant } from '../../storage/participant/saveParticipant';
import { getEventDetails } from '../../storage/eventDetails/getEventDetails';
import { saveEventDetails } from '../../storage/eventDetails/saveEventDetails';
import { deleteParticipant } from '../../storage/participant/deleteParticipant';
import { getAllParticipants } from '../../storage/participant/getAllParticipants';

import { dateFormatValidation, formatDateToSetence } from '../../utils/format';

import theme from '../../theme';
import { styles } from './styles';


interface handleOpenWarningModalProps {
  title: string;
  subtitle: string;
  isModalCancelButton?: boolean;
}

export function Home() {
  const [eventDate, setEventDate] = useState("");
  const [eventName, setEventName] = useState('Nome do evento');
  const [participant, setParticipant] = useState('');
  const [participantsList, setParticipantsList] = useState<IParticipantsProps[]>([]);

  const [isPressed, setIsPressed] = useState(false)

  const [isTitle, setIsTitle] = useState(false);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [subtitleModal, setSubtitleModal] = useState('');
  const [isModalCancelButton, setIsModalCancelButton] = useState(false);
  const [removeParticipantId, setRemovePartipantId] = useState("");

  const backgroundColorButton = isPressed ? theme.COLORS.HIGHLIGHT_SECONDARY : "transparent"
  const eventNameFormatted = eventName ? eventName : "Nome do evento";
  let eventDateFormatted = "";
  if (dateFormatValidation.format.test(eventDate) && eventDate.trim()) {
    eventDateFormatted = formatDateToSetence(eventDate)
  }

  const handleFocusButton = useCallback(() => {
    setIsPressed(true)
  }, [])
  const handleBlurButton = useCallback(() => {
    setIsPressed(false)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsTitle(false);
  }, [])

  const handleOpenModal = useCallback(() => {
    setIsTitle(true);
  }, [])


  const handleOpenWarningModal = useCallback(({ title, subtitle, isModalCancelButton = false }: handleOpenWarningModalProps) => {
    setTitleModal(title);
    setSubtitleModal(subtitle);
    setIsModalCancelButton(isModalCancelButton);

    setIsWarningModalVisible(true);
  }, [])


  const handleCloseWarningModal = useCallback(() => {
    setIsWarningModalVisible(false);
  }, [])


  const handleGetEventDetails = async () => {
    try {
      const response = await getEventDetails();
      if (response) {
        setEventDate(response.date)
        setEventName(response.name)
      }
    } catch (error) {
      handleOpenWarningModal({
        title: "Erro ao tentar resgatar o nome e data do evento cadastrados",
        subtitle: `Por favor, tente mais tarde.`,
      })
    }
  }
  const handleSaveEventDetails = async () => {
    try {
      const newEventDetails: IEventDetailsProps = {
        date: eventDate,
        name: eventName,
      }
      await saveEventDetails(newEventDetails);
      handleGetEventDetails();
    } catch (error) {
      handleOpenWarningModal({
        title: "Erro ao tentar cadastrar nome e data do evento",
        subtitle: `Por favor, tente mais tarde.`,
      })
    }
  }


  const handleNewParticipant = (value: string) => {
    setParticipant(value);
  }
  const handleGetAllParticipants = async () => {
    try {
      const participantsStoraged = await getAllParticipants();
      setParticipantsList(participantsStoraged)
    } catch (error) {
      handleOpenWarningModal({
        title: "Erro ao tentar resgatar participantes salvos",
        subtitle: `Por favor, tente mais tarde.`,
      })
    }
  }
  const handleSaveParticipantsList = async (newParticipant: IParticipantsProps) => {
    try {
      await saveParticipant(newParticipant);
      handleGetAllParticipants();
    } catch (error) {
      handleOpenWarningModal({
        title: "Erro ao tentar salvar novo participante",
        subtitle: `Por favor, tente mais tarde.`,
      })
      return;
    }
  }
  const handleAddNewParticipantToParticipantsList = () => {
    if (!participant.trim()) {
      handleOpenWarningModal({
        title: "Campo vazio",
        subtitle: "Digite o nome do participante!"
      });
      return;
    }

    const participantAlreadyExists = participantsList.find(existingParticipant => existingParticipant.name === participant);

    if (participantAlreadyExists) {
      handleOpenWarningModal({
        title: "Participante já existe",
        subtitle: "Digite outro nome, esse nome já está registrado!"
      });
      return;
    }

    const newParticipant = {
      id: uuidV4(),
      name: participant
    }
    setParticipant('');
    handleSaveParticipantsList(newParticipant)
    handleGetAllParticipants();
  }
  const handleWarningRemoveParticipant = (participant: IParticipantsProps) => {
    setRemovePartipantId(participant.id);

    handleOpenWarningModal({
      title: "Remover participante",
      subtitle: `Tem certeza que deseja remover ${participant.name} da lista?`,
      isModalCancelButton: true,
    })
  }
  const handleDeleteParticipant = async () => {
    try {
      await deleteParticipant(removeParticipantId);
      handleGetAllParticipants();
    } catch (error) {
      handleOpenWarningModal({
        title: "Erro ao tentar deletar participante",
        subtitle: `Por favor, tente mais tarde.`,
      })
      return;
    }
  }


  useEffect(() => {
    handleGetEventDetails();
    handleGetAllParticipants();
  }, [])

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{eventNameFormatted}</Text>
              <Text style={styles.date}>{eventDateFormatted}.</Text>
              <Pressable
                onPress={handleOpenModal}
                style={[styles.eventDetails, { backgroundColor: backgroundColorButton }]}
                onPressIn={handleFocusButton}
                onPressOut={handleBlurButton}
              >
                <Text style={styles.eventDetailsText}>Trocar nome e data do evento</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Input
              value={participant}
              placeholder="Nome do participante"
              onChangeText={handleNewParticipant}
              handleAddNewParticipantToParticipantsList={handleAddNewParticipantToParticipantsList}
              onSubmitEditing={handleAddNewParticipantToParticipantsList}
              returnKeyType='done'
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.subtitleContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Text style={styles.subtitle}>Participantes</Text>
        </TouchableWithoutFeedback>
        <FlatList
          data={participantsList}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 12 }}
          renderItem={({ item }) => (
            <Participant
              key={item.id}
              name={item.name}
              handleRemoveParticipant={() => handleWarningRemoveParticipant(item)}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListEmptyComponent={() => (
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                Ninguém chegou no evento ainda?{"\n"}
                Adicione participantes a sua lista de presença.
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>
      <Modal
        animationType='fade'
        visible={isTitle}
        transparent={true}
      >
        <TitleFormModal
          eventDate={eventDate}
          eventName={eventName}
          setEventDate={setEventDate}
          setEventName={setEventName}
          onSubmit={handleSaveEventDetails}
          onCloseModal={handleCloseModal}
        />
      </Modal>
      <Modal
        transparent={true}
        animationType='fade'
        visible={isWarningModalVisible}
      >
        <WarningModal
          title={titleModal}
          subtitle={subtitleModal}
          onCloseModal={handleCloseWarningModal}
          confirmButton={handleDeleteParticipant}
          footerWithDeteteButton={isModalCancelButton}
        />
      </Modal>
    </View >
  );
}             