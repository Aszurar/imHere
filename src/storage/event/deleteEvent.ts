import AsyncStorage from '@react-native-async-storage/async-storage';

import { EVENT_DETAILS_COLLECTION, PARTICIPANTS_COLLECTION } from '../storageConfig';

export async function deleteEvent() {
  try {
    await AsyncStorage.removeItem(PARTICIPANTS_COLLECTION);
    await AsyncStorage.removeItem(EVENT_DETAILS_COLLECTION);
  } catch (error) {
    throw error;
  }
}
