import AsyncStorage from '@react-native-async-storage/async-storage';

import { PARTICIPANTS_COLLECTION } from '../storageConfig';
import { getAllParticipants } from './getAllParticipants';

export async function deleteParticipant(participantId: string) {
  try {
    const participantsStoraged = await getAllParticipants();

    const participantsFiltered = participantsStoraged.filter((participant) => participant.id !== participantId);

    const participantsFilteredFormatted = JSON.stringify(participantsFiltered);

    await AsyncStorage.setItem(PARTICIPANTS_COLLECTION, participantsFilteredFormatted);
  } catch (error) {
    throw error;
  }
}
