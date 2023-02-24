import AsyncStorage from '@react-native-async-storage/async-storage';

import { PARTICIPANTS_COLLECTION } from '../storageConfig';
import { IParticipantsProps } from '../../dto/participantDTO';

export async function getAllParticipants() {
  try {
    const participantsStoraged = await AsyncStorage.getItem(PARTICIPANTS_COLLECTION);

    const participantsStoragedFormatted: IParticipantsProps[] = participantsStoraged
      ? JSON.parse(participantsStoraged)
      : [];

    return participantsStoragedFormatted;
  } catch (error) {
    throw error;
  }
}
