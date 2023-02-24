import AsyncStorage from '@react-native-async-storage/async-storage';

import { PARTICIPANTS_COLLECTION } from '../storageConfig';
import { getAllParticipants } from './getAllParticipants';
import { IParticipantsProps } from '../../dto/participantDTO';

export async function saveParticipant({ id, name }: IParticipantsProps) {
  try {
    const newParticipant = {
      id,
      name,
    };

    const participantsStoraged = await getAllParticipants();

    const storageFormatted = JSON.stringify([...participantsStoraged, newParticipant]);

    await AsyncStorage.setItem(PARTICIPANTS_COLLECTION, storageFormatted);
  } catch (error) {
    throw error;
  }
}
