import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidV4 } from "uuid";

import { Input } from '../../components/Input';
import { Participant } from '../../components/Participant';
import { TitleFormModal } from '../../components/TitleFormModal';

import { styles } from './styles';
import { WarningModal } from '../../components/WarningModal';


interface IParticipantsProps {
  id: string;
  name: string;
}

interface handleOpenWarningModalProps {
  title: string;
  subtitle: string;
  isModalCancelButton?: boolean;
}

export function Home() {
  const [participantsList, setNewParticipantsList] = useState<IParticipantsProps[]>([]);
  const [participants, setParticipants] = useState('');
  const [isTitle, setIsTitle] = useState(false);
  const [eventName, setEventName] = useState('');
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [subtitleModal, setSubtitleModal] = useState('');
  const [isModalCancelButton, setIsModalCancelButton] = useState(false);
  const [removeName, setRemoveName] = useState("");

  const handleCloseModal = useCallback(() => {
    setIsTitle(false);
  }, [])

  const handleOpenModal = useCallback(() => {
    setIsTitle(true);
  }, [])

  const handleNewEventName = useCallback((newEventName: string) => {
    setEventName(newEventName);
  }, [])

  const handleCleanEventName = useCallback(() => {
    setEventName('');
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

  const handleNewParticipant = (value: string) => {
    setParticipants(value);
  }

  const handleAddNewParticipantToParticipantsList = () => {
    if (participants === '') {
      console.info("Entrou no if de verificação se foi ou não digital algo no Input antes de submeter.")
      handleOpenWarningModal({
        title: "Campo vazio",
        subtitle: "Digite o nome do participante!"
      });
      return;
    }

    const participantAlreadyExists = participantsList.find(participant => participant.name === participants);

    if (participantAlreadyExists) {
      handleOpenWarningModal({
        title: "Participante já existe",
        subtitle: "Digite outro nome, esse nome já está registrado!"
      });
      return;
    }

    const newParticipant = {
      id: uuidV4(),
      name: participants
    }

    setNewParticipantsList(prevState => [...prevState, newParticipant]);
    setParticipants('');
  }

  const handleWarningRemoveParticipant = (name: string) => {
    setRemoveName(name);

    handleOpenWarningModal({
      title: "Remover participante",
      subtitle: `Deseja remover ${name} da lista?`,
      isModalCancelButton: true,
    })
  }

  const handleRemoveParticipantFromParticipantsList = () => {
    setNewParticipantsList(participantsList.filter(participant => participant.name !== removeName))
  }


  useEffect(() => {
  }, [participantsList])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <TouchableOpacity onPress={handleOpenModal}>
            <Text style={styles.title}>{eventName ? eventName : "Nome do evento"}</Text>
          </TouchableOpacity>
          <Text style={styles.date}>Sexta, 4 de Novembro de 2022.</Text>
        </View>

      </View>
      <View style={styles.inputContainer}>
        <Input
          value={participants}
          placeholder="Nome do participante"
          onChangeText={handleNewParticipant}
          handleAddNewParticipantToParticipantsList={handleAddNewParticipantToParticipantsList}
        />
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Participantes</Text>
        <FlatList
          data={participantsList}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 12 }}
          renderItem={({ item }) => (
            <Participant
              key={item.id}
              name={item.name}
              handleRemoveParticipant={handleWarningRemoveParticipant}
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
        />
      </View>
      <Modal
        animationType='fade'
        visible={isTitle}
        transparent={true}
      >
        <TitleFormModal
          onNewEventName={handleNewEventName}
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
          confirmButton={handleRemoveParticipantFromParticipantsList}
          footerWithDeteteButton={isModalCancelButton}
        />
      </Modal>
    </View >
  );
}             