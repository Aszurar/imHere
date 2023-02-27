import AsyncStorage from '@react-native-async-storage/async-storage';

import { EVENT_DETAILS_COLLECTION } from '../storageConfig';
import { IEventDetailsProps } from '../../dto/eventDetails';

export async function saveEventDetails({ date, name }: IEventDetailsProps) {
  try {
    const newEventDetails = {
      date,
      name,
    };

    const storageFormatted = JSON.stringify(newEventDetails);

    await AsyncStorage.setItem(EVENT_DETAILS_COLLECTION, storageFormatted);
  } catch (error) {
    throw error;
  }
}
