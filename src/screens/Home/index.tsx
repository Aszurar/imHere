import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
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

import { styles } from './styles';
import { Button } from '../../components/Button';
import { deleteEventDetails } from '../../storage/eventDetails/deleteEventDetails';
import { deleteEvent } from '../../storage/event/deleteEvent';

type DeleteEventOrParticipantProps = "event" | "participant"

interface handleOpenWarningModalProps {
  title: string;
  subtitle: string;
  isModalCancelButton?: boolean;
  isDeleteEventOrParticipant?: DeleteEventOrParticipantProps;
}

export function Home() {
  const [eventDate, setEventDate] = useState("");
  const [eventName, setEventName] = useState('Nome do evento');
  const [participant, setParticipant] = useState('');
  const [participantsList, setParticipantsList] = useState<IParticipantsProps[]>([]);

  const [isSwitchEventDetailsButtonPressed, setIsSwitchEventDetailsButtonPressed] = useState(false);
  const [isDeleteButtonPressed, setIsDeleteButtonPressed] = useState(false);

  const [isTitle, setIsTitle] = useState(false);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [subtitleModal, setSubtitleModal] = useState('');
  const [isDeleteEvent, setIsDeleteEvent] = useState(false);

  const [isModalCancelButton, setIsModalCancelButton] = useState(false);
  const [removeParticipantId, setRemovePartipantId] = useState("");

  const totalParticipants = participantsList.length
  const isEventDetails = eventName || eventDate
  const isAnyEvent = isEventDetails || totalParticipants > 0

  const backgroundColorSwitchEventDetailsButton = isSwitchEventDetailsButtonPressed ? styles.eventDetailsBackgroundButtonActivated : styles.eventDetailsBackgroundButtonDisable
  const backgroundColorDeleteButton = isDeleteButtonPressed ? styles.deleteEventBackgroundButtonActivated : styles.deleteEventBackgroundButtonDisable

  const eventNameFormatted = eventName ? eventName : "Nome do evento";
  let eventDateFormatted = "";
  if (dateFormatValidation.format.test(eventDate) && eventDate.trim()) {
    eventDateFormatted = formatDateToSetence(eventDate)
  }

  const handleDeleteButtonFocus = useCallback(() => {
    setIsDeleteButtonPressed(true)
  }, [])
  const handleDeleteButtonBlur = useCallback(() => {
    setIsDeleteButtonPressed(false)
  }, [])

  const handleSwitchEventDetailsButtonFocus = useCallback(() => {
    setIsSwitchEventDetailsButtonPressed(true)
  }, [])
  const handleSwitchEventDetailsButtonBlur = useCallback(() => {
    setIsSwitchEventDetailsButtonPressed(false)
  }, [])


  const handleCloseModal = useCallback(() => {
    setIsTitle(false);
  }, [])

  const handleOpenModal = useCallback(() => {
    setIsTitle(true);
  }, [])


  const handleOpenWarningModal = useCallback(({
    title,
    subtitle,
    isModalCancelButton = false,
  }: handleOpenWarningModalProps) => {
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
  const handleDeleteEventDetails = async () => {
    try {
      await deleteEventDetails();
      handleGetEventDetails()
    } catch (error) {
      handleOpenWarningModal({
        title: "Erro ao tentar deletar nome e data do evento",
        subtitle: `Por favor, tente mais tarde.`,
      })
    }
  }

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent();
      handleGetEventDetails();
      handleGetAllParticipants();
    } catch (error) {
      handleOpenWarningModal({
        title: "Erro ao tentar deletar evento",
        subtitle: `Por favor, tente mais tarde.`,
      })
    }
  }
  const handleWarningDeleteEvent = () => {
    setIsDeleteEvent(true)
    handleOpenWarningModal({
      title: "Deletar Evento",
      subtitle: `Tem certeza que deseja apagar todos os dados do evento?`,
      isModalCancelButton: true,
    })
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

  const handleConfirmModalFunction = isDeleteEvent ? handleDeleteEvent : handleDeleteParticipant;

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
              <View style={styles.row}>
                <View >
                  <Text style={styles.title}>{eventNameFormatted}</Text>
                  <Text style={styles.date}>{eventDateFormatted}.</Text>
                </View>
                {(isEventDetails) && <Button deleteIcon onPress={handleDeleteEventDetails} />}
              </View>
              <Pressable
                onPress={handleOpenModal}
                style={[
                  styles.textButton,
                  styles.eventDetailsBorderButton,
                  backgroundColorSwitchEventDetailsButton
                ]}
                onPressIn={handleSwitchEventDetailsButtonFocus}
                onPressOut={handleSwitchEventDetailsButtonBlur}
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
          contentContainerStyle={{ paddingBottom: 10 }}
        />

        {isAnyEvent && (
          <Pressable
            onPress={handleWarningDeleteEvent}
            style={[
              styles.textButton,
              styles.deleteEventBorderButton,
              backgroundColorDeleteButton
            ]}
            onPressIn={handleDeleteButtonFocus}
            onPressOut={handleDeleteButtonBlur}
          >
            <Text style={styles.eventDetailsText}>Deletar Evento</Text>
          </Pressable>
        )
        }
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
          confirmButton={handleConfirmModalFunction}
          footerWithDeteteButton={isModalCancelButton}
        />
      </Modal>
    </View >
  );
}

